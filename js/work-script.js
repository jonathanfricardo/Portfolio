document.body.style.overflow = 'auto';

// Contact blur
const contactLink = document.querySelector('.nav-item[href="#contact"]');
const contactHeader = document.querySelector('.contact');
const overlay = document.querySelector('.overlay');
const workLink = document.querySelector('.nav-item[href="#work]');


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
        workLink.classList.add('.nav-active')
    }
});