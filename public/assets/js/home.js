
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

window.onload = function() { resizeFunction() };

function resizeFunction() {
    var x = window.matchMedia("(max-width: 900px)");
    if (x.matches) {
        document.getElementById("intro").style.margin = "40px 7%";
    }
    else {
        document.getElementById("intro").style.margin = "40px 20%";
    }
}

const downArrowBtn = document.querySelector(".downArrowCircle");
downArrowBtn.addEventListener("click", e => {
    e.preventDefault();
    document.querySelector("#scrollToDiv").scrollIntoView({
        behavior: "smooth"
    });
});

/* user defined variables */
var timeOnSlide = 3,
    // the time each image will remain static on the screen, measured in seconds
    timeBetweenSlides = 1,
    // the time taken to transition between images, measured in seconds

    // test if the browser supports animation, and if it needs a vendor prefix to do so
    animationstring = 'animation',
    animation = false,
    keyframeprefix = '',
    domPrefixes = 'Webkit Moz O Khtml'.split(' '),
    // array of possible vendor prefixes
    pfx = '',
    slidy = document.getElementById("slidy");
if (slidy.style.animationName !== undefined) { animation = true; }
// browser supports keyframe animation w/o prefixes

if (animation === false) {
    for (var i = 0; i < domPrefixes.length; i++) {
        if (slidy.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
            pfx = domPrefixes[i];
            animationstring = pfx + 'Animation';
            keyframeprefix = '-' + pfx.toLowerCase() + '-';
            animation = true;
            break;
        }
    }
}

if (animation === false) {
    // animate in JavaScript fallback
} else {
    var images = slidy.getElementsByTagName("img"),
        firstImg = images[0],
        // get the first image inside the "slidy" element.
        imgWrap = firstImg.cloneNode(false);  // copy it.
    slidy.appendChild(imgWrap); // add the clone to the end of the images
    var imgCount = images.length, // count the number of images in the slide, including the new cloned element
        totalTime = (timeOnSlide + timeBetweenSlides) * (imgCount - 1), // calculate the total length of the animation by multiplying the number of _actual_ images by the amount of time for both static display of each image and motion between them
        slideRatio = (timeOnSlide / totalTime) * 100, // determine the percentage of time an induvidual image is held static during the animation
        moveRatio = (timeBetweenSlides / totalTime) * 100, // determine the percentage of time for an individual movement
        basePercentage = 100 / imgCount, // work out how wide each image should be in the slidy, as a percentage.
        position = 0, // set the initial position of the slidy element
        css = document.createElement("style"); // start marking a new style sheet
    css.type = "text/css";
    css.innerHTML += "#slidy { text-align: left; margin: 0; font-size: 0; position: relative; width: " + (imgCount * 100) + "%;  }\n"; // set the width for the slidy container
    css.innerHTML += "#slidy img { float: left; width: " + basePercentage + "%; }\n";
    css.innerHTML += "@" + keyframeprefix + "keyframes slidy {\n";
    for (i = 0; i < (imgCount - 1); i++) { // 
        position += slideRatio; // make the keyframe the position of the image
        css.innerHTML += position + "% { left: -" + (i * 100) + "%; }\n";
        position += moveRatio; // make the postion for the _next_ slide
        css.innerHTML += position + "% { left: -" + ((i + 1) * 100) + "%; }\n";
    }
    css.innerHTML += "}\n";
    css.innerHTML += "#slidy { left: 0%; " + keyframeprefix + "transform: translate3d(0,0,0); " + keyframeprefix + "animation: " + totalTime + "s slidy infinite; }\n"; // call on the completed keyframe animation sequence
    document.body.appendChild(css); // add the new stylesheet to the end of the document
}






