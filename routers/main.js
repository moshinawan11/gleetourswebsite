const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/assets/images/" });
const Tour = require("../models/tours");
const Message = require("../models/messages");
const catchAsync = require("../CatchAsyncErrors.js");

router.get("/", catchAsync(async (req, res) => {
    const tours = await Tour.find({});
    res.render("home.ejs", { tours });
}));

router.get("/about-us", (req, res) => {
    res.render("about-us.ejs");
});

router.get("/tours", catchAsync(async (req, res, next) => {
    const tours = await Tour.find({});
    res.render("tours", { tours });
}));

router.get("/tour-details/:id", catchAsync(async (req, res, next) => {
    const tourDetails = await Tour.findById(req.params.id);
    res.render("tourDetails.ejs", { tourDetails });
}));

router.get("/contact-us", (req, res) => {
    res.render("contact-us.ejs");
});

router.post("/contact-us", catchAsync(async (req, res, next) => {
    const message = new Message(req.body);
    await message.save();
    req.flash("success", "Your message has been sent!");
    res.redirect("/contact-us");
}));

module.exports = router;