
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
        img.src = json.image;
        div.appendChild(p);
        div.appendChild(p2);
        div.appendChild(img);
        // div.appendChild(p3);
        btn.setAttribute("href",`product\\product.html?id=${json.id}`);
        div.appendChild(btn);

        divBtn.appendChild(btnEdit);
        divBtn.appendChild(btnAddCart);
        
        div.classList.toggle("pCard");
        container.appendChild(div);
        container.appendChild(divBtn);
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



// Modal
const edit = document.querySelector("#edit");
edit.addEventListener("click", function () {
    const openModalBtn = document.getElementById("openModalBtn");
    const modal = document.getElementById("myModal");
    const closeModal = document.querySelector(".close");

    openModalBtn.addEventListener("click", function () {
        modal.style.display = "block";
    });

    closeModal.addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
