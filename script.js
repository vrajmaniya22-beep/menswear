/* ==========================================================================
   Namaskar Men's Wear - Interactive Logic Script
   Features: Products State, Filter Tabs, Wishlist & Cart Counter, Quick View Modal,
             Scroll IntersectionObserver, Tilt Effect, Countdown Ticker, Toast System.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // --- Product Data (Men's Attire Only: Traditional, Indo-Western, Formal, Western) ---
  const products = [
    {
      id: 1,
      name: "Royal Banarasi Silk Kurta Set",
      category: "traditional",
      price: 2499,
      originalPrice: 3499,
      badge: "BESTSELLER",
      badgeClass: "badge-hot",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
      description: "Handcrafted pure banarasi silk kurta pajama with intricate hand-embroidery on the collar and cuffs."
    },
    {
      id: 2,
      name: "Bandhgala Royal Jodhpuri Suit",
      category: "indowestern",
      price: 5999,
      originalPrice: 7499,
      badge: "ROYAL",
      badgeClass: "badge-hot",
      image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=600&q=80",
      description: "Regal Bandhgala Jodhpuri suit featuring custom brass crest buttons and structured shoulders."
    },
    {
      id: 3,
      name: "Italian Slim-Fit Two-Piece Suit",
      category: "formal",
      price: 6499,
      originalPrice: 7999,
      badge: "POPULAR",
      badgeClass: "badge-new",
      image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?auto=format&fit=crop&w=600&q=80",
      description: "Precision-tailored wool-blend formal suit designed for boardrooms, receptions, and galas."
    },
    {
      id: 4,
      name: "Vintage Indigo Denim Jacket",
      category: "western",
      price: 2499,
      originalPrice: 2999,
      badge: "NEW",
      badgeClass: "badge-new",
      image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80",
      description: "Rugged washed raw denim trucker jacket with metallic hardware and contrast stitching."
    },
    {
      id: 5,
      name: "Grand Velvet Zardosi Sherwani",
      category: "traditional",
      price: 9999,
      originalPrice: 12999,
      badge: "WEDDING",
      badgeClass: "badge-hot",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
      description: "Grand wedding sherwani embroidered with gold zardosi motif, complete with matching churidar."
    },
    {
      id: 6,
      name: "Asymmetric Fusion Achkan",
      category: "indowestern",
      price: 4999,
      originalPrice: 5999,
      badge: "SALE",
      badgeClass: "badge-sale",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80",
      description: "Modern overlap front fusion achkan jacket paired with sharp slim-fit trousers."
    },
    {
      id: 7,
      name: "Executive Velvet Dinner Blazer",
      category: "formal",
      price: 4499,
      originalPrice: 5499,
      badge: "HOT",
      badgeClass: "badge-hot",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
      description: "Single-breasted midnight velvet blazer with sleek satin peak lapels."
    },
    {
      id: 8,
      name: "Urban Oversized Streetwear Hoodie",
      category: "western",
      price: 1999,
      originalPrice: 2499,
      badge: "NEW",
      badgeClass: "badge-new",
      image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
      description: "Heavyweight 400GSM organic cotton hoodie with relaxed dropped shoulder profile."
    },
    {
      id: 9,
      name: "Thread-Embroidered Nehru Jacket",
      category: "traditional",
      price: 1999,
      originalPrice: 2499,
      badge: "SALE",
      badgeClass: "badge-sale",
      image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=600&q=80",
      description: "Traditional Modi / Nehru Koti jacket featuring elegant geometric embroidery."
    },
    {
      id: 10,
      name: "Designer Fusion Tuxedo Set",
      category: "indowestern",
      price: 6999,
      originalPrice: 8499,
      badge: "LIMITED",
      badgeClass: "badge-hot",
      image: "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&w=600&q=80",
      description: "Blending Indian necklines with Western tux tailoring for high-profile evening celebrations."
    },
    {
      id: 11,
      name: "Egyptian Cotton Formal Shirt & Trousers",
      category: "formal",
      price: 2499,
      originalPrice: 2999,
      badge: "ESSENTIAL",
      badgeClass: "badge-new",
      image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=600&q=80",
      description: "Wrinkle-resistant crisp cotton formal shirt paired with tapered pleated trousers."
    },
    {
      id: 12,
      name: "100% Pure Linen Casual Shirt",
      category: "western",
      price: 1799,
      originalPrice: 2199,
      badge: "SALE",
      badgeClass: "badge-sale",
      image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80",
      description: "Breathable lightweight linen casual shirt designed for casual outings and weekend comfort."
    }
  ];

  // State
  let wishlist = new Set();
  let cartCount = 0;

  // DOM Elements
  const productsGrid = document.getElementById('productsGrid');
  const wishlistCountEl = document.getElementById('wishlistCount');
  const cartCountEl = document.getElementById('cartCount');
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const quickViewModal = document.getElementById('quickViewModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // --- Render Product Cards ---
  function renderProducts(filterCategory = 'all') {
    if (!productsGrid) return;
    productsGrid.innerHTML = '';

    const filtered = filterCategory === 'all' 
      ? products 
      : products.filter(p => p.category === filterCategory);

    filtered.forEach((product, idx) => {
      const isWishlisted = wishlist.has(product.id);

      const card = document.createElement('div');
      card.className = 'product-card fade-up in-view';
      card.style.transitionDelay = `${(idx % 4) * 0.1}s`;

      card.innerHTML = `
        <div class="product-img-wrap">
          <span class="product-badge ${product.badgeClass}">${product.badge}</span>
          <button class="wishlist-btn ${isWishlisted ? 'active' : ''}" data-id="${product.id}" aria-label="Add to Wishlist">
            <i class="fa-${isWishlisted ? 'solid' : 'regular'} fa-heart"></i>
          </button>
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
          <button class="quick-view-btn" data-id="${product.id}">QUICK VIEW</button>
        </div>
        <div class="product-info">
          <span class="product-category">${product.category.toUpperCase()} SELECTION</span>
          <h4 class="product-name">${product.name}</h4>
          <div class="product-bottom">
            <div class="product-price">
              ₹${product.price.toLocaleString('en-IN')}
              ${product.originalPrice ? `<span class="product-price-original">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            </div>
            <button class="add-cart-btn" data-id="${product.id}" aria-label="Add to Cart">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      `;

      productsGrid.appendChild(card);
    });

    attachProductEvents();
  }

  // --- Event Listeners for Product Actions ---
  function attachProductEvents() {
    // Wishlist Buttons
    document.querySelectorAll('.wishlist-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        if (wishlist.has(id)) {
          wishlist.delete(id);
          btn.classList.remove('active');
          btn.querySelector('i').className = 'fa-regular fa-heart';
          showToast('Removed from Wishlist', 'info');
        } else {
          wishlist.add(id);
          btn.classList.add('active');
          btn.querySelector('i').className = 'fa-solid fa-heart';
          showToast('Added to Wishlist! ❤️', 'success');
        }
        wishlistCountEl.textContent = wishlist.size;
      });
    });

    // Add to Cart Buttons
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        cartCount++;
        cartCountEl.textContent = cartCount;
        showToast('Added to Cart! 🛍️', 'success');
      });
    });

    // Quick View Buttons
    document.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(btn.getAttribute('data-id'));
        openQuickView(id);
      });
    });
  }

  // --- Quick View Modal Functionality ---
  function openQuickView(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modalProductImg').src = product.image;
    document.getElementById('modalProductCat').textContent = `${product.category.toUpperCase()} ATTIRE`;
    document.getElementById('modalProductName').textContent = product.name;
    document.getElementById('modalProductPrice').textContent = `₹${product.price.toLocaleString('en-IN')}`;
    document.getElementById('modalProductDesc').textContent = product.description;

    quickViewModal.classList.add('active');
    quickViewModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickView() {
    quickViewModal.classList.remove('active');
    quickViewModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeQuickView);
  if (quickViewModal) {
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) closeQuickView();
    });
  }

  const modalAddToCartBtn = document.getElementById('modalAddToCartBtn');
  if (modalAddToCartBtn) {
    modalAddToCartBtn.addEventListener('click', () => {
      cartCount++;
      cartCountEl.textContent = cartCount;
      showToast('Added to Shopping Bag! 🛍️', 'success');
      closeQuickView();
    });
  }

  // Size Selector in Modal
  document.querySelectorAll('.size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  // --- Category Filter Tabs ---
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const category = btn.getAttribute('data-filter');
      renderProducts(category);
    });
  });

  // --- Sticky Navbar Scroll Effect ---
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // --- Mobile Drawer Toggle ---
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });
  }

  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('open');
      mobileDrawer.classList.remove('open');
    });
  });

  // --- Toast Notification System ---
  function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'}" style="color: var(--pink);"></i>
      <span>${message}</span>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // --- Newsletter Submission ---
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      if (emailInput && emailInput.value) {
        showToast('Subscribed! Welcome to Namaskar Men\'s Wear 🎉', 'success');
        emailInput.value = '';
      }
    });
  }

  // --- Festival Countdown Timer Ticker ---
  function updateCountdown() {
    const daysEl = document.getElementById('cdDays');
    const hoursEl = document.getElementById('cdHours');
    const minsEl = document.getElementById('cdMins');
    const secsEl = document.getElementById('cdSecs');

    if (!daysEl) return;

    let seconds = parseInt(secsEl.textContent) - 1;
    let minutes = parseInt(minsEl.textContent);
    let hours = parseInt(hoursEl.textContent);
    let days = parseInt(daysEl.textContent);

    if (seconds < 0) {
      seconds = 59;
      minutes--;
    }
    if (minutes < 0) {
      minutes = 59;
      hours--;
    }
    if (hours < 0) {
      hours = 23;
      days--;
    }

    secsEl.textContent = seconds < 10 ? '0' + seconds : seconds;
    minsEl.textContent = minutes < 10 ? '0' + minutes : minutes;
    hoursEl.textContent = hours < 10 ? '0' + hours : hours;
    daysEl.textContent = days < 10 ? '0' + days : days;
  }

  setInterval(updateCountdown, 1000);

  // --- IntersectionObserver Scroll Animations ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // --- Button Ripple Animation Effect ---
  document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(button.clientWidth, button.clientHeight);

      const rect = button.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left}px`;
      circle.style.top = `${e.clientY - rect.top}px`;
      circle.classList.add('ripple');

      const ripple = button.getElementsByClassName('ripple')[0];
      if (ripple) ripple.remove();

      button.appendChild(circle);
    });
  });

  // --- Initial Render ---
  renderProducts('all');
});
