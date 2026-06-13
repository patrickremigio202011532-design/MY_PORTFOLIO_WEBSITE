// 1. Select your Apple-style cards and the modal container elements
document.querySelectorAll('.apple-card, .buy-card').forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault(); // Prevents default anchor jumping behavior on touch viewports

        // Pull the custom attributes from the clicked card
        const videoSrc = card.getAttribute('data-video');
        const imgSrc = card.getAttribute('data-image');
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');

        // Target your modal elements exactly matching your HTML architecture
        const modal = document.getElementById('infoModal'); 
        const modalImg = document.getElementById('modalImage');
        const modalVideo = document.getElementById('modalVideo');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');

        // 2. Set the text contents dynamically
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        
        // 3. Media type logic switch handling optimized for mobile/safari
        if (videoSrc) {
            // Hide image element frame, expose video stream framework
            modalImg.style.display = 'none';
            modalVideo.style.display = 'block';
            modalVideo.src = videoSrc;
            modalVideo.load(); // Forces the browser to load the new video track
            
            // Play video immediately (handles mobile browser power-saving mechanisms gracefully)
            modalVideo.play().catch(error => {
                console.log("Auto-play blocked or interrupted:", error);
            });
        } else {
            // Revert viewport display window back to image element layout
            if (modalVideo) {
                modalVideo.pause();
                modalVideo.style.display = 'none';
            }
            modalImg.style.display = 'block';
            modalImg.src = imgSrc || '';
        }

        // 4. Reveal the modal overlay
        modal.style.display = 'flex';
        document.body.style.overflowY = 'hidden'; // Lock background scrolling on touch screens
    });
});

// 5. Clean up your modal when closed so audio/video tracks don't keep playing in the background
const cleanAndCloseModal = () => {
    const modal = document.getElementById('infoModal');
    const modalVideo = document.getElementById('modalVideo');
    
    modal.style.display = 'none';
    document.body.style.overflowY = 'auto'; // Re-enable viewport scrolling seamlessly
    
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.src = ""; // Clears the stream cache instantly to save data on mobile devices
    }
};

// Target close button elements and click-outside masks cleanly
document.querySelector('.close-modal').addEventListener('click', cleanAndCloseModal);

document.getElementById('infoModal').addEventListener('click', (e) => {
    if (e.target === document.getElementById('infoModal')) {
        cleanAndCloseModal();
    }
});
