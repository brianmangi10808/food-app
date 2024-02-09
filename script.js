
const commentTextarea = document.getElementById('comment');
const submitButton = document.getElementById('submit');
const commentsList = document.getElementById('comments');

function addComment(event) {
    event.preventDefault();
    const newComment = commentTextarea.value.trim();
    if (newComment !== "") {
        const commentItem = document.createElement('li');
        commentItem.textContent = newComment;
        commentsList.prepend(commentItem); // Add the new comment to the top of the list
        commentTextarea.value = ""; // Clear the textarea
        limitComments(); // Limit the number of displayed comments
    }
}

function limitComments() {
    const comments = commentsList.querySelectorAll('li');
    if (comments.length > 5) {
        commentsList.removeChild(comments[5]); // Remove the oldest comment if more than 5
    }
}

submitButton.addEventListener('click', addComment);


//search meals that matches ingredient




//take  5
document.getElementById("button").addEventListener('click', () => {
    let inputValue = document.getElementById('inputName').value;

    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValue}`)
        .then(response => response.json())
        .then(data => {
            const items = document.getElementById("meal-list");
            items.innerHTML = ""; // Clear the previous content

            if (data.meals === null) { // Use strict comparison for null check
                document.querySelector('.msg').style.display = "block";
            } else {
                document.querySelector('.msg').style.display = "none";
                data.meals.forEach(meal => {
                    let itemDiv = document.createElement('div');
                    itemDiv.className = "m-2 singleitem";
                    itemDiv.setAttribute('onclick', `details(${meal.idMeal})`);
                    let itemInfo = `
                    <div class="card" style="width: 12rem;">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                    <p class="card-text">${meal.strMeal}</p>
                    </div>
                     </div>
                    `;
                    items.innerHTML += itemInfo;
                    items.append(itemDiv);
                });
            }
        })
        .catch(error => console.error('Error fetching data:', error));
});

function details(id) {
    console.log(id);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
        .then(res => res.json())
        .then(data => {
            let meal = data.meals[0]; // Use data.meals instead of detail.meal
            let detailsElement = document.getElementById('details');
            detailsElement.innerHTML = "";
            let detailsDiv = document.createElement('div');
            let detailsInfo = `
            <div class="card" style="width: 12rem;">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
            <p class="card-text">${meal.strMeal}</p>
            <h6>Ingredient</h6>
            <ul>
            <li>${meal.strArea}</li>
            <li>${meal.strCategory}</li>
            <li>${meal.strIngredient1}</li>
            <li>${meal.strIngredient2}</li>
            <li>${meal.strIngredient3}</li>
            <li>${meal.strIngredient4}</li>
            <li>${meal.strIngredient5}</li>
            </ul>
            </div>
            </div>
            `;
            detailsElement.innerHTML = detailsInfo;
            detailsElement.append(detailsDiv); // Append detailsDiv to detailsElement
        })
        .catch(error => console.error('Error fetching details:', error));
}
