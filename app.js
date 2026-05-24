import { db } from './firebase-config.js';
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

let cart = [];
const orderType = localStorage.getItem('orderType');

window.addEventListener('DOMContentLoaded', () => {
  const orderText = document.getElementById('order-type');
  if(orderText){
    orderText.innerText = orderType || 'Dine In';
  }
});

function renderCart(){
  const cartList = document.getElementById('cart-list');
  const totalText = document.getElementById('total');

  if (!cartList || !totalText) return; 

  cartList.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.harga * item.qty;
    cartList.innerHTML += `
      <div class="cart-item">
        <p>${item.nama}</p>
        <div class="qty-control">
          <button onclick="window.kurangQty(${index})">-</button>
          <span>${item.qty}</span>
          <button onclick="window.tambahQty(${index})">+</button>
        </div>
      </div>
    `;
  });

  totalText.innerText = `Total: Rp ${total.toLocaleString('id-ID')}`;
}

window.tambahMenu = function(nama, harga){
  const existing = cart.find(item => item.nama === nama);
  if(existing){
    existing.qty++;
  } else {
    cart.push({ nama, harga, qty: 1 });
  }
  renderCart();
}

window.tambahQty = function(index){
  cart[index].qty++;
  renderCart();
}

window.kurangQty = function(index){
  if(cart[index].qty > 1){
    cart[index].qty--;
  } else {
    cart.splice(index, 1);
  }
  renderCart();
}

window.checkout = function(){
  window.showPayment();
}

window.showPayment = function(){
  if(cart.length === 0){
    alert('Keranjang kosong');
    return;
  }
  
  const modal = document.getElementById('payment-modal');
  if (modal) {
    modal.style.display = 'flex';
  } else {
    window.bayarSekarang();
  }
}

window.bayarSekarang = async function(){
  try {
    await addDoc(collection(db, 'orders'), {
      items: cart,
      orderType: orderType || 'Dine In',
      status: 'active',
      createdAt: new Date()
    });

    cart = [];
    renderCart();

    const modal = document.getElementById('payment-modal');
    if (modal) modal.style.display = 'none';

    // Logika pop-up konfirmasi setelah klik 'Saya Sudah Bayar'
    const tanyaUser = confirm('Pembayaran Berhasil!\n\nKlik "OK" jika ingin PESAN KEMBALI.\nKlik "Cancel" jika ingin SELESAI & KEMBALI KE LANDING PAGE.');

    if (tanyaUser) {
      alert('Silakan pilih menu baru!');
    } else {
      localStorage.clear();
      window.location.href = 'index.html';
    }

  } catch(error) {
    console.error(error);
    alert('Firebase error: Gagal memproses data pembayaran.');
  }
}