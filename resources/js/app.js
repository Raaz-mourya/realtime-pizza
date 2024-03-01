import axios from "axios";
import Noty from "noty";
import { initAdmin } from "./admin";
import { initStripe } from "./stripe";
import moment from "moment";


const elmt = document.querySelector("#navMenuIcon");

elmt.addEventListener('click', (e) => {
  console.log("menu clicked")
  if (elmt.name === "menu") {
    elmt.src = "/img/close.png";
    elmt.name = "close"
    document.querySelector("#navIt").classList.toggle("active");
  } else {
    elmt.src = "/img/menu.png";
    elmt.name = "menu";
    document.querySelector("#navIt").classList.toggle("active");
  }
})



let addToCart = document.querySelectorAll(".add-to-cart");
let cartCounter = document.querySelector("#cartCounter");

function updateCart(pizza) {
  axios
    .post("/update-cart", pizza)
    .then((res) => {
      cartCounter.innerText = res.data.totalQty;
      new Noty({
        type: "success",
        timeout: 500,
        progressBar: false,
        text: "Item added to cart",
      }).show();
    })
    .catch((err) => {
      new Noty({
        type: "error",
        timeout: 500,
        progressBar: false,
        text: "Something went wrong",
      }).show();
    });
}

addToCart.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let pizza = JSON.parse(btn.dataset.pizza);
    updateCart(pizza);
  });
});

// Remove alert message after X seconds

const alertMsg = document.querySelector("#success-alert");
if (alertMsg) {
  setTimeout(() => {
    alertMsg.remove();
  }, 2000);
}

<<<<<<< HEAD
=======

>>>>>>> d2d357e31915e31d668ef7a46683f2a21d5647fd
// change order status
let statuses = document.querySelectorAll(".status_line");
let hiddenInput = document.querySelector("#hiddenInput");
let order = hiddenInput ? hiddenInput.value : null;
order = JSON.parse(order);

let time = document.createElement("small");

function updateStatus(order) {
<<<<<<< HEAD
  statuses.forEach((status) => {
    status.classList.remove("step-completed");
    status.classList.remove("current");
  });

  let stepCompleted = true;
  statuses.forEach((status) => {
    let dataProp = status.dataset.status;
    if (stepCompleted) {
      status.classList.add("step-completed");
    }
    if (dataProp === order.status) {
      stepCompleted = false;
      time.innerText = moment(order.updatedAt).format("hh:mm: A");
      status.appendChild(time);
      if (status.nextElementSibling) {
        status.nextElementSibling.classList.add("current");
      }
    }
  });
=======
    statuses.forEach((status) => {
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    
    let stepCompleted = true;
    statuses.forEach((status) => {
        let dataProp = status.dataset.status
        if (stepCompleted) {
            status.classList.add('step-completed')
        }
        if (dataProp === order.status) {
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm: A')
            status.appendChild(time);
            if (status.nextElementSibling) {
                status.nextElementSibling.classList.add('current')
            }
            
        }
    })
>>>>>>> d2d357e31915e31d668ef7a46683f2a21d5647fd
}

updateStatus(order);

<<<<<<< HEAD
initStripe();

// Socket   (client side)

let socket = io();

// Join
if (order) {
  socket.emit("join", `order_${order._id}`);
}

let adminAreaPath = window.location.pathname;
if (adminAreaPath.includes("admin")) {
  // Admin order status update
  initAdmin(socket);

  socket.emit("join", "adminRoom");
}

socket.on("orderUpdated", (data) => {
  const updatedOrder = { ...order };
  updatedOrder.updatedAt = moment().format();
  updatedOrder.status = data.status;
  updateStatus(updatedOrder);
  new Noty({
    type: "success",
    timeout: 1000,
    progressBar: false,
    text: "Order updated",
  }).show();
});
=======


// Socket   (client side)

let socket = io()

// Admin order status update
initAdmin(socket);


// Join
if (order) {
    socket.emit('join',`order_${order._id}`)
}

let adminAreaPath = window.location.pathname
console.log(adminAreaPath)
if (adminAreaPath.includes('admin')) {
    socket.emit('join', 'adminRoom')
}

socket.on('orderUpdated', (data) => {
    const updatedOrder = { ...order }
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status;
    updateStatus(updatedOrder)
    new Noty({
      type: "success",
      timeout: 1000,
      progressBar: false,
      text: "Order updated",
    }).show();
})
>>>>>>> d2d357e31915e31d668ef7a46683f2a21d5647fd
