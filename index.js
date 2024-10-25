// - Receive validation errors if:

const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const formEl = document.querySelector(".form-container");
const inputGroups = document.querySelectorAll(".input-group");
const inputFields = document.querySelectorAll("input");
const dayResult = document.getElementById("days-result");
const monthResult = document.getElementById("months-result");
const yearResult = document.getElementById("years-result");

const labels = ["day", "month", "past"];

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const dayInputValue = dayInput.value.trim();
  const monthInputValue = monthInput.value.trim();
  const yearInputValue = yearInput.value.trim();

  const dayInputNumber = dayInputValue ? Number(dayInputValue) : null;
  const monthInputNumber = monthInputValue ? Number(monthInputValue) : null;
  const yearInputNumber = yearInputValue ? Number(yearInputValue) : null;

  const dayErrorHandling = dayInputNumber < 0 || dayInputNumber > 31;
  const monthErrorHandling = monthInputNumber < 0 || monthInputNumber > 12;
  const yearErrorHandling = yearInputNumber > 2024 || yearInputNumber < 1930;

  if (
    dayErrorHandling ||
    monthErrorHandling ||
    yearErrorHandling ||
    (dayInputNumber === 31 && [2, 4, 6, 9, 11].includes(monthInputNumber))
  ) {
    inputGroups.forEach((inputGroup, index) => {
      if (!inputGroup.querySelector(".errorMessage")) {
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("errorMessage");
        errorMessage.style.color = "var(--light-red)";
        errorMessage.style.fontSize = "14px";
        errorMessage.style.fontStyle = "italic";
        errorMessage.textContent = `Must be a valid ${labels[index]}`;
        inputGroup.style.color = "var(--light-red)";
        inputGroup.appendChild(errorMessage);
      }
      inputFields.forEach((inputField) => {
        inputField.style.border = "1px solid var(--light-red)";
      });
    });
  } else {
    inputGroups.forEach((inputGroup) => {
      const errorMessage = inputGroup.querySelector(".errorMessage");
      if (errorMessage) {
        errorMessage.remove();
        inputGroup.style.color = "var(--smokey-Grey)";
      }
      inputFields.forEach((inputField) => {
        inputField.style.border = "1px solid var(--smokey-Grey)";
      });
    });
  }
  const currentDate = new Date();

  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();

  dayResult.textContent = currentDay - dayInputNumber;
  monthResult.textContent = currentMonth - monthInputNumber;
  yearResult.textContent = currentYear - yearInputNumber;
});
