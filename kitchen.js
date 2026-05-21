import { db } from './firebase-config.js';

import {
  collection,
  onSnapshot,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ordersDiv = document.getElementById('orders');

onSnapshot(collection(db, 'orders'), (snapshot) => {

  ordersDiv.innerHTML = "";

  snapshot.forEach((docSnap) => {

    const data = docSnap.data();

    let itemsHTML = "";

    data.items.forEach(item => {
      itemsHTML += <li>${item.nama}</li>;
    });

    ordersDiv.innerHTML += `
      <div class="cart">
        <h2>Order ID: ${docSnap.id}</h2>
        <ul>
          ${itemsHTML}
        </ul>

        <p>Total: Rp ${data.total}</p>
        <p>Status: ${data.status}</p>

        <button onclick="selesai('${docSnap.id}')">
          Selesaikan
        </button>
      </div>
    `;
  });
});

window.selesai = async function(id) {

  const ref = doc(db, 'orders', id);

  await updateDoc(ref, {
    status: 'Selesai'
  });
}