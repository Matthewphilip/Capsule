const form = {
  first_name: "",
  last_name: "",
  email: "",
};
// JavaScript to toggle modal display and handle form submission
const modalOverlay = document.getElementById("modalOverlay");
const modal = document.getElementById("modal");
const closeModal = document.getElementById("closeModal");
const downloadButton = document.querySelector(".lander-button");
const downloadForm = document.getElementById("downloadForm");
const modalButton = document.querySelector(".modal-button");
const confirmationText = document.querySelector(".confirmation-text");
const firstNameError = document.getElementById("first_name_error");
const lastNameError = document.getElementById("last_name_error");
const emailError = document.getElementById("email_error");

downloadButton.addEventListener("click", function () {
  modalOverlay.style.display = "flex";
});

closeModal.addEventListener("click", function () {
  modalOverlay.style.display = "none";
});

downloadForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Reset error messages
  firstNameError.style.display = "none";
  lastNameError.style.display = "none";
  emailError.style.display = "none";

  // Get form data for entered values
  const formData = new FormData(downloadForm);

  // Update the form object with entered form data
  form.first_name = formData.get("first_name");
  form.last_name = formData.get("last_name");
  form.email = formData.get("email");

  console.log("pre submit First Name:", form.first_name);
  console.log("pre submit Last Name:", form.last_name);
  console.log("pre submit Email:", form.email);

  // Check if first name's empty
  if (form.first_name.trim() === "") {
    firstNameError.textContent = "First name is required.";
    firstNameError.style.display = "flex";
  }

  // Check if last name's empty
  if (form.last_name.trim() === "") {
    lastNameError.textContent = "Last name is required.";
    lastNameError.style.display = "flex";
  }

  // Check if email's empty
  if (form.email.trim() === "") {
    emailError.textContent = "Email is required.";
    emailError.style.display = "flex";
  }

  console.log("first validations");

  // Check if values aren't empty
  if (
    form.first_name.trim() !== "" &&
    form.last_name.trim() !== "" &&
    form.email.trim() !== ""
  ) {
    console.log("pre-submit validations - pass");

    // Handle form submission, e.g., send data to endpoint
    console.log("submitted First Name:", form.first_name);
    console.log("submitted Last Name:", form.last_name);
    console.log("submitted Email:", form.email);

    // Create an object to send the data
    const postData = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
    };

    // Send a POST request with the form data
    // fetch("url", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json", // Set the content type to JSON
    //     },
    //     body: JSON.stringify(postData), // Convert the data to JSON format
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       // Handle the response from the server if needed
    //       console.log("Server response:", data);

    //       setTimeout(function () {
    //         // Reset the visuals & close modal
    //         modalOverlay.style.display = "none";
    //         modalButton.style.backgroundColor = "#444BF7";
    //         modalButton.textContent = "Submit";
    //         confirmationText.style.display = "none";

    //         // Reset the form data
    //         form.first_name = "";
    //         form.last_name = "";
    //         form.email = "";
    //       }, 3000);
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });

    modalButton.style.backgroundColor = "#07b547";
    modalButton.textContent = "Sent";
    confirmationText.style.display = "flex";

    console.log("SUBMITTED");

    setTimeout(function () {
      // Reset the form data
      form.first_name = "";
      form.last_name = "";
      form.email = "";

      // Reset input fields in html
      document.getElementById("first_name").value = "";
      document.getElementById("last_name").value = "";
      document.getElementById("email").value = "";

      // Reset the visuals & close modal
      modalOverlay.style.display = "none";
      modalButton.style.backgroundColor = "#444BF7";
      modalButton.textContent = "Submit";
      confirmationText.style.display = "none";
    }, 3000);
  }
});
