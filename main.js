const loadMeals = (searchText) => {
  const mealsUrl = `https://themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
  fetch(mealsUrl)
    .then((res) => res.json())
    .then((data) => displayMeals(data.meals));
};

const displayMeals = (meals) => {
  const containerSection = document.getElementById("meals-container");
  containerSection.innerText = "";
  meals.forEach((meal) => {
    // console.log(meal);
    const containerDiv = document.createElement("div");
    containerDiv.classList.add("col");
    containerDiv.innerHTML = `
      <div class="card">
      <img src=" ${meal.strMealThumb} " class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">
          This is a longer card with supporting text below as a natural
          lead-in to additional content. This content is a little bit
          longer.
        </p>
        <!-- Button trigger modal -->
        <button onclick="loadMealsDetail(${meal.idMeal})"
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#mealDetails"
        >
          Details
        </button>
      </div>
  </div> 
    `;
    containerSection.appendChild(containerDiv);
  });
};
const loadMealsDetail = (idMeal) => {
  // console.log(idMeal);
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayMealsDetails(data.meals[0]))
    .catch((error) => displayMealsDetails(error));
};

// async await
const loadMealsDetail2 = async (idMeal) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMealsDetails(data.meals[0]);
};

const displayMealsDetails = (meal) => {
  document.getElementById("mealDetailsLabel").innerText = meal.strMeal;
  const displayDetailsIs = document.getElementById("modalDetailsBody");
  displayDetailsIs.innerHTML = `
    <img src=" ${meal.strMealThumb} " class="card-img-top" alt="..." />
    `;
};

const searchMeals = () => {
  const searchField = document.getElementById("search-input").value;
  searchField.value = " ";
  // console.log(searchField);
  loadMeals(searchField);
};
loadMeals(`chicken`);
