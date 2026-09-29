/* ==========================================================================
   Namaskar Men's Wear - Core Script & Interactive Logic
   Proprietor: Jitendra Kalyandas Arora | Location: Bayad, Aravalli, Gujarat
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Verified Product Master Data ---
  const products = [
    {
      id: 1,
      name: "Royal Banarasi Silk Kurta Set",
      category: "traditional",
      price: 2499,
      originalPrice: 3499,
      badge: "Festive Bestseller",
      badgeType: "gold",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=800&q=80",
      description: "Handcrafted pure Banarasi silk kurta with matching churidar. Features intricate hand-stitched thread embroidery along the mandarin collar and cuffs.",
      fabric: "Pure Banarasi Silk & Cotton Lining",
      fit: "Tailored Royal Fit",
      care: "Dry Clean Only"
    },
    {
      id: 2,
      name: "Bandhgala Royal Jodhpuri Suit",
      category: "indowestern",
      price: 5999,
      originalPrice: 7499,
      badge: "Groom's Special",
      badgeType: "crimson",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=800&q=80",
      description: "Regal Bandhgala Jodhpuri jacket featuring custom antique brass crest buttons, padded shoulders, and tapered trousers.",
      fabric: "Silk-Blend Wool Jacquard",
      fit: "Structured Slim Fit",
      care: "Dry Clean Only"
    },
    {
      id: 3,
      name: "Italian Slim-Fit Two-Piece Formal Suit",
      category: "formal",
      price: 6499,
      originalPrice: 7999,
      badge: "Executive Wear",
      badgeType: "dark",
      image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=800&q=80",
      description: "Precision-cut two-piece formal suit featuring notch lapels, flap pockets, and double rear vents for business and receptions.",
      fabric: "Super 120s Wool Blend",
      fit: "Italian Slim Fit",
      care: "Dry Clean Only"
    },
    {
      id: 4,
      name: "Classic Indigo Washed Denim Jacket",
      category: "western",
      price: 2499,
      originalPrice: 2999,
      badge: "Casual Must-Have",
      badgeType: "dark",
      image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80",
      description: "Heavyweight washed raw indigo denim jacket with brass button closure and contrast gold stitching.",
      fabric: "100% Organic Denim Cotton",
      fit: "Regular Fit",
      care: "Machine Wash Cold"
    },
    {
      id: 5,
      name: "Grand Velvet Zardosi Wedding Sherwani",
      category: "traditional",
      price: 9999,
      originalPrice: 12999,
      badge: "Bridal Barat Edition",
      badgeType: "crimson",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80",
      description: "Royal velvet wedding sherwani meticulously embroidered with zari & zardosi motifs across the chest and cuffs.",
      fabric: "Micro-Velvet with Zardosi Work",
      fit: "Bespoke Royal Cut",
      care: "Specialist Dry Clean"
    },
    {
      id: 6,
      name: "Asymmetric Fusion Achkan Jacket",
      category: "indowestern",
      price: 4999,
      originalPrice: 5999,
      badge: "Sangeet Special",
      badgeType: "gold",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
      description: "Contemporary overlap front fusion achkan jacket featuring a sleek asymmetrical button line paired with fitted trousers.",
      fabric: "Raw Silk Blend",
      fit: "Modern Slim Fit",
      care: "Dry Clean Only"
    },
    {
      id: 7,
      name: "Midnight Velvet Peak-Lapel Tuxedo Blazer",
      category: "formal",
      price: 4499,
      originalPrice: 5499,
      badge: "Evening Gala",
      badgeType: "dark",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
      description: "Single-breasted midnight velvet blazer with satin peak lapels and a sleek single-button closure.",
      fabric: "Rich Plush Velvet",
      fit: "Tailored Fit",
      care: "Dry Clean Only"
    },
    {
      id: 8,
      name: "100% Pure Organic Linen Casual Shirt",
      category: "western",
      price: 1799,
      originalPrice: 2199,
      badge: "Summer Essential",
      badgeType: "gold",
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80",
      description: "Breathable pure linen button-down casual shirt with spread collar and curved hem line.",
      fabric: "100% European Flax Linen",
      fit: "Relaxed Fit",
      care: "Gentle Hand Wash"
    }
  ];

  // --- State Management ---
  let wishlist = new Set();
  let cartCount = 0;

  // --- DOM Elements ---
  const productsGrid = document.getElementById('productsGrid');
  const wishlistCountEl = document.getElementById('wishlistCount');
  const cartCountEl = document.getElementById('cartCount');
  const modal = document.getElementById('quickViewModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  
  // Mobile Navigation
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });
  }

  // Render Products into Grid
  function renderProducts(filterCategory = 'all') {
    if (!productsGrid) return;

    const filtered = filterCategory === 'all' 
      ? products 
      : products.filter(p => p.category === filterCategory);

    productsGrid.innerHTML = filtered.map(product => `
      <article class="product-card" data-id="${product.id}">
        <div class="product-img-wrap">
          <img src="${product.image}" alt="${product.name} - Namaskar Men's Wear Bayad" class="product-img" loading="lazy" width="600" height="800">
          <span class="product-badge ${product.badgeType}">${product.badge}</span>
          <button class="wishlist-btn ${wishlist.has(product.id) ? 'active' : ''}" data-id="${product.id}" aria-label="Add to wishlist">
            <i class="${wishlist.has(product.id) ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
          </button>
        </div>
        <div class="product-content">
          <div>
            <div class="product-cat">${product.category.toUpperCase()} WEAR</div>
            <h3 class="product-title">${product.name}</h3>
            <p class="product-desc-snippet">${product.fabric}</p>
            <div class="product-price-row">
              <span class="price-current">₹${product.price.toLocaleString('en-IN')}</span>
              <span class="price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>
            </div>
          </div>
          <div class="product-actions">
            <button class="btn-quickview" data-id="${product.id}">Quick View</button>
            <button class="btn-addcart" data-id="${product.id}">Add To Cart</button>
          </div>
        </div>
      </article>
    `).join('');

    bindProductEvents();
  }

  // Event Handlers for Product Action Buttons
  function bindProductEvents() {
    // Quick View Buttons
    document.querySelectorAll('.btn-quickview').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);
        openQuickViewModal(productId);
      });
    });

    // Add To Cart Buttons
    document.querySelectorAll('.btn-addcart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const productId = parseInt(e.target.dataset.id);
        const product = products.find(p => p.id === productId);
        cartCount++;
        if (cartCountEl) cartCountEl.textContent = cartCount;
        showToast(`Added "${product ? product.name : 'Attire'}" to your shopping bag.`);
      });
    });

    // Wishlist Buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const btnEl = e.currentTarget;
        const productId = parseInt(btnEl.dataset.id);
        if (wishlist.has(productId)) {
          wishlist.delete(productId);
          btnEl.classList.remove('active');
          btnEl.querySelector('i').className = 'fa-regular fa-heart';
          showToast(`Removed from wishlist.`);
        } else {
          wishlist.add(productId);
          btnEl.classList.add('active');
          btnEl.querySelector('i').className = 'fa-solid fa-heart';
          showToast(`Saved to your wishlist!`);
        }
        if (wishlistCountEl) wishlistCountEl.textContent = wishlist.size;
      });
    });
  }

  // Quick View Modal
  function openQuickViewModal(productId) {
    const product = products.find(p => p.id === productId);
    if (!product || !modal) return;

    document.getElementById('modalProductImg').src = product.image;
    document.getElementById('modalProductImg').alt = product.name;
    document.getElementById('modalProductCat').textContent = product.category.toUpperCase() + ' ATTIRE';
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = `₹${product.price.toLocaleString('en-IN')}`;
    document.getElementById('modalProductDesc').textContent = product.description;
    
    // Add Fabric and Fit info to modal if element exists
    const modalDetails = document.querySelector('.modal-details');
    let extraInfo = document.getElementById('modalExtraSpecs');
    if (!extraInfo && modalDetails) {
      extraInfo = document.createElement('div');
      extraInfo.id = 'modalExtraSpecs';
      extraInfo.style.fontSize = '0.85rem';
      extraInfo.style.margin = '12px 0';
      extraInfo.style.color = '#64748B';
      modalDetails.insertBefore(extraInfo, document.querySelector('.size-selector')?.parentNode);
    }
    if (extraInfo) {
      extraInfo.innerHTML = `<strong>Fabric:</strong> ${product.fabric} | <strong>Fit:</strong> ${product.fit}`;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', () => {
      if (modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Filter Buttons Handler
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      filterBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      const filter = e.target.dataset.filter;
      renderProducts(filter);
    });
  });

  // Size Selector Handler inside Modal
  const sizeBtns = document.querySelectorAll('.size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
    });
  });

  // Toast Notification System
  function showToast(message) {
    let container = document.getElementById('toastContainer');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toastContainer';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: var(--gold);"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 3500);
  }

  // Initial Product Render
  renderProducts('all');
});
