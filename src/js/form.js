// object variable data store
const form = {
  first_name: "",
  last_name: "",
  email: "",
};
// target elemtns in html
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

// open modal on button click
downloadButton.addEventListener("click", function () {
  // return user to top of screen for modal on mobile if the window width is <= 768px
  if (window.innerWidth <= 768) {
    // scroll to the top of the page for mobile
    window.scrollTo(0, 0);
  }

  modalOverlay.style.display = "flex";
});

// close button on 'x' click
closeModal.addEventListener("click", function () {
  modalOverlay.style.display = "none";
});

// close modal if user clicks outside of the modal
modalOverlay.addEventListener("click", function (e) {
  if (e.target === modalOverlay) {
    modalOverlay.style.display = "none";
  }
});

downloadForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // reset error messages
  firstNameError.style.display = "none";
  lastNameError.style.display = "none";
  emailError.style.display = "none";

  // get form data for entered values
  const formData = new FormData(downloadForm);

  // update the form object with entered form data
  form.first_name = formData.get("first_name");
  form.last_name = formData.get("last_name");
  form.email = formData.get("email");

  console.log("pre submit First Name:", form.first_name);
  console.log("pre submit Last Name:", form.last_name);
  console.log("pre submit Email:", form.email);

  // check if first name's empty
  if (form.first_name.trim() === "") {
    firstNameError.textContent = "First name is required.";
    firstNameError.style.display = "flex";
  }

  // check if last name's empty
  if (form.last_name.trim() === "") {
    lastNameError.textContent = "Last name is required.";
    lastNameError.style.display = "flex";
  }

  // check if email's empty and it doesn't include '@'
  if (form.email.trim() === "" || !form.email.includes("@")) {
    emailError.textContent = "Email is required.";
    emailError.style.display = "flex";
  }

  console.log("first validations");

  // check if values aren't empty
  if (
    form.first_name.trim() !== "" &&
    form.last_name.trim() !== "" &&
    form.email.trim() !== ""
  ) {
    console.log("pre-submit validations - pass");

    // handle form submission, e.g., send data to endpoint
    console.log("submitted First Name:", form.first_name);
    console.log("submitted Last Name:", form.last_name);
    console.log("submitted Email:", form.email);

    // create an object to send the data
    const postData = {
      first_name: form.first_name,
      last_name: form.last_name,
      email: form.email,
    };

    // send post request to endpoint with form data
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

    //set success status of submit button
    modalButton.style.backgroundColor = "#07b547";
    modalButton.textContent = "Sent";
    confirmationText.style.display = "flex";

    console.log("SUBMITTED");

    // functionality pulled out of post req for now as we aren't sending it
    setTimeout(function () {
      // reset the form data
      form.first_name = "";
      form.last_name = "";
      form.email = "";

      // reset input fields in html
      document.getElementById("first_name").value = "";
      document.getElementById("last_name").value = "";
      document.getElementById("email").value = "";

      // reset the visuals & close modal
      modalOverlay.style.display = "none";
      modalButton.style.backgroundColor = "#444BF7";
      modalButton.textContent = "Submit";
      confirmationText.style.display = "none";
    }, 3000);
  }
});
