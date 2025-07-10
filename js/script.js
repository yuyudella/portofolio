document.addEventListener('DOMContentLoaded', () => {
    // --- Smooth Scrolling for Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navList = document.querySelector('.nav-list');
            const menuToggle = document.querySelector('.menu-toggle');
            if (navList.classList.contains('active')) {
                navList.classList.remove('active');
                menuToggle.classList.remove('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.nav-list');

    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // --- Active Nav Link on Scroll ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-list li a');

    const activateNavLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset to trigger slightly before the section fully enters view
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.href.includes(current)) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', activateNavLink);
    activateNavLink(); // Initial call to set active link on load

    // --- Hero Section Typing Effect ---
    const typingTextElement = document.querySelector('.typing-text');
    const professions = ["Full-Stack Developer", "Web Designer", "Backend Developer"];
    let professionIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150; // milliseconds per character

    const typeEffect = () => {
        const currentProfession = professions[professionIndex];
        const currentText = isDeleting ? currentProfession.substring(0, charIndex - 1) : currentProfession.substring(0, charIndex + 1);
        typingTextElement.textContent = currentText || '\u00A0';

        if (!isDeleting && charIndex < currentProfession.length) {
            charIndex++;
            setTimeout(typeEffect, typingSpeed);
        } else if (isDeleting && charIndex > 0) {
            charIndex--;
            setTimeout(typeEffect, typingSpeed / 2); // Faster deleting
        } else {
            isDeleting = !isDeleting;
            if (!isDeleting) {
                professionIndex = (professionIndex + 1) % professions.length;
            }
            setTimeout(typeEffect, 1000); // Pause before next action
        }
    };
    typeEffect();

    // --- Experience Slider ---
    const sliderTrack = document.querySelector('.slider-track');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const nextBtn = document.querySelector('.slider-nav.next');
    const sliderItems = document.querySelectorAll('.slider-item');
    const sliderDotsContainer = document.querySelector('.slider-dots');

    let currentIndex = 0;

    // Create dots
    sliderItems.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => moveToSlide(index));
        sliderDotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    const updateSlider = () => {
        const itemWidth = sliderItems[0].clientWidth; // Get width of a single item
        sliderTrack.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

        // Update dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const moveToSlide = (index) => {
        currentIndex = index;
        updateSlider();
    };

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : sliderItems.length - 1;
        updateSlider();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < sliderItems.length - 1) ? currentIndex + 1 : 0;
        updateSlider();
    });

    // Recalculate slider position on resize
    window.addEventListener('resize', updateSlider);
    updateSlider(); // Initial update

    // --- Contact Form (Formspree) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(contactForm);
            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                if (response.ok) {
                    alert('Pesan Anda berhasil terkirim!');
                    contactForm.reset();
                } else {
                    alert('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('Terjadi kesalahan koneksi. Silakan coba lagi.');
            }
        });
    }

    // --- Project Modal Logic ---
    const projectModal = document.getElementById('projectModal');
    const closeButton = projectModal.querySelector('.close-button');
    const viewDetailsButtons = document.querySelectorAll('.view-details');

    const modalTitle = projectModal.querySelector('.modal-title');
    const modalTagline = projectModal.querySelector('.modal-tagline');
    const modalImage = projectModal.querySelector('.modal-image');
    const modalDescription = projectModal.querySelector('#modal-description');
    const modalSoftwareTools = projectModal.querySelector('#modal-software-tools');
    const modalKeyFeatures = projectModal.querySelector('#modal-key-features');
    const modalBenefits = projectModal.querySelector('#modal-benefits');
    const modalLinksContainer = projectModal.querySelector('.modal-links');


    // --- Project Data (Contoh Data Proyek) ---
    // Anda bisa menambahkan lebih banyak proyek di sini
    const projectsData = {
        'pengaduan-kampus': {
            title: 'Campus Service Complaint System',
            tagline: 'Web-Based Reporting System for Students and Campus Admins',
            image: 'images/pengaduan_kampus.png',
            description: 'Developed a web-based complaint platform designed to streamline the process of reporting and managing campus service issues. The system features two main user roles: admin and student. Students can easily submit complaints regarding a wide range of campus services including academics, administration, facilities, behavior/ethics, and more through a structured and accessible interface. Admins are equipped with tools to manage incoming complaints, categorize them, monitor statuses, and respond efficiently. This project emphasizes usability, transparency, and accountability in campus service operations.',
            softwareTools: [
                'PHP (CodeIgniter)',
                'MySQL (Database Management)',
                'JavaScript, HTML5, CSS3'
            ],
            keyFeatures: [
                'Role-based login system for students and admins',
                'Complaint form with categorized service issues (academic, administration, behavior, facilities, etc.)',
                'Admin dashboard to manage, respond to, and filter complaints',
                'Real-time complaint status tracking for students',
                'Responsive design for desktop and mobile access',
                'Basic authentication for secure access'
            ],
            benefits: [
                'Simplifies the complaint submission process for students',
                'Increases transparency and accountability in campus services',
                'Helps administrators respond to issues more efficiently',
                'Centralizes all service-related feedback in one system',
                'Supports a more structured and responsive student service experience',
                'Encourages open communication between students and campus management'
            ],
           
        },
        'helpdesk-kampus': {
            title: 'Campus Helpdesk Application',
            tagline: 'Integrated Support System for Technical & Information Needs',
            image: 'images/chatbot.png',
            description: 'A web-based chatbot application developed to support new and prospective students in accessing essential information about the university. This interactive chatbot simulates real-time conversations to answer frequently asked questions related to registration procedures, available departments, campus facilities, academic environment, and lecturer profiles. Built entirely with HTML, CSS, and JavaScript, the system is lightweight, responsive, and accessible across devices. The project aims to improve the onboarding experience by providing instant, user-friendly guidance without requiring human support.',
            softwareTools: [
                'HTML5',
                'CSS3',
                'JavaScript'
            ],
            keyFeatures: [
                'Real-time chatbot interaction using JavaScript',
                'Provides campus info: registration, majors, facilities, lecturers, etc.',
                'Keyword-based response system',
                'Fully responsive design',
                'Easy to integrate into existing university websites'
            ],
            benefits: [
                'Helps new and prospective students access information easily',
                'Reduces the need for manual inquiries to campus staff',
                'Enhances user engagement with interactive guidance',
                'Increases efficiency in delivering student services',
                'Accessible anytime from any device'
            ],
            
        }
    };

    // Fungsi untuk mengisi konten modal
    const fillModalContent = (projectId) => {
        const project = projectsData[projectId];

        if (project) {
            modalTitle.textContent = project.title;
            modalTagline.textContent = project.tagline;
            modalImage.src = project.image;
            modalImage.alt = project.title; // Set alt text for accessibility
            modalDescription.textContent = project.description;

            // Clear previous lists
            modalSoftwareTools.innerHTML = '';
            modalKeyFeatures.innerHTML = '';
            modalBenefits.innerHTML = '';
            modalLinksContainer.innerHTML = '';

            // Populate Software & Tools
            project.softwareTools.forEach(tool => {
                const li = document.createElement('li');
                // HANYA MENGISI TEKS, ikon ceklis akan ditambahkan oleh CSS ::before
                li.textContent = tool; 
                modalSoftwareTools.appendChild(li);
            });

            // Populate Key Features
            project.keyFeatures.forEach(feature => {
                const li = document.createElement('li');
                // HANYA MENGISI TEKS, ikon ceklis akan ditambahkan oleh CSS ::before
                li.textContent = feature; 
                modalKeyFeatures.appendChild(li);
            });

            // Populate Benefits
            project.benefits.forEach(benefit => {
                const li = document.createElement('li');
                // HANYA MENGISI TEKS, ikon ceklis akan ditambahkan oleh CSS ::before
                li.textContent = benefit; 
                modalBenefits.appendChild(li);
            });

            // Show the modal
            projectModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling body
        }
    };

    // Event listeners for "View Details" buttons
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.projectId;
            fillModalContent(projectId);
        });
    });

    // Event listener for close button
    closeButton.addEventListener('click', () => {
        projectModal.classList.remove('active');
        document.body.style.overflow = ''; // Restore body scroll
    });

    // Close modal when clicking outside of modal-content
    projectModal.addEventListener('click', (event) => {
        if (event.target === projectModal) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Close modal with ESC key
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && projectModal.classList.contains('active')) {
            projectModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
});