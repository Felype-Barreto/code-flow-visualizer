/*
 End-to-end test for gamification APIs
*/

async function main() {
  const base = process.env.BASE_URL || "http://127.0.0.1:5000";
  const email = process.env.TEST_EMAIL || "tester@example.com";
  const password = process.env.TEST_PASSWORD || "StrongPassw0rd!";

  const j = (obj: any) => JSON.stringify(obj, null, 2);

  console.log("BASE:", base);

  // Create or login
  let token: string | null = null;
  try {
    const res = await fetch(`${base}/api/complete-signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        firstName: "Tester",
        lastName: "Example",
        dateOfBirth: "2000-01-01T00:00:00.000Z",
        country: "BR",
        password,
      }),
    });
    const data = await res.json();
    if (data.token) {
      token = data.token;
      console.log("Signup OK");
    } else {
      console.log("Signup response:", j(data));
    }
  } catch (e) {
    console.log("Signup error:", String(e));
  }
  if (!token) {
    const res = await fetch(`${base}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    token = data.token;
    console.log("Login OK");
  }
  if (!token) throw new Error("No token");

  const auth = { Authorization: `Bearer ${token}` };

  // Me
  {
    const res = await fetch(`${base}/api/me`, { headers: auth });
    const me = await res.json();
    console.log("/api/me:", j(me));
  }

  // Update profile
  {
    const res = await fetch(`${base}/api/profile/update`, {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({ bio: "E2E test user", avatar: "ninja", dailyGoal: 3 }),
    });
    const data = await res.json();
    console.log("update profile:", j(data));
  }

  // Log activity (exercise)
  {
    const res = await fetch(`${base}/api/activity`, {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({ type: "exercise", title: "Two Sum", xpEarned: 50, timeSpent: 45, score: 100 }),
    });
    const data = await res.json();
    console.log("log activity:", j(data));
  }

  // History
  {
    const res = await fetch(`${base}/api/history`, { headers: auth });
    const data = await res.json();
    console.log("history:", j(data.stats));
    console.log("activities count:", (data.activities || []).length);
  }

  // Journal create
  let entryId: string | null = null;
  {
    const res = await fetch(`${base}/api/journal`, {
      method: "POST",
      headers: { ...auth, "Content-Type": "application/json" },
      body: JSON.stringify({ title: "Learning Recursion", content: "Today I mastered recursion.", tags: "algorithms,recursion", code: "function f(n){return n<=1?1:n*f(n-1)}" }),
    });
    const data = await res.json();
    console.log("journal create:", j(data));
  }

  // Journal list
  {
    const res = await fetch(`${base}/api/journal`, { headers: auth });
    const data = await res.json();
    console.log("journal entries:", (data.entries || []).length);
    entryId = data.entries?.[0]?.id || null;
  }

  // Achievements check
  {
    const res = await fetch(`${base}/api/achievements/check`, { method: "POST", headers: auth });
    const data = await res.json();
    console.log("achievements unlocked:", j(data));
  }

  // Achievements list
  {
    const res = await fetch(`${base}/api/achievements`, { headers: auth });
    const data = await res.json();
    console.log("achievements count:", (data.achievements || []).length);
  }

  console.log("E2E gamification test complete ✓");
}

main().catch((e) => {
  console.error("E2E test failed:", e);
  process.exit(1);
});

export {};
