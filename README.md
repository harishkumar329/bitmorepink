# 🌸 Bit More Pink — Website Guide

## How to open the website
Just double-click `index.html` — it opens directly in your browser. No server needed.

---

## How to add / edit products

Open `js/products.js` in any text editor (Notepad, VS Code, etc.) and edit the `products` array.

### Add a new product — copy this template:

```js
{
  id: 13,                          // ← unique number (increment from last)
  name: "Your Product Name",
  category: "women",               // ← "women" or "kids"
  description: "Short description here (1-2 sentences).",
  image: "images/your-photo.jpg",  // ← put your photo in the /images/ folder
  price: 1299,                     // ← number, OR set to null to show "DM to order"
  currency: CURRENCY,              // ← leave as CURRENCY (set once at the top)
  stock: 10,                       // ← number in stock; 0 = shows "Sold Out"
  sizes: ["S", "M", "L", "XL"],   // ← array of sizes, or [] to hide sizes
  isNew: true                      // ← true shows a "New" badge
},
```

### Set price to null (DM to order):
```js
price: null,
```
This will show **"DM to order 💬"** and the Order button will link to Instagram.

### Mark as Sold Out:
```js
stock: 0,
```

### Change currency:
At the very top of `products.js`, change:
```js
const CURRENCY = "₹";  // change to £, $, €, etc.
```

---

## How to add product images

1. Put your image files (JPG, PNG, WebP) inside the `/images/` folder
2. In `products.js`, set the `image` field:
   ```js
   image: "images/my-product.jpg",
   ```
3. Refresh the browser — done!

If `image` is left as `""`, a pink placeholder will show automatically.

---

## How to set up WhatsApp

In `js/products.js`, find this section near the bottom:

```js
const CONTACT = {
  instagram: "https://www.instagram.com/bitmorepink_loungewear/",
  whatsapp:  "",   // ← Add your number here e.g. "919876543210"
  email:     "",
};
```

Enter your WhatsApp number with country code, **no + sign, no spaces**:
- India example: `"919876543210"` (91 = India code, then your 10-digit number)

---

## File structure

```
bit-more-pink/
├── index.html        Homepage
├── shop.html         Shop (all products + filter)
├── about.html        About Us
├── contact.html      Contact Us
├── css/
│   └── styles.css    All styles (colours, layout, fonts)
├── js/
│   ├── products.js   ← EDIT THIS to manage products
│   └── main.js       Website logic (don't need to touch)
└── images/           ← PUT YOUR PRODUCT IMAGES HERE
    └── (your photos go here)
```

---

## Changing brand colours

Open `css/styles.css` and find the `:root` block at the top:

```css
:root {
  --rose:      #C96B8A;   /* main pink — buttons, accents */
  --blush:     #F2C4D0;   /* medium pink */
  --petal:     #FAE8ED;   /* light pink backgrounds */
  --cream:     #FDF8F9;   /* page background */
  --ink:       #2C1A22;   /* dark text */
  ...
}
```

Change any hex colour value to customise the look.
