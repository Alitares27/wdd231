import { fetchData } from './api.js';
import { setupBookDetailsModal } from './modal.js';
import { renderBooks, setupPagination, setBooks } from './pagination.js';
import { createBookListItem } from './bookUtils.js';
import { setupCart, displayCartDetails } from './cart.js';



async function loadBooks() {
    try {
        const data = await fetchData('./data/books.json');
        setBooks(data);
        renderBooks(1);
        setupPagination();
    } catch {
        document.querySelector('.bookList').textContent = 'Failed to load books.';
    }
}

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
setupBookDetailsModal();
setupCart();
displayCartDetails();