import { db } from './firebase-config.js';
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const ordersDiv = document.getElementById('orders');
const completedDiv = document.getElementById('completed-orders');

async function loadOrders(){
  if (!ordersDiv || !completedDiv) return;

  ordersDiv.innerHTML = '';
  completedDiv.innerHTML = '';

  try {
    const querySnapshot = await getDocs(collection(db, 'orders'));
    let nomor = 1;

    querySnapshot.forEach((documentData) => {
      const data = documentData.data();
      let itemsHTML = '';

      if (data.items && Array.isArray(data.items)) {
        data.items.forEach((item) => {
          itemsHTML += `
            <tr>
              <td>${item.nama}</td>
              <td>${item.qty}</td>
            </tr>
          `;
        });
      }

      const html = `
        <div class="order-card">
          <h2>Pesanan #${nomor}</h2>
          <p><b>${data.orderType || 'Dine In'}</b></p>
          <table>
            <thead>
              <tr>
                <th>Menu</th>
                <th>Qty</th>
              </tr>
            </thead>
            <tbody>
              ${itemsHTML}
            </tbody>
          </table>
          ${data.status === 'active' ? `
            <button class="done-btn" onclick="window.selesaikanOrder('${documentData.id}')">
              Selesai
            </button>
          ` : ''}
        </div>
      `;

      if(data.status === 'active'){
        ordersDiv.innerHTML += html;
      } else {
        completedDiv.innerHTML += html;
      }
      nomor++;
    });
  } catch (error) {
    console.error("Gagal memuat pesanan:", error);
  }
}

window.refreshOrders = function(){
  loadOrders();
}

window.selesaikanOrder = async function(id){
  try {
    await updateDoc(doc(db, 'orders', id), {
      status: 'completed'
    });
    loadOrders();
  } catch (error) {
    console.error("Gagal menyelesaikan order:", error);
  }
}

// SOLUSI: Menggunakan For...Of agar proses delete ditunggu satu per satu (tidak crash)
window.resetOrders = async function(){
  const konfirmasi = confirm('Reset semua order?');
  if(!konfirmasi) return;

  try {
    const querySnapshot = await getDocs(collection(db, 'orders'));
    
    for (const documentData of querySnapshot.docs) {
      await deleteDoc(doc(db, 'orders', documentData.id));
    }

    alert('Semua order harian berhasil dibersihkan!');
    loadOrders();
  } catch (error) {
    console.error("Gagal mereset order:", error);
    alert('Gagal mereset data');
  }
}

// Jalankan saat halaman dibuka
loadOrders();