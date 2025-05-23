document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open after clicking a link
            const mainNav = document.querySelector('.main-nav');
            const menuToggle = document.querySelector('.menu-toggle');
            if (window.innerWidth <= 992 && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            menuToggle.classList.toggle('active'); // For animated hamburger icon
        });
    }

    // Project Case Study Toggle
    document.querySelectorAll('.project-card .view-case-study-btn').forEach(button => { // Changed selector
        button.addEventListener('click', function(e) {
            e.preventDefault();

            const caseStudyId = this.dataset.caseStudy; // Get the ID from data-case-study attribute
            const targetCaseStudy = document.getElementById(caseStudyId + '-case-study'); // Append -case-study

            if (targetCaseStudy) {
                // Hide all other open case studies
                document.querySelectorAll('.case-study-content').forEach(cs => {
                    if (cs !== targetCaseStudy) {
                        cs.classList.add('hidden');
                    }
                });

                // Toggle the target case study
                targetCaseStudy.classList.toggle('hidden');
                // Scroll to the opened case study for better UX
                if (!targetCaseStudy.classList.contains('hidden')) {
                    setTimeout(() => { // Small delay to allow display change
                        targetCaseStudy.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 100);
                }
            } else {
                console.warn(`Case study content for "${caseStudyId}" not found.`);
                // Fallback: If no specific case study found, link to GitHub if available
                const githubLinkElement = this.closest('.project-card').querySelector('.project-github-icon');
                if (githubLinkElement && githubLinkElement.parentElement) {
                     window.open(githubLinkElement.parentElement.href, '_blank');
                }
            }
        });
    });

    document.querySelectorAll('.close-case-study').forEach(button => {
        button.addEventListener('click', function() {
            this.closest('.case-study-content').classList.add('hidden');
        });
    });

    // Simple animation for hamburger icon (CSS based on active class)
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
        });
    }

    // Scroll fade-in animation for sections
    const fadeInSections = document.querySelectorAll('section');
    const observerOptions = {
        threshold: 0.1
    };

    const fadeInOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(fadeInOnScroll, observerOptions);
    fadeInSections.forEach(section => {
        section.classList.add('fade-in-section');
        observer.observe(section);
    });
});
