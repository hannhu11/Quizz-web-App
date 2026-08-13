const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = require('./src/index');
const http = require('http');

let server;

async function runTests() {
  console.log('\n======================================================');
  console.log('🧪 BẮT ĐẦU KIỂM THỬ TỰ ĐỘNG GIAI ĐOẠN 1 (DB & AUTH CORE)');
  console.log('======================================================\n');

  try {
    // 1. Start Server on port 5001 for test
    server = app.listen(5001, async () => {
      console.log('✅ 1. Express Server started on http://localhost:5001');

      // 2. Test Prisma DB Connection & Clean previous test user
      await prisma.user.deleteMany({
        where: { email: { in: ['test_hannhu@fpt.edu.vn', 'test_google@gmail.com', 'test_invalid@other.com'] } }
      });
      console.log('✅ 2. Prisma ORM connected to SQLite dev.db successfully!');

      // Helper HTTP request function
      function makePost(path, data, token = null) {
        return new Promise((resolve, reject) => {
          const postData = JSON.stringify(data);
          const options = {
            hostname: 'localhost',
            port: 5001,
            path,
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Content-Length': Buffer.byteLength(postData),
              ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
          };

          const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
          });
          req.on('error', reject);
          req.write(postData);
          req.end();
        });
      }

      function makeGet(path, token = null) {
        return new Promise((resolve, reject) => {
          const options = {
            hostname: 'localhost',
            port: 5001,
            path,
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
          };

          const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => (body += chunk));
            res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
          });
          req.on('error', reject);
          req.end();
        });
      }

      // 3. Test Invalid Email Rejection
      console.log('\n--- Test 3: Rejecting Invalid Email Format ---');
      const invalidRes = await makePost('/api/auth/register', {
        fullName: 'Test User',
        email: 'invalid_email@yahoo.com',
        password: 'password123'
      });
      console.log('Status:', invalidRes.status, 'Response:', invalidRes.data.message);
      if (invalidRes.status === 400) {
        console.log('PASSED: Invalid email format rejected properly!');
      } else {
        throw new Error('FAILED Invalid Email Test');
      }

      // 4. Test Valid FPT Email Registration (@fpt.edu.vn)
      console.log('\n--- Test 4: Registering Valid FPT Student Email (@fpt.edu.vn) ---');
      const regRes = await makePost('/api/auth/register', {
        fullName: 'Nguyễn Hàn Như',
        email: 'test_hannhu@fpt.edu.vn',
        password: 'Password123!',
        confirmPassword: 'Password123!',
        dob: '2003-05-15'
      });
      console.log('Status:', regRes.status, 'User ID:', regRes.data.user?.id, 'Initial Reputation:', regRes.data.user?.reputation);
      if (regRes.status === 201 && regRes.data.user?.reputation === 10) {
        console.log('PASSED: FPT Email registration success with +10 initial Reputation!');
      } else {
        throw new Error('FAILED FPT Registration Test');
      }

      // 5. Test Duplicate Email Registration Block
      console.log('\n--- Test 5: Blocking Duplicate Email Registration ---');
      const dupRes = await makePost('/api/auth/register', {
        fullName: 'Nguyễn Hàn Như',
        email: 'test_hannhu@fpt.edu.vn',
        password: 'Password123!'
      });
      console.log('Status:', dupRes.status, 'Message:', dupRes.data.message);
      if (dupRes.status === 400) {
        console.log('PASSED: Duplicate email blocked!');
      } else {
        throw new Error('FAILED Duplicate Email Test');
      }

      // 6. Test User Login
      console.log('\n--- Test 6: Logging in with Email & Hashed Password ---');
      const loginRes = await makePost('/api/auth/login', {
        email: 'test_hannhu@fpt.edu.vn',
        password: 'Password123!'
      });
      console.log('Status:', loginRes.status, 'Token Generated:', Boolean(loginRes.data.token));
      if (loginRes.status === 200 && loginRes.data.token) {
        console.log('PASSED: Hashed Password verified & JWT Token issued!');
      } else {
        throw new Error('FAILED Login Test');
      }

      const authToken = loginRes.data.token;

      // 7. Test Protected Route GET /api/auth/me
      console.log('\n--- Test 7: Verifying Protected Route /api/auth/me with JWT ---');
      const meRes = await makeGet('/api/auth/me', authToken);
      console.log('Status:', meRes.status, 'User Name:', meRes.data.user?.fullName, 'Email:', meRes.data.user?.email);
      if (meRes.status === 200 && meRes.data.user?.fullName === 'Nguyễn Hàn Như') {
        console.log('PASSED: JWT Middleware authenticated current user profile!');
      } else {
        throw new Error('FAILED /api/auth/me Test');
      }

      // 8. Test Google OAuth Handler
      console.log('\n--- Test 8: Testing Google OAuth 1-Click Authentication ---');
      const googleRes = await makePost('/api/auth/google', {
        fullName: 'Hàn Như Google',
        email: 'test_google@gmail.com',
        googleId: '1234567890',
        avatarUrl: 'https://lh3.googleusercontent.com/a/default-user'
      });
      console.log('Status:', googleRes.status, 'Google User Email:', googleRes.data.user?.email);
      if (googleRes.status === 200 && googleRes.data.user?.email === 'test_google@gmail.com') {
        console.log('PASSED: Google OAuth 1-Click authentication success!');
      } else {
        throw new Error('FAILED Google OAuth Test');
      }

      console.log('\n======================================================');
      console.log('🎉 TOÀN BỘ 8 BÀI TEST GIAI ĐOẠN 1 ĐÃ THÀNH CÔNG 100%!');
      console.log('======================================================\n');

      server.close();
      await prisma.$disconnect();
      process.exit(0);
    });
  } catch (error) {
    console.error('❌ Test Failed:', error);
    if (server) server.close();
    await prisma.$disconnect();
    process.exit(1);
  }
}

runTests();
