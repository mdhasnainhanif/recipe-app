const searchInput = document.getElementById("searchInput");
const ulGroupRecipe = document.getElementById("ulGroupRecipe");
const ulDetailedRecipe = document.getElementById("ulDetailedRecipe");
const listItem = document.getElementById("listItem");


async function searchQuery() {
  const searchValue = searchInput.value;
  const response = await fetch("./recipes.json");
  const recipeData = await response.json();
  console.log(recipeData);

  const filteredData = recipeData.filter((data) => {
    return data.title.toLowerCase().includes(searchValue) || data.ingredients.join(" ").toLowerCase().includes(searchValue);
  });
  displayData(filteredData);
}

function displayData(filteredData) {
  ulGroupRecipe.innerHTML = "";
  filteredData.forEach((data) => {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML = `
    <h6>${data.title}</h6>
    <div>${data.description}</div>
    `;
    listItem.addEventListener("click", () => {
      showDetail(data);
    });
    ulGroupRecipe.appendChild(listItem);
  });
}

function showDetail(detail) {
  ulDetailedRecipe.innerHTML = `
    <h6>${detail.title}</h6>
    <div>${detail.description}</div>
    <div>
    <h5 class="mt-2">Ingredients</h5>
    ${detail.ingredients
      .map(
        (data) => `
    <div>${data}</div>`
      )
      .join("")}
    </div>
    <h5 class="mt-2">Instructions</h5>
    ${detail.instructions
      .map(
        (data) => `
    <div>${data}</div>`
      )
      .join("")}
    </div>
    `;
}
