export function setupCart() {
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
            msg.innerHTML = `You added ${bookName} by ${bookAuthor} to your cart.`;
        }
    });
}

export function displayCartDetails() {
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
