// Validation functions — kept small and separate so they can be tested directly.

function validateName(value) {
  if (value.trim().length < 2) {
    return "Name must be at least 2 characters.";
  }
  return "";
}

function validateEmail(value) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(value.trim())) {
    return "Enter a valid email address.";
  }
  return "";
}

function validatePassword(value) {
  if (value.length < 8) {
    return "Password must be at least 8 characters.";
  }
  if (!/\d/.test(value)) {
    return "Password must include at least one number.";
  }
  return "";
}

// Export for tests (Node environment). In the browser, this block is skipped.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { validateName, validateEmail, validatePassword };
}

// Browser-only wiring — skipped when required by the test runner in Node.
if (typeof document !== "undefined") {
  const form = document.getElementById("settingsForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const submitBtn = document.getElementById("submitBtn");
  const successMessage = document.getElementById("successMessage");

  const fields = [
    { input: nameInput, errorId: "nameError", validate: validateName },
    { input: emailInput, errorId: "emailError", validate: validateEmail },
    { input: passwordInput, errorId: "passwordError", validate: validatePassword },
  ];

  function updateField(field) {
    const message = field.validate(field.input.value);
    const errorEl = document.getElementById(field.errorId);
    errorEl.textContent = message;
    field.input.classList.toggle("invalid", Boolean(message));
    return message === "";
  }

  function updateSubmitState() {
    const allValid = fields.every(
      (field) => field.validate(field.input.value) === ""
    );
    submitBtn.disabled = !allValid;
  }

  fields.forEach((field) => {
    field.input.addEventListener("input", () => {
      updateField(field);
      updateSubmitState();
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const allValid = fields
      .map((field) => updateField(field))
      .every(Boolean);

    if (allValid) {
      successMessage.textContent = "Settings saved successfully.";
      form.reset();
      updateSubmitState();
    }
  });
}
