# ♞ Knight Dispatch – Knight's Tour Route Planner

> An interactive visualization of the classic **Knight's Tour** problem using **Warnsdorff's Heuristic**, featuring a modern glassmorphic interface, animated route simulation, and configurable chessboard dimensions.
---

## Overview

Knight Dispatch is a full-stack visualization tool that demonstrates the **Knight's Tour**, a well-known combinatorial optimization problem where a knight must visit every square of a chessboard exactly once.

The application allows users to customize the board size and starting position, computes an efficient tour using **Warnsdorff's Rule**, and animates the knight's movement step-by-step through an elegant and responsive user interface.

Whether you're learning graph traversal algorithms or simply exploring chess puzzles, Knight Dispatch provides an intuitive and engaging experience.

---

## Features

### Interactive Chessboard

- Generate customizable **N × N** chessboards
- Select any valid starting position
- Responsive layout dynamically scaling for mobile, laptop, and desktop viewports

### Efficient Knight's Tour Solver

- Implements **Warnsdorff's Heuristic**
- Random tie-breaking to generate different valid tours
- Fast computation even for larger boards

### Route Animation

- Smooth knight movement animations
- Step-by-step visualization
- Play, Pause, and Restart controls
- Adjustable simulation flow

### Move History

- Displays every move in chronological order
- Shows board coordinates for each step
- Highlights the current move during animation

### Modern User Interface & Dialogs

- Glassmorphism-inspired dark theme with responsive sidebars
- Gradient backgrounds and smooth hover transitions
- Custom modal pop-ups for invalid coordinate warnings and route planning failures
- Dynamic layout resizing that keeps elements aligned without scrollbars

---

# Algorithm

The project uses **Warnsdorff's Rule**, a greedy heuristic for solving the Knight's Tour.

### Algorithm Steps

1. Start from the selected square.
2. Find all valid knight moves.
3. Count the number of onward moves for each candidate.
4. Move to the square with the fewest onward moves.
5. Repeat until every square has been visited.

Random tie-breaking is used whenever multiple squares have the same priority, allowing different valid tours to be generated.

---

## Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript (ES6)

### Backend

- Java (OpenJDK)
- Java HTTP Server (`com.sun.net.httpserver.HttpServer`)
- REST-style API for route generation

### Algorithm

- Warnsdorff's Heuristic
- Backtracking support (where applicable)

---

## Project Structure

```
KnightTour/
│
├── Backend/
│   ├── KnightTour.java      # Warnsdorff's algorithm implementation
│   ├── Server.java          # HTTP server
│   └── Main.java            # Entry point (optional)
│
└── Frontend/
    ├── index.html           # Main interface
    ├── style.css            # UI styling
    └── script.js            # Board rendering & API communication
```

---

## Getting Started

### Clone the Repository

```bash
git clone https://github.com/bhavyasanthoshi02/KnightTour.git

cd KnightTour
```

---

## Run the Backend

Navigate to the backend folder:

```bash
cd Backend
```

Compile:

```bash
javac Server.java KnightTour.java
```

Run:

```bash
java Server
```

The backend starts at:

```
http://localhost:8081
```

---

## Run the Frontend

Open:

```
Frontend/index.html
```

or use **VS Code Live Server** for a better development experience.

Ensure the backend is running before starting the frontend.

---

## Application Workflow

1. Enter the board dimensions.
2. Select the knight's starting position.
3. Generate the Knight's Tour.
4. Watch the animated traversal.
5. Pause or restart the simulation anytime.
6. Follow every move through the move history panel.

---

## Highlights

- Interactive algorithm visualization
- Configurable board dimensions
- Smooth animation engine
- Responsive glassmorphic UI
- Java-powered backend
- Efficient heuristic implementation
- Educational and beginner-friendly

---

## Author

**D. Bhavya Santhoshi**

If you found this project useful, consider giving it a ⭐ to support the project.
