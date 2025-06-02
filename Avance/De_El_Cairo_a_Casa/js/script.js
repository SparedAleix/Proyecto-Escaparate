// Mostrar u ocultar el banner de cookies:

window.addEventListener('load', () => {
  if (!localStorage.getItem('cookiesAceptadas')) {
    document.getElementById('cookie-banner').style.display = 'block';
  }

  document.getElementById('accept-cookies').addEventListener('click', () => {
    localStorage.setItem('cookiesAceptadas', 'true');
    document.getElementById('cookie-banner').style.display = 'none';
  });
});

// Login con verificación de usuario registrado:

const formLogin = document.getElementById('form-login');
formLogin?.addEventListener('submit', (e) => {
  e.preventDefault();
  const usuario = document.getElementById('usuario').value;
  const clave = document.getElementById('clave').value;

  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const coincide = usuarios.find(u => u.nombre === usuario && u.clave === clave);

  if (!coincide) {
    alert('Usuario o contraseña incorrectos.');
    return;
  }

  localStorage.setItem('usuario', usuario);
  alert('Sesión iniciada');
  document.querySelector('#modalLogin .btn-close')?.click();
  mostrarUsuarioLogueado();
});

// Registro con validación y almacenamiento:

const formRegistro = document.getElementById('form-registro');
formRegistro?.addEventListener('submit', (e) => {
  e.preventDefault();
  const nuevoUsuario = document.getElementById('nuevoUsuario').value;
  const nuevaClave = document.getElementById('nuevaClave').value;

  const regexUsuario = /^[a-zA-Z0-9]{4,12}$/;
  const regexClave = /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;

  if (!regexUsuario.test(nuevoUsuario)) {
    alert('El usuario debe tener entre 4 y 12 caracteres alfanuméricos.');
    return;
  }

  if (!regexClave.test(nuevaClave)) {
    alert('La contraseña debe tener al menos 6 caracteres, incluyendo letras y números.');
    return;
  }

  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const existe = usuarios.find(u => u.nombre === nuevoUsuario);
  if (existe) {
    alert('Ese usuario ya está registrado.');
    return;
  }

  usuarios.push({ nombre: nuevoUsuario, clave: nuevaClave });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));

  alert('Registro exitoso. Ahora puedes iniciar sesión.');
  document.querySelector('#modalRegistro .btn-close')?.click();
});

// Mostrar nombre del usuario logueado:

function mostrarUsuarioLogueado() {
  const usuario = localStorage.getItem('usuario');
  const btnLogin = document.getElementById('btn-login');
  const usuarioBtn = document.getElementById('usuario-logueado');

  if (usuario) {
    btnLogin.style.display = 'none';
    usuarioBtn.textContent = usuario;
    usuarioBtn.classList.remove('d-none');
    usuarioBtn.addEventListener('click', () => {
      document.getElementById('nombre-usuario-perfil').textContent = usuario;
      const perfilModal = new bootstrap.Modal(document.getElementById('modalPerfil'));
      perfilModal.show();
    });
  }
}

function cerrarSesion() {
  localStorage.removeItem('usuario');
  location.reload();
}

mostrarUsuarioLogueado();

// Actualizar contador del carrito:

function actualizarContadorCarrito() {
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const contador = document.getElementById('contador-carrito');
  if (contador) contador.textContent = carrito.length;
}
actualizarContadorCarrito();

// Cargar productos:

fetch('data/productos.json')
  .then(res => res.json())
  .then(data => mostrarProductos(data));

function mostrarProductos(productos) {
  const contenedor = document.getElementById('lista-productos');
  const novedades = document.getElementById('lista-novedades');
  if (!contenedor || !novedades) return;
  contenedor.innerHTML = '';
  novedades.innerHTML = '';

  productos.forEach(prod => {
    const div = document.createElement('div');
    div.className = 'col-md-4 mb-4';
    div.innerHTML = `
      <div class="card h-100 producto" data-nombre="${prod.nombre.toLowerCase()}">
        <img src="${prod.imagen}" class="card-img-top" alt="${prod.nombre}">
        <div class="card-body">
          <h5 class="card-title">${prod.nombre}</h5>
          <p class="card-text">${prod.descripcion}</p>
          <p class="fw-bold">${prod.precio} €</p>
          <button class="btn btn-primary agregar-carrito">Añadir al carrito</button>
        </div>
      </div>
    `;
    contenedor.appendChild(div);

    if (prod.novedad) {
      const novedad = div.cloneNode(true);
      novedades.appendChild(novedad);
    }
  });

  document.querySelectorAll('.agregar-carrito').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const user = localStorage.getItem('usuario');
      if (!user) {
        alert('Debes iniciar sesión para añadir productos al carrito.');
        return;
      }
      const card = e.target.closest('.card');
      const producto = {
        nombre: card.querySelector('.card-title').textContent,
        precio: card.querySelector('.fw-bold').textContent,
        imagen: card.querySelector('img').src
      };
      let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      carrito.push(producto);
      localStorage.setItem('carrito', JSON.stringify(carrito));
      actualizarContadorCarrito();
    });
  });
}

// Buscador:

const buscador = document.getElementById('buscador');
buscador?.addEventListener('input', () => {
  const valor = buscador.value.toLowerCase();
  document.querySelectorAll('.producto').forEach(card => {
    const nombre = card.getAttribute('data-nombre');
    card.style.display = nombre.includes(valor) ? '' : 'none';
  });
});

// Reconocimiento de voz:

const btnVoz = document.getElementById('btn-voz');
if ('webkitSpeechRecognition' in window && btnVoz) {
  const reconocimiento = new webkitSpeechRecognition();
  reconocimiento.lang = 'es-ES';
  reconocimiento.continuous = false;
  reconocimiento.interimResults = false;

  btnVoz.addEventListener('click', () => {
    reconocimiento.start();
  });

  reconocimiento.onresult = (e) => {
    buscador.value = e.results[0][0].transcript;
    buscador.dispatchEvent(new Event('input'));
  };

  reconocimiento.onerror = (e) => {
    console.error('Error reconocimiento de voz:', e);
  };
} else if (btnVoz) {
  btnVoz.disabled = true;
  btnVoz.title = 'Reconocimiento de voz no disponible en este navegador';
}
