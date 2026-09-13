const { validateName, validateEmail, validatePassword } = require("./script.js");

let passed = 0;
let failed = 0;

function check(description, actual, expected) {
  const isPass = actual === expected;
  if (isPass) {
    passed++;
    console.log(`PASS: ${description}`);
  } else {
    failed++;
    console.log(`FAIL: ${description}`);
    console.log(`   expected: "${expected}"`);
    console.log(`   actual:   "${actual}"`);
  }
}

// --- Name tests ---
check(
  "validateName rejects a single character",
  validateName("A"),
  "Name must be at least 2 characters."
);
check(
  "validateName accepts a normal name",
  validateName("Ameena"),
  ""
);

// --- Email tests ---
check(
  "validateEmail rejects a string with no @",
  validateEmail("ameena.email.com"),
  "Enter a valid email address."
);
check(
  "validateEmail accepts a properly formatted email",
  validateEmail("ameena@example.com"),
  ""
);

// --- Password tests ---
check(
  "validatePassword rejects a short password",
  validatePassword("abc123"),
  "Password must be at least 8 characters."
);
check(
  "validatePassword rejects a long password with no number",
  validatePassword("abcdefgh"),
  "Password must include at least one number."
);
check(
  "validatePassword accepts a valid password",
  validatePassword("abcdefg1"),
  ""
);

console.log(`\n${passed} passed, ${failed} failed`);

if (failed > 0) {
  process.exit(1);
}
