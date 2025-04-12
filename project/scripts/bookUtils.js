export function createBookListItem(book) {
    const listItem = document.createElement('div');
    listItem.classList.add('bookListItem');
    listItem.innerHTML = `
        <h2 class="bookName">${book.name}</h2>
        <figure class="bookImage">
            <img src="${book.image}" alt="${book.name}" loading="lazy" width="350">
            <figcaption class="author">${book.author}</figcaption>
        </figure>
        <p class="genre">${book.genre}</p>
        <p class="price">$ ${book.price}</p>
        <p class="description">${book.description}</p>
        <div class="btnContainer">
            <button class="bookbtn"><img src="./images/list.webp" alt="icoDescription" width="35" height="35"></button>
            <button class="addbtn"><img src="./images/add.webp" alt="icoAdd" width="35" height="35"></button>
        </div>`;
    return listItem;
}
