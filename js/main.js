
/* CREATE COMPONENTS */

// Crear cartas de productos
const createCard = (json)=>{
    const container = document.querySelector(".container");
    // if(reset==="y"){
    //     container.innerHTML = "";
    // }
        const div = document.createElement("div");
        const p = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const btn = document.createElement("button");
        const btnAddCart = document.createElement("button");
        const img = document.createElement("img");
        p.innerHTML = json.id;
        p2.innerHTML = json.price + " $";
        p3.innerHTML = json.title;
        btn.innerHTML = json.category;
        btnAddCart.innerHTML = "Add";
        img.src = json.image;
        div.appendChild(p);
        div.appendChild(img);
        div.appendChild(p3);
        div.appendChild(p2);
        btn.setAttribute("href",`product\\product.html?id=${json.id}`);

        btn.addEventListener("click", function() {
            // Redirige a otra página cuando se hace clic en el botón
            window.location.href = `product\\product.html?id=${json.id}`;
        });

        btnAddCart.addEventListener('click',() => {
            addCart(json);
        })
        div.appendChild(btnAddCart);
        div.appendChild(btn);
        div.classList.toggle("pCard");
        container.appendChild(div);

}

// CREATE CATEGORY BUTTONS
const createBtn = (json)=>{
    const container = document.querySelector("#categories");

    // Crear el boton de todas las categorias
    const btnAll = document.createElement("button");
    btnAll.setAttribute("id","all");
    btnAll.innerHTML = "All categories";

    btnAll.addEventListener('click', () => {
        resetContainer();
        getAllProducts();
    })

    container.appendChild(btnAll);

    // Crear los botones de cada categoria
    json.forEach(element => {
        const btn = document.createElement("button");
        btn.setAttribute("id",element);
        btn.innerHTML = element;

        btn.addEventListener('click', () => {
            console.log("Clicked category:", element);
            resetContainer();
            getSpecificCategory(element);
        })

        container.appendChild(btn);
    });
}

/* CREATE COMPONENTS */



// RESET PRODUCTS CONTAINER
function resetContainer(){
    const container = document.querySelector(".container");
    container.innerHTML = "";
}
// RESET PRODUCTS CONTAINER



/* OBTENER DATOS DE FORMS */

// Obtener etiqueta del formulario de login
const registerForm = document.getElementById('register');
const loginForm = document.getElementById('login');
const logout = document.getElementById('logout');
const forms = document.getElementById('forms');


if(sessionStorage.getItem("login") !== null){
    getAllCategories();
    const container = document.querySelector(".container");
    const userF = document.querySelector("#userF");
    userF.style.display = "flex"
    userF.style
    userF.style.flexWrap = "wrap";
    userF.style.alignItems = "center";
    // getAllProducts();
    logout.style.display = "block";
    forms.style.display = "none";
    const createProductBtn = document.querySelector("#createProduct");
    createProductBtn.style.display = "block";
    if(container.innerHTML === ""){
        getAllProducts();
        // getAllProductsLocalStorage();
    }
    
}

logout.addEventListener('click', () => {
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("user");
    location.reload();
})

// Obtener datos del loginForm
loginForm.addEventListener('submit', () =>{
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    verifyUser(username, password)
        .then(() => {
            // location.reload();
        })
        .catch((error) => {
            console.log("Error:", error);
        });
})

// Obtener datos del registerForm
registerForm.addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar que se envíe por defecto
    
    //Obtener los datos del formulario
    const email = document.getElementById('email').value;
    const username = document.getElementById('Rusername').value;
    const password = document.getElementById('Rpassword').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const city = document.getElementById('city').value;
    const street = document.getElementById('street').value;
    const number = document.getElementById('number').value;
    const zipcode = document.getElementById('zipcode').value;
    const phone = document.getElementById('phone').value;

    // Crear 
    const user ={
        id: getUserMaxId(),
        email: email,
        username: username,
        password: password,
        name: {
            firstname: firstname,
            lastname: lastname
        },
        address:{
            city:city,
            street:street,
            number:number,
            zipcode:zipcode,
            geolocation:{
                lat:'0',
                long:'0'
            }
        },
        phone:phone
        };
        
    console.log(user);
    if(await usernameExists(user.username)){
        console.log(putUser(user).then(res=>console.log(res["id"])));
        localStorage.setItem("user"+user.id,JSON.stringify(user));
    }
});
// OBTENER DATOS DE FORMS



/* METODOS USER */

//   Put user
async function putUser(user){
    return fetch('https://fakestoreapi.com/users',{
        method:"POST",
        body:JSON.stringify(
            user
        )
    })
        .then(res=>res.json())
        .then(json=>json);
}
//   Put user

// GET ALL USERS
async function getAllUsers(){
    try {
        const response = await fetch('https://fakestoreapi.com/users');
        const users = await response.json();
        return users;
    } catch (error) {
        console.error('Error obteniendo usuarios:', error);
        throw error;
    }
}
// GET ALL USERS

// Verificar usuario
async function verifyUser(username, password){
    try {
        const users = await getAllUsers();

        // Verificar los usuarios de la api
        const isAPIUser = users.find(u => u.username === username && u.password === password);

        // Verificar los usuarios de localstorage
        const isLocalUser = getValuesByPattern("user").find(u => u.username === username && u.password === password);

        let user;

        if (isAPIUser) {
            console.log("Usuario correcto");

            login(isAPIUser);

            location.reload();
            return true;
        } else if (isLocalUser){
            console.log("Usuario correcto");
            login(isLocalUser);
            location.reload();
        } else {
            console.log("Contraseña o nombre incorrectos");
            return false;
        }

    } catch (error) {
        console.error("Error al verificar y almacenar usuario:", error);
        window.location.href = 'error/error.html';
        return false;
    }
}
// Verificar usuario

// Login
function login(user){
    sessionStorage.setItem("login", true);
    sessionStorage.setItem("user",JSON.stringify(user));
    sessionStorage.setItem("cart",JSON.stringify({
        userId:user.id,
        date:dateFormat(),
        products:[]
    }))
}
// Login

// Username exist
async function usernameExists(username){
    try {
        const users = await getAllUsers();

        // usuarios de la api
        const isAPIUser = users.find(u => u.username === username);

        // usuarios de localstorage
        const isLocalUser = getValuesByPattern("user").find(u => u.username === username);

        if (isAPIUser) {
            console.log("The username is on use");
            return false;
        } else if (isLocalUser){
            console.log("The username is on use");
            return false;
        } else {
            console.log("Register success");
            return true;
        }

    } catch (error) {
        console.error("Error al verificar username:", error);
        return false;
    }
}
// Username exist

// GetUserMax id
function getUserMaxId() {
    let maxId = 11;
    const keys = getKeysByPattern("user");
  
    keys.forEach(key => {
        const currentId = parseInt(key.substring("user".length), 10);
        if (!isNaN(currentId) && currentId >= maxId) {
          maxId = currentId + 1;
        }
    });
  
    return maxId;
  }
// GetUserMax id

/* METODOS USER */



// Encontrar key por patron
function getKeysByPattern(pattern) {
    const keys = Object.keys(localStorage);
    const matchingKeys = keys.filter(key => key.startsWith(pattern));
    return matchingKeys;
}
// Encontrar key por patron
function getValuesByPattern(pattern) {
    const keys = getKeysByPattern(pattern);
    const values = keys.map(key => {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    });
    return values;
  }
  



/* METODOS PRODUCT Y CATEGORIES */

// VERIFICAR SI PRODUCTO DE API EXISTE EN LOCAL STORAGE
function verifyProductLocalStorage(product){
    if(JSON.parse(localStorage.getItem("product"+product.id) === null)){
        console.log("no esta en local storage");
        // createCard(product);
        return product
    } else{
        console.log("esta en local storage")
        const productoLocalS = JSON.parse(localStorage.getItem("product"+product.id));
        if(productoLocalS.method === "delete"){
            console.log("Product deleted")

        } else {

            // createCard(productoLocalS);
            return productoLocalS;
        }
    }
}
// VERIFICAR SI PRODUCTO DE API EXISTE EN LOCAL STORAGE

// GET All PRODUCTS
async function getAllProducts(){
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const productsAPI = await response.json();
        productsAPI.forEach(el => {
            // verifyProductLocalStorage(el);
            createCard(verifyProductLocalStorage(el));
        });

        getAllProductsLocalStorage();
        return productsAPI;
    } catch (error) {
        console.error('Error obteniendo productos:', error);
        throw error;
    }
}
// GET All PRODUCTS

// GetProductMax id
function getProductMaxId(json) {
    let maxId = json.id;
    console.log(maxId)
    const keys = getKeysByPattern("product");
  
    keys.forEach(key => {
        const currentId = parseInt(key.substring("product".length), 10);/* el 10 se puede quitar */
        if (!isNaN(currentId) && currentId >= maxId) {
          maxId = currentId + 1;
        }
    });
  
    return maxId;
  }
// GetProductMax id

// Comprar carrito
async function postProduct(product) {
    try{
        const response = await fetch('https://fakestoreapi.com/products', {
            method: "POST",
            body: JSON.stringify(
                product
            )
          });
        
          const jsonResponse = await response.json();
          
          const maxId = getProductMaxId(jsonResponse);
          const modifiedJson = {
              ...product,
              id:maxId
          };
        
          localStorage.setItem("product"+modifiedJson.id,JSON.stringify(modifiedJson));
          console.log(modifiedJson);
          console.log(typeof maxId);
          console.log(modifiedJson.id);

    } catch(error){
        console.log("Error al añadir carrito: " + error);
    }
}

// GET ALL CATEGORIES
async function getAllCategories(){
    try {
        const response = await fetch('https://fakestoreapi.com/products/categories');
        const categoriesAPI = await response.json();
        console.log(categoriesAPI);
        createBtn(categoriesAPI);
        return categoriesAPI;
    } catch (error) {
        console.error('Error obteniendo categorias', error);
        throw error;
    }
}
// GET ALL CATEGORIES

// GET SPECIFIC CATEGORY
async function getSpecificCategory(category){
    const url = `https://fakestoreapi.com/products/category/${category}`;
    try {
        const response = await fetch(url);
        const json = await response.json();
        json.forEach(el => {
            if(verifyProductLocalStorage(el).category === category){
                // verifyProductLocalStorage(el);
                createCard(verifyProductLocalStorage(el));

            }
        });
        getSpecificCategoryLocalStorage(category);
        // const localProducts = getValuesByPattern("product")
        // localProducts.forEach(product => {
        //     if(product.category === category){
        //         createCard(product);
        //         console.log("is category")
        //     } else{
        //         console.log("Is not category: " + product)
        //     }
        // })
        // verifyProductLocalStorage(json);
    } catch (error) {
        console.error(error);
    }
}
// GET SPECIFIC CATEGORY


//GET ALL PRODUCTS LOCALSTORAGE
function getAllProductsLocalStorage(){
    const localStorageProducts = getValuesByPattern("product");
    localStorageProducts.forEach(el => {
        if(el.method==="delete" || el.id<21){
            console.log("El producto es de la api o esta borrado");
        } else{
            createCard(el);
            console.log("El producto es de localStorage");
        }
    })
    return JSON.parse(localStorage.getItem("products"));

}
//GET ALL PRODUCTS LOCALSTORAGE

//GET  SPECIFIC CATEGORY PRODUCTS LOCALSTORAGE
function getSpecificCategoryLocalStorage(category){
    const localStorageProducts = getValuesByPattern("product");
    localStorageProducts.forEach(el => {
        if(el.category === category){
            if(el.method!="delete"){
                console.log("El producto es de la categoria");
                createCard(el);
            }
        } else{
            console.log("El producto no es de categoria");
        }
    })

}
//GET  SPECIFIC CATEGORY PRODUCTS LOCALSTORAGE

async function compareProducts(){
    const productsAPI = await getAllProducts();
    const productsLS = getAllProductsLocalStorage();
}
// COMPARE PRODUCTS

// COMPARE PRODUCTS

/* METODOS PRODUCT Y CATEGORIES */



/* METODOS CARRITO */

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
        const currentId = parseInt(key.substring(4), 10);
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
    sessionStorage.setItem("cart",JSON.stringify({
        userId:user.id,
        date:dateFormat(),
        products:[]
    }))
})

// Comprar carrito

// Añadir carrito
function addCart(el){
    const userCart = JSON.parse(sessionStorage.getItem("cart"));
    const productCart = userCart.products.find(pro => pro.id === el.id)
    if(productCart){
        productCart.quantity += 1;
        console.log("existe")
    } else{
        userCart.products.push({
            productId:el.id,
            quantity:1
        })
        console.log("no existe")
    }
    sessionStorage.setItem("cart",JSON.stringify(userCart));
}
// Añadir carrito

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

/* METODOS CARRITO */




// === undefined



const userBtn = document.querySelector("#user");
userBtn.addEventListener('click', () => {
    window.location.href = `user\\user.html`;
})

// USE USER DATA PERSO
if(sessionStorage.getItem("user")!=null){
    const dataUser = JSON.parse(sessionStorage.getItem("user"));
    const dataUserName = document.querySelector("#userName");
    dataUserName.innerHTML = dataUser.username;
}
// USE USER DATA PERSO







// Utility
function dateFormat(){
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const formatedDate = `${year}-${month}-${day}`;
    return formatedDate;
}
// Utility



// CREAR PRODUCT
const createProductForm = document.querySelector("#createProductForm");
const createProductBtn = document.querySelector("#createProduct");
const createProductSubmit = document.querySelector("#createProductSubmit");
createProductBtn.addEventListener('click', () => {
    createProductForm.classList.toggle("displayB");
    createProductForm.classList.toggle("displayN");
})
// CREAR PRODUCT

// OBTENER DATOS DE CREAR PRODUCTO
createProductSubmit.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se envíe por defecto
    
    //Obtener los datos del formulario
    const title = document.getElementById('title').value;
    const price = document.getElementById('price').value;
    const category = document.getElementById('category').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    // Crear 
    const product ={
        title:title,
        price:price,
        category:category,
        description:description,
        image:image
        };
        
    console.log(product);
    postProduct(product);
});
// OBTENER DATOS DE CREAR PRODUCTO

// Login dom
const displayLogin = document.querySelector("#displayLogin");
const displayRegister = document.querySelector("#displayRegister");

displayLogin.addEventListener('click', () => {
    registerForm.classList.toggle("displayN")
    loginForm.classList.toggle("displayN")
})
displayRegister.addEventListener('click', () => {
    loginForm.classList.toggle("displayN")
    registerForm.classList.toggle("displayN")
    
})

function toggleActive(element) {
    // Remover la clase 'active' de todos los elementos
    document.querySelectorAll('.nav li').forEach(function (el) {
        el.classList.remove('active');
    });

    // Agregar la clase 'active' al elemento clicado
    element.classList.add('active');
}
// Login dom