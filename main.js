// מערכים גלובלים שישמשו אותנו בכל העמודים
let visitors = [
  {
    name: "John Smith",
    coins: 50,
    image: "images/U1.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Emily Johnson",
    coins: 50,
    image: "images/U2.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Michael Williams",
    coins: 50,
    image: "images/U3.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Jessica Brown",
    coins: 50,
    image: "images/U4.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Christopher Jones",
    coins: 50,
    image: "images/U5.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Ashley Davis",
    coins: 50,
    image: "images/U6.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Matthew Miller",
    coins: 50,
    image: "images/U7.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Amanda Wilson",
    coins: 50,
    image: "images/U8.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "David Moore",
    coins: 50,
    image: "images/U9.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Sarah Taylor",
    coins: 50,
    image: "images/U10.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "James Anderson",
    coins: 50,
    image: "images/U11.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Jennifer Thomas",
    coins: 50,
    image: "images/U12.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Robert Jackson",
    coins: 50,
    image: "images/U13.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Elizabeth White",
    coins: 50,
    image: "images/U14.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Daniel Harris",
    coins: 50,
    image: "images/U15.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Melissa Martin",
    coins: 50,
    image: "images/U16.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "William Thompson",
    coins: 50,
    image: "images/U17.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Linda Garcia",
    coins: 50,
    image: "images/U18.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Joseph Martinez",
    coins: 50,
    image: "images/U19.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
  {
    name: "Karen Robinson",
    coins: 50,
    image: "images/U20.webp",
    visitedAnimals: [],
    FeededAnimals: [],
  },
];

let animals = [
  {
    name: "Lion",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "images/lion.jpeg",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
    image: "images/eleBaby.png",
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",

    image: "images/Giraffe.jpeg",
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",

    image: "images/tiger.jpeg",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",

    image: "images/monkey.jpeg",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",

    image: "images/Kangaroo.jpeg",
  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "sea",

    image: "images/pinguin.jpeg",
  },
  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",

    image: "images/zebra.jpeg",
  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",

    image: "images/cheeta.jpeg",
  },
];

// פונקציה זו טוענת עבורכם את המידע ההתחלתי של האפליקציה, במידה וקיים מידע בלוקל סטורג׳, היא תקח אותו משם
// אל תשנו את הקוד בפונקציה הזו כדי לשמור על תקינות הטמפלייט
function generateDataset() {
  if (localStorage.getItem("visitors")) {
    visitors = JSON.parse(localStorage.getItem("visitors"));
  } else {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }
  if (localStorage.getItem("animals")) {
    animals = JSON.parse(localStorage.getItem("animals"));
  } else {
    localStorage.setItem("animals", JSON.stringify(animals));
  }
  console.log(visitors);
}
generateDataset();
currentVisitor = JSON.parse(localStorage.getItem("currentVisitor")) || {
  visitedAnimals: [],
};

// נב בר
function NavBar() {
  const template = `
  <img id="HomeBtn" src="images/homebtnnew.png" alt="homecliker" />
  <div class="visitor-dropdown"></div>
  <div class="personalDetails">
  <img class="card-img-visitor" src="${currentVisitor.image}" alt="${currentVisitor.name}"/>
    <p class="VisitorName">Visitor : ${currentVisitor.name}</p>
    <p class="CoinsOfVisitors">Coins : ${currentVisitor.coins}</p>
    <img class="card-img-coin" src="images/coin.webp"  alt="coin photo" />
  </div>
<div id="Btns">
    <button id="resetBtn">
      Reset
    </button>
    <button id="logout">
      logout
    </button>
  </div>
  </div>
  <img id="dashBtn" src="images/dashbtn.png" alt="dashboardcliker" />
`;
  const wrapper = document.createElement("div");
  wrapper.className = "topNavbar";
  wrapper.innerHTML = template;
  const headerElement = document.querySelector("header");
  headerElement.appendChild(wrapper);
  const wrapperToDropDown = document.querySelector(".visitor-dropdown");

  // יצירת דרופדאון של כל האורחים
  function createVisitorDropDown() {
    const visitors = JSON.parse(localStorage.getItem("visitors")) || [];

    const selectLabel = document.createElement("label");
    selectLabel.setAttribute("for", "visitor-select");
    selectLabel.textContent = "Choose a visitor:";

    const select = document.createElement("select");
    select.setAttribute("name", "Visitors");
    select.setAttribute("id", "visitor-select");

    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "--Please choose an option--";
    select.appendChild(defaultOption);

    visitors.forEach((visitor) => {
      const option = document.createElement("option");
      option.value = visitor.name;
      option.textContent = visitor.name;
      select.appendChild(option);
    });

    wrapperToDropDown.appendChild(selectLabel);
    wrapperToDropDown.appendChild(select);
  }

  createVisitorDropDown();
  let resetBtn = document.getElementById("resetBtn");
  resetBtn.addEventListener("click", () => {
    console.log("try to reset");
    localStorage.removeItem("visitors");
    localStorage.removeItem("animals");
    localStorage.removeItem("currentVisitor");
    localStorage.removeItem("PickedAnimal");
    window.location.reload();
  });
  // האירוע של בחירת דמות אחרת בדרופ דאון
  const select = document.getElementById("visitor-select");
  select.addEventListener("change", function () {
    const selectedVisitorName = this.value;
    const selectedVisitor = visitorsForView.find(
      (visitor) => visitor.name === selectedVisitorName
    );
    if (selectedVisitor) {
      currentVisitor = selectedVisitor;
      localStorage.setItem("currentVisitor", JSON.stringify(currentVisitor));
      window.location.reload();
    }
  });

  //לחיצה על כפתור הבית
  document.getElementById("HomeBtn").addEventListener("click", function () {
    window.location.href = "index.html";
  });
  document.getElementById("dashBtn").addEventListener("click", function () {
    window.location.href = "dashboard.html";
  });

  //אירוע התנתקות
  let logoutBTN = document.getElementById("logout");
  logoutBTN.addEventListener("click", () => {
    console.log("try to log out");
    logout();
  });
}

function logout() {
  localStorage.removeItem("currentVisitor");
  alert("You have been logged out.");
  window.location.href = "login.html";
}
