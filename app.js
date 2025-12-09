let meals = [];
let editId = null;

const mealList = document.getElementById("mealList");
const search = document.getElementById("search");
const filter = document.getElementById("filter");
const formArea = document.getElementById("formArea");

// Load initial JSON
async function loadData() {
  try {
    const res = await fetch("./meals.json", { cache: "no-store" });
    meals = await res.json();
    render();
  } catch {
    meals = [];
    render();
  }
}

function render() {
  const q = search.value.toLowerCase();
  const typeFilter = filter.value;

  let list = meals.filter(m =>
    m.name.toLowerCase().includes(q) &&
    (typeFilter === "all" || m.type === typeFilter)
  );

  mealList.innerHTML = "";
  document.getElementById("empty").style.display =
    list.length === 0 ? "block" : "none";

  list.forEach(m => {
    const div = document.createElement("div");
    div.className = "meal";
    div.innerHTML = `
      <div>
        <strong>${m.name}</strong> <br>
        <small>${m.type} • ${m.calories} kcal • ${m.eaten ? "EATEN ✔" : "NOT YET"}</small>
      </div>

      <div>
        <button onclick="toggleEaten(${m.id})" class="secondary">
          ${m.eaten ? "Unmark" : "Mark eaten"}
        </button>
        <button onclick="editMeal(${m.id})">Edit</button>
        <button onclick="deleteMeal(${m.id})" class="secondary">Delete</button>
      </div>
    `;
    mealList.appendChild(div);
  });
}

function toggleEaten(id) {
  const m = meals.find(x => x.id === id);
  m.eaten = !m.eaten;
  render();
}

function deleteMeal(id) {
  meals = meals.filter(m => m.id !== id);
  render();
}

document.getElementById("newMeal").onclick = () => {
  editId = null;
  document.getElementById("formTitle").innerText = "Add Meal";
  formArea.style.display = "block";
};

document.getElementById("cancelMeal").onclick = () => {
  formArea.style.display = "none";
};

document.getElementById("saveMeal").onclick = () => {
  const name = document.getElementById("mealName").value.trim();
  const type = document.getElementById("mealType").value;
  const calories = document.getElementById("mealCalories").value;
  const eaten = document.getElementById("mealEaten").checked;

  if (!name || !calories) return alert("Please fill all fields.");

  const meal = { name, type, calories: Number(calories), eaten };

  if (editId) {
    const idx = meals.findIndex(m => m.id === editId);
    meals[idx] = { ...meals[idx], ...meal };
  } else {
    meal.id = Date.now();
    meals.push(meal);
  }

  formArea.style.display = "none";
  render();
};

function editMeal(id) {
  const m = meals.find(x => x.id === id);
  editId = id;

  document.getElementById("formTitle").innerText = "Edit Meal";
  document.getElementById("mealName").value = m.name;
  document.getElementById("mealType").value = m.type;
  document.getElementById("mealCalories").value = m.calories;
  document.getElementById("mealEaten").checked = m.eaten;

  formArea.style.display = "block";
}

// JSON Export
document.getElementById("exportBtn").onclick = () => {
  const blob = new Blob([JSON.stringify(meals, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "meals-export.json";
  link.click();
};

// JSON Import
document.getElementById("importBtn").onclick = () => {
  document.getElementById("importFile").click();
};

document.getElementById("importFile").onchange = e => {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onload = evt => {
    try {
      meals = JSON.parse(evt.target.result);
      render();
    } catch {
      alert("Invalid JSON file.");
    }
  };

  reader.readAsText(file);
};

search.oninput = render;
filter.onchange = render;

// Start
loadData();