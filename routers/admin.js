const express = require ('express');
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const upload = multer({ dest: "public/assets/images/" });
const Tour = require("../models/tours");
const Message = require("../models/messages");
const Admin = require("../models/admin");
const catchAsync = require("../CatchAsyncErrors.js");
const {isLoggedIn} = require("../middleware.js");

/*router.get("/signup", async (req, res) => {
    const admin = new Admin({username: "gleeadmin"});
    const newAdmin = await Admin.register(admin, "agenthaseeb");
    res.send(newAdmin);
});*/

router.get("/login", catchAsync( async (req, res) => {
    const admin = await Admin.find({});
    res.render("admin-login.ejs");
}));

router.post("/login", passport.authenticate("local", { failureFlash: true, failureRedirect: "/admin/login" }), (req, res) => {
    req.flash("success", "Successfully logged in");
    res.redirect("/admin");
});

router.get("/logout", isLoggedIn, async (req, res) => {
    req.logout((err) => {
        if(err){ return next(err); }
        res.redirect("/admin/login");
    })
});

router.get("/", isLoggedIn, (req, res) => {
    res.render("admin.ejs");
});

router.get("/view-tours", isLoggedIn, catchAsync(async (req, res, next) => {
    const tours = await Tour.find({})
    res.render("view-tours.ejs", { tours })
}));

router.get("/view-tours/:id", isLoggedIn, catchAsync(async (req, res, next) => {
    const tourInfo = await Tour.findById(req.params.id);
    res.render("tour-info.ejs", { tourInfo });
}));

router.get("/add-tour", isLoggedIn, (req, res) => {
    res.render("add-tour.ejs");
});

router.post("/add-tour", isLoggedIn, upload.single("image"), catchAsync(async (req, res, next) => {
    try{
        const tour = new Tour(req.body);
        tour.image.path = req.file.path;
        tour.image.filename = req.file.filename;
        await tour.save();
        res.redirect(`/admin/view-tours/${tour._id}`);
    }
    catch(err){
        if(err.name === "ValidationError")
            res.redirect("/admin/add-tour");
    }
}));

router.get("/edit-tour/:id", isLoggedIn, catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const tour = await Tour.findById(id);
        res.render("edit-tour.ejs", { tour });
}));

router.put("/edit-tour/:id", isLoggedIn, upload.single("image"), catchAsync(async (req, res, next) => {
        const { id } = req.params;
        const updatedTour = await Tour.findByIdAndUpdate(id, { ...req.body }, { new: true });
        if(req.file){
            updatedTour.image.path = req.file.path;
            updatedTour.image.filename = req.file.filename;
            await updatedTour.save();
        }
        res.redirect(`/admin/view-tours/${id}`);
}));

router.delete("/:id/delete-tour", isLoggedIn, catchAsync(async (req, res, next) => {
        const { id } = req.params;
        await Tour.findByIdAndDelete(id);
        res.redirect("/admin/view-tours");
}));

router.get("/tour-details/:id", isLoggedIn, catchAsync( async (req, res, next) => {
    const id = req.params.id;
    const tourDetails = await Tour.findById(id);
    res.render("tour-details.ejs", { tourDetails });
}));

router.get("/add-tour-details", isLoggedIn, (req, res) => {
    res.render("add-tour-details.ejs");
});

router.post("/add-tour-details", isLoggedIn, upload.single("image"), catchAsync( async (req, res, next) => {
    const tourDetails = new Tour(req.body);
    tourDetails.image.path = req.file.path;
    tourDetails.image.filename = req.file.filename;
    await tourDetails.save();
    res.redirect(`/admin/tour-details/${tourDetails._id}`);
}));

router.get("/add-tour-details/:id", isLoggedIn, catchAsync( async (req, res, next) => {
    const { id } = req.params;
    const tourDetails = await Tour.findById(id);
    res.render("add-tour-details-withID.ejs", { tourDetails });
}));

router.put("/add-tour-details/:id", isLoggedIn, upload.single("image"), catchAsync( async (req, res, next) => {
    const { id } = req.params;
    const tourDetails = await Tour.findByIdAndUpdate(id, { ...req.body }, { new: true });
    if(req.file){
        tourDetails.image.path = req.file.path;
        tourDetails.image.filename = req.file.filename;
        await tourDetails.save();
    }
    res.redirect(`/admin/tour-details/${id}`);
}));

router.get("/edit-tour-details/:id", isLoggedIn, catchAsync( async (req, res, next) => {
    const tourDetails = await Tour.findById(req.params.id);
    res.render("edit-tour-details.ejs", { tourDetails });
}));

router.put("/edit-tour-details/:id", isLoggedIn, upload.single("image") , catchAsync( async (req, res, next) => {
    const tourDetails = await Tour.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    if(req.file){
        tourDetails.image.path = req.file.path;
        tourDetails.image.filename = req.file.filename;
        await tourDetails.save();
    }
    res.redirect(`/admin/tour-details/${req.params.id}`);
}));

router.get("/messages", isLoggedIn, catchAsync(async (req, res, next) => {
    const messages = await Message.find({})
    res.render("messages.ejs", { messages })
}));

router.get("/messages/:id", isLoggedIn, catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const message = await Message.findById(id);
    res.render("message-details", { message });
}));

router.delete("/messages/:id", isLoggedIn, catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const message = await Message.findByIdAndDelete(id);
    res.redirect("/admin/messages");
}));

module.exports = router;