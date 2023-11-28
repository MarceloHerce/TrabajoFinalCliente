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
            const carts = JSON.parse(localStorage.getItem("cart"+userId));
            console.log(carts);

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