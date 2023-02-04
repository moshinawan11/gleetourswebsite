
function myFunction() {

    const navSlide = document.getElementById("dropdown-content");
    navSlide.classList.toggle("dropdown-content-show");
}

const dots3 = document.querySelectorAll(".dots3");

for(i=0;i<dots3.length;i++){
    dots3[i].addEventListener("click", () => {
        const dropdownContentDots3 = document.querySelector("#dropdown-content-dots3");
        dropdownContentDots3.classList.toggle("dropdown-content-show");
    })
}
