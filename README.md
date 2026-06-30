# ♞ Knight Dispatch (Knight's Tour Route Planner)

Knight Dispatch is an interactive, visually stunning web application that calculates and animates a **Knight's Tour** on a customizable chessboard grid. It showcases a modern dark-themed user interface to simulate, step through, and analyze the route taken by the knight to visit every square exactly once.

---

## ✨ Features

* **Custom Grid Sizes & Coordinates:** Adjust the grid dimensions ($n \times n$) and choose any starting row/column position for the Knight.
* **Warnsdorff's Rule Algorithm:** Uses the Warnsdorff's heuristic for solving the Knight's Tour problem efficiently on various grid sizes.
* **Interactive Step Simulator:** Controls to **Play**, **Pause**, and **Restart** the route animation with smooth transition movements.
* **Movement Logs:** A sidebar list showing the exact order and coordinates of each step in the generated route.
* **Modern Dark Glassmorphic Theme:** Clean, visually outstanding dark interface featuring smooth gradients, responsive layouts, and rich micro-animations.

---

## 🛠️ Tech Stack

* **Frontend:**
  * **HTML5:** Semantic structure.
  * **CSS3:** Custom layouts, gradient backgrounds, and transitions.
  * **JavaScript:** DOM manipulation, simulation controller, and API communication.
* **Backend:**
  * **Java (OpenJDK):** Core server using standard `com.sun.net.httpserver.HttpServer`.
  * **Pathfinding:** Warnsdorff's algorithm implemented in Java with random tie-breaking.

---

## 📂 Project Structure

```
KnightTour/
├── Backend/
│   ├── KnightTour.java     # Core Warnsdorff's algorithm logic
│   ├── Server.java         # Java HTTP server listening on port 8081
│   └── Main.java           # Entrance point (if applicable)
└── Frontend/
    ├── index.html          # Dashboard page
    ├── style.css           # Styling, transitions, and layout
    └── script.js           # Simulator, board rendering, and API fetch
```

---

## 🚀 Getting Started

### 1. Running the Backend (Java)
To start the calculation server:
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Compile the Java files:
   ```bash
   javac Server.java KnightTour.java
   ```
3. Start the server:
   ```bash
   java Server
   ```
   The backend will be running at `http://localhost:8081`.

### 2. Running the Frontend
* Simply open `Frontend/index.html` in your favorite web browser (double-click the file or use an editor's "Live Server" extension).
* Make sure your backend server is running so it can fetch the tour routes!

---

## 🌐 Deployment Options

### Strategy A: Deploying as a Static Web App (Recommended for GitHub Pages)
To host the app completely free on GitHub Pages without requiring a running Java backend:
1. Port the Java logic in `KnightTour.java` to JavaScript inside `Frontend/script.js`.
2. Push only the `Frontend/` folder to GitHub.
3. Turn on **GitHub Pages** under **Settings > Pages** in your repository.

### Strategy B: Deploying with Split Backend
1. Host the Java backend on a service like [Render](https://render.com/) or [Railway](https://railway.app/) using a Dockerfile.
2. Update the API URL inside `Frontend/script.js` from `localhost:8081` to your live backend domain.
3. Host the static Frontend folder on GitHub Pages.
