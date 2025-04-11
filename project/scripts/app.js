// function to fetch data
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

// function to create book list items
let currentPage = 1;
const itemsPerPage = 10;
let booksData = [];

function createBookListItem(book) {
    const listItem = document.createElement('div');
    listItem.classList.add('bookListItem');
    listItem.innerHTML = `
        <h2 class="bookName">${book.name}</h2>
        <figure class="bookImage">
            <img src="${book.image}" alt="${book.name}" loading="lazy" width="350px">
            <figcaption class="author">${book.author}</figcaption>
        </figure>
        <p class="genre">${book.genre}</p>
        <p class="price">$ ${book.price}</p>
        <p class="description">${book.description}</p>
        <div class="btnContainer">
            <button class="bookbtn">View</button>
            <button class="addbtn">Add</button>
        </div>`;
    return listItem;
}

//Function to display book details in a modal
function setupBookDetailsModal() {
    document.addEventListener('click', (event) => {
        if (!event.target.classList.contains('bookbtn')) return;

        const bookItem = event.target.closest('.bookListItem');
        const bookName = bookItem.querySelector('.bookName').textContent;
        const bookAuthor = bookItem.querySelector('.author').textContent;
        const bookGenre = bookItem.querySelector('.genre').textContent;
        const bookImage = bookItem.querySelector('img').src;
        const bookDescription = bookItem.querySelector('.description')?.textContent || 'No description available';
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h2>${bookName}</h2>
                <figure>
                    <img src="${bookImage}" alt="${bookName} loading="lazy" width="300px">
                    <figcaption>${bookAuthor}</figcaption>
                </figure>
                <p><strong>Genre:</strong> ${bookGenre}</p>
                <p>${bookDescription}</p>
            </div>
        `;

        document.body.appendChild(modal);

        const closeModal = () => modal.remove();
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    });
}
setupBookDetailsModal();


function renderBooks(page) {
    const bookList = document.querySelector('.bookList');
    bookList.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageBooks = booksData.slice(start, end);
    pageBooks.forEach(book => bookList.appendChild(createBookListItem(book)));
}

function setupPagination() {
    const controls = document.getElementById('pagination-controls');
    controls.innerHTML = '';

    const pageCount = Math.ceil(booksData.length / itemsPerPage);
    for (let i = 1; i <= pageCount; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add('page-btn');
        if (i === currentPage) btn.classList.add('active');

        btn.addEventListener('click', () => {
            currentPage = i;
            renderBooks(currentPage);
            setupPagination();
        });

        controls.appendChild(btn);
    }
}

async function loadBooks() {
    try {
        const data = await fetchData('./data/books.json');
        booksData = data;
        renderBooks(currentPage);
        setupPagination();
    } catch {
        document.querySelector('.bookList').textContent = 'Failed to load books.';
    }
}

// Function to display random books
async function displayRandomBooks() {
    const bookList = document.querySelector('.bookListFiltered');
    try {
        const data = await fetchData('./data/books.json');
        const randomBooks = data.sort(() => 0.5 - Math.random()).slice(0, 4);
        bookList.innerHTML = '';
        randomBooks.forEach(book => bookList.appendChild(createBookListItem(book)));
    } catch {
        bookList.innerHTML = 'Failed to load random books.';
    }
}

// Function to display genres
async function displayGenres() {
    const bookCategory = document.querySelector('.bookGender');
    try {
        const data = await fetchData('./data/books.json');
        const genres = Array.from(new Set(data.map(book => book.genre)));
        const randomGenres = genres.sort(() => 0.5 - Math.random()).slice(0, 4);
        bookCategory.innerHTML = '';

        randomGenres.forEach(genre => {
            const booksInGenre = data.filter(book => book.genre === genre);
            const randomBook = booksInGenre[Math.floor(Math.random() * booksInGenre.length)];
            const genreItem = document.createElement('div');
            genreItem.innerHTML = `
                <figure class="genreImage">
                    <img src="${randomBook.image}" alt="${genre}" loading="lazy" width="350px">
                    <figcaption>${genre}</figcaption>
                </figure>`;
            bookCategory.appendChild(genreItem);
        });
    } catch {
        bookCategory.innerHTML = 'Failed to load genres.';
    }
}

loadBooks();
displayRandomBooks();
displayGenres();

document.addEventListener('click', (event) => {
    if (event.target.classList.contains('addbtn')) {
        const bookItem = event.target.closest('.bookListItem');
        const bookName = bookItem.querySelector('.bookName').textContent;
        const bookPrice = bookItem.querySelector('.price').textContent.replace('$ ', '');
        const bookAuthor = bookItem.querySelector('.author').textContent;

        const cart = JSON.parse(localStorage.getItem('cart')) || {};
        if (cart[bookName]) {
            cart[bookName].quantity += 1;
        } else {
            cart[bookName] = {
                price: parseFloat(bookPrice),
                author: bookAuthor,
                quantity: 1
            };
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        const msg = document.querySelector('.msg');
        msg.innerHTML = `Added ${bookName} to your cart.`;
    }
});

function displayCartDetails() {
    const cartDetails = document.querySelector('.cartDetails');
    const cart = JSON.parse(localStorage.getItem('cart')) || {};

    cartDetails.innerHTML = '';
    if (Object.keys(cart).length === 0) {
        cartDetails.innerHTML = 'Your cart is empty.';
        return;
    }

    const table = document.createElement('table');
    table.classList.add('cartTable');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;
    cartDetails.appendChild(table);

    const tableBody = table.querySelector('tbody');
    Object.entries(cart).forEach(([bookName, details]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${bookName}</td>
            <td>${details.author}</td>
            <td>$${details.price.toFixed(2)}</td>
            <td>${details.quantity}</td>
            <td>$${(details.price * details.quantity).toFixed(2)}</td>
        `;
        tableBody.appendChild(row);
    });

    const grandTotal = Object.values(cart).reduce((sum, item) => {
        return sum + (item.price * item.quantity);
    }, 0);

    const totalRow = document.createElement('tr');
    totalRow.innerHTML = `
        <td colspan="4" style="text-align: right;"><strong>Total:</strong></td>
        <td><strong>$${grandTotal.toFixed(2)}</strong></td>
        `;
    tableBody.appendChild(totalRow);

    const clearBtn = document.createElement('button');
    clearBtn.className = 'clearCartBtn';
    clearBtn.innerHTML = 'Clear Cart';
    clearBtn.addEventListener('click', () => {
        localStorage.removeItem('cart');
        displayCartDetails();
    });

    cartDetails.appendChild(clearBtn);
}

displayCartDetails();

document.querySelector('.clearCartBtn').addEventListener('click', () => {
    localStorage.removeItem('cart');
    displayCartDetails();
});