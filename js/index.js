// Global Variables
const resultFoundNumberEl = document.getElementById('result-found-number');
const booksContainer = document.getElementById('books-container');
const spinner = `
<div class="text-center">
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
</div>
`;

// Load Books
const loadBooks = async (searchText) => {
  resultFoundNumberEl.innerHTML = '';
  booksContainer.innerHTML = spinner;
  const url = `https://openlibrary.org/search.json?q=${searchText}`;
  const res = await fetch(url);
  const data = await res.json();
  displayBooks(data);
};

// Display Books
const displayBooks = ({ docs, numFound }) => {
  resultFoundNumberEl.innerHTML = `<strong>${numFound}</strong> Results Found!`;

  booksContainer.innerHTML = '';
  docs.forEach((book) => {
    const imageUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
    const bookDiv = document.createElement('div');
    bookDiv.className = 'col-md-4 col-lg-3';
    bookDiv.innerHTML = `
    <div class="card">
        ${
          book.cover_i
            ? `<img src="${imageUrl}" class="card-img-top img-thumbnail" 
                alt="${book.title}">`
            : ''
        }
        <div class="card-body">
            <h5 class="card-title"><strong>Title:</strong> ${book.title}</h5>
            ${
              book.author_name
                ? `<p class="card-text mb-2"><strong>Author:</strong> 
                    ${book.author_name.join(', ')}</p>`
                : ''
            }
            ${
              book.publisher
                ? `<p class="card-text mb-2"><strong>Publisher:</strong> 
                    ${book.publisher.join(', ')}</p>`
                : ''
            }
            ${
              book.first_publish_year
                ? `<p class="card-text"><strong>First Publish:</strong> 
                    ${book.first_publish_year}</p>`
                : ''
            }
        </div>
    </div>
    `;
    booksContainer.appendChild(bookDiv);
  });
};

// Handle Search
const handleSearch = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;

  // validate
  if (searchText.trim() === '') {
    alert("Can't be empty!");
    return;
  }

  loadBooks(searchText);

  searchField.value = '';
};

// Search Event
document.getElementById('search-btn').addEventListener('click', handleSearch);
