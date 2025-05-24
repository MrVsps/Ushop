const carrito = [
    {
      nombre: "Buso universitario",
      precio: 50000,
      imagen: "../Backend/Recursos/imagenes/buso1ii.jpg",
      cantidad: 1
    },
    {
      nombre: "Pocillo UStore",
      precio: 15000,
      imagen: "../Backend/Recursos/imagenes/Posillo1ii.jpg",
      cantidad: 2
    }
  ];
  
  function renderCarrito() {
    const contenedor = document.getElementById("carritoItems");
    const subtotalElem = document.getElementById("subtotal");
  
    contenedor.innerHTML = "";
    let subtotal = 0;
  
    carrito.forEach((producto, index) => {
      subtotal += producto.precio * producto.cantidad;
      contenedor.innerHTML += `
        <div class="carrito-item">
          <img src="${producto.imagen}" alt="${producto.nombre}" />
          <div class="info">
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
          </div>
          <div class="acciones">
            <input type="number" min="1" value="${producto.cantidad}" onchange="cambiarCantidad(${index}, this.value)" />
            <button onclick="eliminarItem(${index})">❌</button>
          </div>
        </div>
      `;
    });
  
    subtotalElem.textContent = subtotal.toLocaleString();
  }
  
  function cambiarCantidad(index, nuevaCantidad) {
    carrito[index].cantidad = parseInt(nuevaCantidad);
    renderCarrito();
  }
  
  function eliminarItem(index) {
    carrito.splice(index, 1);
    renderCarrito();
  }
  
  document.addEventListener("DOMContentLoaded", renderCarrito);
  