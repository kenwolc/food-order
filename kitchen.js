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

  ordersDiv.innerHTML = '';
  completedDiv.innerHTML = '';

  const querySnapshot = await getDocs(collection(db,'orders'));

  let nomor = 1;

  querySnapshot.forEach((documentData)=>{

    const data = documentData.data();

    let itemsHTML = '';

    data.items.forEach((item)=>{

      itemsHTML += `
        <tr>
          <td>${item.nama}</td>
          <td>${item.qty}</td>
        </tr>
      `;

    });

    const html = `

      <div class="order-card">

        <h2>Pesanan #${nomor}</h2>

        <p><b>${data.orderType}</b></p>

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

          <button class="done-btn" onclick="selesaikanOrder('${documentData.id}')">
            Selesai
          </button>

        ` : ''}

      </div>

    `;

    if(data.status === 'active'){
      ordersDiv.innerHTML += html;
    }else{
      completedDiv.innerHTML += html;
    }

    nomor++;

  });

}

window.refreshOrders = function(){
  loadOrders();
}

window.selesaikanOrder = async function(id){

  await updateDoc(doc(db,'orders',id),{
    status:'completed'
  });

  loadOrders();

}

window.resetOrders = async function(){

  const konfirmasi = confirm('Reset semua order?');

  if(!konfirmasi) return;

  const querySnapshot = await getDocs(collection(db,'orders'));

  querySnapshot.forEach(async (documentData)=>{

    await deleteDoc(doc(db,'orders',documentData.id));

  });

  loadOrders();

}

loadOrders();