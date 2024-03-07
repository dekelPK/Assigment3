let AnimalsForView = [...animals];
currentVisitor = JSON.parse(localStorage.getItem("currentVisitor")) || {
  visitedAnimals: [],
};
currentVisitor.visitedAnimals = currentVisitor.visitedAnimals || [];
visitorsForView = [...visitors];

const getAnimalHTMLCard = (animal) => {
  console.log("Creating card for", animal.name);
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
};

const Searchnput = document.querySelector("#searchInput");

function renderAvailableAnimals() {
  console.log("Rendering available animals...");

  const animalCardsContainer = document.getElementById("animal-cards");
  animalCardsContainer.innerHTML = "";
  const AnimalsCards = AnimalsForView.map(getAnimalHTMLCard);
  animalCardsContainer.append(...AnimalsCards);
}

let PickedAnimal = {
  name: "",
  isPredator: "",
  weight: "",
  height: "",
  color: "",
  habitat: "",
  image: "",
};

document.addEventListener("click", (e) => {
  const animalCard = e.target.closest(".animal-card");
  if (animalCard) {
    const QueryanimalName = animalCard.querySelector("img");
    const animalName = QueryanimalName.alt;
    console.log(animalName);
    visitAnimal(animalName);
  }
});

function visitAnimal(animalName) {
  let chosenAnimal = AnimalsForView.find(
    (animal) => animal.name === animalName
  );
  if (chosenAnimal) {
    PickedAnimal.name = chosenAnimal.name;
    PickedAnimal.isPredator = chosenAnimal.isPredator;
    PickedAnimal.weight = chosenAnimal.weight;
    PickedAnimal.height = chosenAnimal.height;
    PickedAnimal.color = chosenAnimal.color;
    PickedAnimal.habitat = chosenAnimal.habitat;
    PickedAnimal.image = chosenAnimal.image;

    localStorage.setItem("PickedAnimal", JSON.stringify(PickedAnimal));

    // הוספת החיה למערך החיות שהמשתמש ביקר
    visitors.forEach((visitor) => {
      if (visitor.name == currentVisitor.name) {
        visitor.visitedAnimals.push(PickedAnimal.name);
        localStorage.setItem("visitors", JSON.stringify(visitors));
        localStorage.setItem("currentVisitor", JSON.stringify(visitor));
      }
    });

    window.location.href = "animal.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const animalCards = document.querySelectorAll(".animal-card");

  animalCards.forEach((card) => {
    card.addEventListener("click", function () {
      const animalName = this.querySelector(".card-text")
        .textContent.split(":")[1]
        .trim();
      visitAnimal(animalName);
    });
  });

  // קטעים נוספים של ה event listeners והפונקציות האחרות שלך

  renderAvailableAnimals();
});

// פונקציות הפילטור

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
    setFilter("name", this.value);
  });

  const weightInput = document.getElementById("weightInput");
  weightInput.addEventListener("input", function () {
    setFilter("weight", this.value);
  });

  const heightInput = document.getElementById("heightInput");
  heightInput.addEventListener("input", function () {
    setFilter("height", this.value);
  });

  const colorInput = document.getElementById("colorInput");
  colorInput.addEventListener("input", function () {
    setFilter("color", this.value);
  });

  const habitatInput = document.getElementById("habitatInput");
  habitatInput.addEventListener("input", function () {
    setFilter("habitat", this.value);
  });

  const isPredatorInput = document.getElementById("isPredatorSelect");
  isPredatorInput.addEventListener("change", function () {
    setFilter("isPredator", this.value);
  });

  const clearFiltersButton = document.getElementById("clearFiltersButton");
  clearFiltersButton.addEventListener("click", clearFilters);

  // טעינת המסננים המורשים מה־localStorage
  const savedFilters = JSON.parse(localStorage.getItem("savedFilters")) || {};
  Object.keys(savedFilters).forEach((filterKey) => {
    setFilter(filterKey, savedFilters[filterKey]);
  });

  function clearFilters() {
    localStorage.removeItem("savedFilters");
    Filter({});
  }

  renderAvailableAnimals();
});

function setFilter(filterKey, filterValue) {
  // שמירת המסנן הנוכחי ב־localStorage
  const savedFilters = JSON.parse(localStorage.getItem("savedFilters")) || {};
  savedFilters[filterKey] = filterValue;
  localStorage.setItem("savedFilters", JSON.stringify(savedFilters));

  Filter(savedFilters);
}

function Filter(savedFilters) {
  AnimalsForView = animals.filter((animal) => {
    // בדיקה של כל המסננים המורשים
    return Object.keys(savedFilters).every((filterKey) => {
      const filterValue = savedFilters[filterKey];
      switch (filterKey) {
        case "name": {
          document.getElementById("searchInput").value = savedFilters.name;
          return animal.name.toLowerCase().includes(filterValue.toLowerCase());
        }
        case "weight": {
          document.getElementById("weightInput").value = savedFilters.weight;
          return animal.weight.toString().includes(filterValue);
        }
        case "height": {
          document.getElementById("heightInput").value = savedFilters.height;
          return animal.height.toString().includes(filterValue);
        }
        case "color": {
          document.getElementById("colorInput").value = savedFilters.color;
          return animal.color.toString().includes(filterValue);
        }
        case "habitat": {
          document.getElementById("habitatInput").value = savedFilters.habitat;
          return animal.habitat.toString().includes(filterValue);
        }
        case "isPredator": {
          document.getElementById("isPredatorSelect").value =
            savedFilters.isPredator;
          return animal.isPredator.toString() === filterValue;
        }
        default:
          return true;
      }
    });
  });

  renderAvailableAnimals();
}

window.addEventListener("load", renderAvailableAnimals);
window.addEventListener("DOMContentLoaded", NavBar);
