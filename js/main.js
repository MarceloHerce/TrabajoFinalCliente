fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=> {
                console.log(json);
                console.log(json[0].id);
                createCard(json);
            })

const createCard = (json)=>{
    const container = document.querySelector(".container");
    json.forEach(element => {
        const div = document.createElement("div");
        const p = document.createElement("p");
        const p2 = document.createElement("p");
        const p3 = document.createElement("p");
        const btn = document.createElement("btn");
        const img = document.createElement("img");
        p.innerHTML = element.id;
        p2.innerHTML = element.price;
        p3.innerHTML = element.description;
        btn.innerHTML = element.category;
        img.src = element.image;
        div.appendChild(p);
        div.appendChild(p2);
        div.appendChild(img);
        div.appendChild(p3);
        div.appendChild(btn);
        container.appendChild(div);
    });
}
