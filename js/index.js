// Global Variables
const foundedResultsQuantityEl = document.getElementById(
  'founded-results-quantity'
);
const booksContainer = document.getElementById('books-container');

// spinner html
const spinner = `
<div class="text-center">
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>
`;

// Load Books
const loadBooks = async (searchText) => {
  try {
    // fetch and display data
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayBooks(data);
  } catch (error) {
    // alert error
    alert(error);
  }
};

// Display Books
const displayBooks = ({ docs, numFound }) => {
  // display founded results quantity
  foundedResultsQuantityEl.innerHTML = `
  <strong>${numFound === 0 ? 'No' : numFound}</strong> Results Found!
  `;

  // clear books container when new data loads
  booksContainer.innerHTML = '';

  // return if founded results quantity is 0
  if (numFound === 0) {
    return;
  }

  // get 20 books
  const books = docs.slice(0, 20);

  // display each book
  books.forEach((book) => {
    const { cover_i, title, author_name, publisher, first_publish_year } = book;

    // generate image url
    const imageUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

    // create book div
    const bookDiv = document.createElement('div');
    bookDiv.className = 'col-md-4 col-lg-3';

    // set inner html of book div
    bookDiv.innerHTML = `
    <div class="card h-100 border-0 rounded-3 overflow-hidden">
        ${
          cover_i
            ? `<img src="${imageUrl}" class="book-image  card-img-top" 
                alt="${title}">`
            : '<div class="no-image">COVER NOT FOUND!</div>'
        }
        <div class="card-body">
            <h5 class="card-title"><strong>Title:</strong> ${title}</h5>
            <p class="card-text mb-2"><strong>Author:</strong> 
                ${author_name ? author_name[0] : ''}
            </p>
            <p class="card-text mb-2"><strong>Publisher:</strong> 
                ${publisher ? publisher[0] : ''}
            </p>
            <p class="card-text"><strong>First Publish Year:</strong> 
                ${first_publish_year ? first_publish_year : ''}
            </p>
        </div>
    </div>
    `;
    // append book div to books container
    booksContainer.appendChild(bookDiv);
  });
};

// Handle Search
const handleSearch = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;

  // if search filed is blank
  if (searchText.trim() === '') {
    alert("Search field can't be empty!");
    return;
  }

  // display spinner and hide founded results quantity
  booksContainer.innerHTML = spinner;
  foundedResultsQuantityEl.innerHTML = '';

  // load books
  loadBooks(searchText);

  // clear input
  searchField.value = '';
};

// Search Event
document.getElementById('search-btn').addEventListener('click', handleSearch);
