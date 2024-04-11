// Function to fetch food data from Edamam API
async function fetchFoodData(foodName) {
  const appId = 'e0e7618c'; // Edamam application ID
  const appKey = '9ad7c51a57dec5a76b151d40a51bb250'; // Edamam application key
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
      // Update the textContent directly without the "Calories per Serving:" prefix
      document.getElementById('caloriesPerServing').textContent = `${calories}`;
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
  document.getElementById('totalCalories').textContent = `Total Calories: ${totalCalories}`;

  // Calculate and display calorie difference
  const calorieDifference = totalCalories - calorieGoal;
  if (calorieDifference > 0) {
    document.getElementById('calorieDifference').textContent = `You exceeded your goal by ${calorieDifference} calories.`;
  } else {
    document.getElementById('calorieDifference').textContent = ''; // Clear previous difference if not exceeded
  }
}

// Function to set calorie goal (if needed)

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

// Function to generate unique comment ID
function generateCommentId() {
  return Math.floor(Math.random() * 1000000); // Example ID generation
}

// Function to delete a comment
async function deleteComment(commentId) {
  try {
    // Simulate deletion process
    commentsArray = commentsArray.filter(comment => comment.id !== commentId);
    refreshComments(); // Update the UI after deletion
  } catch (error) {
    console.error('Error deleting comment:', error);
  }
}

// Function to refresh comments section
function refreshComments() {
  const commentsList = document.getElementById('commentsList');
  commentsList.innerHTML = ''; // Clear existing comments

  commentsArray.forEach(comment => {
    const li = document.createElement('li');
    li.textContent = `${comment.text} - ${comment.timestamp}`;
    
    // Add a delete button for each comment
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete-comment-btn'); // Add a class for event handling
    deleteBtn.dataset.commentId = comment.id; // Set data attribute for comment id
    deleteBtn.addEventListener('click', () => {
      deleteComment(comment.id); // Call deleteComment function on button click
    });
    li.appendChild(deleteBtn);

    commentsList.appendChild(li);
  });
}

// Global array to store comments
let commentsArray = [];

// Sample comments for testing (remove in production)
commentsArray.push({ id: 1, text: 'First comment', timestamp: new Date().toLocaleString() });
commentsArray.push({ id: 2, text: 'Second comment', timestamp: new Date().toLocaleString() });
commentsArray.push({ id: 3, text: 'Third comment', timestamp: new Date().toLocaleString() });

// Initialize the comments section with existing comments
refreshComments();

// Add event listener for food name input to update calories per serving
document.getElementById('foodName').addEventListener('change', updateCaloriesPerServing);
