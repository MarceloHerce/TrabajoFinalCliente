# TrabajoFinalCliente 
<img src="src/logo.png" alt="Texto alternativo" width="100rem" height="auto"> <h2>Vedruna's outlet</h2>

<br>

# Main.js

## Método createCard

Este método se encarga de crear dinámicamente una tarjeta de producto en el DOM basada en la información proporcionada en un objeto JSON.

### Parámetros

- `json`: Un objeto JSON que contiene la información del producto, como `price`, `title`, `category`, `image`, y `id`.

### Acciones Realizadas

1. Selecciona el contenedor HTML con la clase `.container`.
2. Crea elementos HTML dinámicamente para representar la tarjeta de producto, incluyendo un contenedor `<div>`, dos elementos `<p>` para mostrar el precio y el título, dos botones `<button>` (uno para la categoría y otro para agregar al carrito), y una imagen `<img>` para mostrar la imagen del producto.
3. Configura los contenidos y atributos de los elementos HTML según la información proporcionada en el objeto JSON.
4. Añade event listeners para redirigir a los usuarios a la página del producto cuando hacen clic en la tarjeta y para agregar el producto al carrito cuando hacen clic en el botón correspondiente.
5. Agrega la tarjeta creada al contenedor principal con la clase `.container`.
6. Aplica la clase CSS `pCard` al contenedor para aplicar estilos específicos.

### Uso

```javascript
// Ejemplo de uso:
const producto = {
  id: 1,
  title: 'Producto de Ejemplo',
  price: 19.99,
  category: 'Electrónicos',
  image: 'ruta/imagen.png'
};

createCard(producto);
```
<br>

## Método createBtn

Este método se encarga de crear dinámicamente botones de categorías en el DOM basados en la información proporcionada en un array de objetos JSON.

### Parámetros

- `json`: Un array de objetos JSON que contiene información sobre cada categoría.

### Acciones Realizadas

1. Selecciona el contenedor HTML con el id `#categories`.
2. Crea un botón especial llamado "All categories" que, al hacer clic, restablece el contenido del contenedor y carga todos los productos.
3. Crea botones individuales para cada categoría presente en el array JSON.
4. Configura atributos y contenidos de los botones según la información proporcionada en los objetos JSON.
5. Añade event listeners a cada botón para realizar acciones específicas cuando se hace clic.
6. Agrega los botones al contenedor con el id `#categories`.

### Uso

```javascript
// Ejemplo de uso:
const categorias = ['Electrónicos', 'Ropa', 'Joyería', 'Hogar'];

createBtn(categorias);
```

<br>

## Función resetContainer

Esta función se encarga de resetear el contenido del contenedor de productos en el DOM.

### Acciones Realizadas

1. Selecciona el contenedor HTML con la clase `.container`.
2. Vacía el contenido del contenedor, eliminando todos los elementos hijos presentes.
3. Para que las cartas de los productos no se repitan al pulsar los botones de las categorias.

### Uso

```javascript
// Ejemplo de uso:
resetContainer();
createCard(producto);
```

<br>

## Lógica de Verificación de Sesión

Esta lógica verifica si existe una sesión activa almacenada en sessionStorage antes de realizar ciertas acciones en la interfaz de usuario.

### Acciones Realizadas
1. Verifica si existe un valor no nulo en sessionStorage con la clave "login".
2. Si hay una sesión activa:
   - Invoca la función `getAllCategories()` para obtener y mostrar todas las categorías disponibles.
   - Obtiene referencias a elementos del DOM, como el contenedor de productos, el elemento con id "userF", el botón de cierre de sesión, y otros elementos relacionados.
   - Ajusta estilos en el elemento con id "userF" para cambiar su visualización, permitiendo flexibilidad en su diseño.
   - Muestra el botón de cierre de sesión ("logout") y oculta los formularios relacionados con la autenticación.
   - Muestra el botón para crear un nuevo producto ("createProductBtn").
   - Verifica si el contenedor de productos está vacío antes de llamar a la función `getAllProducts()` para obtener y mostrar todos los productos. También se comenta una posible llamada a `getAllProductsLocalStorage()` que está actualmente comentada.
   - Se asume que existen elementos con los ids "logout", "forms", y "createProduct" en el DOM.

### Uso
```javascript
// Ejemplo de uso (dentro de un contexto de autenticación):
if (sessionStorage.getItem("login") !== null) {
    // ... Código de verificación de sesión aquí ...
}
```

<br>

## Manejo de Envío de Datos del Formulario de Inicio de Sesión

Este bloque de código se encarga de manejar el evento de envío (submit) del formulario de inicio de sesión (`loginForm`). Al recibir este evento, obtiene los valores del nombre de usuario (`username`) y la contraseña (`password`) desde los campos del formulario y los utiliza para verificar la autenticación del usuario.

### Acciones Realizadas
1. Añade un event listener al formulario de inicio de sesión (`loginForm`) que se activa cuando se envía el formulario.
2. Dentro del event listener, obtiene los valores de los campos de nombre de usuario (`username`) y contraseña (`password`) del formulario.
3. Llama a la función `verifyUser` pasando el nombre de usuario y la contraseña obtenidos como parámetros.
4. Maneja la promesa devuelta por `verifyUser` utilizando `then` y `catch`:
   - Si la autenticación es exitosa, puede realizar acciones adicionales como recargar la página (`// location.reload();`).
   - Si hay un error durante la autenticación, muestra el error en la consola.

### Uso
```javascript
// Ejemplo de uso:
loginForm.addEventListener('submit', () => {
    // ... Código de manejo de envío del formulario de inicio de sesión ...
});
```
<br>

## Manejo de Envío de Datos del Formulario de Registro

Este bloque de código se encarga de manejar el evento de envío (submit) del formulario de registro (`registerForm`). Al recibir este evento, obtiene los valores de varios campos del formulario, crea un objeto `user` con esta información y lo utiliza para registrar un nuevo usuario.

### Acciones Realizadas
1. Añade un event listener al formulario de registro (`registerForm`) que se activa cuando se envía el formulario.
2. Dentro del event listener, utiliza `event.preventDefault()` para evitar que el formulario se envíe por defecto y cause una recarga de la página.
3. Obtiene los valores de varios campos del formulario, como el correo electrónico, nombre de usuario, contraseña, nombre, dirección, código postal, teléfono, etc.
4. Crea un objeto `user` utilizando los datos obtenidos del formulario.
5. Verifica si ya existe un usuario con el mismo nombre de usuario utilizando la función `usernameExists`.
6. Si el nombre de usuario no existe, llama a la función `putUser` para registrar el nuevo usuario y obtiene el ID del usuario registrado.
7. Almacena el objeto `user` en el localStorage utilizando el ID del usuario como clave (`localStorage.setItem("user"+user.id,JSON.stringify(user))`).

### Uso
```javascript
// Ejemplo de uso:
registerForm.addEventListener('submit', async function(event) {
    // ... Código de manejo de envío del formulario de registro ...
});
```

<br>

## Función putUser

Esta función realiza una solicitud POST a la URL 'https://fakestoreapi.com/users' para agregar un nuevo usuario utilizando la información proporcionada en el objeto `user`.

### Parámetros
- `user`: Un objeto que contiene la información del usuario, como el correo electrónico, nombre de usuario, contraseña, nombre, dirección, código postal, teléfono, etc.

### Acciones Realizadas
1. Utiliza la función `fetch` para realizar una solicitud POST a la URL 'https://fakestoreapi.com/users'.
2. Configura el cuerpo de la solicitud con la información del usuario en formato JSON utilizando `JSON.stringify(user)`.
3. Maneja la respuesta de la solicitud utilizando `then` y `res.json()` para convertir la respuesta a formato JSON.
4. Devuelve la respuesta en formato JSON.
5. Maneja cualquier error que ocurra durante la solicitud utilizando `catch` para mostrar un mensaje de error en la consola.

### Uso
```javascript
// Ejemplo de uso:
const nuevoUsuario = {
  // ... Proporciona la información del nuevo usuario ...
};

putUser(nuevoUsuario)
  .then(res => console.log(res))
  .catch(error => console.error("Error al añadir usuario: " + error));
```

<br>

## Función getAllUsers

Esta función realiza una solicitud GET a la URL 'https://fakestoreapi.com/users' para obtener la lista completa de usuarios registrados en la API.

### Acciones Realizadas
1. Utiliza `fetch` junto con `await` para realizar una solicitud GET a la URL 'https://fakestoreapi.com/users'.
2. Maneja la respuesta de la solicitud utilizando `await response.json()` para convertir la respuesta a formato JSON.
3. Devuelve la lista completa de usuarios.

### Uso
```javascript
// Ejemplo de uso:
try {
  const listaUsuarios = await getAllUsers();
  console.log(listaUsuarios);
} catch (error) {
  console.error("Error obteniendo usuarios:", error);
}
```
<br>

## Función verifyUser

Esta función verifica la autenticación de un usuario comparando el nombre de usuario (`username`) y la contraseña (`password`) proporcionados con la información de usuarios almacenada tanto en la API como en el localStorage. También realiza acciones como iniciar sesión y recargar la página en caso de autenticación exitosa.

### Parámetros
- `username`: El nombre de usuario proporcionado para la autenticación.
- `password`: La contraseña proporcionada para la autenticación.

### Acciones Realizadas
1. Utiliza la función `getAllUsers` para obtener la lista completa de usuarios desde la API.
2. Verifica la autenticidad del usuario comparando el nombre de usuario y la contraseña con los usuarios de la API y del localStorage.
3. Si encuentra un usuario válido en la API:
   - Llama a la función `login` con la información del usuario autenticado.
   - Recarga la página (`location.reload()`).
   - Retorna `true`.
4. Si encuentra un usuario válido en el localStorage pero no en la API, realiza acciones similares a las del punto 3.
5. Si no encuentra un usuario válido, muestra un mensaje de error en la consola y retorna `false`.
6. Maneja cualquier error que pueda ocurrir durante la verificación y almacenamiento de usuario. En caso de error, redirige a la página de error y retorna `false`.

### Uso
```javascript
// Ejemplo de uso:
try {
  const autenticado = await verifyUser('nombreUsuario', 'contraseñaUsuario');
  console.log(autenticado);
} catch (error) {
  console.error("Error al verificar y almacenar usuario:", error);
  // Manejar el error según sea necesario
}
```

## Función login

Esta función se encarga de realizar el proceso de inicio de sesión para un usuario autenticado. Almacena información relevante en sessionStorage, incluyendo el estado de inicio de sesión (`login`), los detalles del usuario (`user`), y un carrito de compras inicializado (`cart`).

### Parámetros
- `user`: Un objeto que contiene la información del usuario autenticado.

### Acciones Realizadas
1. Utiliza `sessionStorage.setItem` para establecer la variable de estado de inicio de sesión (`login`) en `true`.
2. Almacena la información del usuario (`user`) en formato JSON en sessionStorage.
3. Inicializa un carrito de compras vacío y lo almacena en sessionStorage. El carrito de compras incluye el ID del usuario, la fecha actual y una lista de productos vacía.

### Uso
```javascript
// Ejemplo de uso:
const usuarioAutenticado = {
  // ... Proporciona la información del usuario autenticado ...
};

login(usuarioAutenticado);
```

<br>

## Función usernameExists

Esta función verifica si un nombre de usuario ya está en uso, tanto en la API como en el localStorage.

### Parámetros
- `username`: El nombre de usuario que se desea verificar.

### Acciones Realizadas
1. Utiliza la función `getAllUsers` para obtener la lista completa de usuarios desde la API.
2. Verifica la existencia del nombre de usuario en la API y en el localStorage.
3. Si encuentra el nombre de usuario en la API o en el localStorage, muestra un mensaje de que el nombre de usuario está en uso y retorna `false`.
4. Si no encuentra el nombre de usuario en ninguno de los lugares, muestra un mensaje de éxito en la consola y retorna `true`.
5. Maneja cualquier error que pueda ocurrir durante la verificación del nombre de usuario. En caso de error, muestra un mensaje de error en la consola y retorna `false`.

### Uso
```javascript
// Ejemplo de uso:
try {
  const existeNombreUsuario = await usernameExists('nombreUsuario');
  console.log(existeNombreUsuario);
} catch (error) {
  console.error("Error al verificar nombre de usuario:", error);
  // Manejar el error según sea necesario
}
```

<br>

## Función getUserMaxId

Esta función se encarga de obtener el máximo ID de usuario existente en el localStorage, para asignar un nuevo ID único al próximo usuario registrado.

### Acciones Realizadas
1. Inicializa la variable `maxId` con un valor predeterminado de 11.
2. Utiliza la función `getKeysByPattern("user")` para obtener todas las claves en el localStorage que sigan el patrón "user".
3. Itera sobre las claves y verifica si el ID extraído de cada clave es mayor o igual al valor actual de `maxId`.
4. Si se encuentra un ID mayor o igual, actualiza `maxId` al valor del ID más uno.
5. Retorna el valor final de `maxId`, que ahora es el máximo ID disponible para un nuevo usuario.

### Uso
```javascript
// Ejemplo de uso:
const nuevoIdUsuario = getUserMaxId();
console.log(nuevoIdUsuario);
```

<br>

## Función getKeysByPattern

Esta función se encarga de encontrar las claves en el localStorage que coinciden con un patrón especificado.

### Parámetros
- `pattern`: El patrón que se utilizará para filtrar las claves.

### Acciones Realizadas
1. Utiliza `Object.keys(localStorage)` para obtener todas las claves presentes en el localStorage.
2. Filtra las claves utilizando `Array.filter` y el método `startsWith` para seleccionar solo aquellas que comienzan con el patrón especificado.
3. Retorna un array con las claves que coinciden con el patrón.

### Uso
```javascript
// Ejemplo de uso:
const clavesCoincidentes = getKeysByPattern('user');
console.log(clavesCoincidentes);
```

<br>

## Función getValuesByPattern

Esta función utiliza la función `getKeysByPattern` para encontrar las claves en el localStorage que coinciden con un patrón especificado y luego obtiene los valores correspondientes a esas claves.

### Parámetros
- `pattern`: El patrón que se utilizará para filtrar las claves.

### Acciones Realizadas
1. Utiliza la función `getKeysByPattern` para obtener las claves en el localStorage que coinciden con el patrón especificado.
2. Utiliza `Array.map` para iterar sobre las claves y obtener los valores asociados a esas claves en el localStorage.
3. Si un valor se encuentra en el localStorage, se convierte de JSON a un objeto. Si no se encuentra, se devuelve `null`.
4. Retorna un array con los valores obtenidos.

### Uso
```javascript
// Ejemplo de uso:
const valoresCoincidentes = getValuesByPattern('user');
console.log(valoresCoincidentes);
```

<br>

## Función verifyProductLocalStorage

Esta función verifica si la información de un producto proveniente de la API existe en el localStorage. Si el producto no está presente, se devuelve directamente; de lo contrario, se devuelve la información del producto almacenada en el localStorage.

### Parámetros
- `product`: Un objeto que representa la información de un producto proveniente de la API.

### Acciones Realizadas
1. Utiliza `localStorage.getItem` para obtener la información asociada a la clave "product" concatenada con el ID del producto en el localStorage.
2. Verifica si el resultado es `null`, lo que indica que el producto no está en el localStorage.
    - Si no está en el localStorage, muestra un mensaje en la consola indicando que no está presente y devuelve el producto original.
3. Si la información del producto está presente en el localStorage:
    - Verifica si el método de almacenamiento es "delete". Si es así, muestra un mensaje indicando que el producto ha sido eliminado.
    - Si no es un método de eliminación, devuelve la información del producto almacenada en el localStorage.

### Uso
```javascript
// Ejemplo de uso:
const productoDesdeAPI = {
  // ... Proporciona la información del producto desde la API ...
};

const productoVerificado = verifyProductLocalStorage(productoDesdeAPI);
console.log(productoVerificado);
```

<br>

## Función getAllProducts

Esta función realiza una solicitud GET a la URL 'https://fakestoreapi.com/products' para obtener la lista completa de productos desde la API. Luego, itera sobre la lista, utiliza la función `verifyProductLocalStorage` para verificar la existencia de cada producto en el localStorage y crea tarjetas (`createCard`) para mostrar los productos en la interfaz.

### Acciones Realizadas
1. Utiliza `fetch` junto con `await` para realizar una solicitud GET a la URL 'https://fakestoreapi.com/products'.
2. Maneja la respuesta de la solicitud utilizando `await response.json()` para convertir la respuesta a formato JSON.
3. Itera sobre la lista de productos y utiliza la función `verifyProductLocalStorage` para verificar y obtener la información de cada producto.
4. Llama a la función `createCard` para crear tarjetas de visualización de productos en la interfaz.
5. Llama a `getAllProductsLocalStorage` para obtener y mostrar productos almacenados localmente.
6. Retorna la lista completa de productos desde la API.

### Uso
```javascript
// Ejemplo de uso:
try {
  const listaProductos = await getAllProducts();
  console.log(listaProductos);
} catch (error) {
  console.error("Error obteniendo productos:", error);
  // Manejar el error según sea necesario
}
```

<br>

## Función getProductMaxId

Esta función se encarga de obtener el máximo ID de producto existente en el localStorage, considerando también el ID del último producto en la lista obtenida desde la API.

### Parámetros
- `json`: Un objeto que representa la información de un producto proveniente de la API.

### Acciones Realizadas
1. Inicializa la variable `maxId` con el ID del producto proporcionado por la API (`json.id`).
2. Utiliza la función `getKeysByPattern("product")` para obtener todas las claves en el localStorage que sigan el patrón "product".
3. Itera sobre las claves y verifica si el ID extraído de cada clave es mayor o igual al valor actual de `maxId`.
4. Si se encuentra un ID mayor o igual, actualiza `maxId` al valor del ID más uno.
5. Retorna el valor final de `maxId`, que ahora es el máximo ID disponible para un nuevo producto.

### Uso
```javascript
// Ejemplo de uso:
const nuevoIdProducto = getProductMaxId({
  // ... Proporciona la información del producto desde la API ...
});
console.log(nuevoIdProducto);
```

<br>

## Función postProduct

Esta función realiza una solicitud POST a la URL 'https://fakestoreapi.com/products' para agregar un nuevo producto al carrito. Luego, utiliza la función `getProductMaxId` para obtener un nuevo ID único para el producto y lo almacena en el localStorage con la clave "product" concatenada con el nuevo ID.

### Parámetros
- `product`: Un objeto que representa la información del producto a ser agregado al carrito.

### Acciones Realizadas
1. Utiliza `fetch` junto con `await` para realizar una solicitud POST a la URL 'https://fakestoreapi.com/products' con la información del producto.
2. Convierte la respuesta a formato JSON utilizando `await response.json()`.
3. Utiliza la función `getProductMaxId` para obtener un nuevo ID único para el producto basándose en la información de la respuesta.
4. Modifica el objeto `product` original agregándole el nuevo ID obtenido.
5. Almacena la información del producto modificado en el localStorage con la clave "product" concatenada con el nuevo ID.
6. Imprime información relevante en la consola.
7. Recarga la página para reflejar los cambios en la interfaz.

### Uso
```javascript
// Ejemplo de uso:
const nuevoProducto = {
  // ... Proporciona la información del nuevo producto ...
};

postProduct(nuevoProducto);
```

<br>

## Función getAllCategories

Esta función realiza una solicitud GET a la URL 'https://fakestoreapi.com/products/categories' para obtener la lista completa de categorías desde la API. Luego, utiliza la función `createBtn` para crear botones de categorías en la interfaz.

### Acciones Realizadas
1. Utiliza `fetch` junto con `await` para realizar una solicitud GET a la URL 'https://fakestoreapi.com/products/categories'.
2. Maneja la respuesta de la solicitud utilizando `await response.json()` para convertir la respuesta a formato JSON.
3. Llama a la función `createBtn` para crear botones de categorías en la interfaz.
4. Imprime la lista de categorías en la consola.
5. Retorna la lista completa de categorías desde la API.

### Uso
```javascript
// Ejemplo de uso:
try {
  const listaCategorias = await getAllCategories();
  console.log(listaCategorias);
} catch (error) {
  console.error("Error obteniendo categorías:", error);
  // Manejar el error según sea necesario
}
```

<br>

## Función getSpecificCategory

Esta función realiza una solicitud GET a la URL 'https://fakestoreapi.com/products/category/${category}' para obtener productos de una categoría específica desde la API. Luego, itera sobre la lista de productos, utiliza la función `verifyProductLocalStorage` para verificar la existencia de cada producto en el localStorage y crea tarjetas (`createCard`) para mostrar los productos de la categoría en la interfaz.

### Parámetros
- `category`: Una cadena que representa la categoría específica de productos que se desea obtener.

### Acciones Realizadas
1. Construye la URL utilizando la variable `category` para obtener productos de la categoría específica.
2. Utiliza `fetch` junto con `await` para realizar una solicitud GET a la URL construida.
3. Maneja la respuesta de la solicitud utilizando `await response.json()` para convertir la respuesta a formato JSON.
4. Itera sobre la lista de productos y utiliza la función `verifyProductLocalStorage` para verificar y obtener la información de cada producto.
5. Crea tarjetas de visualización de productos en la interfaz llamando a la función `createCard`.
6. Llama a `getSpecificCategoryLocalStorage` para obtener y mostrar productos de la categoría almacenados localmente.

### Uso
```javascript
// Ejemplo de uso:
try {
  const categoriaEspecifica = 'jewelery'; // Reemplazar con la categoría deseada
  getSpecificCategory(categoriaEspecifica);
} catch (error) {
  console.error("Error obteniendo productos de la categoría:", error);
  // Manejar el error según sea necesario
}
```

<br>

## Función getAllProductsLocalStorage

Esta función obtiene y muestra todos los productos almacenados localmente en el localStorage. Itera sobre la lista de productos almacenados, utiliza la función `createCard` para crear tarjetas de visualización y muestra los productos en la interfaz.

### Acciones Realizadas
1. Utiliza `getValuesByPattern("product")` para obtener todos los productos almacenados localmente en el localStorage.
2. Itera sobre la lista de productos obtenidos y verifica si cada producto es de la API o si ha sido marcado como borrado (`el.method === "delete"` o `el.id < 21`).
    - Si es de la API o está marcado como borrado, muestra un mensaje en la consola indicando que el producto es de la API o ha sido eliminado.
    - Si no es de la API ni ha sido eliminado, llama a `createCard` para crear una tarjeta de visualización del producto en la interfaz y muestra un mensaje indicando que el producto es de localStorage.
3. Retorna la lista de productos almacenados localmente.

### Uso
```javascript
// Ejemplo de uso:
const productosLocalStorage = getAllProductsLocalStorage();
console.log(productosLocalStorage);
```

<br>

## Función getSpecificCategoryLocalStorage

Esta función obtiene y muestra todos los productos almacenados localmente en el localStorage que pertenecen a una categoría específica. Itera sobre la lista de productos almacenados, verifica si cada producto pertenece a la categoría proporcionada y si no ha sido marcado como borrado (`el.method !== "delete"`). Utiliza la función `createCard` para crear tarjetas de visualización y muestra los productos de la categoría en la interfaz.

### Parámetros
- `category`: Una cadena que representa la categoría específica de productos que se desea obtener.

### Acciones Realizadas
1. Utiliza `getValuesByPattern("product")` para obtener todos los productos almacenados localmente en el localStorage.
2. Itera sobre la lista de productos obtenidos y verifica si cada producto pertenece a la categoría proporcionada (`el.category === category`) y si no ha sido marcado como borrado (`el.method !== "delete"`).
    - Si el producto pertenece a la categoría y no ha sido marcado como borrado, muestra un mensaje en la consola indicando que el producto es de la categoría y llama a `createCard` para crear una tarjeta de visualización del producto en la interfaz.
    - Si el producto no pertenece a la categoría, muestra un mensaje en la consola indicando que el producto no es de la categoría.
3. No retorna ningún valor ya que la función se encarga de mostrar los productos directamente en la interfaz.

### Uso
```javascript
// Ejemplo de uso:
const categoriaEspecifica = 'jewelery'; // Reemplazar con la categoría deseada
getSpecificCategoryLocalStorage(categoriaEspecifica);
```

<br>

## Función getCartMaxId

Esta función se encarga de obtener el máximo ID de carrito existente en el localStorage. Itera sobre las claves en el localStorage que siguen el patrón "cart" y determina el máximo ID actual, luego lo incrementa en uno para obtener un nuevo ID único.

### Parámetros
- `json`: Un objeto que representa la información del carrito obtenida desde la API.

### Acciones Realizadas
1. Inicializa la variable `maxId` con el ID del carrito proporcionado por la API (`json.id`).
2. Utiliza `getKeysByPattern("cart")` para obtener todas las claves en el localStorage que sigan el patrón "cart".
3. Itera sobre las claves y verifica si el ID extraído de cada clave es mayor o igual al valor actual de `maxId`.
4. Si se encuentra un ID mayor o igual, actualiza `maxId` al valor del ID más uno.
5. Retorna el valor final de `maxId`, que ahora es el máximo ID disponible para un nuevo carrito.

### Uso
```javascript
// Ejemplo de uso:
const nuevoIdCarrito = getCartMaxId({
  // ... Proporciona la información del carrito desde la API ...
});
console.log(nuevoIdCarrito);
```

<br>

## Función postCart

Esta función realiza una solicitud POST a la URL 'https://fakestoreapi.com/carts' para comprar el carrito actual almacenado en la sessionStorage. Primero, obtiene el carrito desde la sessionStorage, realiza la solicitud POST y luego almacena la información del carrito en el localStorage.

### Acciones Realizadas
1. Obtiene el carrito actual desde la sessionStorage utilizando `JSON.parse(sessionStorage.getItem("cart"))`.
2. Utiliza `fetch` junto con `await` para realizar una solicitud POST a la URL 'https://fakestoreapi.com/carts', enviando el carrito como el cuerpo de la solicitud y estableciendo el tipo de contenido como 'application/json'.
3. Maneja la respuesta de la solicitud utilizando `await response.json()` para convertir la respuesta a formato JSON.
4. Utiliza la función `getCartMaxId` para obtener un nuevo ID único para el carrito basándose en la información proporcionada desde la API.
5. Modifica el carrito con el nuevo ID obtenido y lo almacena en el localStorage utilizando `localStorage.setItem`.
6. Imprime información sobre el carrito modificado en la consola.

### Uso
```javascript
// Ejemplo de uso:
try {
  await postCart();
} catch (error) {
  console.error("Error al comprar el carrito:", error);
  // Manejar el error según sea necesario
}
```

<br>

## Evento de Compra (buyBtn)

Este código define un evento de clic para el botón de compra (`buyBtn`). Cuando se hace clic en este botón, se realiza la compra del carrito actual llamando a la función `postCart`. Luego, obtiene el usuario actual desde la sessionStorage, imprime información sobre el usuario y establece una nueva estructura de carrito vacío en la sessionStorage. Finalmente, cierra el modal del carrito.

### Acciones Realizadas
1. Selecciona el botón de compra en el DOM utilizando `document.querySelector("#buy")`.
2. Agrega un evento de clic al botón utilizando `buyBtn.addEventListener('click', ...)`.
3. Dentro del manejador de eventos:
   - Llama a la función `postCart` para realizar la compra del carrito actual.
   - Obtiene el usuario actual desde la sessionStorage utilizando `JSON.parse(sessionStorage.getItem("user"))`.
   - Imprime información sobre el usuario actual en la consola.
   - Establece una nueva estructura de carrito vacío en la sessionStorage.
   - Cierra el modal del carrito.

### Uso
```javascript
// Ejemplo de uso:
const buyBtn = document.querySelector("#buy");
buyBtn.addEventListener('click', () => {
    postCart();
    const user = JSON.parse(sessionStorage.getItem("user"));
    console.log("Usuario: ", user);
    console.log("ID de Usuario: ", user.id);
    sessionStorage.setItem("cart", JSON.stringify({
        userId: user.id,
        date: dateFormat(),
        products: []
    }));
    // Cerrar el modal del carrito (cartModal.close());
});
```

<br>

## Función addCart

Esta función se encarga de agregar un producto al carrito en la sessionStorage. Verifica si el producto ya está en el carrito y, en ese caso, incrementa la cantidad. Si el producto no está en el carrito, agrega un nuevo elemento al array de productos del carrito.

### Parámetros
- `el`: Un objeto que representa la información del producto que se va a agregar al carrito.

### Acciones Realizadas
1. Obtiene el carrito actual desde la sessionStorage utilizando `JSON.parse(sessionStorage.getItem("cart"))`.
2. Busca el producto en el carrito utilizando `userCart.products.find(pro => pro.productId === el.id)`.
   - Si el producto ya está en el carrito:
     - Incrementa la cantidad del producto en el carrito (`productCart.quantity += 1`).
     - Muestra un mensaje en la consola indicando que el producto ya existe.
   - Si el producto no está en el carrito:
     - Agrega un nuevo elemento al array de productos del carrito con la información del producto y una cantidad inicial de 1.
     - Muestra un mensaje en la consola indicando que el producto no existe.
3. Actualiza la sessionStorage con el carrito modificado utilizando `sessionStorage.setItem("cart",JSON.stringify(userCart))`.

### Uso
```javascript
// Ejemplo de uso:
const productoAgregado = {
    id: 123,
    // ... Otras propiedades del producto ...
};
addCart(productoAgregado);
```

<br>

## Función createCartProduct

Esta función se encarga de crear y actualizar la representación en el DOM de los productos en el carrito. Obtiene la información del carrito desde la sessionStorage, recorre los productos en el carrito y utiliza la información de cada producto para crear elementos HTML que representan visualmente los productos en el carrito.

### Acciones Realizadas
1. Obtiene el carrito actual desde la sessionStorage utilizando `JSON.parse(sessionStorage.getItem("cart"))`.
2. Limpia el contenido del elemento con el id `cartProducts` en el DOM (`cartProducts.innerHTML = ""`).
3. Obtiene la lista de productos del carrito desde el carrito actual.
4. Itera sobre cada producto en la lista:
   - Utiliza la función `getSpecificProduct` para obtener la información detallada del producto desde la API o el almacenamiento local.
   - Crea elementos HTML para representar el producto en el carrito, incluyendo una imagen, un título y la cantidad.
   - Agrega estos elementos al DOM.
5. La función ahora ha actualizado la representación visual de los productos en el carrito en el DOM.

### Uso
```javascript
// Ejemplo de uso:
try {
  await createCartProduct();
} catch (error) {
  console.error("Error al crear la representación del carrito:", error);
  // Manejar el error según sea necesario
}
```

<br>

## Función getSpecificProduct

Esta función se encarga de obtener la información detallada de un producto mediante su ID. Primero, verifica si la información del producto está almacenada en el localStorage. Si está presente, utiliza esa información. De lo contrario, realiza una solicitud a la API utilizando el ID del producto.

### Parámetros
- `id`: El ID del producto para el cual se desea obtener información detallada.

### Acciones Realizadas
1. Intenta obtener la información del producto desde el localStorage utilizando `JSON.parse(localStorage.getItem("product"+id))`.
   - Si la información del producto está en el localStorage, retorna esa información.
   - Si no está presente en el localStorage, continúa con el siguiente paso.
2. Construye la URL de la API utilizando el ID del producto.
3. Utiliza `fetch` junto con `await` para realizar una solicitud GET a la URL de la API.
4. Convierte la respuesta a formato JSON utilizando `await response.json()`.
5. Retorna la información detallada del producto obtenida de la API.

### Uso
```javascript
// Ejemplo de uso:
try {
  const productId = 123; // Reemplazar con el ID del producto deseado
  const productInfo = await getSpecificProduct(productId);
  console.log("Información del Producto:", productInfo);
} catch (error) {
  console.error("Error al obtener la información del producto:", error);
  // Manejar el error según sea necesario
}
```

<br>

## Función dateFormat

Esta función devuelve una cadena de texto formateada que representa la fecha actual en el formato "YYYY-MM-DD".

### Acciones Realizadas
1. Crea una nueva instancia de la clase `Date` para obtener la fecha y hora actuales.
2. Obtiene el día, el mes y el año actual de la fecha.
3. Formatea la fecha en una cadena de texto con el formato "YYYY-MM-DD".
4. Retorna la cadena de texto formateada.

### Uso
```javascript
// Ejemplo de uso:
const formattedDate = dateFormat();
console.log("Fecha Formateada:", formattedDate);
```

<br>

## Evento de Formulario para Crear Producto

Este evento de formulario maneja la creación de un nuevo producto cuando se envía el formulario correspondiente. Se capturan los datos del formulario, se crean los objetos del producto y luego se llama a la función `postProduct` para enviar el nuevo producto al servidor o almacenarlo localmente.

### Acciones Realizadas
1. El evento de formulario utiliza `event.preventDefault()` para evitar que el formulario se envíe por defecto y cause la recarga de la página.
2. Obtiene los datos del formulario, incluyendo el título, el precio, la categoría, la descripción y la URL de la imagen.
3. Crea un objeto `product` con la información obtenida del formulario.
4. Muestra la información del producto en la consola con `console.log(product)` (esto puede ser útil para verificar que los datos se obtuvieron correctamente).
5. Llama a la función `postProduct(product)` para enviar o almacenar el nuevo producto.

### Uso
```html
<!-- Ejemplo de formulario HTML asociado al evento -->
<form id="createProductSubmit">
    <!-- Campos del formulario: title, price, category, description, image -->
    <!-- ... -->
    <button type="submit">Crear Producto</button>
</form>
```

<br>

## Función toggleActive

Esta función se encarga de cambiar la clase "active" en elementos de navegación, asegurándose de que solo un elemento esté activo a la vez.

### Parámetros
- `element`: El elemento al que se le aplicará la clase "active".

### Acciones Realizadas
1. Utiliza `document.querySelectorAll('.nav li')` para seleccionar todos los elementos de lista (`li`) dentro del contenedor con la clase "nav".
2. Itera sobre cada elemento de la lista y remueve la clase "active" para desactivar todos los elementos.
3. Añade la clase "active" al elemento específico pasado como parámetro.

### Uso
```javascript
// Ejemplo de uso:
const clickedNavItem = document.getElementById('navItem1'); // Reemplazar con el elemento que se hizo clic
toggleActive(clickedNavItem);
```

# Product.js

## Función getIdFromUrl

Esta función se encarga de obtener el valor del parámetro 'id' de la URL actual utilizando la API de URLSearchParams.

### Acciones Realizadas
1. Crea una nueva instancia de `URLSearchParams` con los parámetros de la URL actual.
2. Utiliza el método `get('id')` para obtener el valor del parámetro 'id'.
3. Retorna el valor obtenido.

### Uso
```javascript
// Ejemplo de uso:
const productId = getIdFromUrl();
console.log("ID del producto:", productId);
```

<br>

## Función updateProduct

Esta función se encarga de enviar una solicitud PUT para actualizar la información de un producto en una API externa y, después de la actualización exitosa, llama a la función `setUpdate` (presumiblemente para realizar acciones adicionales relacionadas con la actualización del producto).

### Parámetros
- `product`: El objeto del producto que contiene la información actualizada.

### Acciones Realizadas
1. Utiliza `fetch` para enviar una solicitud PUT a la URL específica de la API (`https://fakestoreapi.com/products/${product.id}`) con el cuerpo de la solicitud JSON que contiene la información actualizada del producto.
2. Convierte la respuesta a formato JSON utilizando `.then(res => res.json())`.
3. Llama a la función `setUpdate(product)` después de que la actualización del producto en la API es exitosa.

### Uso
```javascript
// Ejemplo de uso:
const updatedProduct = {
    id: 123,
    // ... otras propiedades actualizadas del producto
};

updateProduct(updatedProduct);
```

<br>

## Función deleteProduct

Esta función se encarga de enviar una solicitud DELETE para eliminar un producto de una API externa. También realiza algunas verificaciones adicionales para manejar el caso en que el producto no exista en la API y si se ha modificado localmente.

### Parámetros
- `id`: El ID del producto que se eliminará.

### Acciones Realizadas
1. Construye la URL específica del producto con el ID proporcionado: `https://fakestoreapi.com/products/${id}`.
2. Realiza una solicitud DELETE a la URL construida.
3. Si el producto tiene un ID menor a 21 (posiblemente indicando que es un producto de la API y no local), verifica si el producto ha sido modificado localmente. Si es así, se llama a `setDelete` con la información del producto modificado.
4. Si la respuesta de la API es `null`, indica que el objeto no es de la API.
5. Si el producto no ha sido modificado localmente, se marca como eliminado (`"method": "delete"`) y se llama a `setDelete` con la información del producto marcado como eliminado.
6. Si el ID es mayor o igual a 21, se obtiene la información del producto de localStorage, se marca como eliminado y se llama a `setDelete` con la información del producto marcado como eliminado.

### Uso
```javascript
// Ejemplo de uso:
const productIdToDelete = 123;
deleteProduct(productIdToDelete);
```
<br>

## Función setUpdate

Esta función se encarga de actualizar la información de un producto en el almacenamiento local (localStorage). Recibe un objeto `product` que representa la información actualizada del producto.

### Parámetros
- `product`: El objeto del producto que contiene la información actualizada.

### Acciones Realizadas
1. Obtiene todas las claves del almacenamiento local que coinciden con el patrón "product".
2. Intenta almacenar la información actualizada del producto en el localStorage utilizando la clave "product" concatenada con el ID del producto.
3. Imprime en la consola "Update product" si la actualización es exitosa.
4. Captura y maneja cualquier error que pueda ocurrir durante el proceso de actualización, imprimiendo un mensaje de error en la consola.

### Uso
```javascript
// Ejemplo de uso:
const updatedProduct = {
    id: 123,
    // ... otras propiedades actualizadas del producto
};

setUpdate(updatedProduct);
```
<br>

## Función setDelete

Esta función se encarga de gestionar la eliminación de un producto en el almacenamiento local (localStorage). Recibe un objeto `product` que representa la información del producto a ser eliminado o marcado como eliminado.

### Parámetros
- `product`: El objeto del producto que se eliminará o marcará como eliminado.

### Acciones Realizadas
1. Verifica si `product` existe (no es `null` ni `undefined`).
2. Si `product` existe, imprime la información del producto en la consola y almacena el objeto del producto en el localStorage utilizando la clave "product" concatenada con el ID del producto.
3. Si `product` no existe, imprime en la consola el mensaje "Esta en local storage".

### Uso
```javascript
// Ejemplo de uso:
const productToDelete = {
    id: 123,
    // ... otras propiedades del producto
};

setDelete(productToDelete);
```

<br>

## Función createEditForm

Esta función se encarga de crear un formulario de edición dinámico para un producto específico. Recibe una promesa `productPromise` que representa la información del producto a ser editado.

### Parámetros
- `productPromise`: Una promesa que se resolverá con la información del producto.

### Acciones Realizadas
1. Obtiene la información del producto a través de la promesa.
2. Itera sobre las propiedades del producto, excluyendo la propiedad "rating".
3. Para cada propiedad, crea un elemento `label` y `input` correspondiente en el formulario de edición.
4. Asigna valores y atributos a los elementos `label` e `input` según la propiedad del producto.
5. Añade los elementos `label` e `input` al formulario de edición.
6. Crea un botón de tipo submit y lo añade al formulario.

### Uso
```javascript
// Ejemplo de uso:
const productPromise = fetchProductData(); // Reemplaza con la función que obtiene la información del producto.
createEditForm(productPromise);
```

<br>

## Evento de Envío del Formulario de Edición en el Modal

Este bloque de código representa el evento de envío del formulario de edición en un modal. A continuación, se detalla su funcionamiento.

### Acciones Realizadas
1. El evento se dispara al intentar enviar el formulario de edición.
2. Se utiliza `event.preventDefault()` para evitar que el formulario se envíe por defecto, ya que se manejará la lógica manualmente.
3. Se obtienen los elementos del formulario por sus IDs (`id`, `title`, `price`, `description`, `image`, `category`).
4. Se crea un objeto `product` con las propiedades del producto actualizado, utilizando los valores de los elementos del formulario.
5. Se imprime el objeto `product` en la consola para verificar la información que se enviará.
6. Se realiza la validación (pendiente de implementar).
7. Se llama a la función `updateProduct(product)` para enviar la solicitud de actualización al servidor API.

### Observaciones
- **Validaciones**: Se recomienda agregar lógica de validación para asegurarse de que los campos del formulario contengan valores válidos antes de enviar la solicitud de actualización.

### Uso
```javascript
// Ejemplo de uso:
const updateForm = document.getElementById('updateForm');
updateForm.addEventListener('submit', function(event) {
    // ... (código del evento)
});
```

<br>

# User.js

## Componente de Datos de Usuario

Este fragmento de código crea un componente visual para mostrar los datos del usuario. A continuación, se detalla su funcionamiento.

### Acciones Realizadas
1. Se obtiene el objeto de usuario desde la sesión de almacenamiento (`sessionStorage`).
2. Se crean elementos HTML (`div`, `h3`, `h4`, `h5`) para representar la información del usuario.
3. Se asignan los valores correspondientes a cada elemento HTML.
4. Se anidan los elementos en la estructura del DOM (`userCart` contiene `name`, `email`, y `firstname`).
5. Finalmente, se agrega el componente `userCart` al contenedor especificado en la variable `container`.

### Observaciones
- Asegúrate de que el elemento con el ID especificado en la variable `container` exista en el DOM antes de intentar agregar el componente.

### Uso
```javascript
// Ejemplo de uso:
const container = document.getElementById('container'); // Reemplaza 'container' con el ID de tu contenedor
userDataComponent();
```

<br>

## Obtener Carritos de Usuario

Este fragmento de código define una función asincrónica llamada `getUserCarts`, que se encarga de obtener y mostrar los carritos de un usuario desde una API falsa (`https://fakestoreapi.com/carts`) o desde el almacenamiento local (`localStorage`). A continuación, se proporciona una explicación detallada:

### Funcionalidad
1. **Parámetro `userId`**: La función acepta un parámetro `userId` que representa el identificador único del usuario.

2. **Condicional para Usuarios de la API (ID < 11)**:
   - Se construye la URL de la API para obtener los carritos del usuario.
   - Se realiza una solicitud `fetch` a la API y se obtiene la respuesta en formato JSON.
   - Se itera sobre los elementos de la respuesta y se llama a la función `cartComponent` para mostrar cada carrito.

3. **Condicional para Usuarios Locales (ID >= 11)**:
   - Si el `userId` no pertenece a la API (ID >= 11), se obtienen los carritos del almacenamiento local (`localStorage`).
   - Se itera sobre los carritos almacenados localmente y se llama a `cartComponent` para mostrar cada carrito.

### Observaciones
- La función `cartComponent` se asume que está definida y se utiliza para representar visualmente la información de cada carrito.
- Asegúrate de haber definido y cargado la función `cartComponent` antes de llamar a `getUserCarts`.

### Ejemplo de Uso
```javascript
// Ejemplo de llamada a la función para obtener carritos de usuario con ID 5
getUserCarts(5);
```

<br>

## Componente de Carrito

Este fragmento de código define una función asincrónica llamada `cartComponent`, que se encarga de mostrar visualmente la información de un carrito. A continuación, se proporciona una explicación detallada:

### Funcionalidad
1. **Parámetro `cart`**: La función acepta un parámetro `cart` que representa la información de un carrito, incluyendo su identificador (`id`) y una lista de productos con cantidades.

2. **Creación de Elementos HTML**:
   - Se crea un elemento `div` para representar visualmente el carrito.
   - Se crea un elemento `h3` para mostrar el identificador del carrito (`id`).
   - Se itera sobre la lista de productos en el carrito y se obtiene información detallada de cada producto llamando a la función `getSpecificProduct`.
   - Se crean elementos `div`, `h3` e `img` para mostrar la información de cada producto, como título, cantidad y una imagen.

3. **Estilo CSS**:
   - Se aplican clases CSS (`cartProducts` y `productData`) a los elementos HTML para estilizar visualmente el carrito y los productos.

4. **Renderización en el Contenedor**:
   - Se añaden los elementos creados al contenedor HTML destinado para mostrar los carritos (`cartContainer`).

### Observaciones
- La función `getSpecificProduct` se asume que está definida y se utiliza para obtener detalles específicos de cada producto.
- Asegúrate de haber definido y cargado la función `getSpecificProduct` antes de llamar a `cartComponent`.

### Ejemplo de Uso
```javascript
// Ejemplo de llamada a la función para representar visualmente un carrito
const exampleCart = {
  id: 1,
  products: [
    { productId: 101, quantity: 2 },
    { productId: 102, quantity: 1 },
    // ... más productos
  ],
};
cartComponent(exampleCart);
```

<br>

# Litelements.js

## Clase MyFooter

Esta clase define el WebComponent <my-footer></my-footer> con el uso de la libreria Litelements.

### Funcionalidad
1. **CSS**: se definen los estilos del componente utilizando la función css de Lit. Los estilos son aplicados al componente.

2. **isIndexPage()**: Método que determina si la página actual es "index.html" verificando la ruta de la ventana (window.location.pathname).
