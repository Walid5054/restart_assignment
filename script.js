let count =0;
function loadCatarygory() {
  fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(data => displayCatagory(data))
}
const displayCatagory = (data) => {
  const catagoryContainer = document.getElementById('load-Catagory');
  catagoryContainer.innerHTML = '';
 const allButton = document.createElement('button');
 allButton.textContent = 'All';
 allButton.className = "px-4 py-1.5 text-xs sm:text-sm rounded-full border border-gray-300 text-gray-700 hover:bg-[#007bff] transition";
 allButton.addEventListener('click', () => {LoadProducts('all'); setActiveButton('All')});
 catagoryContainer.appendChild(allButton);


  data.forEach(catagory=>{
    const button = document.createElement('button');
    button.textContent = catagory;
    button.className = "px-4 py-1.5 text-xs sm:text-sm rounded-full border border-gray-300 text-gray-700 hover:bg-[#007bff] transition";
    button.addEventListener('click', () => {LoadProducts(catagory); setActiveButton(catagory)});
    catagoryContainer.appendChild(button);
  })
  setActiveButton('All');
}
function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  count++;
  cartCount.textContent = count;
  if(count > 0) {
    cartCount.classList.remove('hidden');
  }
}


function showProductModal(product) {
  const modalcontainer = document.getElementById('modal-content');
  const mainModal = document.getElementById('product_modal');

  modalcontainer.innerHTML = `
    <div class="flex flex-col md:flex-row gap-6">
      
      <img src="${product.image}" 
           class="w-full md:w-1/3 h-60 object-contain bg-gray-100 p-4 rounded-lg"/>

      <div class="flex-1 space-y-4">
        <h2 class="text-2xl font-bold">${product.title}</h2>
        
        <p class="text-gray-600">
          ${product.description}
        </p>

        <div class="flex justify-between items-center">
          <span class="text-2xl font-bold text-indigo-600">
            $${product.price}
          </span>

          <span class="badge badge-warning">
            ⭐ ${product.rating.rate} (${product.rating.count})
          </span>
        </div>

        <button onclick="updateCartCount()"
          class="btn btn-primary w-full">
          🛒 Add to Cart
        </button>

      </div>
    </div>
  `;
  mainModal.showModal();
}


function setActiveButton(category) {
  const buttons = document.querySelectorAll('#load-Catagory button');
  buttons.forEach(button => {
    if (button.textContent === category) {
      button.classList.add('bg-[#007bff]', 'text-white');
    } else {
      button.classList.remove('bg-[#007bff]', 'text-white');
    }
  });
}

function showSpinner() {
  const container = document.getElementById('load-catagory-content');

  container.innerHTML = `
    <div class="col-span-full flex justify-center items-center py-20">
      <span class="loading loading-spinner text-accent"></span>
    </div>
  `;
}

function Showspinner(){
  document.getElementById('spinner').classList.remove('hidden');
}
function Hidespinner(){
  document.getElementById('spinner').classList.add('hidden');
}

function LoadProducts(category){

  let url 
  if(category === 'all'){
  
    url = 'https://fakestoreapi.com/products';
    
  }

  else {
    url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
  }
    showSpinner();
  fetch(url)
    .then(res => res.json())
    .then(data => displayProducts(data))
 
}
const displayProducts = (data) => {
  const productContainer = document.getElementById('load-catagory-content')
  productContainer.innerHTML = '';
  data.forEach(product=>{
    const productDiv = document.createElement('div');
    productDiv.innerHTML = `
     <div class="w-80 bg-white rounded-2xl object-cover overflow-hidden">

  <!-- Image Section -->
  <div class="bg-gray-100 flex items-center justify-center h-72">
    <img src="${product.image}" alt="${product.title}"
         class="h-60 object-contain" />
  </div>

  <!-- Content Section -->
  <div class="p-5 space-y-4">

    <!-- Category + Rating -->
    <div class="flex justify-between items-center">

      <div class="bg-indigo-100 text-indigo-600 text-sm px-3 py-1 rounded-full">
        ${product.category}
      </div>

      <div class="flex items-center gap-1 text-sm text-gray-500">
        <div class="text-yellow-500">★</div>
        <div>${product.rating.rate} (${product.rating.count})</div>
      </div>

    </div>

    <!-- Title -->
    <div class="text-lg font-semibold text-gray-800 leading-snug line-clamp-2">
      ${product.title}
    </div>

    <!-- Price -->
    <div class="text-2xl font-bold text-gray-900">
      $109.95
    </div>

    <!-- Buttons -->
    <div class="flex gap-3 pt-2">

      <div class="details-btn flex-1 border rounded-xl py-3 text-center text-gray-600 hover:bg-gray-100 cursor-pointer">
        👁 Details
      </div>

      <div class="add-to-cart flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl py-3 text-center cursor-pointer">
        🛒 Add
      </div>

    </div>

  </div>

</div>
    `;
    const detailsButton = productDiv.querySelector('.details-btn');
    detailsButton.addEventListener('click', () => {
      showProductModal(product);
    });
    const addBtn = productDiv.querySelector('.add-to-cart');
    addBtn.addEventListener('click', updateCartCount);
    productContainer.appendChild(productDiv);
    
  })
}

loadCatarygory();
LoadProducts('all');