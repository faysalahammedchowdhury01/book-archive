// Global Variables
const booksContainer = document.getElementById('books-container');

// Load Books
const loadBooks = async (searchText) => {
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayBooks(data);
};

// Display Books
const displayBooks = ({ docs }) => {
  console.log(docs[18]);
  docs.forEach((book) => {
    const imageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`;
    const bookDiv = document.createElement('div');
    bookDiv.className = 'col-md-6 col-lg-4';
    bookDiv.innerHTML = `
    <div class="card">
        <img src="${imageUrl}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${book.title} ${
      book.subtitle ? book.subtitle : ''
    }</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
    </div>
    `;
    booksContainer.appendChild(bookDiv);
  });
};

// Handle Search
const handleSearch = () => {
  const searchField = document.getElementById('search-field');
  searchField.value = 'javascript';
  const searchText = searchField.value;

  loadBooks(searchText);
};

// Search Event
document.getElementById('search-btn').addEventListener('click', handleSearch);
