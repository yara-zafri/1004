# Health Meal Planner

Health Meal Planner is a simple Single Page Application (SPA) that helps users manage their daily meals. The app is fully built with **HTML, CSS, and JavaScript**, and meets all the COMP1004 module requirements, including JSON import and export using flat files.

---

## ✨ Features

- Add, edit, and delete meal  
- Mark Meal as Eaten  
- Export Meals to a JSON file  
- Import Meals from a JSON file  
- Fully interactive SPA  
- Works completely offline (client-side only)

---

## 🛠️ Technologies Used

- **HTML5**  
- **CSS3**  
- **JavaScript (DOM, JSON handling)**  

---

## 📁 Project Structure

/Health Meal Project
│── index.html
│── style.css
│── app.js
│── meals.json
│── README.md


---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/yara-zafri/1004.git
```

2. Run the application

Open the file:
```bash
index.html
```

in any modern browser.
No server setup is required.

📤 Exporting Habits (Save JSON)

Click Export Habits

A file named meals.json will be downloaded

It contains all saved meals in JSON format

📥 Importing Meals (Load JSON)

Click Import Meals

Select any valid JSON habits file

The meal will load automatically into the app

📘 Example JSON File
```bash
[
 {
    "id": 3,
    "name": "Salmon with Rice",
    "type": "Dinner",
    "calories": 600,
    "eaten": false
  },
  {
    "name": "Oatmeal with Fruits 2",
    "type": "Breakfast",
    "calories": 360,
    "eaten": false,
    "id": 1764852223349
  }
]
```

🔮 Future Enhancements

Dark / Light mode

Weekly progress analytics

Meal streak system

Drag-and-drop meal sorting

Auto-save using Local Storage



