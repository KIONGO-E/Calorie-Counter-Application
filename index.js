
// Function to fetch food data from Edamam API
async function fetchFoodData(foodName) {
  const appId = 'e0e7618c'; // Edamam application ID from .env
  const appKey = '9ad7c51a57dec5a76b151d40a51bb250'; // Edamam application key from .env

  if (!appId || !appKey) {
    console.error('Edamam API credentials not found in environment variables.');
    return null;
  }

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


// Function to update calories per serving based on food input
async function updateCaloriesPerServing() {
  const foodName = document.getElementById('foodName').value.trim();
  if (!foodName) {
    alert('Please enter a food name.');
    return;
  }

  try {
    const foodData = await fetchFoodData(foodName);
    if (foodData && foodData.parsed && foodData.parsed.length > 0) {
      const calories = foodData.parsed[0].food.nutrients.ENERC_KCAL; // Extract calories per serving
      const caloriesPerServingElement = document.getElementById('caloriesPerServing');
      caloriesPerServingElement.textContent = `${calories}`;
      caloriesPerServingElement.classList.add('highlight'); // Add highlight class
    } else {
      document.getElementById('caloriesPerServing').textContent = 'N/A';
      console.error('Food data not found.');
    }
  } catch (error) {
    console.error('Error updating calories:', error);
  }
}

// Function to calculate total calories
function calculateCalories() {
  // Get input values
  const caloriesPerServing = parseFloat(document.getElementById('caloriesPerServing').textContent.trim());
  const servings = parseFloat(document.getElementById('servings').value);
  const calorieGoal = parseFloat(document.getElementById('calorieGoal').value);

  // Check for valid input
  if (isNaN(caloriesPerServing) || isNaN(servings) || isNaN(calorieGoal) || caloriesPerServing <= 0 || servings <= 0 || calorieGoal <= 0) {
    alert('Please enter valid values for Calories per Serving, Servings, and Calorie Goal.');
    return;
  }

  // Calculate total calories
  const totalCalories = caloriesPerServing * servings;
  const totalCaloriesElement = document.getElementById('totalCalories');
  totalCaloriesElement.textContent = `Total Calories: ${totalCalories}`;
  totalCaloriesElement.classList.add('highlight'); // Add highlight class

  // Calculate and display calorie difference
  const calorieDifference = totalCalories - calorieGoal;
  const calorieDifferenceElement = document.getElementById('calorieDifference');
  if (calorieDifference > 0) {
    calorieDifferenceElement.textContent = `You exceeded your goal by ${calorieDifference} calories.`;
  } else {
    calorieDifferenceElement.textContent = ''; // Clear previous difference if not exceeded
  }
  calorieDifferenceElement.classList.add('highlight'); // Add highlight class

  // Update the "Calories per Serving" text tab area
  const caloriesTextTabElement = document.getElementById('caloriesTextTab');
  caloriesTextTabElement.textContent = `Calories per Serving: ${caloriesPerServing}`;
  caloriesTextTabElement.classList.add('highlight'); // Add highlight class
}

// Function to log information
function logInformation() {
  const mealName = document.getElementById('mealName').value.trim();
  const caloriesPerServing = parseFloat(document.getElementById('caloriesPerServing').textContent.trim());
  const servings = parseFloat(document.getElementById('servings').value);
  const totalCalories = caloriesPerServing * servings;

  // Generate log information HTML
  const logInfoHTML = `
    <p>Meal of the Day: ${mealName}</p>
    <p>Total Calories: ${totalCalories}</p>
    <p>Calories per Serving: ${caloriesPerServing}</p>
    <p>You exceeded your goal by ${totalCalories - parseFloat(document.getElementById('calorieGoal').value)} calories.</p>
  `;

  // Display log tab and populate logged information
  const logTab = document.getElementById('logTab');
  const loggedInfoElement = document.getElementById('loggedInfo');
  loggedInfoElement.innerHTML = logInfoHTML;
  logTab.style.display = 'block';
}

// Update calories per serving for meal 1
async function updateCaloriesPerServing1() {
  // Fetch and update calories for meal 1
}

// Calculate calories for meal 1
function calculateCalories1() {
  // Calculate and display calories for meal 1
}

// Log meal information for meal 1
function logMeal1() {
  // Log meal information for meal 1
}

// Function to add comment
function addComment() {
  const commentText = document.getElementById('commentText').value.trim();
  if (!commentText) {
    alert('Please enter a comment.');
    return;
  }

  const newComment = { id: generateCommentId(), text: commentText, timestamp: new Date().toLocaleString() };
  commentsArray.push(newComment);
  refreshComments();
  document.getElementById('commentText').value = ''; // Clear input after adding comment
}

// Function to edit comment
function editComment(commentId) {
  const editedText = prompt('Edit your comment:');
  if (editedText !== null) {
    const commentIndex = commentsArray.findIndex(comment => comment.id === commentId);
    if (commentIndex !== -1) {
      commentsArray[commentIndex].text = editedText;
      refreshComments(); // Update comments UI
    }
  }
}

// Function to delete a comment
function deleteComment(commentId) {
  commentsArray = commentsArray.filter(comment => comment.id !== commentId);
  refreshComments(); // Update the UI after deletion
}

// Function to refresh comments section
function refreshComments() {
  const commentsList = document.getElementById('commentsList');
  commentsList.innerHTML = ''; // Clear existing comments

  commentsArray.forEach(comment => {
    const li = document.createElement('li');
    li.textContent = `${comment.text} - ${comment.timestamp}`;
    
    // Add an edit button for each comment
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit-comment-btn');
    editBtn.dataset.commentId = comment.id;
    editBtn.addEventListener('click', () => {
      editComment(comment.id); // Call editComment function on button click
    });
    li.appendChild(editBtn);

    // Add a delete button for each comment
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-comment-btn');
    deleteBtn.dataset.commentId = comment.id;
    deleteBtn.addEventListener('click', () => {
      deleteComment(comment.id); // Call deleteComment function on button click
    });
    li.appendChild(deleteBtn);

    commentsList.appendChild(li);
  });
}

// Function to generate unique comment ID
function generateCommentId() {
  return Math.floor(Math.random() * 1000000); // Example ID generation
}

// Function to update summary tab
function updateSummary() {
  const mealName = document.getElementById('mealName').value.trim();
  const caloriesPerServing = parseFloat(document.getElementById('caloriesPerServing').textContent.trim());
  const servings = parseFloat(document.getElementById('servings').value);
  const totalCalories = caloriesPerServing * servings;

  const summaryTab = document.getElementById('summaryTab');
  summaryTab.textContent = `Meal of the Day: ${mealName}\nTotal Calories: ${totalCalories}`;

  // Update the "Calories per Serving" text tab area
  document.getElementById('caloriesTextTab').textContent = `Calories per Serving: ${caloriesPerServing}`;
}

// Global array to store comments
let commentsArray = [];

// Initialize the comments section with existing comments
refreshComments();

// Add event listeners
document.getElementById('foodName').addEventListener('change', updateCaloriesPerServing);
document.getElementById('mealName').addEventListener('input', updateSummary);
