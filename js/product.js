
const updateForm = document.querySelector("#updateForm");

const createCard = (json)=>{
    const container = document.querySelector(".container");
    container.classList.toggle("productPage")
        const div = document.createElement("div");
        const divBtn = document.createElement("div");
        const divImg = document.createElement("div");
        const p = document.createElement("p");
        const h3 = document.createElement("h3");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const btn = document.createElement("button");
        const btnEdit = document.createElement("button");
        const btnAddCart = document.createElement("button");
        const img = document.createElement("img");


        p.innerHTML = json.id;
        h3.innerHTML = json.title;
        p2.innerHTML = json.price;
        p3.innerHTML = json.description;
        btn.innerHTML = json.category;
        btnEdit.innerHTML = "Edit";
        btnAddCart.innerHTML = "Add cart";
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
        divBtn.appendChild(btnEdit);
        divBtn.appendChild(btnAddCart);
        
        div.classList.toggle("pCard");
        container.appendChild(div);
        container.appendChild(divBtn);
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
        const response = await fetch(url);
        const json = await response.json();

        // Verificar si el producto a sido modificado
        if(localStorage.getItem("product"+json.id)){
            const productMod = localStorage.getItem("product"+json.id);
            console.log("El producto fue modificado");
            setDelete(productMod);
        } else if(json === null){
            console.log("El objeto no es de la api");
        } else {
            console.log("El producto no fue modificado")
            json["method"]="delete"
            setDelete(json);
        }
    } catch (error) {
        console.error(error);
    }
}
// DELETE PRODUCT

// SEARCH PRODUCTS IN LOCAL STORAGE
function setUpdate(product){
    const products = getKeysByPattern("product");
    
    if(!products[product.id]){
        // products[product.id] = product;
        localStorage.setItem("product"+product.id,JSON.stringify(product));
        console.log("Update product")
    } else {
        console.log("error");
    }
}
// SEARCH PRODUCTS IN LOCAL STORAGE

function setDelete(product) {
    if(product){
        console.log(product);
        // localStorage.setItem("product"+product.id, JSON.stringify(product));
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
        id: id.value,
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