# 🌸 How to Manage Products — Bit More Pink

## One-time setup (do this once)

### Step 1 — Make a copy of the template sheet
Open this link and make a copy to your Google account:
👉 *(Create a new Google Sheet from scratch — see columns below)*

Create a Google Sheet with these exact column headers in **Row 1**:

| name | category | description | price | sizes | stock | image | isNew | active |
|---|---|---|---|---|---|---|---|---|

### Step 2 — Publish the sheet
1. In Google Sheets → **File → Share → Publish to web**
2. Under "Link", select **"Entire document"**
3. Under "Embed", change the dropdown to **"Comma-separated values (.csv)"**
4. Click **Publish** → click **OK**
5. Copy the URL it gives you

### Step 3 — Paste the URL into the website
Open `js/products.js` and paste the URL here:
```
const SHEET_URL = "paste-your-url-here";
```
Upload `js/products.js` to S3.

---

## Adding / editing products (everyday use)

Just open your Google Sheet and add or edit rows!

### Column guide:

| Column | What to put | Example |
|---|---|---|
| **name** | Product name | Daisy Dream Co-ord Set |
| **category** | `women` or `kids` | women |
| **description** | Short 1-2 line description | Breezy white co-ord with daisy print |
| **price** | Number, or leave blank for "Enquire to order" | 899 or *(blank)* |
| **sizes** | Sizes separated by `\|` | S\|M\|L\|XL |
| **stock** | Number in stock. `0` = Sold Out | 5 |
| **image** | Filename only (image must be uploaded to S3) | daisy-coordset.jpg |
| **isNew** | `yes` to show "New" badge, otherwise `no` | yes |
| **active** | `yes` to show, `no` to hide without deleting | yes |

### Example row:
```
Daisy Dream Co-ord Set | women | Breezy white co-ord set | 899 | S|M|L | 5 | daisy-coordset.jpg | yes | yes
```

---

## Adding a new product image

1. Upload the image file to your S3 bucket (`store.bitmorepink.in`) inside the `images/` folder
2. Put just the **filename** (e.g. `new-product.jpg`) in the `image` column of your sheet
3. The website will pick it up automatically — no code changes needed!

---

## To hide a product (e.g. out of season)
Set `active` column to `no` — it disappears from the site but stays in your sheet.

## To mark as sold out
Set `stock` to `0` — it shows "Sold Out" badge automatically.

## Changes go live?
Changes appear on the website within a few minutes (Google Sheets caches for ~5 mins).
