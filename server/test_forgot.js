async function run() {
  try {
    const res = await fetch('http://localhost:8701/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: 'hannhu4002@gmail.com' })
    });
    console.log('STATUS:', res.status);
    const data = await res.json();
    console.log('RESPONSE:', data);
  } catch (err) {
    console.error('ERROR:', err);
  }
}

run();
