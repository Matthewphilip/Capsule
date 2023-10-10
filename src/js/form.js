const form = {
  first_name: "Bob",
  last_name: "Burgers",
  email: "bob@burgers.com",
};
// JavaScript to toggle modal display and handle form submission
const modalOverlay = document.getElementById("modalOverlay");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const downloadButton = document.querySelector(".lander-button");
const downloadForm = document.getElementById("downloadForm");

downloadButton.addEventListener("click", function () {
  modalOverlay.style.display = "flex";
});

closeModal.addEventListener("click", function () {
  modalOverlay.style.display = "none";
});

downloadForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(downloadForm);

  // Update the stage object with form data
  form.first_name = formData.get("first_name");
  form.last_name = formData.get("last_name");
  form.email = formData.get("email");

  // Handle form submission, e.g., send data to a server
  console.log("First Name:", form.first_name);
  console.log("Last Name:", form.last_name);
  console.log("Email:", form.email);

  // Close the modal after submission
  modalOverlay.style.display = "none";
});
