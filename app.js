const express = require("express");
const path = require("path");
const fileupload = require("express-fileupload")
const hbs = require("hbs");
const session = require("express-session");
const PORT = process.env.PORT || 3000;
const app = express();
require("dotenv").config();

// middleware config of express-fileupload (from  official documentation)
app.use(fileupload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));


// start ROUTES !!
const routeIndex = require("./routes/index");
const routeLogin = require("./routes/login");
const routeSecret = require("./routes/secret");
const routeProducts = require("./routes/products");
const routeSignup = require("./routes/signup");
const routePets = require("./routes/pets"); 
const routeContactUs = require("./routes/contactUs"); 


app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "./views/partials"));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

// SECRET AUTH LOGIN
const secured = async (req, res, next) => {
  if (req.session.user) {
    app.locals.user = req.session.user;
    next();
  } else {
    res.render("noAuth");
  }
};

const isAuth = (req, res, next) => {
  app.locals.user = req.session.user;
  next();
};
// end SECRET AUTH LOGIN


// end ROUTES !!
app.use("/", isAuth, routeIndex);
app.use("/login", routeLogin);
app.use("/secret", secured, routeSecret);
app.use("/products", routeProducts); 
app.use("/signup", routeSignup); 
app.use("/pets", secured, routePets); 
app.use("/contactUs", routeContactUs); 
app.get("*", (req, res) => {
  res.render("error");
});

app.listen(process.env.PORT, (err) => {
  err
    ? console.log("oh no!... We are currently working on some fixes, please come back later ! 😫")
    : console.log(`Servidor corre en http://localhost:${PORT}/`);
});