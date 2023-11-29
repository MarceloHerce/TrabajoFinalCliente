
const updateForm = document.querySelector("#updateForm");

const createCard = (json)=>{
    const container = document.querySelector(".container");
    container.classList.toggle("productPage")
        const div = document.createElement("div");
        // const divBtn = document.createElement("div");
        const divImg = document.createElement("div");
        const p = document.createElement("p");
        const h3 = document.createElement("h3");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const btn = document.createElement("button");
        const btnEdit = document.createElement("button");
        // const btnAddCart = document.createElement("button");
        const img = document.createElement("img");


        p.innerHTML = json.id;
        h3.innerHTML = json.title;
        p2.innerHTML = json.price + " $";
        p3.innerHTML = json.description;
        btn.innerHTML = json.category;
        btnEdit.innerHTML = "Edit";
        // btnAddCart.innerHTML = "Add cart";
        // btnAddCart.addEventListener('click', () => {
        //     addCart(json.id);
        // })
        btnEdit.id = "edit-modal";
        img.src = json.image;
        div.appendChild(p);
        div.appendChild(h3);
        div.appendChild(p2);
        divImg.appendChild(img);
        div.appendChild(divImg);
        div.appendChild(p3);
        btn.setAttribute("href",`product\\product.html?id=${json.id}`);


        const modal = document.querySelector("#modal");
        btnEdit.addEventListener('click', () => {
            modal.showModal();
        })
        const closeModal = document.querySelector("#closeModal");
        closeModal.addEventListener('click', () =>{
            modal.close();
        })

        div.appendChild(btn);
        div.appendChild(btnEdit);
        // divBtn.appendChild(btnEdit);
        // divBtn.appendChild(btnAddCart);
        
        div.classList.toggle("pCard");
        container.appendChild(div);
        // container.appendChild(divBtn);
        container.appendChild(modal);

        createEditForm(json);
};

function getIdFromUrl() {
    // Obtener los parámetros de la URL
    const urlParams = new URLSearchParams(window.location.search);

    // Obtener el valor del parámetro 'id'
    const id = urlParams.get('id');

    return id;
}
async function getProductById(id){
    const url = `https://fakestoreapi.com/products/${id}`;
    try {
        if(id < 21){
            const response = await fetch(url);
            const json = await response.json();
            console.log(json);
            verifyProductLocalStorage(json);
        } else {
            const product = JSON.parse(localStorage.getItem("product"+id));
            createCard(product);
        }
    } catch (error) {
        console.error(error);
    }
}
// return fetch(url)
//         .then(res=>res.json())
//         .then(json=>json).catch(console.error(error))


// Peticion a la api por id
console.log((getProductById(getIdFromUrl())));

function getJSON(promise){
    promise.then(res=>res.json()).then(json=>console.log(json));
}
function logPromiseResults(promise) {
    promise
      .then(result => {
        console.log('Resultado:', result);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }



// UPDATE PRODUCT
async function updateProduct(product){
    fetch(`https://fakestoreapi.com/products/${product.id}`,{
        method:"PUT",
        body:JSON.stringify(
            product
        )
    })
        .then(res=>res.json())
        .then(json=>{
            setUpdate(product)
        })
}

// UPDATE PRODUCT

// DELETE PRODUCT
async function deleteProduct(id){
    const url = `https://fakestoreapi.com/products/${id}`;
    try {
        if(id < 21){
            const response = await fetch(url);
            const json = await response.json();
    
            // Verificar si el producto a sido modificado
            if(localStorage.getItem("product"+json.id)){
                const productMod = JSON.parse(localStorage.getItem("product"+json.id));
                console.log("El producto fue modificado");
                productMod["method"]="delete";
                setDelete(productMod);
            } else if(json === null){
                console.log("El objeto no es de la api");
            } else {
                console.log("El producto no fue modificado")
                json["method"]="delete"
                setDelete(json);
            }
        } else {
            const product = JSON.parse(localStorage.getItem("product"+id));
            product["method"]="delete";
            setDelete(product);
        }
    } catch (error) {
        console.error(error);
    }
}
// DELETE PRODUCT

// SET UPDATE IN LOCAL STORAGE
function setUpdate(product){
    const products = getKeysByPattern("product");
    console.log(product);
    
    try{
        localStorage.setItem("product"+product.id,JSON.stringify(product));
        console.log("Update product")
    }catch(error){
        console.error("Error al modificar producto: " + error);
    }
}
// SET UPDATE IN LOCAL STORAGE

function setDelete(product) {
    if(product){
        localStorage.setItem("product"+product.id, JSON.stringify(product));
    } else {
        console.log("Esta en local storage");
    }
}

// CREATE MODAL FORM 
async function createEditForm(productPromise){
    const updateForm = document.querySelector("#updateForm");
    try{
        const product = await productPromise;
        for (const key in product) {
            if (product.hasOwnProperty(key) && key != "rating") {
                const div = document.createElement("div");
                const label = document.createElement("label");
                const input = document.createElement("input");

                label.innerHTML = `${key.toUpperCase()}`;
                label.setAttribute("for",key);
                let type = "text";
                if(key === "price"){
                    type = "number";
                }
                if(key === "id"){
                    input.disabled = true;
                }
                if(key === "method"){
                    continue;
                }
                if(key === "category"){
                    const select = document.createElement("select");
                    select.setAttribute("name", "category");
                    select.setAttribute("id", "category");
                    const categories = ["Electronics", "Jewelery", "Men's clothing", "Women's clothing"];
                    categories.forEach(category => {
                        const option = document.createElement("option");
                        option.setAttribute("value", category.toLowerCase());
                        option.innerText = category;
                        select.appendChild(option);

                        // seleccionar categoria que tiene el producto
                        if (category.toLowerCase() === product[key]) {
                            option.selected = true;
                        }
                    });
                    console.log(select);
                    div.appendChild(label);
                    div.appendChild(select);
                    updateForm.appendChild(div)
                    continue;
                }
                input.setAttribute(type,key );
                input.setAttribute("id",key );
                input.setAttribute("name",key);
                input.value = product[key];

                console.log(`${key}: ${product[key]}`);
                div.appendChild(label);
                div.appendChild(input);

                updateForm.appendChild(div)
                console.log(div);
            }
        }
        const btn = document.createElement("input");
        btn.type = "submit";
        btn.value = "Submit";
        updateForm.appendChild(btn);
    } catch (error) {
    console.error('Error al obtener el producto:', error);
    }   
}
// CREATE MODAL FORM 

// MODAL FORM SUBMIT BUTTON
updateForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se envíe por defecto
    const id = document.getElementById('id');
    const title = document.getElementById('title');
    const price = document.getElementById('price');
    const description = document.getElementById('description');
    const image = document.getElementById('image');
    const category = document.getElementById('category');
    // Crear 
    const product ={
        id: parseInt(id.value),
        title: title.value,
        price: price.value,
        description: description.value,
        image: image.value,
        category: category.value,
        method: 'PUT'
        };
        
    console.log(product);
    
    // TODO: validaciones

    // Enviar mod a la API
    updateProduct(product);
    /* ¿usar pacth? */
});
// MODAL FORM SUBMIT BUTTON

// MODAL FORM DELETE BUTTON
const deleteBtn = document.querySelector("#delete");
deleteBtn.addEventListener('click',()=>{
    deleteProduct(getIdFromUrl())
})
// MODAL FORM DELETE BUTTON



// Repetido
function getKeysByPattern(pattern) {
    const keys = Object.keys(localStorage);
    const matchingKeys = keys.filter(key => key.startsWith(pattern));
    return matchingKeys;
}
function verifyProductLocalStorage(product){
    if(JSON.parse(localStorage.getItem("product"+product.id) === null)){
        console.log("no esta en local storage");
        createCard(product);
    } else{
        console.log("esta en local storage")
        const productoLocalS = JSON.parse(localStorage.getItem("product"+product.id));
        createCard(productoLocalS);
    }
}

const logout = document.getElementById('logout');
logout.style.display = "block";

const userF = document.getElementById('userF');
userF.style.display = "flex";
userF.style.flexWrap = "wrap";
userF.style.alignItems = "center";

const dataUser = JSON.parse(sessionStorage.getItem("user"));
const dataUserName = document.querySelector("#userName");
dataUserName.innerHTML = dataUser.username;

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
    sessionStorage.setItem("cart",JSON.stringify({
        userId:user.id,
        date:dateFormat(),
        products:[]
    }))
    cartModal.close();
})

function dateFormat(){
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const formatedDate = `${year}-${month}-${day}`;
    return formatedDate;
}
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

function toggleActive(element) {
    document.querySelectorAll('.nav li').forEach(function (el) {
        el.classList.remove('active');
    });

    element.classList.add('active');
}

const userBtn = document.querySelector("#user");
userBtn.addEventListener('click', () => {
    window.location.href = `..\\user\\user.html`;
})

// const logout = document.getElementById('logout');
logout.addEventListener('click', () => {
    sessionStorage.removeItem("login");
    sessionStorage.removeItem("user");
    window.location.href = `..\\index.html`;
})