// Global Variables
const resultFoundNumberEl = document.getElementById('result-found-number');
const booksContainer = document.getElementById('books-container');
// spinner html
const spinner = `
<div class="text-center">
    <div class="spinner-border text-secondary" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>
`;

// Load Books
const loadBooks = async (searchText) => {
  try {
    // display spinner
    booksContainer.innerHTML = spinner;
    // fetch data and display
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayBooks(data);
  } catch (error) {
    alert(error);
  }
};

// Display Books
const displayBooks = ({ docs, numFound }) => {
  // display result found number
  resultFoundNumberEl.innerHTML = `
  <strong>${numFound === 0 ? 'No' : numFound}</strong> Results Found!
  `;

  // clear books container when new data loads
  booksContainer.innerHTML = '';

  // get 20 books
  const books = docs.slice(0, 20);

  // display each book item
  books.forEach((book) => {
    const { cover_i, title, author_name, publisher, first_publish_year } = book;
    const imageUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

    // create book div
    const bookDiv = document.createElement('div');
    bookDiv.className = 'col-md-4 col-lg-3';

    // set inner html of book div
    bookDiv.innerHTML = `
    <div class="card h-100 border-0">
        ${
          cover_i
            ? `<img src="${imageUrl}" class="book-image  card-img-top" 
                alt="${title}">`
            : '<div class="no-image">COVER NOT FOUND!</div>'
        }
        <div class="card-body">
            <h5 class="card-title"><strong>Title:</strong> ${title}</h5>
            ${
              author_name
                ? `<p class="card-text mb-2"><strong>Author:</strong> 
                    ${author_name[0]}</p>`
                : ''
            }
            ${
              publisher
                ? `<p class="card-text mb-2"><strong>Publisher:</strong> 
                    ${publisher[0]}</p>`
                : ''
            }
            ${
              first_publish_year
                ? `<p class="card-text"><strong>First Publish Year:</strong> 
                    ${first_publish_year}</p>`
                : ''
            }
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
    alert("Can't be empty!");
    return;
  }
  // hide result found number
  resultFoundNumberEl.innerHTML = '';

  // load books
  loadBooks(searchText);

  // clear input
  searchField.value = '';
};

// Search Event
document.getElementById('search-btn').addEventListener('click', handleSearch);
