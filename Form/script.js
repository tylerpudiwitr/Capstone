const name = document.getElementById("name");
const password = document.getElementById("password");
const form = document.getElementById("form");

form.addEventListener("submit", e => {
  let messages = [];
  if (name.value === "" || name.value == null) {
    messages.push("Name is required");
  }

  if (password.value.length <= 6) {
    messages.push("Password must be longer than 6 characters");
  }

  if (password.value.length >= 20) {
    messages.push("Password must be less than 20 characters");
  }

  if (messages.length > 0) {
    e.preventDefault();
    // eslint-disable-next-line no-undef
    errorElement.innerText = messages.join(", ");
  }
});