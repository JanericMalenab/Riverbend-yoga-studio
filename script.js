var classes = [
  { id: "gentle", name: "Gentle Yoga", info: "Slow stretching and balance. Great for beginners and older adults." },
  { id: "vinyasa", name: "Vinyasa", info: "Steady movement connected with breathing to build strength." },
  { id: "restorative", name: "Restorative Yoga", info: "Quiet, relaxing class using blankets and pillows." }
];

function getClassById(id) {
  for (var i = 0; i < classes.length; i++) {
    if (classes[i].id === id) {
      return classes[i];
    }
  }
  return null;
}

function showSelectedClass(id) {
  var output = document.getElementById("class-output");
  var picked = getClassById(id);

  if (picked) {
    output.textContent = "Saved favorite: " + picked.name + " - " + picked.info;
  } else {
    output.textContent = "Please pick a class first.";
  }
}

function setupClassPicker() {
  var select = document.getElementById("favorite-class");
  var button = document.getElementById("save-class-btn");
  if (!select || !button) {
    return;
  }

  var saved = localStorage.getItem("favoriteClass");
  if (saved) {
    select.value = saved;
    showSelectedClass(saved);
  }

  button.addEventListener("click", function () {
    var choice = select.value;
    if (choice !== "") {
      localStorage.setItem("favoriteClass", choice);
    }
    showSelectedClass(choice);
  });
}

function setupFormValidation() {
  var form = document.getElementById("request-form");
  if (!form) {
    return;
  }

  var interest = document.getElementById("interest");
  var saved = localStorage.getItem("favoriteClass");
  if (saved && interest) {
    interest.value = saved;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var message = document.getElementById("message").value.trim();

    var nameError = document.getElementById("name-error");
    var emailError = document.getElementById("email-error");
    var messageError = document.getElementById("message-error");
    var formStatus = document.getElementById("form-status");

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formStatus.textContent = "";

    var isValid = true;

    if (name === "") {
      nameError.textContent = "Please enter your name.";
      isValid = false;
    }

    if (email === "" || email.indexOf("@") === -1 || email.indexOf(".") === -1) {
      emailError.textContent = "Please enter a valid email address.";
      isValid = false;
    }

    if (message.length < 10) {
      messageError.textContent = "Please write at least 10 characters in your message.";
      isValid = false;
    }

    if (isValid) {
      formStatus.textContent = "Thanks! Your request has been sent.";
    }
  });
}

setupClassPicker();
setupFormValidation();