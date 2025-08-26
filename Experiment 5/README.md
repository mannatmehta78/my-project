
---

# Experiment 5 – Dynamic Product Filter

An **interactive web component** that allows users to filter a list of products by category in real time using a `<select>` dropdown. This experiment builds upon the DOM manipulation concepts from **Experiment 4 (Reactive Text Measurement)** and extends them to **conditional content visibility**, with an emphasis on data attributes, efficient element querying, and accessible UI updates.

---

## Components Used

### **HTML Elements**

* `<div class="product-container">` – Main wrapper for the filter and product list
* `<h1>` – Section heading
* `<div class="controls">` – Container for filter controls
* `<label for="categoryFilter">` – Accessible label for the dropdown
* `<select id="categoryFilter">` – Category filter trigger
* `<ul id="productList" aria-live="polite">` – Dynamic results list (announces updates to assistive tech)
* `<li class="product-item" data-category="...">` – Individual product entries with categories

### **JavaScript Techniques**

* **DOMContentLoaded event** – Ensures safe DOM access after parsing
* **Element selection**: `getElementById`, `querySelectorAll`
* **Data attributes** via `getAttribute('data-category')`
* **Event handling**: `change` listener on `<select>`
* **Looping**: classic `for` loop for predictable NodeList iteration
* **Conditional rendering**: toggling `style.display`

### **CSS Techniques**

* Box model for spacing (margin, padding, border)
* Card-style bordered product items
* Flexbox for control layout (`display: flex; gap:`)

---

## Interactive Mechanism

1. On page load, the script caches references to the dropdown and product items.
2. When the filter changes, the selected category is compared to each product’s `data-category`.
3. Items matching the category (or all items if “All” is selected) remain visible. Others are hidden.
4. The filter is applied immediately on load to reflect the default state.

---

## Accessibility

* The product list uses `aria-live="polite"` to hint assistive technologies that content updates are occurring.
* Since items are only hidden or shown (not added/removed), this is a **mild accessibility enhancement**.
* For better support, a status line (e.g., *“Showing 4 of 6 items”*) could be added.

---

## JavaScript – Line-by-Line Walkthrough

```javascript
window.addEventListener('DOMContentLoaded', function () {  
    var select = document.getElementById('categoryFilter'); // Dropdown reference  
    var items = document.querySelectorAll('.product-item'); // All product items  

    function applyFilter() { // Core filtering logic  
        var selected = select.value;  
        for (var i = 0; i < items.length; i++) {  
            var item = items[i];  
            var category = item.getAttribute('data-category');  
            if (selected === 'All' || selected === category) {  
                item.style.display = '';  // Show matching item  
            } else {  
                item.style.display = 'none';  // Hide non-matching item  
            }  
        }  
    }  

    select.addEventListener('change', applyFilter); // Trigger on change  
    applyFilter(); // Initial render  
});  
```

---

## Flow Summary

1. Wait for DOM to load.
2. Cache required elements.
3. Define a reusable filter function.
4. Attach filter logic to dropdown changes.
5. Run once at startup for default state.

---

## Key Logic & APIs

* `select.value` → current selected category
* `querySelectorAll('.product-item')` → select all items at once
* `data-category` attributes → semantic filtering metadata
* `style.display` → simple show/hide mechanism

---

## New / Reinforced Concepts

* Using **data-* attributes*\* for lightweight metadata
* Dropdown-based filtering vs freeform search
* **Separation of concerns**: HTML (structure), CSS (style), JS (behavior)
* Progressive enhancement: works with JavaScript but gracefully degrades (all items visible if JS disabled)

---

## Comparison with Experiment 4

| Aspect              | Experiment 4 (Character Counter) | Experiment 5 (Product Filter) |
| ------------------- | -------------------------------- | ----------------------------- |
| Primary Interaction | Text input events                | Dropdown selection            |
| Core Logic          | Counting characters              | Conditional visibility        |
| Data Source         | User-entered text                | Predefined list items         |
| Accessibility       | Live character count             | Live filtered product list    |
| DOM Updates         | Single text update               | Multiple style toggles        |

---

## Potential Enhancements

* Smooth transitions (fade/slide when hiding/showing)
* Multi-category filtering with checkboxes
* Combined text + category search
* Dynamic product rendering from JSON
* Add a live count summary for accessibility

---

## File Structure

```
Experiment-5/
├── Experiment-5.html   # HTML with filter and products
├── styles.css          # Styling
├── script.js           # Filtering logic
└── README.md           # Documentation
```

---

## Learning Objectives

* Practice DOM element selection and event handling
* Use `data-*` attributes for semantic filtering
* Build accessible, real-time filter interactions
* Strengthen the separation of structure, style, and behavior

---
