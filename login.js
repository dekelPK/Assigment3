let currentVisitor = {
  name: "",
  coins: "",
  image: "",
  visitedAnimals: [],
};

let visitorsForView = [...visitors];
const Searchnput = document.querySelector("#search");

function loginAsVisitor(visitorName) {
  let chosenVisitor = visitorsForView.find(
    (visitor) => visitor.name === visitorName
  );
  if (chosenVisitor) {
    currentVisitor.name = chosenVisitor.name;
    currentVisitor.coins = chosenVisitor.coins;
    currentVisitor.image = chosenVisitor.image;

    localStorage.setItem("currentVisitor", JSON.stringify(currentVisitor));
  }
  window.location.href = "zoo.html";
}

// יוצרים את הכרטיסיות של כל המשתמשים
const getVisitorHTMLCard = (visitor) => {
  const template = `
        <img class="card-img-top" src="${visitor.image}" alt="${visitor.name}"/>
          <div class="card-body">
            <p class="card-text">Visitor Name's : ${visitor.name}</p>
            <p class="card-text">Coins : ${visitor.coins}
            <img class="coinLog" src="images/coin.webp"  alt="coin photo" /></p>
            <form id="connectF">
            <button type="submit" id="connect" name="select" >connect</button>
            </form>
          </div>
        </div>`;

  const wrapper = document.createElement("div");
  wrapper.className = "visitor-card";
  wrapper.innerHTML = template;

  const connectButton = wrapper.querySelector("#connect");
  connectButton.addEventListener("click", (event) => {
    event.preventDefault();
    let currentVisitor = localStorage.getItem("currentVisitor");

    if (currentVisitor && currentVisitor !== visitor.name) {
      const confirmDisconnect = confirm(
        "Sorry, there is a guest online now. Do you want to disconnect?"
      );

      if (confirmDisconnect) {
        // המשתמש בחר להתנתק
        loginAsVisitor(visitor.name);
      } else {
        loginAsVisitor(currentVisitor);
        // המשתמש בחר לא להתנתק
        // כאן תוכל להוסיף כל פעולה נוספת או לא לעשות כלום
      }
    }
    // אם לא נכנסנו בכלל לif הראשון
    // זה אומר שהמשתמש הנוכחי ״נקי״ כלומר אף אחד לא מחובר
    else loginAsVisitor(visitor.name);
  });
  return wrapper;
};
// חיפוש משתמש
const getSearchBox = () => {
  const queryInput = document.createElement("input");
  const queryinputDiv = document.getElementById("queryinputDiv");
  queryInput.id = "query-input";
  queryInput.placeholder = "Search visitors...";
  queryInput.className = "form-control my-4";
  queryInput.oninput = (e) => {
    visitorsForView = visitors.filter((visitor) =>
      visitor.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    renderVisitors();
  };
  queryinputDiv.appendChild(queryInput);
  return queryInput;
};

// רינדור
const renderVisitors = () => {
  const VisitorCards = visitorsForView.map(getVisitorHTMLCard);
  const VisitorsPlaceholder = document.getElementById("placeholder");
  VisitorsPlaceholder.innerHTML = "";

  if (!VisitorCards.length) {
    VisitorsPlaceholder.appendChild(getEmptyVisitorsHTMLTemplate());
  }
  VisitorsPlaceholder.append(...VisitorCards);
};

function loadCurrentVisitor() {
  const storedVisitor = JSON.parse(localStorage.getItem("currentVisitor"));

  if (storedVisitor) {
    currentVisitor = { ...storedVisitor };
  }
}

// נטען את המשתמש הנוכחי כאשר העמוד נטען
window.addEventListener("load", loadCurrentVisitor);

document.getElementById("HomeBtn").addEventListener("click", function () {
  window.location.href = "index.html";
});
getSearchBox();

window.addEventListener("load", renderVisitors);
