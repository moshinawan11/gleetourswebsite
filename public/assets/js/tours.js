
function navbarFunction() {

    var navSlide = document.getElementById("navSlideDown");
    navSlide.classList.toggle("navSlideUp");

    var navList = document.getElementById("nav-list-slide");
    navList.classList.toggle("nav-list-slide-visible");
}

window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    var x = window.matchMedia("(min-width: 900px)");
    if (x.matches) {
        if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
            document.getElementById("navbar").style.height = "65px";
            document.getElementById("navLogo-img").style.width = "150px";
            document.getElementById("menuBtn").style.marginTop = "0.6rem";
        }
        else {
            document.getElementById("navbar").style.height = "100px";
            document.getElementById("navLogo-img").style.width = "250px";
            document.getElementById("navLogo-img").style.transition = "width 0.3s";
        }
    }
}

window.onload = function() { imgFunction() }

function imgFunction() {
    var x = window.matchMedia("(max-width: 800px)");
    if (x.matches) {
        document.getElementById("coverDivImg").setAttribute("src", "/public/assets/images/tours-header2.jpg");
    }
    else {
        document.getElementById("coverDivImg").setAttribute("src", "/public/assets/images/tours-header.jpg");
    }
}