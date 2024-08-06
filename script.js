const grid = document.querySelector('.grid')
let quantity = document.querySelector('.quantity')
quantity.innerText = 0
let cart_items = document.querySelector('.cart-content')
let empty_cart = document.querySelector('.empty')
const checkout = document.querySelector('.checkout')
let total = document.querySelector('.total-num')
const modal_bg = document.querySelector('.modal-bg')
modal_content = document.querySelector('.modal-content')
modal_items = document.querySelector('.modal-items')
const confirm = document.querySelector('.confirm')

let sum = 0

const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'USD'
})

//Render the page
function page_handler(object) {
    object.forEach(o => {
        
        // Element constructors (page)
        
        // Grid items
        const item = document.createElement('div');
        item.classList = 'item';
        grid.appendChild(item);
        // Dessert images
        const item_img = document.createElement('div');
        const asset_img_desktop = document.createElement('img');
        const asset_img_tablet = document.createElement('img')
        const asset_img_mobile = document.createElement('img')

        item_img.classList = 'item-img';

        asset_img_desktop.classList = 'dessert-photo desktop';
        asset_img_desktop.src = o.image.desktop;

        asset_img_tablet.classList = 'dessert-photo tablet';
        asset_img_tablet.src = o.image.tablet;

        asset_img_mobile.classList = 'dessert-photo mobile';
        asset_img_mobile.src = o.image.mobile;

        // Add to cart
        const cart = document.createElement('button');
        const cart_img = document.createElement('img')
        cart.classList = 'cart'
        cart_img.src = './assets/images/icon-add-to-cart.svg'
        cart.append(cart_img, 'Add to cart')

        // Select amount
        const select_amount = document.createElement('span')
        const decrement_btn = document.createElement('button')
        const decrement_img = document.createElement('img')
        let amount = document.createElement('span')
        const increment_btn = document.createElement('button')
        const increment_img = document.createElement('img')

        select_amount.classList = 'select-amount hidden'
        decrement_btn.classList = 'select-btn decrement'
        decrement_img.src = './assets/images/icon-decrement-quantity.svg'
        increment_btn.classList = 'select-btn increment'
        increment_img.src = './assets/images/icon-increment-quantity.svg'
        decrement_btn.appendChild(decrement_img)
        increment_btn.appendChild(increment_img)
        amount.classList = "amount-of-item"
        amount.innerText = 1;
        select_amount.append(decrement_btn, amount, increment_btn)
        item_img.append(asset_img_desktop, asset_img_tablet, asset_img_mobile, cart, select_amount)

        // Item title
        const item_title = document.createElement('p');
        item_title.classList = 'item-title item-text'
        item_title.innerText = `${o.category}`

        // Item name
        const item_name = document.createElement('p');
        item_name.classList = 'item-name item-text'
        item_name.innerText = `${o.name}`

        // Item price
        const item_price = document.createElement('p')
        item_price.classList = 'item-price item-text'
        item_price.innerText = `${formatter.format(o.price)}`

        item.append(item_img, item_title, item_name, item_price)

        // Button functions

        // Add to cart buttons
        cart.addEventListener('click', function() {

            // Make checkout & total visible
            checkout.classList.remove('hidden')

            // Make the quantity selector visible
            this.classList.toggle('hidden')
            select_amount.classList.toggle('hidden')
            quantity.innerText++;
            empty_cart.classList.add('hidden')

            // Get the item name & price of the item that you added to the cart
            let item_added = this.parentElement.parentElement.querySelector('.item-name').innerText
            const item_price = this.parentElement.parentElement.querySelector('.item-price').innerText.replace(/\$/g, "")

            // Assign the default quantity of the item you picked
            let quantity_of_item = 1

            // Element constructors (cart)

            // Cart item div
            const cart_item = document.createElement('div')
            cart_item.classList = 'cart-item'

            // Cart item info
            const item_info = document.createElement('div')
            item_info.classList = 'item-info'

            // Cart item name
            const cart_item_name = document.createElement('p')
            cart_item_name.classList = 'cart-item-name'
            cart_item_name.innerText = item_added

            // Amount of a given item & item prices
            const amount_and_price = document.createElement('p')
            const amount_in_cart = document.createElement('span')
            amount_in_cart.classList = 'cart-amount'
            amount_in_cart.innerText = `${quantity_of_item}x`
            item_info.append(cart_item_name, amount_and_price)

            const initial_price = document.createElement('span')
            initial_price.classList = 'initial-price'
            const full_price = document.createElement('span')
            full_price.classList = 'full-price'

            initial_price.innerText = `@ ${item_price}`
            full_price.innerText = `${formatter.format(item_price)}`

            amount_and_price.append(amount_in_cart, initial_price, full_price)

            // Remove button
            const remove_btn = document.createElement('button')

            // Add item to cart
            cart_items.appendChild(cart_item)
            remove_btn.innerText = 'x'
            remove_btn.classList = 'remove-btn'
            cart_item.append(item_info, remove_btn)
            remove_btn.addEventListener('click', removeItem)
            
            // Increase the total cost
            sum += Number(item_price)
            total.innerText = formatter.format(sum)
        })

        // Increment buttons
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

        // Decrement buttons
        decrement_btn.addEventListener('click', function() {

            // Make sure that you aren't adding 0 items to the cart
            if (amount.innerText == 1) {
                return
            }

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
        })
    })
}


// Remove item from cart
function removeItem() {

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
}

//Submit order & display the modal

confirm.addEventListener('click', function() {
    const modal_total = document.querySelector('.confirm-total-num')
    modal_total.innerText = formatter.format(sum)
    const cart_items = this.parentElement.parentElement.querySelectorAll('.cart-item')
    const cart_item_names = this.parentElement.parentElement.querySelectorAll('.cart-item-name')
    const cart_amounts = this.parentElement.parentElement.querySelectorAll('.cart-amount')
    const cart_initial_prices = this.parentElement.parentElement.querySelectorAll('.initial-price')
    const cart_full_prices = this.parentElement.parentElement.querySelectorAll('.full-price')

    for (i = 0; i < cart_items.length; i++) {

        const modal_item = document.createElement('div')
        const modal_box = document.createElement('div')
        modal_box.classList = 'modal-box flexbox'
        modal_item.classList = 'modal-item'
        modal_items.appendChild(modal_box)
        const modal_item_name = document.createElement('p')
        modal_item_name.classList = 'modal-cart-item-name'
        const thumbnail = document.createElement('img');
        thumbnail.classList = 'thumbnail'
        fetchThumbnails(modal_item_name, thumbnail)
        modal_item_name.innerText = cart_item_names[i].innerText

        const flexbox = document.createElement('div')
        flexbox.classList = 'flexbox'
        modal_item.append(modal_item_name, flexbox)

        const modal_item_amounts = document.createElement('p')
        modal_item_amounts.innerText = cart_amounts[i].innerText
        modal_item_amounts.classList = 'modal-item-cart-amount'

        const modal_item_initial_price = document.createElement('p')
        modal_item_initial_price.innerText = cart_initial_prices[i].innerText
        modal_item_initial_price.classList = 'modal_item_initial-price'
        flexbox.append(modal_item_amounts, modal_item_initial_price)

        const modal_item_full_price = document.createElement('p')
        modal_item_full_price.innerText = cart_full_prices[i].innerText
        modal_item_full_price.classList = 'modal-item-full-price'
        modal_box.append(thumbnail, modal_item, modal_item_full_price)
    }

    modal_bg.classList.toggle('hidden')
    modal_content.classList.toggle('hidden')
})

modal_bg.addEventListener('click', function() {
    let modal_box = document.querySelectorAll('.modal-box')

    for (i = 0; i < modal_box.length; i++) {
        modal_box[i].remove()
    }

    this.classList.toggle('hidden')
    modal_content.classList.toggle('hidden')
})

// Fetch the Json file & render the page
function renderPage() {
    fetch('data.json')
    .then(response => response.json())
    .then(object => {
        page_handler(object)
    })
}

// Fetch the thumbnails

function fetchThumbnails(modal_item_name, thumbnail) {
    fetch('data.json')
    .then(response => response.json())
    .then(object => {
        object.forEach(o => {
            if (o.name == modal_item_name.innerText) {
                thumbnail.src = o.image.thumbnail
            }
        })
    })
}

renderPage()