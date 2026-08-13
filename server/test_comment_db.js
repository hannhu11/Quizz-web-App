const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const app = require('./src/index');
const http = require('http');

let server;

async function runCommentTests() {
  console.log('\n======================================================');
  console.log('🧪 BẮT ĐẦU KIỂM THỬ TỰ ĐỘNG GIAI ĐOẠN 3 (COMMENT & VOTE ENGINE)');
  console.log('======================================================\n');

  try {
    server = app.listen(5002, async () => {
      console.log('✅ 1. Server running on port 5002');

      // Setup 2 test users
      await prisma.vote.deleteMany({});
      await prisma.comment.deleteMany({});
      await prisma.user.deleteMany({
        where: { email: { in: ['author_test@fpt.edu.vn', 'voter_test@fpt.edu.vn'] } }
      });

      const author = await prisma.user.create({
        data: {
          fullName: 'Tác Giả FPT',
          email: 'author_test@fpt.edu.vn',
          reputation: 15 // High reputation user (🟢 +15 Uy tín)
        }
      });

      const voter = await prisma.user.create({
        data: {
          fullName: 'Người Đánh Giá FPT',
          email: 'voter_test@fpt.edu.vn',
          reputation: 10
        }
      });

      const jwt = require('jsonwebtoken');
      const authorToken = jwt.sign({ id: author.id, fullName: author.fullName }, process.env.JWT_SECRET || 'quizzflow_super_secret_jwt_key_2026_v20');
      const voterToken = jwt.sign({ id: voter.id, fullName: voter.fullName }, process.env.JWT_SECRET || 'quizzflow_super_secret_jwt_key_2026_v20');

      function requestApi(path, method = 'GET', data = null, token = null) {
        return new Promise((resolve, reject) => {
          const postData = data ? JSON.stringify(data) : '';
          const options = {
            hostname: 'localhost',
            port: 5002,
            path,
            method,
            headers: {
              'Content-Type': 'application/json',
              ...(data ? { 'Content-Length': Buffer.byteLength(postData) } : {}),
              ...(token ? { Authorization: `Bearer ${token}` } : {})
            }
          };

          const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (c) => (body += c));
            res.on('end', () => resolve({ status: res.statusCode, data: JSON.parse(body) }));
          });
          req.on('error', reject);
          if (data) req.write(postData);
          req.end();
        });
      }

      // 2. Post a comment
      console.log('\n--- Test 2: Creating a new discussion comment ---');
      const createRes = await requestApi('/api/comments', 'POST', {
        quizId: 'MLN111',
        questionId: 'q-101',
        content: 'Theo Giáo trình Lịch sử Đảng trang 45 thì phương án B mới chuẩn mốc 1930!'
      }, authorToken);

      console.log('Status:', createRes.status, 'Comment ID:', createRes.data.comment?.id);
      if (createRes.status === 201 && createRes.data.comment?.id) {
        console.log('PASSED: Discussion comment created successfully!');
      } else {
        throw new Error('FAILED Create Comment Test');
      }

      const commentId = createRes.data.comment.id;

      // 3. Upvote comment
      console.log('\n--- Test 3: Upvoting comment (+1 score & +1 reputation) ---');
      const voteRes = await requestApi(`/api/comments/${commentId}/vote`, 'POST', { type: 1 }, voterToken);
      console.log('Status:', voteRes.status, 'New Score:', voteRes.data.score);

      const updatedAuthor = await prisma.user.findUnique({ where: { id: author.id } });
      console.log('Author New Reputation:', updatedAuthor.reputation, '(Expected: 16)');

      if (voteRes.status === 200 && voteRes.data.score === 1 && updatedAuthor.reputation === 16) {
        console.log('PASSED: Upvote updated score and added +1 reputation to author!');
      } else {
        throw new Error('FAILED Upvote Test');
      }

      // 4. Double click vote cancellation
      console.log('\n--- Test 4: Re-clicking Upvote (Cancelling vote) ---');
      const cancelRes = await requestApi(`/api/comments/${commentId}/vote`, 'POST', { type: 1 }, voterToken);
      console.log('Status:', cancelRes.status, 'New Score:', cancelRes.data.score);

      const revertedAuthor = await prisma.user.findUnique({ where: { id: author.id } });
      console.log('Author Reverted Reputation:', revertedAuthor.reputation, '(Expected: 15)');

      if (cancelRes.status === 200 && cancelRes.data.score === 0 && revertedAuthor.reputation === 15) {
        console.log('PASSED: Duplicate vote cancelled cleanly and reverted reputation!');
      } else {
        throw new Error('FAILED Vote Cancel Test');
      }

      // 5. Fetch Comments
      console.log('\n--- Test 5: Fetching comments list with Reputation Badges & Sort ---');
      const fetchRes = await requestApi('/api/comments/MLN111/q-101', 'GET', null, voterToken);
      console.log('Status:', fetchRes.status, 'Comments count:', fetchRes.data.count, 'Author Reputation:', fetchRes.data.comments[0]?.user?.reputation);

      if (fetchRes.status === 200 && fetchRes.data.comments.length === 1 && fetchRes.data.comments[0].user.reputation >= 10) {
        console.log('PASSED: Comments list returned with full User Reputation Badges!');
      } else {
        throw new Error('FAILED Fetch Comments Test');
      }

      console.log('\n======================================================');
      console.log('🎉 TOÀN BỘ BÀI TEST GIAI ĐOẠN 3 (COMMENT & VOTE) THÀNH CÔNG 100%!');
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

runCommentTests();
