// Global Variables
const resultFoundNumberEl = document.getElementById('result-found-number');
const booksContainer = document.getElementById('books-container');
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
    // display spinner and hide result found number
    resultFoundNumberEl.innerHTML = '';
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
  resultFoundNumberEl.innerHTML = `
  <strong>${numFound === 0 ? 'No' : numFound}</strong> Results Found!
  `;

  booksContainer.innerHTML = '';
  docs.forEach((book) => {
    const { cover_i, title, author_name, publisher, first_publish_year } = book;
    const imageUrl = `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

    const bookDiv = document.createElement('div');
    bookDiv.className = 'col-md-4 col-lg-3';
    bookDiv.innerHTML = `
    <div class="card h-100">
        ${
          cover_i
            ? `<img src="${imageUrl}" class="card-img-top" 
                alt="${title}">`
            : ''
        }
        <div class="card-body">
            <h5 class="card-title"><strong>Title:</strong> ${title}</h5>
            ${
              author_name
                ? `<p class="card-text mb-2"><strong>Author:</strong> 
                    ${author_name.join(', ')}</p>`
                : ''
            }
            ${
              publisher
                ? `<p class="card-text mb-2"><strong>Publisher:</strong> 
                    ${publisher.join(', ')}</p>`
                : ''
            }
            ${
              first_publish_year
                ? `<p class="card-text"><strong>First Publish:</strong> 
                    ${first_publish_year}</p>`
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

  // if search filed is blank
  if (searchText.trim() === '') {
    alert("Can't be empty!");
    return;
  }

  // load books
  loadBooks(searchText);

  // clear input
  searchField.value = '';
};

// Search Event
document.getElementById('search-btn').addEventListener('click', handleSearch);
