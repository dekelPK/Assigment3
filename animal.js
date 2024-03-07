let PickedAnimal = JSON.parse(localStorage.getItem("PickedAnimal")) || {};
let visitorsForView = [...visitors];
let AnimalsForView = [...animals];
let dialog;
currentVisitor = JSON.parse(localStorage.getItem("currentVisitor")) || {};
console.log("Current Visitor:", currentVisitor);
//יצירת הכרטיסיות של החיות
function createRelatedAnimalCard(animal) {
  console.log("Creating related card for", animal.name);
  const template = `
  <img class="card-img-top" src="${animal.image}" alt="${animal.name}"/>
            <div class="card-body">
              <p class="card-text">animal Name's : ${animal.name}</p>
              <p class="card-text">IsPredator ? : ${animal.isPredator}</p>
              <p class="card-text">Weight  : ${animal.weight}</p>
              <p class="card-text">Height  : ${animal.height}</p>
              <p class="card-text">Color  : ${animal.color}</p>
              <p class="card-text">Habitat  : ${animal.habitat}</p>
            </div>
          </div>`;
  const wrapper = document.createElement("div");
  wrapper.className = "animal-card";
  wrapper.innerHTML = template;
  console.log(animal);
  return wrapper;
}

function renderAnimal() {
  const animalpickedName = document.getElementById("name");
  const animalpickeWeight = document.getElementById("weight");
  const animalpickedHeight = document.getElementById("height");
  const animalpickedColor = document.getElementById("color");
  const animalpickedHabitat = document.getElementById("habitat");
  const animalpickedIsPredator = document.getElementById("isPredator");

  const imageDiv = document.getElementById("image");
  const animalImage = document.createElement("img");
  imageDiv.appendChild(animalImage);
  animalImage.src = PickedAnimal.image;
  animalpickedName.innerText = `Animal Name: ${PickedAnimal.name}`;
  animalpickeWeight.innerText = `Weight: ${PickedAnimal.weight}`;
  animalpickedHeight.innerText = `Height: ${PickedAnimal.height}`;
  animalpickedColor.innerText = `Color: ${PickedAnimal.color}`;
  animalpickedHabitat.innerText = `Habitat: ${PickedAnimal.habitat}`;
  animalpickedIsPredator.innerText = `Is Predator? : ${PickedAnimal.isPredator}`;
}

//יצירה של מערך החיות שדומים לחיה לפי הסוג שלה ( יבשתי או ימי )
function renderRelatedAnimals() {
  console.log("render related");
  let HabitatRelated = PickedAnimal.habitat;
  let RelatedDiv = document.getElementById("related-animals");
  RelatedDiv.innerHTML = "";

  AnimalsForView.forEach((animal) => {
    if (animal.habitat === HabitatRelated) {
      const relatedCard = createRelatedAnimalCard(animal);
      RelatedDiv.appendChild(relatedCard);
    }
  });
}

let FeedBtn = document.getElementById("feed-animal");
FeedBtn.addEventListener("click", feedAnimal);

//האכלת חיה
function feedAnimal() {
  // במידה ואין לנו כסף להאכיל
  if (currentVisitor.coins < 2) {
    //חיה טורפת
    if (PickedAnimal.isPredator === true) {
      visitorGotEaten();
    } else {
      animalEscaped();
    }
  } else {
    // עדכון המערך של החיות שהואכלו ע״י המשתמש הנוכחי
    visitors.forEach((visitor) => {
      if (visitor.name == currentVisitor.name) {
        visitor.FeededAnimals.push(PickedAnimal.name);
        //התשלום עבור האכלה
        currentVisitor.coins = currentVisitor.coins - 2;
        visitor.coins = currentVisitor.coins;
        localStorage.setItem("currentVisitor", JSON.stringify(currentVisitor));
        localStorage.setItem("visitors", JSON.stringify(visitors));
        // עדכון שהאכלנו את החיה במערך החיות המואכלות עבור אותו משתמש
      }
      visitors.forEach((visitor) => {
        if (visitor.name == currentVisitor.name) {
          visitor.FeededAnimals.push(PickedAnimal.name);
          localStorage.setItem("visitors", JSON.stringify(visitors));
          localStorage.setItem("currentVisitor", JSON.stringify(visitor));
        }
      });
    });

    //  הדיאלוג

    dialog = document.getElementById("Feed-dialog");
    dialog.innerHTML = "";

    const ThankYouP = document.createElement("p");
    ThankYouP.innerText = "thank you for Feed Me!";

    dialog.append(ThankYouP, getCloseModalHTMLButton());
    dialog.showModal();
  }
}

// יצירת מודאל
const getCloseModalHTMLButton = () => {
  const closeButton = document.createElement("button");
  closeButton.innerText = "Ok";
  closeButton.addEventListener("click", () => {
    dialog.close();
    window.location.reload();
  });
  return closeButton;
};

const getCloseModalHTMLButtonEscaped = () => {
  const closeButton = document.createElement("button");
  closeButton.innerText = "Ok";
  closeButton.addEventListener("click", () => {
    dialog.close();
    window.location.href = "zoo.html";
  });
  return closeButton;
};

const getCloseModalHTMLButtonGotEaten = () => {
  const closeButton = document.createElement("button");
  closeButton.innerText = "Ok";
  closeButton.addEventListener("click", () => {
    dialog.close();
    window.location.href = "login.html";
  });
  return closeButton;
};

function visitorGotEaten() {
  visitors = visitors.filter((visitor) => visitor.name !== currentVisitor.name);
  localStorage.setItem("visitors", JSON.stringify(visitors));
  localStorage.removeItem("currentVisitor");

  dialog = document.getElementById("Feed-dialog");
  dialog.innerHTML = "";

  const eatenP = document.createElement("p");
  eatenP.innerText = "We're sorry, but you were eaten by a predator animal.";

  dialog.append(eatenP, getCloseModalHTMLButtonGotEaten());
  dialog.showModal();

  // ממשו את הלוגיקה של חיה שטורפת אורח
}

function animalEscaped() {
  animals = animals.filter((animal) => animal.name !== PickedAnimal.name);
  localStorage.setItem("animals", JSON.stringify(animals));
  localStorage.removeItem("PickedAnimal");

  dialog = document.getElementById("Feed-dialog");
  dialog.innerHTML = "";

  const animalEscapedp = document.createElement("p");
  animalEscapedp.innerText = "Oh no! The animal escaped from our zoo.";

  dialog.append(animalEscapedp, getCloseModalHTMLButtonEscaped());
  dialog.showModal();
}

window.addEventListener("load", renderAnimal());
window.addEventListener("load", renderRelatedAnimals());
window.addEventListener("load", NavBar());
