document.addEventListener('DOMContentLoaded', () => {
    // Select all navigation links
    const navLinks = document.querySelectorAll('nav .nav-link');

    // Add click event listener to each navigation link for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor link behavior

            // Get the target section's ID from the href attribute
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Calculate the offset to account for the fixed navigation bar
                const navHeight = document.querySelector('nav').offsetHeight;
                const offsetTop = targetSection.offsetTop - navHeight;

                // Smooth scroll to the target section
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer to highlight active navigation link on scroll
    const sections = document.querySelectorAll('main section'); // Select all main sections
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin around the root
        threshold: 0.7 // Trigger when 70% of the section is visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active classes from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('text-indigo-600', 'font-bold');
                    link.classList.add('text-gray-700', 'font-semibold');
                });

                // Add active classes to the current nav link
                const currentNavLink = document.querySelector(`nav a[href="#${entry.target.id}"]`);
                if (currentNavLink) {
                    currentNavLink.classList.remove('text-gray-700', 'font-semibold');
                    currentNavLink.classList.add('text-indigo-600', 'font-bold');
                }
            }
        });
    }, observerOptions);

    // Observe each section
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});
