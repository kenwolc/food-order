import { db } from './firebase-config.js';

import {
  collection,
  getDocs,
  deleteDoc,
  doc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const orderList = document.getElementById("orders");

async function loadOrders() {

  orderList.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "orders"));

  let nomor = 1;

  querySnapshot.forEach((documentData) => {

    const data = documentData.data();

    let itemsHTML = "";

    data.items.forEach((item) => {

      itemsHTML += `
        <li>
          ${item.nama} - Rp ${item.harga}
        </li>
      `;

    });

    orderList.innerHTML += `

      <div class="order-box">

        <h2>Pesanan #${nomor}</h2>

        <ul>
          ${itemsHTML}
        </ul>

        <p>
          Total Item: ${data.items.length}
        </p>

      </div>

    `;

    nomor++;

  });

}

window.refreshOrders = function() {
  loadOrders();
}

window.resetOrders = async function() {

  const konfirmasi = confirm("Reset semua pesanan?");

  if(!konfirmasi) return;

  const querySnapshot = await getDocs(collection(db, "orders"));

  querySnapshot.forEach(async (documentData) => {

    await deleteDoc(doc(db, "orders", documentData.id));

  });

  alert("Pesanan berhasil direset");

  loadOrders();

}

loadOrders();