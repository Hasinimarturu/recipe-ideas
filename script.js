async function getRecipes() {
    const ingredient = document.getElementById('ingredientInput').value.trim();
    const recipesContainer = document.getElementById('recipesContainer');
    recipesContainer.innerHTML = '';
  
    if (!ingredient) {
      alert('Please enter an ingredient');
      return;
    }
  
    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      const data = await response.json();
  
      if (data.meals === null) {
        recipesContainer.innerHTML = '<p>No recipes found for this ingredient.</p>';
        return;
      }
  
      data.meals.forEach(meal => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
  
        recipeCard.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <a href="https://www.themealdb.com/meal/${meal.idMeal}" target="_blank">View Recipe</a>
        `;
  
        recipesContainer.appendChild(recipeCard);
      });
    } catch (error) {
      console.error('Error fetching recipes:', error);
      recipesContainer.innerHTML = '<p>There was an error loading the recipes.</p>';
    }
  }
  