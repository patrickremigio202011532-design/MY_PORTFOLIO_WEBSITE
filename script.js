document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    /* A. MOBILE INTERACTIVE NAVIGATION CONTROLLER */
    // ==========================================================================
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    const toggleMobileNav = () => {
        const isOpen = mobileMenuOverlay.classList.toggle('open');
        mobileNavToggle.classList.toggle('active');
        
        if (isOpen) {
            // Freezes multi-axis touch scrolling on mobile layers natively (Safari / Chrome)
            document.body.classList.add('mobile-nav-open');
        } else {
            document.body.classList.remove('mobile-nav-open');
        }
    };

    if (mobileNavToggle && mobileMenuOverlay) {
        mobileNavToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMobileNav();
        });
    }

    // Dynamic clean close whenever a user strikes a navigation element jump line link
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenuOverlay.classList.contains('open')) {
                toggleMobileNav();
            }
        });
    });

    // ==========================================================================
    /* B. CORE WORKSPACE MODAL CONTROLLER MATRIX */
    // ==========================================================================
    document.querySelectorAll('.apple-card, .buy-card').forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault(); // Inhibits viewport canvas pop shifts on smartphone viewports

            const videoSrc = card.getAttribute('data-video');
            const imgSrc = card.getAttribute('data-image');
            const title = card.getAttribute('data-title');
            const desc = card.getAttribute('data-desc');

            const modal = document.getElementById('infoModal'); 
            const modalImg = document.getElementById('modalImage');
            const modalVideo = document.getElementById('modalVideo');
            const modalTitle = document.getElementById('modalTitle');
            const modalDesc = document.getElementById('modalDesc');

            modalTitle.textContent = title;
            modalDesc.textContent = desc;
            
            // Layout switcher execution logic
            if (videoSrc) {
                modalImg.style.display = 'none';
                modalVideo.style.display = 'block';
                modalVideo.src = videoSrc;
                modalVideo.load(); 
                
                // Low power safe video playback stream activation check for mobile
                modalVideo.play().catch(error => {
                    console.log("Auto-play blocked or interrupted:", error);
                });
            } else {
                if (modalVideo) {
                    modalVideo.pause();
                    modalVideo.style.display = 'none';
                }
                modalImg.style.display = 'block';
                modalImg.src = imgSrc || '';
            }

            modal.style.display = 'flex';
            document.body.style.overflowY = 'hidden'; 
        });
    });

    const cleanAndCloseModal = () => {
        const modal = document.getElementById('infoModal');
        const modalVideo = document.getElementById('modalVideo');
        
        if (modal) modal.style.display = 'none';
        document.body.style.overflowY = 'auto'; 
        
        if (modalVideo) {
            modalVideo.pause();
            modalVideo.src = ""; // Clears streaming cache instantly to protect cellular data bandwidth
        }
    };

    const closeModalBtn = document.querySelector('.close-modal');
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', cleanAndCloseModal);
    }

    const infoModal = document.getElementById('infoModal');
    if (infoModal) {
        infoModal.addEventListener('click', (e) => {
            if (e.target === infoModal) {
                cleanAndCloseModal();
            }
        });
    }
});
