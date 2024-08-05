const grid = document.querySelector('.grid')
let quantity = document.querySelector('.quantity')
quantity.innerText = 0
let cart_items = document.querySelector('.cart-content')
let empty_cart = document.querySelector('.empty')
let total = document.querySelector('.total-num')
let sum = 0

const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
})

//Render the page
function page_handler(object) {
    object.forEach(o => {
        
        const item = document.createElement('div');

        const item_img = document.createElement('div');
        const asset_img_desktop = document.createElement('img');
        const asset_img_tablet = document.createElement('img')
        const asset_img_mobile = document.createElement('img')

        const cart = document.createElement('button');
        const cart_img = document.createElement('img')

        const select_amount = document.createElement('span')
        const decrement_btn = document.createElement('button')
        const decrement_img = document.createElement('img')
        let amount = document.createElement('span')
        const increment_btn = document.createElement('button')
        const increment_img = document.createElement('img')

        const item_title = document.createElement('p');
        const item_name = document.createElement('p');
        const item_price = document.createElement('p')

        // Grid items
        item.classList = 'item';
        grid.appendChild(item);
        // Dessert images
        item_img.classList = 'item-img';
        item.appendChild(item_img);

        asset_img_desktop.classList = 'dessert-photo desktop';
        asset_img_desktop.src = o.image.desktop;
        item_img.appendChild(asset_img_desktop)

        asset_img_tablet.classList = 'dessert-photo tablet';
        asset_img_tablet.src = o.image.tablet;
        item_img.appendChild(asset_img_tablet)

        asset_img_mobile.classList = 'dessert-photo mobile';
        asset_img_mobile.src = o.image.mobile;
        item_img.appendChild(asset_img_mobile)

        // Add to cart
        cart.classList = 'cart'
        cart_img.src = './assets/images/icon-add-to-cart.svg'
        cart.appendChild(cart_img)
        cart.append('Add to cart')
        item_img.appendChild(cart)

        // Select amount
        select_amount.classList = 'select-amount hidden'
        decrement_btn.classList = 'select-btn decrement'
        decrement_img.src = './assets/images/icon-decrement-quantity.svg'
        increment_btn.classList = 'select-btn increment'
        increment_img.src = './assets/images/icon-increment-quantity.svg'
        select_amount.appendChild(decrement_btn)
        decrement_btn.appendChild(decrement_img)
        increment_btn.appendChild(increment_img)
        amount.innerText = 1;
        select_amount.append(amount)
        select_amount.appendChild(increment_btn)
        item_img.appendChild(select_amount)

        // Item title
        item_title.classList = 'item-title item-text'
        item_title.innerText = `${o.category}`
        item.appendChild(item_title)

        // Item name
        item_name.classList = 'item-name item-text'
        item_name.innerText = `${o.name}`
        item.appendChild(item_name)

        // Item price
        item_price.classList = 'item-price item-text'
        item_price.innerText = `${formatter.format(o.price)}`

        item.appendChild(item_price)

        // Button functions

        cart.addEventListener('click', function() {
            const checkout = document.querySelector('.checkout')
            checkout.classList.remove('hidden')

            let item_added = this.parentElement.parentElement.querySelector('.item-name').innerText
            const item_price = this.parentElement.parentElement.querySelector('.item-price').innerText.replace(/\$/g, "")

            let quantity_of_item = 1

            this.classList.toggle('hidden')
            select_amount.classList.toggle('hidden')
            quantity.innerText++;
            empty_cart.classList.add('hidden')

            const cart_item = document.createElement('div')
            cart_item.classList = 'cart-item'
            cart_items.appendChild(cart_item)

            const item_info = document.createElement('div')
            item_info.classList = 'item-info'
            cart_item.appendChild(item_info)

            const cart_item_name = document.createElement('p')
            cart_item_name.classList = 'cart-item-name'
            cart_item_name.innerText = item_added
            item_info.appendChild(cart_item_name)

            const amount_and_price = document.createElement('p')
            item_info.appendChild(amount_and_price)
            
            const amount = document.createElement('span')
            amount.innerText = `${quantity_of_item}x`
            amount.classList = 'cart-amount'
            amount_and_price.appendChild(amount)
            
            const initial_price = document.createElement('span')
            initial_price.classList = 'initial-price'
            initial_price.innerText = `@ ${item_price}`
            amount_and_price.appendChild(initial_price)

            const full_price = document.createElement('span')
            full_price.innerText = `${formatter.format(item_price)}`
            full_price.classList = 'full-price'
            amount_and_price.appendChild(full_price)

            sum += Number(item_price)
            total.innerText = formatter.format(sum)
        })

        increment_btn.addEventListener('click', function() {
            let item_added = this.parentElement.parentElement.parentElement.querySelector('.item-name').innerText
            const item_price = this.parentElement.parentElement.parentElement.querySelector('.item-price').innerText.replace(/\$/g, "")

            amount.innerText++;
            quantity.innerText++;

            let items = document.querySelectorAll('.cart-item')
            
            for (i = 0; i < items.length; i++) {
                console.log(i)
                if (items[i].querySelector('.cart-item-name').innerText == item_added) {
                    let curr_cart_amount = Number(items[i].querySelector('.cart-amount').innerText.replace('x', ""))
                    assignment = Number(items[i].querySelector('.full-price').innerText.replace(/\$/g, "")) + Number(item_price)
                    items[i].querySelector('.full-price').innerText = formatter.format(assignment)
                    items[i].querySelector('.cart-amount').innerText = curr_cart_amount + 1 + 'x'
                    sum += Number(item_price)
                    total.innerText = formatter.format(sum)
                }
            }
        })

        decrement_btn.addEventListener('click', function() {
            if (amount.innerText > 1) {
                let item_added = this.parentElement.parentElement.parentElement.querySelector('.item-name').innerText
                const item_price = this.parentElement.parentElement.parentElement.querySelector('.item-price').innerText.replace(/\$/g, "")
                amount.innerText--;
                quantity.innerText--;
                let items = document.querySelectorAll('.cart-item')
                for (i = 0; i < items.length; i++) {
                    if (items[i].querySelector('.cart-item-name').innerText == item_added) {
                        let curr_cart_amount = Number(items[i].querySelector('.cart-amount').innerText.replace('x', ""))
                        assignment = Number(items[i].querySelector('.full-price').innerText.replace(/\$/g, "")) - Number(item_price)
                        items[i].querySelector('.full-price').innerText = formatter.format(assignment)
                        items[i].querySelector('.cart-amount').innerText = curr_cart_amount - 1 + 'x'
                        sum -= Number(item_price)
                        total.innerText = formatter.format(sum)
                    }
                }
            }
        })

    })
}

// Fetch the Json file
function fetchJson() {
    fetch('data.json')
    .then(response => response.json())
    .then(object => {
        page_handler(object)
    })
}

fetchJson()