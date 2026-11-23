const registrationForm = document.getElementById("registrationForm");
const submissionResult = document.getElementById("submissionResult");

registrationForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const departmentInput = document.getElementById("department");
  const inputs = [nameInput, emailInput, departmentInput];

  inputs.forEach(function (input) {
    input.classList.toggle("invalid", !input.checkValidity());
  });

  if (!registrationForm.checkValidity()) {
    registrationForm.reportValidity();
    submissionResult.hidden = true;
    return;
  }

  document.getElementById("resultName").textContent = nameInput.value.trim();
  document.getElementById("resultEmail").textContent = emailInput.value.trim();
  document.getElementById("resultDepartment").textContent =
    departmentInput.value.trim();

  submissionResult.hidden = false;
  submissionResult.scrollIntoView({ behavior: "smooth", block: "nearest" });
});

registrationForm.addEventListener("input", function (event) {
  if (event.target.classList.contains("invalid") && event.target.checkValidity()) {
    event.target.classList.remove("invalid");
  }
});
