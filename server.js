if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const User = require("./models/user");
const path = require("path");
const ejs = require("ejs");
const bcrypt = require("bcrypt");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
const methodOverride = require("method-override");

const app = express();
const PORT = process.env.PORT || 3001;

const dbUrl =
  "mongodb+srv://sellet:mBTdFzYJy5gKP3on@cluster0.nebxmyt.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(dbUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });



const initalizePassport = require("./passport-config");
const { resourceUsage } = require("process");
initalizePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [];

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "styles")));
app.use(express.static(path.join(__dirname, "views")));

app.use("/articles", articleRouter);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// 👇 Start handling routes here

app.get("/", (req, res) => {
  // Check if the user is authenticated and pass the user variable to the view
  res.render("home.ejs", { user: req.user });
});

app.get("/quem-somos", (req, res) => {
  // const quemSomosPath = path.join(__dirname, "pages", "quem-somos.html");
  // res.sendFile(quemSomosPath);
  res.render("quem-somos.ejs");
});

app.get("/aduaneiro", (req, res) => {
  // const aduaneiroPath = path.join(__dirname, "pages", "aduaneiro.html");
  // res.sendFile(aduaneiroPath);
  res.render("aduaneiro.ejs");
});

app.get("/civil", (req, res) => {
  // const civilPath = path.join(__dirname, "pages", "civil.html");
  // res.sendFile(civilPath);
  res.render("civil.ejs");
});

app.get("/trabalhista", (req, res) => {
  // const trabalhistaPath = path.join(__dirname, "pages", "trabalhista.html");
  // res.sendFile(trabalhistaPath);
  res.render("trabalhista.ejs");
});

app.get("/carbono", (req, res) => {
  // const carbonoPath = path.join(__dirname, "pages", "carbono.html");
  // res.sendFile(carbonoPath);
  res.render("carbono.ejs");
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index.ejs", { articles: articles, user: req.user });
});

app.get("/contato", (req, res) => {
  // const contatoPath = path.join(__dirname, "pages", "contato.html");
  // res.sendFile(contatoPath);
  res.render("contato.ejs");
});

app.get("/profile", (req, res) => {
  res.render("index.ejs", { name: req.user.name });
});

app.get("/login", checkNotAuthenticated, (req, res) => {
  res.render("login.ejs");
});

app.post(
  "/login",
  checkNotAuthenticated,
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

app.get("/register", checkNotAuthenticated, (req, res) => {
  res.render("register.ejs");
});

app.post("/register", checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create a new user
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user to the db
    await user.save();

    res.redirect("/login");
  } catch {
    res.redirect("/register");
  }
});

app.delete("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).send("Error during logout");
    }
    res.redirect("/");
  });
});

// function checkAuthenticated(req, res, next) {
//     if(req.isAuthenticated()) {
//         return next()
//     }
//     res.redirect('/login')
// }

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/profile");
  }
  next();
}
