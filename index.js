const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const { findByIdAndUpdate, findByIdAndDelete } = require("./models/tours");
const adminRouter = require("./routers/admin");
const mainRouter = require("./routers/main");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const Admin = require("./models/admin");
const session = require("express-session");
const flash = require("connect-flash");
const MongoStore = require("connect-mongo");
const favicon = require('serve-favicon');

// mongodb+srv://mohsinawan512:<password>@cluster0.xzp8q0n.mongodb.net/?retryWrites=true&w=majority
const dbURL = process.env.DB_URL || "mongodb://localhost:27017/gleeWebsite";

mongoose.connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error"));
db.once("open", () => {
    console.log("Database connected");
});

app.set('view engine','ejs');
app.set("views", path.join(__dirname, "/views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(favicon(path.join(__dirname, 'public', 'assets', 'images', 'favicon.png')));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(methodOverride("_method"));

const secret = process.env.SECRET || "ThisIsASecretString";

app.use(session({
    store: MongoStore.create({
        mongoUrl: dbURL,
        secret,
        touchAfter: 24*60*60
    }),
    name: "session",
    secret,
    saveUninitialized: false,
    resave: false,
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(Admin.authenticate()));

passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.admin = req.user;
    next();
});

app.use("/admin", adminRouter);
app.use("/", mainRouter);

app.all("*", (req, res, next) => {
    res.render("Error404Page.ejs");
})

app.use((err, req, res, next) => {
res.render("Error404Page.ejs");
})

const PORT = process.env.PORT || "3000";

app.listen(PORT, '0.0.0.0', () => {
    console.log(`SERVING ON PORT ${PORT}!!!`);   
})
