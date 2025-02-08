'use strict';

// Element toggle function
const elementToggleFunc = (elem) => elem.classList.toggle("active");

// Sidebar toggle functionality for mobile
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");
sidebarBtn.addEventListener("click", () => elementToggleFunc(sidebar));

// Custom select and filter functionality
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");
const filterItems = document.querySelectorAll("[data-filter-item]");

select.addEventListener("click", () => elementToggleFunc(select));

selectItems.forEach(item => {
  item.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

filterBtn.forEach(btn => {
  btn.addEventListener("click", function () {
    const selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);
    filterBtn.forEach(button => button.classList.remove("active"));
    this.classList.add("active");
  });
});

const filterFunc = (selectedValue) => {
  filterItems.forEach(item => {
    item.style.display = (selectedValue === "all" || selectedValue === item.dataset.category) ? "block" : "none";
  });
};

// Form validation for contact form
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    formBtn.disabled = !form.checkValidity();
  });
});

// Page navigation
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    pages.forEach(page => {
      page.classList.toggle("active", this.innerHTML.toLowerCase() === page.dataset.page);
    });
    navigationLinks.forEach(nav => nav.classList.remove("active"));
    this.classList.add("active");
    window.scrollTo(0, 0);
  });
});

// Experience duration calculation
function calculateDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = endDate === 'present' ? new Date() : new Date(endDate);
  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);

  return years > 0 ? `${years} year${years > 1 ? 's' : ''}` : `${months} month${months > 1 ? 's' : ''}`;
}

function updateDurations() {
  const experiences = [
    { id: 'tokma-duration', start: '2024-08-01', end: 'present' },
    { id: 'inflancer-duration', start: '2022-10-01', end: '2024-08-01' },
    { id: 'yaj-duration', start: '2022-05-01', end: '2022-09-01' }
  ];

  experiences.forEach(exp => {
    const element = document.getElementById(exp.id);
    if (element) {
      const duration = calculateDuration(exp.start, exp.end);
      const formattedStart = new Date(exp.start).toLocaleString('default', { month: 'short', year: 'numeric' });
      const formattedEnd = exp.end === 'present' ? 'Present' : new Date(exp.end).toLocaleString('default', { month: 'short', year: 'numeric' });
      element.textContent = `${formattedStart} — ${formattedEnd} • ${duration}`;
    }
  });
}

updateDurations();

// Filter functionality on DOMContentLoaded
document.addEventListener("DOMContentLoaded", () => {
  const filterButtons = document.querySelectorAll("[data-filter-btn]");
  const projectCards = document.querySelectorAll("[data-filter-item]");

  filterButtons.forEach(button => {
    button.addEventListener("click", function () {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      this.classList.add("active");

      const selectedCategory = this.textContent.toLowerCase();
      projectCards.forEach(card => {
        const cardCategory = card.getAttribute("data-category").toLowerCase();
        card.style.display = (selectedCategory === "all" || cardCategory === selectedCategory) ? "block" : "none";
      });
    });
  });
});
