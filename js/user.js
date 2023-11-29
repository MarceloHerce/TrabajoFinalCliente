const logout = document.getElementById('logout');
logout.style.display = "block";

const userF = document.getElementById('userF');
userF.style.display = "flex";
userF.style.flexWrap = "wrap";
userF.style.alignItems = "center";

const dataUser = JSON.parse(sessionStorage.getItem("user"));
const dataUserName = document.querySelector("#userName");
dataUserName.innerHTML = dataUser.username;

const container = document.querySelector(".container");

userDataComponent();
getUserCarts(dataUser.id);
function userDataComponent(){
    const user = JSON.parse(sessionStorage.getItem("user"));

    const userCart = document.createElement("div");
    const name = document.createElement("h3");
    const email = document.createElement("h4");
    const firstname = document.createElement("h5");
    
    name.innerHTML = user.username;
    email.innerHTML = user.email;
    firstname.innerHTML = user.name.firstname + " " + user.name.lastname;

    userCart.appendChild(name) 
    userCart.appendChild(email) 
    userCart.appendChild(firstname) 




    container.appendChild(userCart)

}

async function getUserCarts(userId){
    const url = `https://fakestoreapi.com/carts/user/${userId}`;
    try {
        if(userId < 11){
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            json.forEach(element => {
                console.log(element);
                cartComponent(element);
            });

            const carts = getValuesByPattern("cart");
            carts.forEach(cart => {
                if(cart.userId === userId){
                    console.log("cli");
                    console.log(cart.products);
                    cartComponent(cart);
                }
            })

        } else {
            console.log("Usuario que no es de api")
            const carts = getValuesByPattern("cart");
            carts.forEach(cart => {
                if(cart.userId === userId){
                    console.log("cli");
                    console.log(cart.products);
                    cartComponent(cart);
                }
            })

        }
    } catch (error) {
        console.error(error);
    }
}

const cartContainer = document.querySelector(".cartContainer");

async function cartComponent(cart){
    const cartDiv = document.createElement("div");
    const id = document.createElement("h3");
    const date = document.createElement("h4");
    
    id.innerHTML = "Cart id: " + cart.id;

    cartDiv.appendChild(id) 

    console.log(cart.products);
    for (let product of cart.products) {
        console.log("hola " + product.productId);
        const p = await getSpecificProduct(product.productId);
        console.log(p)
        const productDiv = document.createElement("div");
        const data = document.createElement("div");
        const title = document.createElement("h3");
        const quantity = document.createElement("h3");
        const img = document.createElement("img");
        title.innerHTML = p.title;
        quantity.innerHTML = "Quantity: " + product.quantity;
        img.src = p.image;

        data.appendChild(title); 
        data.appendChild(quantity); 
        data.classList.toggle("productData")
        productDiv.appendChild(img); 

        productDiv.appendChild(data)
        cartDiv.appendChild(productDiv)
    }
    
    
    cartDiv.classList.toggle("cartProducts");
    cartContainer.appendChild(cartDiv)
}

// GET PRODUCT BY ID
async function getSpecificProduct(id){
    const url = `https://fakestoreapi.com/products/${id}`;
    try {
        const localStorageProduct = JSON.parse(localStorage.getItem("product"+id));
        if(localStorageProduct){
            return localStorageProduct;
        } else {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        }
    } catch (error) {
        console.error(error);
    }
}
// GET PRODUCT BY ID


// REPETIDO
function getValuesByPattern(pattern) {
    const keys = getKeysByPattern(pattern);
    const values = keys.map(key => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    });
    return values;
  }
  
  function getKeysByPattern(pattern) {
    const keys = Object.keys(localStorage);
    const matchingKeys = keys.filter(key => key.startsWith(pattern));
    return matchingKeys;
}

function toggleActive(element) {
    document.querySelectorAll('.nav li').forEach(function (el) {
        el.classList.remove('active');
    });

    element.classList.add('active');
}


// CART
const cart = document.querySelector("#cart");
const cartModal = document.querySelector("#cartModal");
const cartExit = document.querySelector("#cartExit");
const cartProducts = document.querySelector("#cartProducts");
cart.addEventListener('click', () => {
    createCartProduct();
    cartModal.showModal();
})
cartExit.addEventListener('click', () => {
    cartModal.close();
})
// CART
// GetCartMax id
function getCartMaxId(json) {
    let maxId = json.id;
    console.log(maxId)
    const keys = getKeysByPattern("cart");
  
    keys.forEach(key => {
        const currentId = parseInt(key.substring("cart".length));
        if (!isNaN(currentId) && currentId >= maxId) {
          maxId = currentId + 1;
        }
    });
  
    return maxId;
  }
// GetCartMax id
// Comprar carrito
async function postCart() {
    try{
        const cart = JSON.parse(sessionStorage.getItem("cart"));
        const response = await fetch('https://fakestoreapi.com/carts', {
            method: "POST",
            body: JSON.stringify(
                cart
            ),
            headers: {
              'Content-Type': 'application/json'
            }
          });
        
        const jsonResponse = await response.json();
        
        const maxId = getCartMaxId(jsonResponse);
        const modifiedJson = {
            ...cart,
            id:maxId
        };
    
        localStorage.setItem("cart"+modifiedJson.id,JSON.stringify(modifiedJson));
        console.log(modifiedJson);
        console.log(typeof maxId);
        console.log(modifiedJson.id);
       

    } catch(error){
        console.log("Error al añadir carrito: " + error);
    }
}
// Comprar carrito
const buyBtn = document.querySelector("#buy");
buyBtn.addEventListener('click', () => {
    postCart();
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log( "usuario"+ user);
    console.log(user.id);
    sessionStorage.setItem("cart",JSON.stringify({
        userId:user.id,
        date:dateFormat(),
        products:[]
    }))
    cartModal.close();
})

// Comprar carrito
// DOM de PRODUCTOS CARRITO
async function createCartProduct() {
    const userCart = JSON.parse(sessionStorage.getItem("cart"));
    cartProducts.innerHTML = "";
    const products = userCart.products;
    for (const pro of products) {
        console.log(pro)
        const productData  = await getSpecificProduct(pro.productId);
        console.log(productData)
        const proDiv = document.createElement("div");
        const proTextDiv = document.createElement("div");
        const proImg = document.createElement("img");
        const proTittle = document.createElement("h3");
        const proQuantity = document.createElement("h3");

        proImg.src = productData.image;
        proTittle.innerText = productData.title;
        proQuantity.innerText = "Quantity: "  + pro.quantity;
    

        proDiv.appendChild(proImg);
        proTextDiv.appendChild(proTittle);
        proTextDiv.appendChild(proQuantity);
        proDiv.appendChild(proTextDiv);

        console.log(proDiv)
        cartProducts.appendChild(proDiv);
      }
}
// DOM de PRODUCTOS CARRITO

// GET PRODUCT BY ID
async function getSpecificProduct(id){
    const url = `https://fakestoreapi.com/products/${id}`;
    try {
        const localStorageProduct = JSON.parse(localStorage.getItem("product"+id));
        if(localStorageProduct){
            return localStorageProduct;
        } else {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        }
    } catch (error) {
        console.error(error);
    }
}
// GET PRODUCT BY ID

logout.addEventListener('click', () => {
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("user");
    window.location.href = `..\\index.html`;
})