const firstNamePosition = document.querySelector('.first-name');
firstNamePosition.style.left = window.innerWidth / 2 - firstNamePosition.offsetWidth + 'px';

const lastNamePosition = document.querySelector('.last-name');
lastNamePosition.style.left = window.innerWidth / 2 + 'px';

const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const scaleValue = 0.25; // Scale down to quarter size

let tl = gsap.timeline({ paused: true });

function updatePositions() {
    // Calculate the new position for the first name
    const firstNameWidth = firstName.offsetWidth * scaleValue;
    const lastNameWidth = lastName.offsetWidth * scaleValue;

    const lastNameX = window.innerWidth / 2 - lastNameWidth / 0.80 - firstNameWidth;
    const firstNameX = -window.innerWidth / 2 + firstNameWidth / 0.58 + lastNameWidth;

    // Set up the animation
    tl = gsap.timeline({ paused: true })
        .to(firstName, {
            scale: scaleValue,
            x: firstNameX,
            duration: 2,
            ease: "ease-out"
        })
        .to(lastName, {
            scale: scaleValue,
            x: lastNameX,
            duration: 2,
            ease: "ease-out"
        }, "-=2"); // Starts at the same time as the previous animation
}

// Initial animation
updatePositions();

function isAtBottom(buffer = 0) {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const documentHeight = document.documentElement.scrollHeight;

    return scrollTop + windowHeight >= documentHeight - buffer;
}

function checkScroll() {
    // Check if the user has scrolled to the bottom of the page
    if (isAtBottom(100)) {
        // Reverse the animation
        tl.reverse();
    } else if(tl.reversed()) {
        // Ensure the animation is in the forward state if not at the bottom
        tl.play();
    } else {
        tl.play();
        document.querySelector('.video').style.display = 'none';
    }

    // Check if the user has scrolled to the top of the page
    if (window.scrollY === 0) {
        // Ensure the animation is in the forward state if at the top
        tl.reverse();
        document.querySelector('.video').style.display = 'block';
    
    }
}


// Listen for scroll events
window.addEventListener('scroll', checkScroll);


function updatePositionsAgain() {
    
    // Calculate the new position for the first name
    const firstNameWidth = firstName.offsetWidth * scaleValue;
    const lastNameWidth = lastName.offsetWidth * scaleValue;

    const lastNameX = window.innerWidth / 2 - lastNameWidth / 0.20 - firstNameWidth;

    gsap.to(lastName, {
        x: lastNameX,
        duration: 0,
        ease: "ease-out"
    });
}
// Adjust the positions on window resize
window.addEventListener('resize', updatePositionsAgain);


// Marquee animation
const marqueeAnimation = gsap.to('.marquee', {
    x: -window.innerWidth,
    duration: 10,
    repeat: -1,
    ease: "linear"
});

gsap.to('.marquee', {
    y: -50
});

gsap.to('.marquee', {
    delay: 2,
    y: 0,
    opacity: 0,
    onComplete: () => {
        // Stop the marquee animation
        marqueeAnimation.kill();

        // Restore body overflow
        document.body.style.overflow = 'auto';
        document.body.style.overflowX = 'hidden';
        document.getElementsByClassName('marquee')[0].style.display = 'none';
    }
});

// Nav bar active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('nav a')

window.onscroll = () => {
    sections.forEach((sec) => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('nav-active');
                document.querySelector('nav a[href*=' + id + ']')
                .classList.add('nav-active')
            })
        }
    })
}

// Work card hover effect
document.addEventListener('DOMContentLoaded', () => {
    const workItems = document.querySelectorAll('.work-card');
    const navBar = document.querySelector('nav');
    const firstName = document.querySelector('.first-name');
    const lastName = document.querySelector('.last-name');

    workItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            workItems.forEach(el => {
                if (el !== item) {
                    el.classList.add('blur');

                }
            });
            navBar.classList.add('blur');
            firstName.classList.add('blur');
            lastName.classList.add('blur');

            const title = item.querySelector('.work-item-desc').textContent;
            document.querySelector('.work-title').textContent = title;

        });

        item.addEventListener('mouseout', () => {
            workItems.forEach(el => {
                el.classList.remove('blur');
            });
            navBar.classList.remove('blur');
            firstName.classList.remove('blur');
            lastName.classList.remove('blur');

            document.querySelector('.work-title').textContent = 'WORK';
        });
    });
});


