/* ================================================
   BIT MORE PINK — Main JS
   ================================================ */

/* ── Wait for both DOM + catalog to be ready ───── */
let _domReady     = false;
let _catalogReady = false;

document.addEventListener('DOMContentLoaded', () => {
  _domReady = true;
  initNav();
  tryRender();
});

document.addEventListener('catalogReady', () => {
  _catalogReady = true;
  tryRender();
});

function tryRender() {
  if (!_domReady || !_catalogReady) return;

  // ── Render products (shop page) ───────────────
  const grid = document.getElementById('productsGrid');
  if (grid) {
    // Read filter from URL param e.g. shop.html?filter=women
    const urlFilter = new URLSearchParams(window.location.search).get('filter') || 'all';
    renderProducts(urlFilter);
    // Highlight the matching filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === urlFilter);
    });
  }

  // ── Featured strip (homepage) ─────────────────
  const featuredGrid = document.getElementById('featuredGrid');
  if (featuredGrid) renderFeatured(featuredGrid);

  // ── Re-observe any new .reveal elements ───────
  document.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    revealObserver.observe(el);
  });
}

document.addEventListener('DOMContentLoaded', () => {

  // ── Mark active nav link ──────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
    if (link.getAttribute('href') === currentPage) link.classList.add('active');
  });

  // ── Update contact links ──────────────────────
  if (typeof CONTACT !== 'undefined') {
    document.querySelectorAll('[data-contact="instagram"]').forEach(el => {
      el.href = CONTACT.instagram;
      if (!el.target) el.target = '_blank';
    });
    document.querySelectorAll('[data-contact="whatsapp"]').forEach(el => {
      el.href = getWhatsAppURL();
      if (!el.target) el.target = '_blank';
    });
  }

  // ── Filter buttons ────────────────────────────
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(btn.dataset.filter);
    });
  });

});

function initNav() {
  // ── Scroll reveal ─────────────────────────────
  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  // ── Mobile nav toggle ─────────────────────────
  const burger    = document.getElementById('navBurger');
  const mobileNav = document.getElementById('navMobile');
  if (burger && mobileNav) {
    burger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      const open = mobileNav.classList.contains('open');
      burger.setAttribute('aria-expanded', open);
      burger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(4.5px, 4.5px)' : '';
      burger.querySelectorAll('span')[1].style.opacity   = open ? '0' : '1';
      burger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(4.5px, -4.5px)' : '';
    });
    document.addEventListener('click', e => {
      if (!burger.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileNav.classList.remove('open');
      }
    });
  }
}

/* ── Scroll reveal observer ───────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -30px 0px' });



function renderProducts(filter) {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.category === filter);

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="icon">🌸</div>
        <p>No products in this category yet. Check back soon!</p>
      </div>`;
    return;
  }

  grid.innerHTML = filtered.map(p => productCardHTML(p)).join('');

  // Re-observe new cards
  grid.querySelectorAll('.reveal').forEach(el => {
    new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 }).observe(el);
  });
}

function renderFeatured(container) {
  // Show up to 4 new items or random selection
  const featured = products.filter(p => p.isNew && p.stock > 0).slice(0, 4);
  const fallback = featured.length < 4
    ? [...featured, ...products.filter(p => !p.isNew && p.stock > 0)].slice(0, 4)
    : featured;

  container.innerHTML = fallback.map(p => productCardHTML(p)).join('');
}

function productCardHTML(p) {
  const soldOut = p.stock === 0;
  const lowStock = p.stock > 0 && p.stock <= 3;

  // Badge
  let badge = '';
  if (soldOut)        badge = `<span class="product-card__badge badge--sold-out">Sold Out</span>`;
  else if (p.isNew)   badge = `<span class="product-card__badge badge--new">New</span>`;
  else if (lowStock)  badge = `<span class="product-card__badge badge--low">Only ${p.stock} left</span>`;

  const catBadge = `<span class="product-card__badge badge--${p.category}" style="top:auto;bottom:12px;">
    ${p.category === 'women' ? 'Women' : 'Kids'}
  </span>`;

  // Image
  const imageContent = p.image
    ? `<img src="${p.image}" alt="${p.name}" loading="lazy">`
    : `<div class="img-placeholder">
        <span class="ph-icon">🌸</span>
        <span>${p.name}</span>
       </div>`;

  // Price
  const priceHTML = p.price !== null
    ? `<span class="product-card__price">${p.currency || CURRENCY}${Number(p.price).toLocaleString()}</span>`
    : `<span class="product-card__price--dm">Enquire to order</span>`;

  // CTA — rich WhatsApp message with full product details
  const sizesText = p.sizes && p.sizes.length ? p.sizes.join(' / ') : 'One size';
  const priceText = p.price !== null ? `${p.currency || CURRENCY}${Number(p.price).toLocaleString()}` : 'Price on request';
  const waMessage =
`Hi! I'd like to order from Bit More Pink 🌸

*Product:* ${p.name}
*Category:* ${p.category === 'women' ? "Women's Loungewear" : "Kids' Loungewear"}
*Available sizes:* ${sizesText}
*Price:* ${priceText}

Please confirm availability and share payment details. Thank you!`;

  const ctaURL = getWhatsAppURL(waMessage);

  const ctaHTML = soldOut
    ? `<button class="product-card__cta product-card__cta--sold" disabled>Sold Out</button>`
    : `<a href="${ctaURL}" target="_blank" rel="noopener" class="product-card__cta">Order Now</a>`;

  // Sizes
  const sizesHTML = p.sizes && p.sizes.length
    ? `<div class="product-card__sizes">${p.sizes.map(s => `<span class="size-chip">${s}</span>`).join('')}</div>`
    : '';

  return `
    <div class="product-card">
      <div class="product-card__image-wrap">
        ${imageContent}
        ${badge}
        ${catBadge}
      </div>
      <div class="product-card__body">
        <span class="product-card__cat">${p.category === 'women' ? 'Women\'s Loungewear' : 'Kids\' Loungewear'}</span>
        <h3 class="product-card__name">${p.name}</h3>
        <p class="product-card__desc">${p.description}</p>
        ${sizesHTML}
        <div class="product-card__footer">
          ${priceHTML}
          ${ctaHTML}
        </div>
      </div>
    </div>`;
}
