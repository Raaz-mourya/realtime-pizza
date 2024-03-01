require("dotenv").config();
const express = require("express");
const app = express();
const ejs = require("ejs");
const path = require("path");
const expressLayout = require("express-ejs-layouts");

const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const session = require("express-session");
const flash = require("express-flash");
const MongoDbStore = require("connect-mongo");
const passport = require("passport");
const Emitter = require("events");
<<<<<<< HEAD

=======
>>>>>>> d2d357e31915e31d668ef7a46683f2a21d5647fd

mongoose.set("strictQuery", false); // to hide special warning

//Database connection
const url = "mongodb://localhost:27017/pizza";
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection
  .once("open", function () {
    console.log("Database connected...");
  })
  .on("error", function (err) {
    console.log("Connection failed..." + err);
  });

//session store
let mongoStore = new MongoDbStore({
  mongoUrl: url,
  collection: "sessions",
});

// Event emitter
const eventEmitter = new Emitter();
app.set("eventEmitter", eventEmitter);

//session config
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, //24 hours
  })
);

// Passport config

const passportInit = require("./app/config/passport");
passportInit(passport);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Asset
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Global middleware
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

// app.use((req, res, next) => {
//   console.log(req)
//   console.log(
//     "[" + new Date().toISOString() + "] " + req.method + ": " + req.originalUrl + " , AccessToken:  "
//   );
//   next();
// });

//set template engine
app.use(expressLayout);
app.set("views", path.join(__dirname, "/resources/views"));
app.set("view engine", "ejs");

require("./routes/web")(app);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// Socket  (backend side)

const io = require("socket.io")(server);

io.on("connection", (socket) => {
  // Join
  socket.on("join", (orderId) => {
    socket.join(orderId);
  });
});

eventEmitter.on("orderUpdated", (data) => {
  io.to(`order_${data.id}`).emit("orderUpdated", data);
});

eventEmitter.on("orderPlaced", (data) => {
  io.to("adminRoom").emit("orderPlaced", data);
});

