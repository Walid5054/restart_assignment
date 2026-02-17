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


function LoadProducts(category){
  
  let url 
  if(category === 'all'){
    url = 'https://fakestoreapi.com/products';
    
  }
  else {
    url = `https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`;
  }
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
    <div class="text-lg font-semibold text-gray-800 leading-snug">
      ${product.title}
    </div>

    <!-- Price -->
    <div class="text-2xl font-bold text-gray-900">
      $109.95
    </div>

    <!-- Buttons -->
    <div class="flex gap-3 pt-2">

      <div class="flex-1 border rounded-xl py-3 text-center text-gray-600 hover:bg-gray-100 cursor-pointer">
        👁 Details
      </div>

      <div class="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl py-3 text-center cursor-pointer">
        🛒 Add
      </div>

    </div>

  </div>

</div>
    `
    productContainer.appendChild(productDiv);
  })
}

loadCatarygory();
// LoadProducts('all');