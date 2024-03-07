currentVisitor = JSON.parse(localStorage.getItem("currentVisitor")) || {};
visitorsForView = [...visitors];

function showVisitedAnimals() {
  const VisitedAnimalsNames = [];
  let DivVisitedAnimals = document.getElementById("visited-animals");

  currentVisitor.visitedAnimals.forEach((animal) => {
    if (!VisitedAnimalsNames.includes(animal)) {
      VisitedAnimalsNames.push(animal);

      const animalName = document.createElement("p");
      animalName.innerText = animal;
      DivVisitedAnimals.appendChild(animalName);
    }
  });
}
function showFeededAnimals() {
  let FeededAnimalNames = [];
  let DivFeededAnimals = document.getElementById("feeded-animals");
  currentVisitor.FeededAnimals.forEach((animal) => {
    if (!FeededAnimalNames.includes(animal)) {
      FeededAnimalNames.push(animal);

      const animalName = document.createElement("p");
      animalName.innerText = animal;
      DivFeededAnimals.appendChild(animalName);
    }
  });
}
function showFavoriteAnimal() {
  let DivFavoriteAnimal = document.getElementById("favorite-animal");

  // בדיקת האם יש חיות שנבקרו
  if (currentVisitor.visitedAnimals.length === 0) {
    // לא ביקר חיה
    const noVisitedAnimalsMessage = document.createElement("p");
    noVisitedAnimalsMessage.innerText = "No visited animals yet.";
    DivFavoriteAnimal.appendChild(noVisitedAnimalsMessage);
    return;
  }

  // יצירת אובייקט לספירת כמות ההופעות של כל חיה
  const animalCountObject = {};
  currentVisitor.visitedAnimals.forEach((animal) => {
    if (animalCountObject[animal]) {
      animalCountObject[animal]++;
    } else {
      animalCountObject[animal] = 1;
    }
  });

  // מציאת החיה שהופיעה הכי הרבה פעמים
  let favoriteAnimal = null;
  let maxVisits = 0;
  for (const animal in animalCountObject) {
    if (animalCountObject[animal] > maxVisits) {
      maxVisits = animalCountObject[animal];
      favoriteAnimal = animal;
    }
  }

  const favoriteAnimalElement = document.createElement("p");
  favoriteAnimalElement.innerText = `Favorite Animal: ${favoriteAnimal} (${maxVisits} visits)`;
  DivFavoriteAnimal.appendChild(favoriteAnimalElement);
}

const UserName = document.querySelector(".UserName");
UserName.innerText = currentVisitor.name;

window.addEventListener("load", NavBar());
window.addEventListener(
  "load",
  showVisitedAnimals(),
  showFeededAnimals(),
  showFavoriteAnimal()
);
