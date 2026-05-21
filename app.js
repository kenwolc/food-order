import { db } from './firebase-config.js';

import {
  collection,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let cart = [];

function renderCart() {

  const cartList = document.getElementById("cart-list");
  const totalText = document.getElementById("total");

  cartList.innerHTML = "";

  let total = 0;

  cart.forEach((item) => {

    total += item.harga;

    cartList.innerHTML += `
      <div>
        ${item.nama} - Rp ${item.harga}
      </div>
    `;

  });

  totalText.innerText = `Total: Rp ${total}`;
}

window.tambahMenu = function(nama, harga) {

  cart.push({
    nama: nama,
    harga: harga
  });

  renderCart();
}

window.checkout = async function() {

  if(cart.length === 0){
    alert("Keranjang kosong");
    return;
  }

  try {

    await addDoc(collection(db, "orders"), {
      items: cart,
      createdAt: new Date()
    });

    alert("Pesanan berhasil!");

    cart = [];

    renderCart();

  } catch(error){

    console.error(error);

    alert("Checkout gagal");

  }

}