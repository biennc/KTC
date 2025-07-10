image1 = src =
  "https://static.vecteezy.com/system/resources/thumbnails/035/480/098/small_2x/ai-generated-analyze-the-impact-of-climate-change-on-the-absolute-green-tree-nature-background-considering-its-effects-on-both-plant-life-and-the-migratory-patterns-of-colorful-birds-photo.jpg";
image2 = src =
  "https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630";
// 1
function changeText() {
  const changeText = document.getElementById("changeTextBtn");
  changeText.innerText = "Hello, JavaScript!";
}

// 2
function highlight() {
  const box = document.getElementById("toggleHighlightBtn");
  box.style.backgroundColor =
    box.style.backgroundColor === "red" ? "green" : "red";
  box.style.color = "white";
}
// 3
function addItem() {
  const itemInput = document.getElementById("itemInput");
  const inputData = document.querySelector(".inputData");
  const newItem = document.createElement("div");
  newItem.textContent = itemInput.value;
  newItem.classList.add("item");
  inputData.appendChild(newItem);
  itemInput.value = "";
}
// 4
function removeItem() {
  const inputData = document.querySelector(".inputData");
  const items = inputData.querySelectorAll(".item");
  inputData.removeChild(items[0]);
}
// 5
function changeImage() {
  const change = document.getElementById("mainImage");
  change.src === image1 ? (change.src = image2) : (change.src = image1);
}
// 7
function multiButton() {
  alert("Hello World!");
}

document.addEventListener("DOMContentLoaded", function () {
  // (12)
  const greetingText = document.getElementById("greetingText");
  if (greetingText) {
    const hour = new Date().getHours();
    let greeting = "";
    if (hour < 12) greeting = "Good Morning";
    else if (hour < 18) greeting = "Good Afternoon";
    else greeting = "Good Evening";
    greetingText.textContent = greeting;
  }

  // (13)
  const nameInput = document.getElementById("nameInput");
  const nameError = document.getElementById("nameError");
  const formSubmit = document.getElementById("formSubmit");
  if (formSubmit) {
    formSubmit.addEventListener("click", function () {
      if (nameInput.value.trim() === "") {
        nameInput.style.border = "2px solid red";
        nameError.textContent = "Name is required";
      } else {
        nameInput.style.border = "";
        nameError.textContent = "";
      }
    });
  }

  // (14)
  const onceBtn = document.getElementById("onceBtn");
  if (onceBtn) {
    onceBtn.addEventListener("click", function () {
      onceBtn.disabled = true;
    });
  }

  // (15)
  const bioInput = document.getElementById("bioInput");
  const charCount = document.getElementById("charCount");
  if (bioInput && charCount) {
    bioInput.addEventListener("input", function () {
      const remaining = 200 - bioInput.value.length;
      charCount.textContent = remaining + " characters remaining";
    });
  }

  // (16)
  const addBoxBtn = document.getElementById("addBoxBtn");
  const boxContainer = document.getElementById("boxContainer");
  if (addBoxBtn && boxContainer) {
    addBoxBtn.addEventListener("click", function () {
      const box = document.createElement("div");
      box.style.width = "30px";
      box.style.height = "30px";
      box.style.background = `hsl(${Math.floor(Math.random()*360)},70%,60%)`;
      box.style.borderRadius = "4px";
      boxContainer.appendChild(box);
    });
  }

  // (17)
  const todoList = document.getElementById("todoList");
  if (todoList) {
    todoList.querySelectorAll("li").forEach(function (li) {
      li.addEventListener("click", function () {
        li.style.textDecoration = li.style.textDecoration === "line-through" ? "" : "line-through";
      });
    });
  }

  // (18)
  const passwordInput = document.getElementById("passwordInput");
  const togglePassword = document.getElementById("togglePassword");
  if (passwordInput && togglePassword) {
    togglePassword.addEventListener("change", function () {
      passwordInput.type = togglePassword.checked ? "text" : "password";
    });
  }

  // (19)
  const optionBoxes = document.querySelectorAll(".optionBox");
  const checkedCount = document.getElementById("checkedCount");
  if (optionBoxes.length && checkedCount) {
    function updateCheckedCount() {
      const count = Array.from(optionBoxes).filter(cb => cb.checked).length;
      checkedCount.textContent = count + " checked";
    }
    optionBoxes.forEach(cb => cb.addEventListener("change", updateCheckedCount));
    updateCheckedCount();
  }

  // (20)
  const mainPhoto = document.getElementById("mainPhoto");
  const thumbnails = document.querySelectorAll(".thumbnail");
  if (mainPhoto && thumbnails.length) {
    thumbnails.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        mainPhoto.src = thumb.src;
      });
    });
  }
  // 9
  function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    document.getElementById("clock").textContent = timeString;
  }

  updateClock();
  setInterval(updateClock, 1000);

  // 10
  document
    .getElementById("validateBtn")
    .addEventListener("click", validateEmail);

  // 11
  document.getElementById("hideParaBtn").addEventListener("click", function () {
    document.getElementById("infoPara").style.display = "none";
  });
  // 8
  const hoverBox = document.getElementById("hoverBox");
  hoverBox.addEventListener("mouseenter", function () {
    hoverBox.style.backgroundColor = "lightblue";
  });
  hoverBox.addEventListener("mouseleave", function () {
    hoverBox.style.backgroundColor = "#329837";
  });
  document
    .getElementById("submitUsername")
    .addEventListener("click", function () {
      const username = document.getElementById("usernameInput").value;
      alert("Username: " + username);
    });
});

const emailInput = document.getElementById("emailInput");
const emailError = document.getElementById("errorMessage");

function validateEmail() {
  const emailInput = document.getElementById("emailInput");
  const emailError = document.getElementById("errorMessage");
  if (emailInput.validity.valid) {
    emailError.textContent = "";
    emailInput.setCustomValidity("");
  } else {
    emailError.textContent = "Invalid email address";
  }
}

document.getElementById("validateBtn").addEventListener("click", validateEmail);
