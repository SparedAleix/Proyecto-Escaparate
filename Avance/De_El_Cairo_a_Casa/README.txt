# Proyecto: De El Cairo a Casa

## 🛍️ Descripción general
Este proyecto es una simulación completa de una tienda online de souvenirs egipcios desarrollada con tecnologías del lado del cliente: HTML, CSS, Bootstrap, JavaScript y localStorage. El sitio permite:

- Ver un escaparate de novedades y catálogo completo
- Buscar productos por texto o por voz (Speech Recognition)
- Añadir productos a un carrito (guardado en `localStorage`)
- Iniciar sesión o registrarse con validación por expresiones regulares
- Validar usuarios contra una lista de registros almacenados en el navegador
- Consultar información legal mediante modales

Todo funciona de forma local, sin backend ni servidor.

---

## 🧱 Estructura del proyecto
```
De_El_Cairo_a_Casa/
├── index.html          → Página principal
├── carrito.html        → Vista del carrito
├── css/style.css       → Estilos personalizados
├── js/script.js        → Funcionalidad JavaScript
├── data/productos.json → Catálogo en formato JSON
├── img/                → Imágenes de productos y fondo
└── README.txt          → Este archivo explicativo
```

---

## 🌐 index.html
Contiene la estructura HTML principal de la tienda.

### 🧭 Barra de navegación
- Logo integrado
- Enlaces a secciones: "Novedades" y "Catálogo"
- Barra de búsqueda + botón de voz
- Botón "Iniciar sesión" o nombre del usuario (si está logueado)
- Acceso al carrito

### 🔐 Autenticación
- Modal de **iniciar sesión** con usuario y contraseña
- Modal de **registro**, validado con expresiones regulares:
  ```js
  /^[a-zA-Z0-9]{4,12}$/   // usuario alfanumérico 4-12 caracteres
  /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/ // contraseña con letras y números
  ```
- Registro guarda el usuario y contraseña en un array de objetos:
  ```js
  usuarios.push({ nombre: nuevoUsuario, clave: nuevaClave });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  ```
- Login solo se permite si el usuario existe y la contraseña coincide:
  ```js
  const coincide = usuarios.find(u => u.nombre === usuario && u.clave === clave);
  ```

### 👤 Perfil de usuario
- Una vez logueado, se muestra su nombre como botón estilizado
- Al hacer clic, se abre un **modal de perfil** con opción de cerrar sesión

### 🖼️ Secciones de productos
- `#lista-novedades` para productos marcados como `novedad: true`
- `#lista-productos` muestra todos los productos como **carrusel horizontal**

### 📄 Pie de página
- Contiene enlaces legales: privacidad, cookies, aviso legal, etc.
- Cada uno abre su propio **modal Bootstrap**

---

## 🎨 style.css
Estilos personalizados:

### 🎨 Fondo
```css
body {
  background-image: url('../img/Fondo-pagina.jpg');
  background-size: cover;
  background-attachment: fixed;
}
```

### 🧭 Navegación
- Botones con borde blanco (`btn-outline-light`)
- Logo dimensionado dentro del navbar
- Botón de usuario tiene mismo estilo que el de iniciar sesión

### 🛍️ Productos (cards)
```css
.card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}
```

### 🎠 Carrusel de catálogo
```css
#lista-productos {
  scroll-snap-type: x mandatory;
  overflow-x: auto;
  display: flex;
}
```

---

## 💻 script.js
Maneja toda la lógica del sitio:

### 🍪 Cookies
Muestra un banner de cookies si no fueron aceptadas aún:
```js
if (!localStorage.getItem('cookiesAceptadas')) {
  document.getElementById('cookie-banner').style.display = 'block';
}
```

### 🔐 Login y registro con validación y comprobación
- Registro guarda usuario/clave en array `usuarios[]` en localStorage
- Si el usuario ya existe, lo bloquea
- Login verifica si existe y coincide con contraseña antes de permitir el acceso

### 👤 Perfil
Si el usuario está logueado:
```js
usuarioBtn.textContent = usuario;
usuarioBtn.classList.remove('d-none');
```
Al hacer clic, se abre el modal con su nombre y botón de cerrar sesión.

### 🛒 Carrito de compras
- Los productos se almacenan en `localStorage` como array
- El botón muestra la cantidad total de productos
- Funcionalidad para añadir productos al carrito si se ha iniciado sesión

### 🔎 Buscador y voz
```js
buscador.addEventListener('input', () => {
  // filtra cards por nombre
});
```
```js
const reconocimiento = new webkitSpeechRecognition();
// activa micrófono y escribe en buscador
```

---

## 📦 productos.json
Archivo con la información de los productos:
```json
{
  "nombre": "Mini Pirámide Dorada",
  "descripcion": "Réplica decorativa...",
  "precio": 8.5,
  "imagen": "img/piramide.jpg",
  "novedad": true
}
```

Se carga en `script.js` con:
```js
fetch('data/productos.json').then(res => res.json()).then(data => mostrarProductos(data));
```

---

## 🧾 carrito.html
Página del carrito donde se visualizan los productos seleccionados:
- Listado con imagen, nombre y precio
- Cálculo del total
- Botón para vaciar el carrito
- Botón para simular "finalizar compra"

---

## 💡 Funcionalidades clave
✔️ Responsive con Bootstrap  
✔️ Accesibilidad con textos claros y estructura ordenada  
✔️ Experiencia de usuario realista aunque todo funcione sin backend  
✔️ Interacción moderna: reconocimiento de voz, navegación sin recargar  
✔️ Gestión de usuarios con validación realista (nombre + contraseña)

---

## 🔐 Validación de requisitos del proyecto
- ✅ HTML + CSS + JavaScript + Bootstrap ✔️
- ✅ LocalStorage para sesión y carrito ✔️
- ✅ AJAX + JSON ✔️
- ✅ Registro con validación regex ✔️
- ✅ Validación de usuario al iniciar sesión ✔️
- ✅ Modales informativos ✔️
- ✅ Carrusel horizontal ✔️
- ✅ SpeechRecognition ✔️

---

## ✍️ Autor y contexto
Este proyecto ha sido desarrollado como práctica de curso para aprender desarrollo web en entorno cliente.  
Trabajo realizado por: [Tu nombre aquí] – 2025

---

¡Gracias por revisar este README! Puedes ejecutar el proyecto abriendo `index.html` en cualquier navegador moderno.
