// Circle Text

const circleType = new CircleType(
    document.getElementById("rotated")
).radius(80);

$(window).scroll(function() {
    var offset = $(window).scrollTop();
    offset = offset * 0.06;

    $(".circular-text").css({
        "-moz-transform": "rotate(" + offset + "deg)",
        "-webkit-transform": "rotate(" + offset + "deg)",
        "-o-transform": "rotate(" + offset + "deg)",
        "-ms-transform": "rotate(" + offset + "deg)",
        transform: "rotate(" + offset + "deg)"
    });
});

// Nav Content

document.addEventListener("DOMContentLoaded", () => {
          const revealerNav = window.revealer({
              revealElementSelector: ".nav-js",
              options: {
                  anchorSelector: ".nav-btn-js",
              },
          });

          const actionBtn = document.querySelector(".nav-btn-js");
          actionBtn.addEventListener("click", () => {
              if (!revealerNav.isRevealed()) {
                  revealerNav.reveal();
                  actionBtn.setAttribute("data-open", true);
              } else {
                  revealerNav.hide();
                  actionBtn.setAttribute("data-open", false);
              }
          });
      });


// Content

// Content One
let firstList = document.querySelector('.text-end');
let listItemsFirst = [...firstList.querySelectorAll('li')];

// Content Two
let secondList = document.querySelector('.text-start');
let listItemsSecond = [...secondList.querySelectorAll('li')];

// Content Three
let thirdList = document.querySelector('.text-end-two');
let listItemsThird = [...thirdList.querySelectorAll('li')];

let options = {
    rootMargins: '-10%',
    threshold: 1.0
}

let observer = new IntersectionObserver(showItem, options);

function showItem(entries) {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            let letters = [...entry.target.querySelectorAll('span')];
            letters.forEach((letter, idx) => {
                setTimeout(()=>{
                    letter.classList.add('active');
                }, idx * 70)
            })
            entry.target.children[0].classList.add('active');
        }
    })
}

// Content One
listItemsFirst.forEach(item =>{

    let newString = '';
    let itemText = item.children[0].innerText.split('');
    itemText.map(letter => (newString += letter == ' ' ? `<span class='gap'></span>` : `<span>${letter}</span>`))
    item.innerHTML = newString;
    observer.observe(item);
})

// Content Two
listItemsSecond.forEach(item =>{

    let newString = '';
    let itemText = item.children[0].innerText.split('');
    itemText.map(letter => (newString += letter == ' ' ? `<span class='gap'></span>` : `<span>${letter}</span>`))
    item.innerHTML = newString;
    observer.observe(item);
})

// Content Three
listItemsThird.forEach(item =>{

    let newString = '';
    let itemText = item.children[0].innerText.split('');
    itemText.map(letter => (newString += letter == ' ' ? `<span class='gap'></span>` : `<span>${letter}</span>`))
    item.innerHTML = newString;
    observer.observe(item);
})


//   hide content

function myFunction() {
    var element = document.getElementById("hide-this-one");
    element.classList.toggle("hide-content-one");

    // hide footer
    
    var elementTwo = document.getElementById("hide-this-two");
    elementTwo.classList.toggle("hide-content-two");
 }