// Google Analytics event tracking
// var trackEl = document.querySelectorAll('.ga-track');
// Array.prototype.forEach.call(trackEl, function(el) {
//     el.onclick = function() {
//         var elCategory = this.getAttribute('data-category');
//         var elAction = this.getAttribute('data-action');
//         var elLabel = this.getAttribute('data-label');
//         ga('send', 'event', elCategory, elAction, elLabel);
//     };
// });

// function sendAnalytics(el) {
//   var elCategory = el.getAttribute('data-category');
//   var elAction = el.getAttribute('data-action');
//   var elLabel = el.getAttribute('data-label');
//   ga('send', 'event', elCategory, elAction, elLabel);
// }

var scrollPos;
var loadingScreen = document.querySelector('.loading-screen');

window.onload = function () {
  scrollPos = window.pageYOffset;
  fadeIn();
  lazy.length && lazyLoad();
  enableAutoPlay();
  // allCharWrapper.length > 0 && setInterval(autoPlayChars, 7000);
  makeDots();
};
window.ontouchmove = function () {
  scrollPos = window.pageYOffset;
};
window.onresize = function () {
};
window.onscroll = function () {
  scrollPos = window.pageYOffset;
  // scrollPromptCheck();
  updateInView();
  triggerElement && fadeBackground();
};

// Intro Animation

var w = window,
d = document,
e = d.documentElement,
g = d.getElementsByTagName('body')[0],
x = w.innerWidth||e.clientWidth||g.clientWidth,
isRootPage = location.pathname == "/";

// const scrollPrompt = document.querySelector('.scroll-prompt');

function fadeIn() {
  setTimeout(function(){
    loadingScreen.style.opacity = 0;
  }, 2000);

  setTimeout(function(){
    loadingScreen.style.display = 'none';
  }, 3200);

  setTimeout(function(){
    if (scrollPos < 1) {
      TweenMax.to(window, 1.7, {scrollTo:35, ease: Power4.easeInOut});
    }
  }, 2000);

  // SCROLL PROMPT

  // setTimeout(function(){
  //   scrollPromptCheck();
  //   window.onscroll = function () {
  //     scrollPromptCheck();
  //   };
  // }, 8000);

  if (scrollPos < 1) {
    document.body.classList.add('lock-scroll');
    setTimeout(function(){
      document.body.classList.remove('lock-scroll');
    }, 1800);
  }
}


// SCROLL PROMPT
// let showedUp = 0;
// function scrollPromptCheck() {
//   if (scrollPos < 60 && showedUp !== 1) {
//     scrollPrompt.classList.remove('hide');
//     showedUp = 1;
//   } else {
//     scrollPrompt.classList.add('hide');
//     window.removeEventListener('scroll', scrollPromptCheck);
//   }
// }



// LAZY LOAD
var lazy = document.getElementsByClassName('js-lazy');
if (lazy.length) {
  function lazyLoad() {
    for (var i=0; i < lazy.length; i++) {
      var lazyDataSrc = lazy[i].getAttribute('data-src');
      if (lazyDataSrc) {
        lazy[i].setAttribute('src', lazyDataSrc);
      }
      if (lazy[i].parentNode.nodeName === 'VIDEO') {
        var video = lazy[i].parentNode;
        video.load();
      }
    }
  }
  // window.onload = lazyLoad;
}

// INDEX MENU FUNCTIONALITY
const indexBgImages = document.querySelectorAll('.index-bg-image');
const indexTitles = document.querySelectorAll('.index-title');

indexTitles.forEach(item => {
  item.addEventListener('mouseenter', hoverIndexBgImage);
});

function hoverIndexBgImage() {
  indexBgImages.forEach(item => {
    if (item.classList[1] === this.classList[1]) {
      item.classList.add('move');
    } else {
      item.classList.remove('move');
    }
  });
}

function toggleIndex(e) {
  const overlay = document.getElementById('index-overlay');
  overlay.classList.contains('move') ? overlay.classList.remove('move') : overlay.classList.add('move');
}


// MENU FUNCTIONALITY
function toggleNav(e) {
  var about = document.getElementsByClassName('menu-button')[0];
  var overlay = document.getElementById('menu');
  const indexOverlay = document.getElementById('index-overlay');

  if (indexOverlay.classList.contains('move')) {
    indexOverlay.classList.remove('move');
  } else if (overlay.classList.contains('move')) {
    overlay.classList.remove('move');
    about.classList.remove('-active');
  } else {
    overlay.classList.add('move');
    about.classList.add('-active')
  }

  document.body.classList.contains('lock-scroll') && !overlay.classList.contains('move') ? document.body.classList.remove('lock-scroll') : document.body.classList.add('lock-scroll');
  // sendAnalytics(e);
}

function closeNav() {
  document.getElementById('menu').classList.remove('move');
  document.body.classList.remove('lock-scroll');
  var eventList = ['click', 'touchstart'];
  eventList.forEach(function(event) {
    document.removeEventListener(event, handleClickOutsideAbout);
  });
}


// FORM MODAL FUNCTIONALITY
function toggleForm(e) {
  var overlay = document.getElementById('form-modal-wrapper');

  if (overlay.classList.contains('move')) {
    overlay.classList.remove('move');
  } else {
    overlay.classList.add('move');
  }

  document.body.classList.contains('lock-scroll') && !overlay.classList.contains('move') ? document.body.classList.remove('lock-scroll') : document.body.classList.add('lock-scroll');
  // sendAnalytics(e);
}

function closeForm() {
  document.getElementById('form-modal-wrapper').classList.remove('move');
  document.body.classList.remove('lock-scroll');
  var eventList = ['click', 'touchstart'];
  eventList.forEach(function(event) {
    // document.removeEventListener(event, handleClickOutsideAbout);
  });
}


// ANIMATE TO TOP
function animateToTop(e) {
  TweenMax.to(window, 1.7, {scrollTo:{y:0, autoKill: false}, ease: Power4.easeInOut});
}


// HOME PAGE CLICK-THROUGH SLIDER
var autoplay;
function enableAutoPlay() {
  autoplay = setInterval(handleSlideForward, 7000);
}

function disableAutoPlay() {
  clearInterval(autoplay);
  autoplay = setInterval(handleSlideForward, 15000);
}
const landingProjects = Array.from(document.querySelectorAll('.landing-project'));
const activeProject = landingProjects[0];

const slideForward = document.querySelector('.slide-forward');
const slideBackward = document.querySelector('.slide-backward');

let slideIndex;
let slideTotal;
if (slideForward) {
  slideForward.addEventListener('click', function() {
    handleSlideForward();
    disableAutoPlay();
  });
  slideBackward.addEventListener('click', handleSlideBackward);
  slideIndex = 0;
  slideTotal = landingProjects.length;
  function handleSlideForward() {
    const slideDots = document.querySelectorAll('.slide-dot');
    landingProjects[slideIndex].classList.remove('-active');
    landingProjects[(slideIndex+1) % slideTotal].classList.add('-active');
    slideDots[slideIndex].classList.remove('-active');
    slideDots[(slideIndex+1) % slideTotal].classList.add('-active');
    slideIndex = (slideIndex+1) % slideTotal;
  }

  function handleSlideBackward() {
    const slideDots = document.querySelectorAll('.slide-dot');
    const itemActive = slideIndex === 0 ? slideTotal - 1 : Math.abs(slideIndex - 1);
    landingProjects[slideIndex].classList.remove('-active');
    landingProjects[itemActive].classList.add('-active');
    slideDots[slideIndex].classList.remove('-active');
    slideDots[itemActive].classList.add('-active');
    slideIndex = itemActive;
    disableAutoPlay();
  }
}
function makeDots() {
  const slideDotsWrapper = document.querySelector('.slide-dots');

  for (i = 0; i < landingProjects.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('slide-dot');
    i === 0 && dot.classList.add('-active');
    slideDotsWrapper.append(dot);
  }
  const slideDots = Array.from(document.querySelectorAll('.slide-dot'));
  slideDots.forEach(item => {
    item.addEventListener('click', function (event) {
      handleDotClick(event);
    });
  });
}

function handleDotClick(e) {
  const slideDots = Array.from(document.querySelectorAll('.slide-dot'));
  const slideDotsWrapper = document.querySelector('.slide-dots');
  const dotIndex = Array.prototype.indexOf.call(slideDotsWrapper.children, e.target);
  const itemActive = slideIndex === 0 ? slideTotal - 1 : Math.abs(slideIndex);
  landingProjects[slideIndex].classList.remove('-active');
  landingProjects[dotIndex].classList.add('-active');
  slideDots[slideIndex].classList.remove('-active');
  slideDots[dotIndex].classList.add('-active');
  slideIndex = dotIndex;
  disableAutoPlay();
}


// PROJECT CAROUSELS
var carouselContainers = document.querySelectorAll('.carousel-wrapper');

for ( var i=0; i < carouselContainers.length; i++ ) {
  var container = carouselContainers[i];
  initCarouselContainer( container );
}

function initCarouselContainer( container ) {
  var isMobile = matchMedia('screen and (max-width: 768px)').matches;
  var carousel = container.querySelector('.main-carousel');
  var flkty = new Flickity(carousel, {
    contain: false,
    pageDots: false,
    imagesLoaded: true,
    draggable: isMobile
  });
  var carouselStatus = container.querySelector('.carousel-status');

  function updateStatus() {
    var slideNumber = flkty.selectedIndex + 1;
    carouselStatus.textContent = slideNumber + ' / ' + flkty.slides.length;
  }
  updateStatus();

  flkty.on( 'select', updateStatus );
}


// BACKGROUND COLOR FADE
let vph = window.innerHeight;

const triggerElement = document.querySelector('.js-bg-color-fade');
const projectContent = document.querySelector('.project-content');
const projectContentBGColor = projectContent && projectContent.dataset.bgColor;

function crossTrigger() {
  const trigger = triggerElement && triggerElement.getBoundingClientRect();
  return !(trigger.bottom > vph - 100);
}

function fadeBackground() {
  crossTrigger() ? projectContent.classList.add(projectContentBGColor) : projectContent.classList.remove(projectContentBGColor);
}

triggerElement && fadeBackground();


// FADE-UP WHEN ELEMENTS ENTER VIEWPORT
let fadeUpElements = [...document.querySelectorAll('.js-fade-up')];
let projectVideos = document.querySelectorAll('.project-video');

function inView(el) {
  var eb = el.getBoundingClientRect();
  return !((eb.top + eb.height < 0) || (eb.top > vph - 180));
}

function updateInView() {
  fadeUpElements.forEach(item => {
    inView(item) && item.classList.add('fade-up');
  });
  projectVideos.forEach(item => {
    inView(item.parentNode) && item.parentNode.play();
  });
}

updateInView();


// EMOJI WORD REPLACEMENT
const allCharWrapper = Array.from(document.querySelectorAll('.char-wrapper'));
const allCharOriginal = Array.from(document.querySelectorAll('.char-original'));
const allCharEmoji = Array.from(document.querySelectorAll('.char-emoji'));

document.body.addEventListener('click', resetChars);

allCharWrapper.forEach((item) => {
  item.addEventListener('mouseenter', function (event) {
    handleMouseEnter(event);
  });
});

function handleMouseEnter(event) {
  var rand = Math.floor(Math.random() * (event.target.children.length - 1)) + 1;
  if (event.target.children[0].classList.contains('show')) {
    event.target.children[0].classList.add('hide');
    event.target.children[0].classList.remove('show');
    event.target.children[rand].classList.add('show');
    event.target.children[rand].classList.remove('hide');
  } else {
    event.target.children[0].classList.add('show');
    event.target.children[0].classList.remove('hide');
    var allChildren = Array.from(event.target.children);
    var removeEmojiList = allChildren.slice(1);

    removeEmojiList.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show');
    });
  }

  if (allCharEmoji.length === document.querySelectorAll('.char-emoji.show').length) {
    allCharEmoji.forEach(item => {
      item.style.animation = 'wave 2s infinite';
    })
  } else {
    allCharEmoji.forEach(item => {
      item.style.animation = '';
    })
  }
};

function autoPlayChars() {
  var rand = Math.floor(Math.random() * allCharWrapper.length);
  var randEmoji = Math.floor(Math.random() * (allCharWrapper[rand].children.length - 1)) + 1;

  if (allCharWrapper[rand].children[0].classList.contains('show')) {
    allCharWrapper[rand].children[0].classList.add('hide');
    allCharWrapper[rand].children[0].classList.remove('show');
    allCharWrapper[rand].children[randEmoji].classList.add('show');
    allCharWrapper[rand].children[randEmoji].classList.remove('hide');
  } else {
    allCharWrapper[rand].children[0].classList.add('show');
    allCharWrapper[rand].children[0].classList.remove('hide');
    var allChildren = Array.from(allCharWrapper[rand].children);
    var removeEmojiList = allChildren.slice(1);

    removeEmojiList.forEach(item => {
      item.classList.add('hide');
      item.classList.remove('show');
    });
  }

}

function resetChars() {
  allCharOriginal.forEach(item => {
    item.classList.add('show');
    item.classList.remove('hide');
  });
  allCharEmoji.forEach(item => {
    item.classList.add('hide');
    item.classList.remove('show');
  })
}


// CIRCULAR SCROLL PROGRESS BAR + BACK TO TOP
const scrollProgress = document.querySelector('.scroll-progress');
if (scrollProgress) {
  var progressPath = document.querySelector('.outline'),
      pathLength   = progressPath.getTotalLength(),
      lastPosition = -1;

  progressPath.style.stroke = '#ffffff';
  progressPath.style.strokeWidth = 20;
  progressPath.style.strokeDasharray = pathLength + ' ' + pathLength;
  progressPath.style.strokeDashoffset = pathLength;
  // progressPath.getBoundingClientRect();

  function updateProgress() {
    if (lastPosition > 200) {
      scrollProgress.classList.remove('hide');
    } else {
      scrollProgress.classList.add('hide');
    }
    var progress = pathLength - ( window.pageYOffset * pathLength / ( document.body.scrollHeight - window.innerHeight ) );

    // Update dashOffset
    progressPath.style.strokeDashoffset = progress;
  }

  function loop() {
    if ( lastPosition == window.pageYOffset ) {
      window.requestAnimationFrame( loop );
      return false;
    } else {
      lastPosition = window.pageYOffset;
      updateProgress();
    }
    window.requestAnimationFrame( loop );
  }

  // Call the loop for the first time
  loop();
}


// CUSTOM MOUSE CURSOR USING DIV
// document.body.addEventListener('mousemove', function(e) {
//   var bx = document.getElementById("box");
//   bx.style.left = e.pageX + 'px';
//   bx.style.top = e.pageY + 'px';
// });


// CUSTOM MOUSE CURSOR

// const canvas = document.querySelector('.js-canvas')
// const ctx = canvas.getContext('2d')
//
// let width = canvas.width = window.innerWidth
// let height = canvas.height = window.innerHeight
//
// let mouseX = width / 2;
// let mouseY = height / 2;
//
// let circle = {
//   radius: 10,
//   lastX: mouseX,
//   lastY: mouseY
// }
//
// const elems = [...document.querySelectorAll('[data-hover]')]
//
// function onResize () {
//   width = canvas.width = window.innerWidth
//   height = canvas.height = window.innerHeight
// }
//
// function render () {
//   circle.lastX = lerp(circle.lastX, mouseX, 0.25)
//   circle.lastY = lerp(circle.lastY, mouseY, 0.25)
//
//   ctx.clearRect(0, 0, width, height)
//   ctx.beginPath()
//   ctx.arc(circle.lastX, circle.lastY, circle.radius, 0, Math.PI * 2, false)
//   ctx.fillStyle = "#ffffff"
//   ctx.fill()
//   ctx.closePath()
//
//   requestAnimationFrame(render)
// }
//
// function init () {
//   requestAnimationFrame(render)
//
//   window.addEventListener('mousemove', function(e) {
//     mouseX = e.pageX;
//     mouseY = e.pageY;
//   })
//
//   window.addEventListener('resize', onResize, false)
//
//   let tween = TweenMax.to(circle, 0.25, {
//     radius: circle.radius * 3,
//     ease: Power1.easeInOut,
//     paused: true
//   })
//
//   elems.forEach((el) => {
//     el.addEventListener('mouseenter', () => {
//       tween.play()
//     }, false)
//     el.addEventListener('mouseleave', () => {
//       tween.reverse()
//     }, false)
//   })
// }
//
// function lerp(a, b, n) {
//   return (1 - n) * a + n * b
// }
//
// init()
