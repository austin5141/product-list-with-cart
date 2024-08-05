const grid = document.querySelector('.grid')
let quantity = document.querySelector('.quantity')
quantity.innerText = 0
let cart_items = document.querySelector('.cart-content')
let empty_cart = document.querySelector('.empty')
const checkout = document.querySelector('.checkout')
let total = document.querySelector('.total-num')
let sum = 0

const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
})

//Render the page
function page_handler(object) {
    object.forEach(o => {
        
        // Item constructors (page)
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

        // Item constructors (cart)
        const cart_item = document.createElement('div')
        cart_item.classList = 'cart-item'
        const cart_item_name = document.createElement('p')
        cart_item_name.classList = 'cart-item-name'
        const item_info = document.createElement('div')
        item_info.classList = 'item-info'
        const amount_and_price = document.createElement('p')
        const amount_in_cart = document.createElement('span')
        amount_in_cart.classList = 'cart-amount'
        const initial_price = document.createElement('span')
        initial_price.classList = 'initial-price'
        const full_price = document.createElement('span')
        full_price.classList = 'full-price'
        const remove_btn = document.createElement('button')
        

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
        amount.classList = "amount-of-item"
        amount.innerText = 1;
        select_amount.appendChild(amount)
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

        // Add to cart
        cart.addEventListener('click', function() {
            // Make checkout & total visible
            checkout.classList.remove('hidden')

            // Get the item name & price of the item that you added to the cart
            let item_added = this.parentElement.parentElement.querySelector('.item-name').innerText
            const item_price = this.parentElement.parentElement.querySelector('.item-price').innerText.replace(/\$/g, "")

            // Assign the default quantity of the item you picked
            let quantity_of_item = 1

            // Make the quantity selector visible
            this.classList.toggle('hidden')
            select_amount.classList.toggle('hidden')
            quantity.innerText++;
            empty_cart.classList.add('hidden')

            // Add item to cart
            cart_items.appendChild(cart_item)
            cart_item.appendChild(item_info)
            cart_item_name.innerText = item_added
            item_info.appendChild(cart_item_name)
            item_info.appendChild(amount_and_price)
            amount_in_cart.innerText = `${quantity_of_item}x`
            amount_and_price.appendChild(amount_in_cart)
            initial_price.innerText = `@ ${item_price}`
            amount_and_price.appendChild(initial_price)  
            full_price.innerText = `${formatter.format(item_price)}`
            amount_and_price.appendChild(full_price)
            remove_btn.innerText = 'x'
            remove_btn.classList = 'remove-btn'
            cart_item.appendChild(remove_btn)
            // Increase the total cost
            sum += Number(item_price)
            total.innerText = formatter.format(sum)
        })

        // Increment
        increment_btn.addEventListener('click', function() {

            // Get the item name & price of the item that you added to the cart
            let item_added = this.parentElement.parentElement.parentElement.querySelector('.item-name').innerText
            const item_price = this.parentElement.parentElement.parentElement.querySelector('.item-price').innerText.replace(/\$/g, "")

            // Increment the quantity of the item (displayed in the selector)
            amount.innerText++;
            quantity.innerText++;

            // Get all the items that are currently in the cart and loop through until you find the one that matches the item that you incremented
            let items = document.querySelectorAll('.cart-item')
            
            for (i = 0; i < items.length; i++) {
                console.log(i)
                // Increment the quantity of the item (displayed in the cart)
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

        // Decrement
        decrement_btn.addEventListener('click', function() {

            // Make sure that you aren't adding 0 items to the cart
            if (amount.innerText > 1) {

                // Get the item name & price of the item that you removed from the cart
                let item_removed = this.parentElement.parentElement.parentElement.querySelector('.item-name').innerText
                const item_price = this.parentElement.parentElement.parentElement.querySelector('.item-price').innerText.replace(/\$/g, "")

                // Decrement the quantity of the item (displayed in the selector)
                amount.innerText--;
                quantity.innerText--;

                // Get all the items that are currently in the cart and loop through until you find the one that matches the item that you decremented
                let items = document.querySelectorAll('.cart-item')
                for (i = 0; i < items.length; i++) {
                    // Decrement the quantity of the item (displayed in the cart)
                    if (items[i].querySelector('.cart-item-name').innerText == item_removed) {
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

        // Remove from cart
        remove_btn.addEventListener('click', function() {

            let item_cart_amount = Number(this.parentElement.querySelector(".cart-amount").innerText.replace('x', ""))
            let price = Number(this.parentElement.querySelector('.full-price').innerText.replace(/\$/g, ""))
            let item_removed = this.parentElement.querySelector('.cart-item-name').innerText
            let items = document.querySelectorAll('.item')
            
            quantity.innerText = Number(quantity.innerText) - item_cart_amount
            sum -= price
            total.innerText = formatter.format(sum)

            if (quantity.innerText == 0) {
                checkout.classList.add('hidden')
                empty_cart.classList.remove('hidden')
            }
            
            for (i = 0; i < items.length; i++) {
                if (items[i].querySelector('.item-name').innerText == item_removed) {
                    items[i].querySelector('.amount-of-item').innerText = 1
                    items[i].querySelector('.cart').classList.toggle('hidden')
                    items[i].querySelector('.select-amount').classList.toggle('hidden')
                }
            }

            this.parentElement.remove()
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