
// Obtener etiqueta del formulario de login
const registerForm = document.getElementById('register');
const loginForm = document.getElementById('login');
const logout = document.getElementById('logout');
const forms = document.getElementById('forms');


if(sessionStorage.getItem("login") !== null){
    getAllProducts();
    logout.style.display = "block";
    forms.style.display = "none";
}

logout.addEventListener('click', () => {
    sessionStorage.removeItem("login");
    location.reload();
})

// Obtener datos del loginForm
loginForm.addEventListener('submit', () =>{
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    verifyUser(username, password)
        .then(() => {
            location.reload();
        })
        .catch((error) => {
            console.log("Error:", error);
        });
})
// Obtener datos del registerForm
registerForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que se envíe por defecto
    
    //Obtener los datos del formulario
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const city = document.getElementById('city').value;
    const street = document.getElementById('street').value;
    const number = document.getElementById('number').value;
    const zipcode = document.getElementById('zipcode').value;
    const phone = document.getElementById('phone').value;

    // Crear 
    const user ={
        id: 0,
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
        },
        phone:phone
        };
        
    console.log(user);
    console.log(putUser(user).then(res=>console.log(res["id"])));
});


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
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            console.log("Usuario correcto");

            sessionStorage.setItem("login", true);
            sessionStorage.setItem("user",user);
            return true;
        } else {
            console.log("Contraseña o nombre incorrectos");
            return false;
        }
    } catch (error) {
        console.error("Error al verificar y almacenar usuario:", error);
        return false;
    }
}
// Verificar usuario

// GET All PRODUCTS
async function getAllProducts(){
    fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> {
                console.log(json);
                console.log(json[0].id);
                createCard(json);
            })
}
// GET All PRODUCTS




// Vrear cartas de productos
const createCard = (json)=>{
    const container = document.querySelector(".container");
    json.forEach(element => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const p2 = document.createElement("p");
        // const p3 = document.createElement("p");
        const btn = document.createElement("a");
        const img = document.createElement("img");
        p.innerHTML = element.id;
        p2.innerHTML = element.price;
        // p3.innerHTML = element.description;
        btn.innerHTML = element.category;
        img.src = element.image;
        div.appendChild(p);
        div.appendChild(p2);
        div.appendChild(img);
        // div.appendChild(p3);
        btn.setAttribute("href",`product\\product.html?id=${element.id}`);
        div.appendChild(btn);
        div.classList.toggle("pCard");
        container.appendChild(div);
    });
}