function createNewVisitor(event) {
  event.preventDefault();
  const nameInput = document.querySelector("#name");

  const validateFormInputs = () => {
    if (nameInput.value === "") {
      return false;
    }
    return true;
  };

  const visitorExists = (nameInput) => {
    let exists = false;
    //בדיקה אם המשתמש קיים
    visitors.forEach((Element) => {
      if (Element.name == nameInput.value) {
        alert("The user already exists! Please choose another User name");
        exists = true;
        return true;
      }
    });
    if (!exists) {
      makeVisitor(nameInput);
    }
  };

  const makeVisitor = (name) => {
    const newVisitor = {
      name: name.value,
      coins: 50,
      image: "images/generalpic.webp",
      visitedAnimals: [],
      FeededAnimals: [],
    };
    // הוספת המבקר למערך
    visitors.push(newVisitor);
    // עדכון ה־localStorage
    localStorage.setItem("visitors", JSON.stringify(visitors));
  };

  validateFormInputs();
  const isExsists = visitorExists(nameInput);
  if (!isExsists) {
    console.log((window.location.href = "login.html"));
  }
}

const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}

document.getElementById("HomeBtn").addEventListener("click", function () {
  window.location.href = "index.html";
});
