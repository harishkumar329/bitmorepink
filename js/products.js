/**
 * =====================================================
 *  BIT MORE PINK — Product Catalogue
 *  =====================================================
 *  HOW TO ADD A PRODUCT:
 *  1. Copy any existing product object below
 *  2. Change the fields you need
 *  3. Set price: null  →  shows "DM to order" instead
 *  4. Set stock: 0     →  shows "Sold Out"
 *  5. Add image path in the `image` field (put image
 *     files inside the /images/ folder)
 *
 *  FIELDS:
 *  -------
 *  id          : unique number
 *  name        : product display name
 *  category    : "women" | "kids"
 *  description : short description (1-2 lines)
 *  image       : path to image e.g. "images/prod1.jpg"
 *                Leave as "" to show a placeholder
 *  price       : number e.g. 29.99  OR  null for "DM to order"
 *  currency    : "₹" | "£" | "$" — change to your currency
 *  stock       : number of items in stock (0 = sold out)
 *  sizes       : array of available sizes e.g. ["S","M","L"]
 *                Leave as [] to hide sizes
 *  isNew       : true | false  — shows a "New" badge
 * =====================================================
 */

const CURRENCY = "₹";

/**
 * ── GOOGLE SHEETS CATALOG ──────────────────────────────
 *  Paste your published Google Sheet CSV URL here.
 *  Leave as "" to use the fallback products below instead.
 *
 *  HOW TO GET YOUR URL:
 *  1. Open your Google Sheet
 *  2. File → Share → Publish to web
 *  3. Choose "Entire document" + "Comma-separated values (.csv)"
 *  4. Click Publish → copy the URL → paste below
 * ──────────────────────────────────────────────────────
 */
const SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQEeoPEm5Ifb2kayPfgIscJ_Ie40YaELVCnl7WIuHffuVAkGfRoCgyyIaSvapHLSgBG8nvSBJZQXuWK/pub?gid=0&single=true&output=csv";

var products = [
  // ─── WOMEN ───────────────────────────────────────
  {
    id: 1,
    name: "Daisy Dream Co-ord Set",
    category: "women",
    description: "Breezy white co-ord set with bold blue daisy print. Soft, relaxed fit — perfect for daily wear or as a nightsuit.",
    image: "images/daisy-coordset.jpg",
    price: null,
    currency: CURRENCY,
    stock: 3,
    sizes: ["M"],
    isNew: true
  },
  {
    id: 2,
    name: "Wildflower Lounge Set",
    category: "women",
    description: "Aesthetic & comfortable loungewear with a pretty small-floral print. Perfect for daily wear and as a nightsuit — at prices you can't find elsewhere.",
    image: "images/floral-loungeset.jpg",
    price: null,
    currency: CURRENCY,
    stock: 2,
    sizes: ["XL"],
    isNew: false
  },
  {
    id: 3,
    name: "Pink Polka Sleep Dress",
    category: "women",
    description: "Breezy light pink sleep dress with frill hems and cute polka dots. Fell in love with this prettiest sleepwear!",
    image: "images/pink-sleep-dress.jpg",
    price: null,
    currency: CURRENCY,
    stock: 5,
    sizes: ["S", "M", "L", "XL"],
    isNew: true
  },
  {
    id: 4,
    name: "Tie-Dye Cotton Co-ord Set",
    category: "women",
    description: "100% soft cotton pyjama set in a stunning tie-dye print. Wear it at home, lounge around outside, sleep in it — you'd never want to take them off.",
    image: "images/tiedye-coordset.jpg",
    price: null,
    currency: CURRENCY,
    stock: 5,
    sizes: ["40\" (M-L)"],
    isNew: false
  },
  {
    id: 5,
    name: "Cherry Print Lounge Dress",
    category: "women",
    description: "Cherries 🍒 Flowers 🌸 Frills 🏀 Cotton. Sounds so summer! A prettiest summer lounge dress with frill sleeves and cherry print.",
    image: "images/cherry-lounge-dress.jpg",
    price: null,
    currency: CURRENCY,
    stock: 5,
    sizes: ["S", "M", "L", "XL"],
    isNew: true
  },
  {
    id: 6,
    name: "Summer Prints Shorts Set",
    category: "women",
    description: "Cute printed cotton shorts — hearts, florals & more. Free sized. Perfect for hot days at home or lazy evenings out.",
    image: "images/summer-prints-set.jpg",
    price: null,
    currency: CURRENCY,
    stock: 8,
    sizes: ["Free Size"],
    isNew: true
  },

  // ─── KIDS & BABY ──────────────────────────────────
  {
    id: 7,
    name: "Cutesie Baby Onesie — Peach",
    category: "kids",
    description: "Too cute for a onesie — we call them CUTESIES! Soft, comfortable, non-fussy. The perfect pick for your newborn's wardrobe.",
    image: "images/cutesie-peach.jpg",
    price: null,
    currency: CURRENCY,
    stock: 10,
    sizes: ["Premie", "0-3M", "3-6M"],
    isNew: true
  },
  {
    id: 8,
    name: "Cutesie Baby Onesie — Blue",
    category: "kids",
    description: "Soft, comfy, and made for the sweetest first moments. Gentle on newborn skin and designed for real mom life — easy, cozy, and cute. Perfect baby shower gift!",
    image: "images/cutesie-blue.jpg",
    price: null,
    currency: CURRENCY,
    stock: 8,
    sizes: ["Premie", "0-3M", "3-6M"],
    isNew: true
  },
  {
    id: 9,
    name: "Newborn Organic Co-ord Set",
    category: "kids",
    description: "Softness you can trust for their first 0–6 months. Crafted from the gentlest organic cotton with no itchy seams or fussy buttons. Hospital bag essential or the perfect baby shower gift.",
    image: "images/newborn-coordset.jpg",
    price: null,
    currency: CURRENCY,
    stock: 10,
    sizes: ["0-3M", "3-6M"],
    isNew: false
  },
  {
    id: 10,
    name: "Kids Pyjama Set — Mint",
    category: "kids",
    description: "Girls, Boys, Babies — Age 0–13 years! Soft cotton pyjama set in a fresh mint print with contrast piping. DM us your child's age and we'll help you find the right fit.",
    image: "images/kids-pyjama-mint.jpg",
    price: null,
    currency: CURRENCY,
    stock: 10,
    sizes: ["0-2Y", "2-4Y", "4-6Y", "6-8Y", "8-10Y", "10-13Y"],
    isNew: false
  }
];

// ─── INSTAGRAM & CONTACT CONFIG ──────────────────────
const CONTACT = {
  instagram:  "https://www.instagram.com/bitmorepink_loungewear/",
  whatsapp:   "917259342224",
  email:      "",         // ← Optional
};

// Compose WhatsApp URL
function getWhatsAppURL(message = "Hi! I'm interested in ordering from Bit More Pink 🌸") {
  if (!CONTACT.whatsapp) return CONTACT.instagram;
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

// Compose Instagram DM URL
function getInstaURL() {
  return CONTACT.instagram;
}
