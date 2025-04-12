import { createBookListItem } from './bookUtils.js';

let currentPage = 1;
const itemsPerPage = 10;
let booksData = [];

export function renderBooks(page) {
    const bookList = document.querySelector('.bookList');
    bookList.innerHTML = '';

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageBooks = booksData.slice(start, end);
    pageBooks.forEach(book => bookList.appendChild(createBookListItem(book)));
}

export function setupPagination() {
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

export function setBooks(data) {
    booksData = data;
}
