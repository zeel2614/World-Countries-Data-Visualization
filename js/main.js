document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(
    ".subtitle"
  ).textContent = `Currently, we have ${countries_data.length} countries`;
});

function showPopulation() {
  const mainElement = document.querySelector("main");

  // Remove existing list if any
  clearPreviousData();

  const title = document.createElement("h3");
  title.textContent = "All Countries Population";
  mainElement.appendChild(title);

  const topCountries = countries_data;

  const list = document.createElement("ul");

  topCountries.forEach((country) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${country.name}: ${country.population}`;
    list.appendChild(listItem);
  });

  mainElement.appendChild(list);
}

function showLanguage() {
  const mainElement = document.querySelector("main");

  // Remove existing list if any
  clearPreviousData();

  const title = document.createElement("h3");
  title.textContent = "All languages";
  mainElement.appendChild(title);

  // Count occurrences of each language
  const languageMap = {};
  countries_data.forEach((country) => {
    country.languages.forEach((lang) => {
      languageMap[lang] = (languageMap[lang] || 0) + 1;
    });
  });

  const sortedLanguages = Object.entries(languageMap);

  const list = document.createElement("ul");

  sortedLanguages.forEach(([language, count]) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${language}: ${count} countries`;
    list.appendChild(listItem);
  });

  mainElement.appendChild(list);
}

// Function to remove existing lists before adding new content
function clearPreviousData() {
  const existingLists = document.querySelectorAll("main h3, main ul");
  existingLists.forEach((element) => element.remove());
}
