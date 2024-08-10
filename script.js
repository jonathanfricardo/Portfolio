window.onload = function() {

    if (window.innerWidth > 600) {
        const firstNamePosition = document.querySelector('.first-name');
        const lastNamePosition = document.querySelector('.last-name');
        
        // Position the first name
        firstNamePosition.style.left = (window.innerWidth / 2) - (firstNamePosition.offsetWidth) + 'px';

        // Position the last name
        lastNamePosition.style.left = (window.innerWidth / 2) + 'px';
    }

};

const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const scaleValue = 0.25; // Scale down to quarter size

let tl = gsap.timeline({ paused: true });

function updatePositions() {

    const isMobile = window.innerWidth < 600;

    // Calculate the new position for the first name
    const firstNameWidth = firstName.offsetWidth * (isMobile ? 1 : scaleValue);
    const lastNameWidth = lastName.offsetWidth * (isMobile ? 1 : scaleValue);

    const lastNameX = window.innerWidth / 2 - lastNameWidth / 0.80 - firstNameWidth;
    const firstNameX = -window.innerWidth / 2 + firstNameWidth / 0.58 + lastNameWidth;

    if (isMobile) {
        // Define mobile-specific animation
        tl = gsap.timeline({ paused: true })
            .to(firstName, {
                x: -window.innerWidth / 2 + 20 , // Example mobile animation
                yPercent: 35,
                duration: 2,
                ease: "ease-out",
                text: 'J' 
                
            })
            .to(lastName, {
                x: window.innerWidth / 2 - 20, // Example mobile animation
                yPercent: -35,
                duration: 2,
                ease: "ease-out",
                text: 'R'
            }, "-=2");
    } else {
        // Desktop animation
        const lastNameX = window.innerWidth / 2 - lastNameWidth / 0.80 - firstNameWidth;
        const firstNameX = -window.innerWidth / 2 + firstNameWidth / 0.58 + lastNameWidth;

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
            }, "-=2");
    }
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
    if (isAtBottom(300)) {
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
    if (window.scrollY === 0 && tl.reversed()) {
        // Ensure the animation is in the forward state if at the top
        tl.reverse();
        document.querySelector('.video').style.display = 'block';

        if (window.innerWidth < 600) {
            document.querySelector('.video').style.display = 'none';
        }
    
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

// Contact blur
const contactLink = document.querySelector('.nav-item[href="#contact"]');
const contactHeader = document.querySelector('.contact');
const overlay = document.querySelector('.overlay');

// Variable to keep track of the contact header visibility state
let isContactVisible = false;

// Click event for contact link
contactLink.addEventListener('click', function(event) {
    event.preventDefault();

    if (isContactVisible) {
        // Hide the contact header and remove the overlay
        gsap.to(contactHeader, { duration: 1, bottom: '-40%' });
        gsap.to(overlay, { duration: 1, opacity: 0, display: 'none' });
        isContactVisible = false;
        document.body.style.overflow = 'auto';
        

        //remove nav-active class from contact
        contactLink.classList.remove('nav-active');

    } else {

        // Show the contact header and display the overlay
        gsap.to(contactHeader, { duration: 1, bottom: '100' });
        gsap.to(overlay, { duration: 1, opacity: 1, display: 'block' });
        document.body.style.overflow = 'hidden';
        isContactVisible = true;

        //remove nav-active class from other and add to contact
        navLinks.forEach(links => {
            links.classList.remove('nav-active');
        });
        contactLink.classList.add('nav-active');
    }
});

// Word animation
document.addEventListener("DOMContentLoaded", function() {
    // Array of word elements and their respective scroll triggers
    const words = [
        { id: "#creative", start: "-40% 100%" },
        { id: "#innovative", start: "-60% 100%" },
        { id: "#collab", start: "-80% 100%" },
        { id: "#and", start: "-40% 100%" },
        { id: "#passionate", start: "-100% 100%" },

    ];

    words.forEach(word => {
        gsap.to(word.id, {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
                trigger: word.id,
                start: word.start, // Adjust the scroll start point for each word
                toggleActions: "play none none none",
            }
        });
    });
});

// Mobile nav modal
const burger = document.querySelector('.burger-menu');
const navModal = document.querySelector('.nav-modal');
const mobileNavItems = document.querySelectorAll('.mobile-nav-item');

// Handle click event on burger menu
burger.addEventListener('click', function(event) {
    event.preventDefault();
    
    // Ensure navModal is displayed
    navModal.style.display = 'block';
    
    // Animate the modal into view
    gsap.to(navModal, { duration: 0.5, y: 0 }); // Adjust 'y' value as needed
});

// Mobile nav modal
let isNavOpen = false;
burger.addEventListener('click', function(event) {
    event.preventDefault();

    if(isNavOpen) {
        burger.src = 'assets/burger-menu-svgrepo-com.svg';
        document.querySelector('.full-name').style.zIndex = 'auto';

        if (tl.reversed()) {
            tl.play();
        }
    

        gsap.to(navModal, {
            duration: 1, 
            yPercent: -110 
            });

        gsap.to(document.querySelector('.mobile-contact-text'), {
            opacity: 0,
            duration: 1,
            delay: 0.5,
            yPercent: +120
        })

        isNavOpen = false;
    } else{
        burger.src = 'assets/burger-menu-svgrepo-com-copy.svg';
        document.querySelector('.full-name').style.zIndex = 14;
        
        if (!tl.reversed()) {
            tl.reverse();
        }


        gsap.to(navModal, {
            duration: 1, 
            yPercent: 110 
            });

        gsap.to(document.querySelector('.mobile-contact-text'), {
            opacity: 1,
            duration: 1,
            delay: 1,
            yPercent: -120
        })

        isNavOpen = true;
    }

});

mobileNavItems.forEach(item => {
    item.addEventListener('click', function() {
        if (isNavOpen) {
            burger.src = 'assets/burger-menu-svgrepo-com.svg'; // Original icon
            gsap.to(navModal, {
                duration: 1,
                yPercent: -100, // Animate out
                onComplete: () => {
                    navModal.style.display = 'none'; // Hide the modal after animation
                }
            });
            isNavOpen = false;
        }
    });
});