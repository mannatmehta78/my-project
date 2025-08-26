
# Experiment 6 – Freehand Drawing Tool

This experiment implements a **basic freehand drawing board** where users can draw continuous blue lines by clicking and dragging on an HTML `<canvas>`. Instead of using SVG, the design leverages the **Canvas 2D API** for rendering, combined with simple mouse event handling. The exercise focuses on understanding **coordinate mapping, event-driven drawing, and incremental rendering**, reinforcing practical JavaScript skills at a beginner level.

---

## Components

### **HTML Elements**

* `<div class="drawing-container">` – Wrapper for layout
* `<h1>` – Heading for the experiment
* `<canvas id="drawArea">` – Drawing surface (size: 800×400)

### **JavaScript Concepts**

* `DOMContentLoaded` – Ensures script runs after DOM is ready
* Mouse events: `mousedown`, `mousemove`, `mouseup`, `mouseleave`
* Canvas 2D context methods: `beginPath()`, `moveTo()`, `lineTo()`, `stroke()`
* Coordinate translation with `getBoundingClientRect()`
* State variables (`isDrawing`, `lastX`, `lastY`) to track drawing status

### **CSS Styling**

* Box layout with padding and borders
* Light background for the canvas area
* Responsive canvas that adapts to container width

---

## How It Works

1. **Mouse press (mousedown):** Drawing mode is activated and the starting position is stored.
2. **Mouse move (mousemove):** If drawing mode is active, small line segments are continuously drawn from the last point to the new point.
3. **Mouse release (mouseup) or leaving canvas (mouseleave):** Drawing mode stops.
4. The process can be repeated for multiple strokes.

---

## Event Flow

* **mousedown** → `isDrawing = true`, save start coordinates
* **mousemove** → draw short lines while `isDrawing` is true, update last position
* **mouseup / mouseleave** → set `isDrawing = false`, stop drawing

---

## Core JavaScript

```javascript
window.addEventListener('DOMContentLoaded', function () {
    var canvas = document.getElementById('drawArea');
    var ctx = canvas.getContext('2d');

    var isDrawing = false;
    var lastX = 0, lastY = 0;

    ctx.strokeStyle = '#0b6ebf';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    function getPos(evt) {
        var rect = canvas.getBoundingClientRect();
        return { x: evt.clientX - rect.left, y: evt.clientY - rect.top };
    }

    canvas.addEventListener('mousedown', function (evt) {
        isDrawing = true;
        var p = getPos(evt);
        lastX = p.x;
        lastY = p.y;
    });

    canvas.addEventListener('mousemove', function (evt) {
        if (!isDrawing) return;
        var p = getPos(evt);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        lastX = p.x;
        lastY = p.y;
    });

    function stop() { isDrawing = false; }
    canvas.addEventListener('mouseup', stop);
    canvas.addEventListener('mouseleave', stop);
});
```

---

## Key Points & APIs

* `canvas.getContext('2d')` → activates the drawing context
* `ctx.beginPath() / moveTo() / lineTo() / stroke()` → creates line segments
* `getBoundingClientRect()` → converts mouse positions into canvas coordinates
* `isDrawing` flag → prevents drawing when mouse is not pressed

---

## Comparison With Previous Experiments

| Aspect         | Exp 4: Character Counter | Exp 5: Product Filter  | Exp 6: Drawing Tool |
| -------------- | ------------------------ | ---------------------- | ------------------- |
| User Action    | Typing text              | Selecting dropdown     | Dragging with mouse |
| Data Source    | User text input          | Predefined list items  | Mouse coordinates   |
| DOM Update     | Text count update        | Show/Hide items        | Pixel-level drawing |
| Main Technique | Regex + input events     | Data attributes filter | Canvas 2D API       |

---

## Possible Improvements

* Add a **clear button** to reset the canvas
* Color picker to choose stroke colors
* Adjustable line thickness
* Save the canvas as an image (`toDataURL()`)
* Support for touch events (mobile/tablet drawing)
* Undo/redo functionality (by storing stroke paths)

---

## File Organization

```
Experiment-6/
├── Experiment-6.html   # Canvas and layout
├── styles.css          # Styling rules
├── script.js           # Drawing logic
└── README.md           # Documentation
```

---

## Learning Outcomes

* Practice **continuous mouse event handling**
* Learn **coordinate transformations** from window to canvas space
* Use **basic 2D drawing functions** of the canvas API
* Manage drawing state effectively with flags and last-point storage
* Strengthen the separation of structure (HTML), style (CSS), and logic (JS)

---

