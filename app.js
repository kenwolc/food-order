alert("app.js jalan");
import { db } from './firebase-config.js';

import {
  collection,
  addDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let cart = [];

window.tambahMenu = function(nama, harga) {
  cart.push({ nama, harga });
  renderCart();
}

function renderCart() {
  const cartList = document.getElementById('cart-list');
  const totalText = document.getElementById('total');

  cartList.innerHTML = "";

  let total = 0;

  cart.forEach(item => {
    total += item.harga;


    cartList.innerHTML += `
      <p>${item.nama} - Rp ${item.harga}</p>
    `;
  });

  totalText.innerHTML = Total: Rp ${total};
}

window.checkout = async function() {

  if(cart.length === 0) {
    alert("Keranjang kosong");
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.harga, 0);

  await addDoc(collection(db, "orders"), {
    items: cart,
    total: total,
    status: "Menunggu",
    createdAt: Timestamp.now()
  });

  alert("Pesanan berhasil dibuat!");

  cart = [];
  renderCart();
}

console.log("APP READY");