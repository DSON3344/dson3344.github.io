const imageLayer = document.querySelector('.image-layer');
const header = document.querySelector('header');

imageLayer.style.backgroundSize = '150%';
imageLayer.style.backgroundPosition = '38% 50%';

header.addEventListener('mousemove', (event) => {
    const rect = imageLayer.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.38) * 20;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 5;

    imageLayer.style.backgroundPosition = `${38 + x}% ${50 + y}%`;
});

header.addEventListener('mouseleave', () => {
    imageLayer.style.backgroundPosition = '38% 50%';
});

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const overlay = document.querySelector('.overlay');
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
}

function toggleFlip(container) {
    container.classList.toggle('flipped');
}

function toggleFlip(element) {
    element.classList.toggle("flipped");
}

function openModal(img) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const caption = document.getElementById('caption');

    modal.style.display = "flex";
    modalImg.src = img.src;
    caption.textContent = img.alt;

    if (img.naturalWidth > img.naturalHeight) {
        modalImg.classList.add('landscape');
        modalImg.classList.remove('portrait');
    } else {
        modalImg.classList.add('portrait');
        modalImg.classList.remove('landscape');
    }
}

function closeModal(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

function initComparisons() {
    var x, i;
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        compareImages(x[i]);
    }
}

function compareImages(img) {
    var slider, clicked = 0, w, h;
    w = img.offsetWidth;
    h = img.offsetHeight;
    img.style.width = (w / 2) + "px";
    slider = document.createElement("DIV");
    slider.setAttribute("class", "img-comp-slider");
    img.parentElement.insertBefore(slider, img);
    slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
    slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
    slider.addEventListener("mousedown", slideReady);
    window.addEventListener("mouseup", slideFinish);
    slider.addEventListener("touchstart", slideReady);
    window.addEventListener("touchend", slideFinish);

    function slideReady(e) {
        e.preventDefault();
        clicked = 1;
        window.addEventListener("mousemove", slideMove);
        window.addEventListener("touchmove", slideMove);
    }

    function slideFinish() {
        clicked = 0;
    }

    function slideMove(e) {
        var pos;
        if (clicked == 0) return false;
        pos = getCursorPos(e);
        if (pos < 0) pos = 0;
        if (pos > w) pos = w;
        slide(pos);
    }

    function getCursorPos(e) {
        var a, x = 0;
        e = (e.changedTouches) ? e.changedTouches[0] : e;
        a = img.getBoundingClientRect();
        x = e.pageX - a.left;
        x = x - window.pageXOffset;
        return x;
    }

    function slide(x) {
        img.style.width = x + "px";
        slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
    }
}

window.addEventListener('DOMContentLoaded', function () {
    initComparisons();
});

function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

window.addEventListener('scroll', debounce(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        loadImages();
    }
}, 300));

const batchSize = 8;
let currentIndex = 0;

function loadImages() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < batchSize && currentIndex < imageData.length; i++) {
        const imgDiv = document.createElement('div');
        imgDiv.className = 'image-container';

        const img = document.createElement('img');
        img.dataset.src = imageData[currentIndex].src;
        img.alt = imageData[currentIndex].alt;

        imgDiv.appendChild(img);
        fragment.appendChild(imgDiv);

        currentIndex++;
    }
    container.appendChild(fragment);
    lazyLoadImages();
}

function toggleFullscreenClass() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        const isFullscreen =
            document.fullscreenElement === video ||
            document.webkitFullscreenElement === video ||
            document.mozFullScreenElement === video ||
            document.msFullscreenElement === video;

        if (isFullscreen) {
            video.classList.add('fullscreen');
        } else {
            video.classList.remove('fullscreen');
        }
    });
}

document.addEventListener('fullscreenchange', toggleFullscreenClass);
document.addEventListener('webkitfullscreenchange', toggleFullscreenClass);
document.addEventListener('mozfullscreenchange', toggleFullscreenClass);
document.addEventListener('MSFullscreenChange', toggleFullscreenClass);

function flipCard(card) {
    const inner = card.querySelector('.flip-card-inner');
    inner.style.transform = inner.style.transform === 'rotateY(180deg)'
        ? 'rotateY(0deg)'
        : 'rotateY(180deg)';
}

function toggleMenu() {
    const navbar = document.querySelector('.navbar');
    const overlay = document.querySelector('.overlay');
    navbar.classList.toggle('active');
    overlay.classList.toggle('active');
}

const headerImage = document.querySelector(".header-image");

function handleOrientation(event) {
    let moveX = event.gamma;
    let moveY = event.beta;

    moveX = Math.max(-30, Math.min(30, moveX));
    moveY = Math.max(-30, Math.min(30, moveY));

    moveX *= 0.5;
    moveY *= 0.5;

    headerImage.style.transform = `translate(${moveX}px, ${moveY}px) 
                                   rotateX(${moveY * -0.2}deg) 
                                   rotateY(${moveX * 0.2}deg)`;
}

window.addEventListener("deviceorientation", handleOrientation);

window.addEventListener("scroll", () => {
    const button = document.getElementById("backToTop");
    if (window.scrollY > 400) {
        button.style.display = "flex";
    } else {
        button.style.display = "none";
    }
});

document.getElementById("backToTop").addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
});

let currentImgIndex = 0;
let modal = document.getElementById('imageModal');
let modalImg = document.getElementById('modalImg');
let captionText = document.getElementById('caption');
let allImgs = document.querySelectorAll('.portfolio img');

let startX = 0;
let currentTranslateX = 0;
let isDragging = false;

function openModal(img) {
    modal.style.display = 'flex';
    currentImgIndex = Array.from(allImgs).indexOf(img);
    updateModalContent();
    modalImg.style.transition = 'transform 0.3s ease';
}

function closeModal(event) {
    if (event.target === modal || event === undefined) {
        modal.style.display = 'none';
    }
}

function updateModalContent(direction = 0) {
    let img = allImgs[currentImgIndex];
    modalImg.src = img.src;
    modalImg.alt = img.alt;
    captionText.innerText = img.alt;

    if (direction !== 0) {
        modalImg.style.transition = 'none';
        modalImg.style.transform = `translateX(${direction * modal.offsetWidth}px)`;
        setTimeout(() => {
            modalImg.style.transition = 'transform 0.3s ease';
            modalImg.style.transform = 'translateX(0)';
        }, 10);
    } else {
        modalImg.style.transform = 'translateX(0)';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowLeft") changeImage(-1);
    if (e.key === "ArrowRight") changeImage(1);
});

function changeImage(direction) {
    const nextIndex = (currentImgIndex + direction + allImgs.length) % allImgs.length;

    modalImg.style.transition = 'transform 0.1s ease';
    modalImg.style.transform = `translateX(${-direction * modal.offsetWidth}px)`;

    setTimeout(() => {
        currentImgIndex = nextIndex;
        updateModalContent(direction);
    }, 100);
}

modalImg.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
    modalImg.style.transition = 'none';
});

modalImg.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    let moveX = e.touches[0].clientX - startX;
    currentTranslateX = moveX;
    modalImg.style.transform = `translateX(${moveX}px)`;
});

modalImg.addEventListener('touchend', () => {
    isDragging = false;
    const threshold = modal.offsetWidth / 4;
    if (currentTranslateX > threshold) {
        changeImage(-1);
    } else if (currentTranslateX < -threshold) {
        changeImage(1);
    } else {
        modalImg.style.transition = 'transform 0.3s ease';
        modalImg.style.transform = 'translateX(0)';
    }
    currentTranslateX = 0;
});
