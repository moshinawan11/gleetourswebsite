

function myFunction() {

    const navSlide = document.getElementById("dropdown-content");
    navSlide.classList.toggle("dropdown-content-show");
  }


  window.onload = function() {
    var addButton = document.getElementById("add_day");
    var dayCount = document.getElementById("dayCount");
    var dayNum = parseInt(dayCount.innerHTML);
    var tourItineraryDiv = document.getElementById("tourItineraryDiv");
    addButton.addEventListener("click", () => {
    dayNum += 1;
    tourItineraryDiv.innerHTML += '<label for="dayDetails">Day ' + dayNum + '</label><textarea name="dayDetails" id="dayDetails" cols="30" rows="8" required></textarea>';
    })
    }