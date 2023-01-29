// Get the search form and input elements
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

// Add a submit event listener to the form
searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  search();
});

// Add a keydown event listener to the input
searchInput.addEventListener('keydown', function(event) {
  // Check if the user pressed the enter key
  if (event.keyCode === 13) {
    event.preventDefault();
    search();
  }
});

// Define the search function
function search() {
  // Get the user's query from the input
  const query = searchInput.value;

  // Send the query to the back-end using an XMLHttpRequest
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/search');
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xhr.onload = function() {
    if (xhr.status === 200) {
      // Parse the JSON response from the back-end
      const data = JSON.parse(xhr.responseText);

      // Clear the previous search results
      const searchResults = document.getElementById('search-results');
      searchResults.innerHTML = '';

      // Loop through the results and create HTML elements for each one
      data.forEach(function(result) {
        const resultElement = document.createElement('div');
        resultElement.innerHTML = result;
        searchResults.appendChild(resultElement);
      });
    } else {
      console.error('An error occurred:', xhr.status);
    }
  };
  xhr.send(encodeURI('query=' + query));
}
