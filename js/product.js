const updateForm = document.querySelector("#updateForm");

const createCard = (json)=>{
    const container = document.querySelector(".container");
    container.classList.toggle("productPage")
        const div = document.createElement("div");
        const divBtn = document.createElement("div");
        const p = document.createElement("p");
        const p2 = document.createElement("p");
        // const p3 = document.createElement("p");
        const btn = document.createElement("a");
        const btnEdit = document.createElement("button");
        const btnAddCart = document.createElement("button");
        const img = document.createElement("img");


        p.innerHTML = json.id;
        p2.innerHTML = json.price;
        // p3.innerHTML = element.description;
        btn.innerHTML = json.category;
        btnEdit.innerHTML = "Edit";
        btnAddCart.innerHTML = "Add cart";
        btnEdit.id = "edit-modal";
        img.src = json.image;
        div.appendChild(p);
        div.appendChild(p2);
        div.appendChild(img);
        // div.appendChild(p3);
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
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        createCard(json);
    } catch (error) {
        console.error(error);
    }
}
// return fetch(url)
//         .then(res=>res.json())
//         .then(json=>json).catch(console.error(error))


// Peticion a la api por id
console.log(getProductById(getIdFromUrl()));

function getJSON(promise){
    promise.then(res=>res.json()).then(json=>console.log(json));
}
function logPromiseResults(promise) {
    promise;
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
    fetch('https://fakestoreapi.com/products/7',{
        method:"PATCH",
        body:JSON.stringify(
            product
        )
    })
        .then(res=>res.json())
        .then(json=>{
            console.log(json);
            setUpdate(product)
        })
}

// UPDATE PRODUCT

// SEARCH PRODUCTS IN LOCAL STORAGE
async function setUpdate(id,product){
    const products = JSON.parse(localStorage.setItem());
    products.push(product);
}
// SEARCH PRODUCTS IN LOCAL STORAGE

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
    const title = document.getElementById('title');
    const price = document.getElementById('price');
    const description = document.getElementById('description');
    const image = document.getElementById('image');
    const category = document.getElementById('category');
    // Crear 
    const product ={
        id: 0,
        title: title,
        price: price,
        description: description,
        image: image,
        category: category
        };
        
    console.log(product);

    // Enviar mod a la API
    updateProduct(product);
});
// MODAL FORM SUBMIT BUTTON

