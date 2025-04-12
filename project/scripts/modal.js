export function setupBookDetailsModal() {
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
                    <img src="${bookImage}" alt="${bookName}" loading="lazy" width="300px">
                    <figcaption>${bookAuthor}</figcaption>
                </figure>
                <p><strong>Genre:</strong> ${bookGenre}</p>
                <p>${bookDescription}</p>
            </div>
        `;
        document.body.appendChild(modal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
    });
}
