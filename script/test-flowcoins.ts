// E2E test for FlowCoins system (minimal, safe)
const BASE = process.env.BASE_URL || 'http://127.0.0.1:5000';
const testEmail = process.env.TEST_EMAIL || `flowcoins-test-${Date.now()}@example.com`;
const testPassword = process.env.TEST_PASSWORD || 'StrongPassw0rd!';

async function main() {
  console.log('BASE:', BASE);

  // Signup or login
  let token: string | undefined;
  try {
    const signupRes = await fetch(`${BASE}/api/complete-signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: testEmail,
        firstName: 'Flow',
        lastName: 'Tester',
        dateOfBirth: '2000-01-01T00:00:00.000Z',
        country: 'US',
        password: testPassword,
      }),
    });
    const data = await signupRes.json();
    token = data.token;
    console.log('Signup OK');
  } catch (e) {
    const loginRes = await fetch(`${BASE}/api/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: testPassword }),
    });
    const loginData = await loginRes.json();
    token = loginData.token;
    console.log('Login OK');
  }

  if (!token) throw new Error('No token');

  const auth = { Authorization: `Bearer ${token}` };

  // Minimal checks: /api/me and /api/coins/balance
  const meRes = await fetch(`${BASE}/api/me`, { headers: auth });
  const me = await meRes.json();
  console.log('/api/me:', JSON.stringify(me, null, 2));

  const balanceRes = await fetch(`${BASE}/api/coins/balance`, { headers: auth });
  const balance = await balanceRes.json();
  console.log('/api/coins/balance:', JSON.stringify(balance, null, 2));

  console.log('E2E FlowCoins minimal test complete ✓');
}

main().catch((err) => {
  console.error('E2E FlowCoins test failed:', err);
  process.exit(1);
});

export {};
