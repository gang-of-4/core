const user = {
  firstName: "John",
  lastName: "Doe",
  email: `${Date.now()}@example.com`,
  password: "Password123!",
};

const vendor = {
  ...user,
  email: `v.${user.email}`,
};

const admin = {
  email: "admin@example.com",
  password: "Q1W2E3R4",
};

const customerToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5MTQwNGMzOC1kZjA4LTQ3YWEtYjEyYS00MTVjYjc3NTE2ZTgiLCJ1c2VyIjp7ImlkIjoiOTE0MDRjMzgtZGYwOC00N2FhLWIxMmEtNDE1Y2I3NzUxNmU4IiwiZmlyc3ROYW1lIjoiSmFzb24iLCJsYXN0TmFtZSI6IkdhcnJldHQiLCJlbWFpbCI6ImRpYnlAbWFpbGluYXRvci5jb20iLCJwaG9uZSI6bnVsbCwiZW1haWxWZXJpZmllZEF0IjpudWxsLCJjcmVhdGVkQXQiOiIyMDI0LTA1LTA1VDE3OjEzOjE0LjI5NVoiLCJ1cGRhdGVkQXQiOiIyMDI0LTA1LTA1VDE3OjEzOjE0LjI5NVoiLCJyb2xlIjp7ImlkIjoiMGUzNzQ0NjgtNzlmMS00MWU5LTlkOTEtMmNjMTczNTZhNTI5IiwibmFtZSI6ImN1c3RvbWVyIn19LCJpYXQiOjE3MTQ5MjkxOTUsImV4cCI6MTcxNTEwMTk5NX0.-JrzQQLk3CpEwPV-RwAMwj-PFIHBx7JR8AHNOa3_494";

export default { user, vendor, admin, customerToken };
