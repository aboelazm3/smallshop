async function getAllProducts() {
  try {
    document.querySelector(".myLoader").classList.remove("d-none");
    let res = await fetch("https://dummyjson.com/products/categories");
    let data = await res.json();
    document.querySelector(".myLoader").classList.add("d-none");
    let y =  document.querySelector(".myRow")
    displayAllProducts(data , y );
  } catch (error) {
    console.log(error);
    document.querySelector(".myLoader").classList.add("d-none");
  }
}
function displayAllProducts(x , y) {
  cartona = ``;
  for (let i = 0; i < x.length; i++) {
    cartona += `
                <div class="col-md-4 category">
                    <div class="inner  card text-center bg-black text-white">
                        <h3>${x[i].slug.toUpperCase()}</h3>
                    </div>
                </div>
        `;
  }
  
  y.innerHTML = cartona;

  let categories = document.querySelectorAll(".category");
  for (let i = 0; i < categories.length; i++) {
    categories[i].addEventListener("click", () => {
      console.log(categories[i].innerText);

      localStorage.setItem("categryName", categories[i].innerText);
      location.href = "../product.html";
    });
  }
}

if (location.href.includes("index.html")) {
  getAllProducts();
}

async function productNfso(categryName) {
  try {
    document.querySelector(".myLoader").classList.remove("d-none");
    let res = await fetch(
      `https://dummyjson.com/products/category/${categryName}`
    );
    let data = await res.json();
    document.querySelector(".myLoader").classList.add("d-none");
    let product = data.products;
    let y = document.querySelector("#rowProducts")
    displayProduct(product  , y );

  } catch (error) {
    console.log(error);
  }
}

function displayProduct(product ,y) {
  cartona = ``;
  for (let i = 0; i < product.length; i++) {
    cartona += `
          <div class="col-md-4">
                <div class="card overflow-hidden cardP" id=${product[i].id}>
                    <img src="${product[i].thumbnail}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title text-danger">${product[i].title}</h5>
                      <p class="card-text">${product[i].description}</p>
                      <div class="d-flex justify-content-between">
                        <p class="text-success">${product[i].price}$</p>
                        <p>${product[i].rating}<i class="fa-regular fa-star text-warning"></i></p>
                      </div>
                    </div>
                  </div>
            </div>
        `;
  }
  y.innerHTML = cartona;

  let cardsP = document.querySelectorAll(".cardP");
    for (let i = 0; i < cardsP.length; i++) {
        cardsP[i].addEventListener('click'  , function(){
            localStorage.setItem('productID', cardsP[i].getAttribute('id'));
            location.href ='productdetiles.html'
        })
        
    }
  
}

if (location.href.includes("product.html")) {
  productNfso(localStorage.getItem("categryName"));
}

async function getDetiles() {             
try {
    document.querySelector(".myLoader").classList.remove("d-none");
    let idProduct = localStorage.getItem('productID')
    let res = await fetch(`https://dummyjson.com/products/${idProduct}`)
    let product = await res.json()
    document.querySelector(".myLoader").classList.remove("d-none");
    displaydetiles(product)
    
} catch (error) {
    console.log(error);
    
}
}

function displaydetiles(product) {
    cartona = `
      <div class="col-md-6">
                <img src="${product.thumbnail}" class="w-100" alt="">
            </div>
            <div class="col-md-6">
                <h2>${product.title}</h2>
                <p class="text-secondary fs-3 my-4">${product.description}</p>
                <p class="fs-4">price : <span class="text-muted">${product.price} $</span></p>
                <p class="fs-4">brand : <span class="text-muted">${product.brand}</span></p>
                <p class="fs-4">category : <span class="text-muted">${product.category}</span></p>
                <p class="fs-4">return policy : <span class="text-muted">${product.returnPolicy}</span></p>
                <p class="text-danger fs-5 my-4"> Discount  : <span class="text-muted">${product.discountPercentage} %</span></p>
                <button class="btn btn-primary w-100">Add to cart</button>

            </div>
    `
    document.querySelector('.rowdata').innerHTML =  cartona

}

if (location.href.includes('productdetiles.html')) {
   getDetiles()
}

async function fetchyAll() {
  let  res = await fetch('https://dummyjson.com/products')
  let data = await res.json()
  let products =await data.products  
  let y = document.querySelector('.allP')
  displayProduct(products ,y)


}


if (location.href.includes('allProducts.html')) {
fetchyAll()
  
}