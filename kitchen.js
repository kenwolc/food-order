import { db } from './firebase-config.js';

import {
  collection,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const orderList = document.getElementById("order-list");

onSnapshot(collection(db, "orders"), (snapshot) => {

  orderList.innerHTML = "";

  snapshot.forEach((doc) => {

    const data = doc.data();

    let itemsHTML = "";

    data.items.forEach((item) => {

      itemsHTML += `
        <li>
          ${item.nama} - Rp ${item.harga}
        </li>
      `;

    });

    orderList.innerHTML += `
      <div class="order-card">
        <h3>Pesanan Baru</h3>

        <ul>
          ${itemsHTML}
        </ul>
      </div>
    `;

  });

});