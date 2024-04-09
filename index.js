// Sample data - replace this with your actual API or backend integration
const foods = [
    { id: 1, name: 'Apple', caloriesPerServing: 95 },
    { id: 2, name: 'Banana', caloriesPerServing: 105 },
  ];
  
  const comments = [
    { id: 1, text: 'This is a great food!', likes: 10 },
    { id: 2, text: 'I love this food!', likes: 15 },
  ];
  
  // Functions for calculating calories and setting goals
  function calculateCalories() {
    const foodName = document.getElementById('foodName').value;
    const caloriesPerServing = parseInt(document.getElementById('caloriesPerServing').value);
    const servings = parseInt(document.getElementById('servings').value);
    const totalCalories = caloriesPerServing * servings;
    document.getElementById('totalCalories').innerText = `Total Calories: ${totalCalories}`;
  }
  
  function setCalorieGoal() {
    const calorieGoal = parseInt(document.getElementById('calorieGoal').value);
    const totalCalories = /* Calculate total calories */;
    const goalStatus = totalCalories <= calorieGoal ? 'Goal achieved!' : 'Goal exceeded!';
    document.getElementById('goalStatus').innerText = goalStatus;
  }
  
  // Functions for handling comments
  function displayComments() {
    const commentsList = document.getElementById('commentsList');
    commentsList.innerHTML = '';
    comments.forEach(comment => {
      const li = document.createElement('li');
      li.innerText = `${comment.text} - Likes: ${comment.likes}`;
      commentsList.appendChild(li);
    });
  }
  
  function addComment() {
    const commentText = document.getElementById('commentText').value;
    comments.push({ id: comments.length + 1, text: commentText, likes: 0 });
    displayComments();
  }
  
  // Initial function calls
  window.onload = function () {
    displayComments();
  };
  