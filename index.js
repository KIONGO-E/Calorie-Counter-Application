// Function to fetch food data from Edamam API
async function fetchFoodData(foodName) {
    const appId = '5856ecd3'; // Your application ID
    const appKey = 'bc7e4fefc8a3f701d2364c811ef1c0ef'; // Your application key
    const apiUrl = `https://api.edamam.com/api/food-database/v2/parser?ingr=${foodName}&app_id=${appId}&app_key=${appKey}`;
  
    try {
      const response = await fetch(apiUrl, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching food data:', error);
      return null;
    }
  }
  
  // Function to calculate total calories
  function calculateCalories() {
    const foodName = document.getElementById('foodName').value.trim();
    const caloriesPerServing = parseFloat(document.getElementById('caloriesPerServing').value);
    const servings = parseFloat(document.getElementById('servings').value);
  
    if (!foodName || isNaN(caloriesPerServing) || isNaN(servings) || caloriesPerServing <= 0 || servings <= 0) {
      alert('Please enter valid values for Calories per Serving and Servings.');
      return;
    }
  
    const totalCalories = caloriesPerServing * servings;
    document.getElementById('totalCalories').textContent = `Total Calories for ${servings} serving(s) of ${foodName}: ${totalCalories}`;
  }
  
  // Function to set calorie goal
  function setCalorieGoal() {
    const calorieGoal = parseInt(document.getElementById('calorieGoal').value);
  
    if (isNaN(calorieGoal) || calorieGoal <= 0) {
      alert('Please enter a valid positive number for the Calorie Goal.');
      return;
    }
  
    const currentCalories = /* Calculate current calorie intake */;
    const goalStatusElement = document.getElementById('goalStatus');
  
    if (currentCalories <= calorieGoal) {
      goalStatusElement.textContent = `Congratulations! You've met your calorie goal for today.`;
    } else {
      goalStatusElement.textContent = `You've exceeded your calorie goal for today.`;
    }
  }
  
  // Function to add comment
  function addComment() {
    const commentText = document.getElementById('commentText').value.trim();
    const commentsList = document.getElementById('commentsList');
  
    if (!commentText) {
      alert('Please enter a comment.');
      return;
    }
  
    // Create new comment element
    const newComment = document.createElement('li');
    newComment.textContent = commentText;
  
    // Append new comment to the comments list
    commentsList.appendChild(newComment);
  
    // Clear the comment input field
    document.getElementById('commentText').value = '';
  }
  
  // Function to handle form submission and API request
  async function handleFoodSearch(event) {
    event.preventDefault(); // Prevent form submission
  
    const foodName = document.getElementById('foodName').value.trim();
  
    if (!foodName) {
      alert('Please enter a food name.');
      return;
    }
  
    try {
      const foodData = await fetchFoodData(foodName);
      if (foodData) {
        // Process foodData and update UI as needed
        console.log(foodData);
      } else {
        console.error('Failed to fetch food data.');
      }
    } catch (error) {
      console.error('Error handling food search:', error);
    }
  }
  
  // Add event listeners
  document.getElementById('calorieForm').addEventListener('submit', handleFoodSearch);
  document.getElementById('calorieForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    calculateCalories();
  });
  document.getElementById('goalForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    setCalorieGoal();
  });
  document.getElementById('commentForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    addComment();
  });
  