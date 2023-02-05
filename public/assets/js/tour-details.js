
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
        document.getElementById("coverDivImg").setAttribute("src", "/public/assets/images/tours-header2.avif");
    }
    else {
        document.getElementById("coverDivImg").setAttribute("src", "/public/assets/images/tours-header.avif");
    }
}

var expandableTextHeadingDiv1 = document.querySelector(".expandableTextHeadingDiv1");
var expandableText1 = document.querySelector(".closedText1");
var downArrow1 = document.querySelector(".downArrow1");
expandableTextHeadingDiv1.addEventListener("click", () => {
    expandableText1.classList.toggle("expandedText");
    downArrow1.classList.toggle("downArrowRotate");
})

var expandableTextHeadingDiv2 = document.querySelector(".expandableTextHeadingDiv2");
var expandableText2 = document.querySelector(".closedText2");
var downArrow2 = document.querySelector(".downArrow2");
expandableTextHeadingDiv2.addEventListener("click", () => {
    expandableText2.classList.toggle("expandedText");
    downArrow2.classList.toggle("downArrowRotate");
})

var expandableTextHeadingDiv3 = document.querySelector(".expandableTextHeadingDiv3");
var expandableText3 = document.querySelector(".closedText3");
var downArrow3 = document.querySelector(".downArrow3")
expandableTextHeadingDiv3.addEventListener("click", () => {
    expandableText3.classList.toggle("expandedText");
    downArrow3.classList.toggle("downArrowRotate");
})

var expandableTextHeadingDiv4 = document.querySelector(".expandableTextHeadingDiv4");
var expandableText4 = document.querySelector(".closedText4");
var downArrow4 = document.querySelector(".downArrow4");
expandableTextHeadingDiv4.addEventListener("click", () => {
    expandableText4.classList.toggle("expandedText");
    downArrow4.classList.toggle("downArrowRotate");
})

var expandableTextHeadingDiv5 = document.querySelector(".expandableTextHeadingDiv5");
var expandableText5 = document.querySelector(".closedText5");
var downArrow5 = document.querySelector(".downArrow5");
expandableTextHeadingDiv5.addEventListener("click", () => {
    expandableText5.classList.toggle("expandedText");
    downArrow5.classList.toggle("downArrowRotate");
})

var expandableTextHeadingDiv6 = document.querySelector(".expandableTextHeadingDiv6");
var expandableText6 = document.querySelector(".closedText6");
var downArrow6 = document.querySelector(".downArrow6");
expandableTextHeadingDiv6.addEventListener("click", () => {
    expandableText6.classList.toggle("expandedText");
    downArrow6.classList.toggle("downArrowRotate");
})