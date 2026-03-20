/* ================================================
   BIT MORE PINK — Catalog Loader
   ================================================
   Fetches products from a Google Sheet CSV.
   Falls back to the hardcoded products array in
   products.js if the sheet is unavailable or
   SHEET_URL is not configured.
   ================================================ */

(function () {

  function dispatchReady() {
    document.dispatchEvent(new Event('catalogReady'));
  }

  // No sheet URL configured — use fallback products.js
  if (typeof SHEET_URL === 'undefined' || !SHEET_URL.trim()) {
    dispatchReady();
    return;
  }

  // Show a loading skeleton while fetching
  ['productsGrid', 'featuredGrid'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = '<div class="catalog-loading"><span></span><span></span><span></span><span></span></div>';
  });

  fetch(SHEET_URL + '&t=' + Date.now(), { cache: 'no-store' })
    .then(r => {
      if (!r.ok) throw new Error('Sheet not reachable');
      return r.text();
    })
    .then(csv => {
      const parsed = parseSheet(csv);
      if (parsed.length > 0) {
        window.products = parsed;   // override fallback
      }
      dispatchReady();
    })
    .catch(() => {
      // Silently fall back to products.js
      console.warn('Bit More Pink: Could not load Google Sheet. Using local product list.');
      dispatchReady();
    });

  /* ── Image URL resolver ─────────────────────────── */
  function resolveImage(raw) {
    const src = raw.trim();
    if (!src) return '';

    // Google Drive share link → direct image URL
    // Handles: /file/d/FILE_ID/view  and  /open?id=FILE_ID
    const driveMatch = src.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
    if (driveMatch) {
      return 'https://drive.google.com/uc?export=view&id=' + driveMatch[1];
    }

    // Any other full URL (Cloudinary, S3, etc.) — use as-is
    if (src.startsWith('http')) return src;

    // Plain filename — load from local images/ folder
    return 'images/' + src;
  }

  /* ── CSV Parser ─────────────────────────────────── */
  function parseSheet(csvText) {
    const lines = csvText.trim().split('\n');
    if (lines.length < 2) return [];

    const headers = parseLine(lines[0]).map(h => h.trim().toLowerCase().replace(/\s+/g, ''));
    const results = [];

    for (let i = 1; i < lines.length; i++) {
      const vals = parseLine(lines[i]);
      if (vals.length < 2) continue;

      // Map header → value
      const row = {};
      headers.forEach((h, idx) => { row[h] = (vals[idx] || '').trim(); });

      // Skip blank or inactive rows
      if (!row.name) continue;
      if ((row.active || 'yes').toLowerCase() === 'no') continue;

      // Parse sizes — use | as separator inside the cell to avoid CSV conflicts
      // e.g.  "S|M|L|XL"  or  "Free Size"
      const sizes = row.sizes
        ? row.sizes.split('|').map(s => s.trim()).filter(Boolean)
        : [];

      // Parse price — empty or "0" or "-" = null (enquire to order)
      const rawPrice = row.price || '';
      const price = rawPrice && rawPrice !== '-' && rawPrice !== '0'
        ? parseFloat(rawPrice) || null
        : null;

      results.push({
        id:          i,
        name:        row.name,
        category:    (row.category || 'women').toLowerCase().trim(),
        description: row.description || '',
        image:       resolveImage(row.image || ''),
        price:       price,
        currency:    (typeof CURRENCY !== 'undefined') ? CURRENCY : '₹',
        stock:       parseInt(row.stock) || 0,
        sizes:       sizes,
        isNew:       (row.isnew || row['is new'] || row['is_new'] || 'no').toLowerCase() === 'yes',
      });
    }

    return results;
  }

  /* ── Robust single-line CSV parser (handles quoted fields) ── */
  function parseLine(line) {
    const result = [];
    let cell = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        // Handle escaped quotes ("")
        if (inQuotes && line[i + 1] === '"') { cell += '"'; i++; }
        else { inQuotes = !inQuotes; }
      } else if (ch === ',' && !inQuotes) {
        result.push(cell);
        cell = '';
      } else {
        cell += ch;
      }
    }
    result.push(cell);
    return result;
  }

})();
