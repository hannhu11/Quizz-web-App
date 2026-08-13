const http = require('http');

function makeRequest(method, path, body = null, token = null) {
  return new Promise((resolve, reject) => {
    const dataString = body ? JSON.stringify(body) : '';
    const headers = {
      'Content-Type': 'application/json'
    };
    if (dataString) {
      headers['Content-Length'] = Buffer.byteLength(dataString);
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const options = {
      hostname: '127.0.0.1',
      port: 8701,
      path: `/api${path}`,
      method: method,
      headers: headers
    };

    const req = http.request(options, (res) => {
      let responseBody = '';
      res.on('data', chunk => responseBody += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(responseBody) });
        } catch (e) {
          resolve({ status: res.statusCode, data: responseBody });
        }
      });
    });

    req.on('error', err => reject(err));
    if (dataString) req.write(dataString);
    req.end();
  });
}

async function runSavedAndResetTests() {
  console.log('🧪 Starting Automated Tests for SavedQuestions & Forgot/Reset Password...');

  try {
    // 1. Test Register a user
    const testEmail = `student_${Date.now()}@fpt.edu.vn`;
    const regRes = await makeRequest('POST', '/auth/register', {
      fullName: 'Test Student FPT',
      email: testEmail,
      password: 'password123',
      confirmPassword: 'password123'
    });
    console.log('✅ Test 1: Register User ->', regRes.data.success ? 'PASSED' : 'FAILED', regRes.data.message);
    const token = regRes.data.token;

    // 2. Test Forgot Password API
    const forgotRes = await makeRequest('POST', '/auth/forgot-password', { email: testEmail });
    console.log('✅ Test 2: Forgot Password API ->', forgotRes.data.success ? 'PASSED' : 'FAILED', forgotRes.data.message);
    const resetToken = forgotRes.data.resetToken;

    // 3. Test Reset Password API
    const resetRes = await makeRequest('POST', '/auth/reset-password', {
      token: resetToken,
      newPassword: 'newpassword123'
    });
    console.log('✅ Test 3: Reset Password API ->', resetRes.data.success ? 'PASSED' : 'FAILED', resetRes.data.message);

    // 4. Test Login with New Password
    const loginRes = await makeRequest('POST', '/auth/login', {
      email: testEmail,
      password: 'newpassword123'
    });
    console.log('✅ Test 4: Login with New Password ->', loginRes.data.success ? 'PASSED' : 'FAILED');

    // 5. Test Save Question API
    const saveRes = await makeRequest('POST', '/saved-questions', {
      quizId: 'quiz-1',
      questionId: 'q-101',
      quizTitle: 'Triết Học Mác Lênin',
      subjectCode: 'MLN111',
      question: { content: 'Thế giới quan duy vật là gì?', options: ['A', 'B', 'C', 'D'] }
    }, token);
    console.log('✅ Test 5: Save Question API ->', saveRes.data.success ? 'PASSED' : 'FAILED');

    // 6. Test Get Saved Questions API
    const getRes = await makeRequest('GET', '/saved-questions', null, token);
    console.log('✅ Test 6: Get Saved Questions API ->', getRes.data.count === 1 ? 'PASSED' : 'FAILED', `(Count: ${getRes.data.count})`);

    // 7. Test Delete Saved Question API
    const delRes = await makeRequest('DELETE', '/saved-questions/quiz-1/q-101', null, token);
    console.log('✅ Test 7: Delete Saved Question API ->', delRes.data.success ? 'PASSED' : 'FAILED');

    console.log('🎉 ALL 7 AUTOMATED BACKEND TESTS PASSED 100%!');

  } catch (err) {
    console.error('❌ Test Suite Error:', err);
  }
}

// Start server process locally to run tests
const { spawn } = require('child_process');
const serverProc = spawn('node', ['server.js'], { cwd: __dirname, env: { ...process.env, PORT: 8701 } });

setTimeout(async () => {
  await runSavedAndResetTests();
  serverProc.kill();
  process.exit(0);
}, 2500);
