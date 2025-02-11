document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(
    ".subtitle"
  ).textContent = `Currently, we have ${countries_data.length} countries`;

  // Set default values for pagination
  recordsPerPage = 5; // Default records per page
  currentPage = 1; // Default starting page

  document.getElementById("recordsPerPage").addEventListener("change", (e) => {
    recordsPerPage = parseInt(e.target.value);
    currentPage = 1; // Reset to first page
    showPopulation();
  });

  document.getElementById("recordsPerPage").addEventListener("change", (e) => {
    recordsPerPage = parseInt(e.target.value);
    currentPage = 1; // Reset to first page
    showLanguage(); 
  });

  showPopulation();
});

let recordsPerPage = 5;
let currentPage = 1;
let currentData = []; // To hold the data being currently displayed (e.g., population or languages)

function showPopulation() {
  currentData = countries_data.sort((a, b) => b.population - a.population);
  displayData();
}

function showLanguage() {
  currentPage = 1;
  currentData = [];
  const languageMap = {};

  countries_data.forEach((country) => {
    country.languages.forEach((lang) => {
      languageMap[lang] = (languageMap[lang] || 0) + 1;
    });
  });

  currentData = Object.entries(languageMap).sort((a, b) => b[1] - a[1]);
  displayData();
}

function displayData() {
  const mainElement = document.querySelector("main");
  clearPreviousData();

  const title = document.createElement("h3");
  title.textContent =
    currentData === countries_data
      ? "All Countries Population"
      : "All Languages";
  mainElement.appendChild(title);

  const start = (currentPage - 1) * recordsPerPage;
  const end = start + recordsPerPage;
  const pageData = currentData.slice(start, end); // Get data for the current page

  const list = document.createElement("ul");
  pageData.forEach((item) => {
    const listItem = document.createElement("li");
    if (Array.isArray(item)) {
      listItem.textContent = `${item[0]}: ${item[1]} countries`;
    } else {
      listItem.textContent = `${item.name}: ${item.population}`;
    }
    list.appendChild(listItem);
  });

  mainElement.appendChild(list);
  updatePageIndicator();
}

function updatePageIndicator() {
  document.getElementById("pageIndicator").textContent = `Page ${currentPage}`;
}

function prevRecords() {
  if (currentPage > 1) {
    currentPage--;
    displayData(); // Update the view with the previous page data
  }
}

function nextRecords() {
  const totalPages = Math.ceil(currentData.length / recordsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    displayData(); // Update the view with the next page data
  }
}

function clearPreviousData() {
  // Remove previous lists 
  document
    .querySelectorAll("main h3, main ul")
    .forEach((element) => element.remove());
}
