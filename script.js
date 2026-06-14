// 1. Select your Apple-style cards and the modal container elements
document.querySelectorAll('.apple-card').forEach(card => {
    card.addEventListener('click', () => {
        // Pull the custom attributes from the clicked card
        const videoSrc = card.getAttribute('data-video');
        const title = card.getAttribute('data-title');
        const desc = card.getAttribute('data-desc');

        // Target your modal elements (Make sure these IDs/Classes match your layout)
        const modal = document.getElementById('case-study-modal'); 
        const modalVideo = modal.querySelector('.modal-video');
        const modalTitle = modal.querySelector('.modal-title');
        const modalDesc = modal.querySelector('.modal-desc');

        // 2. Set the text contents dynamically
        modalTitle.textContent = title;
        modalDesc.textContent = desc;
        
        // 3. Update and run the video element inside the modal
        if (videoSrc) {
            modalVideo.src = videoSrc;
            modalVideo.load(); // Forces the browser to load the new video track
            
            // Play video immediately (handles browser blocking mechanics elegantly)
            modalVideo.play().catch(error => {
                console.log("Auto-play blocked or interrupted:", error);
            });
        }

        // 4. Reveal the modal overlay
        modal.classList.add('open'); // Or whatever class handles your transition opacity
    });
});

// 5. Clean up your modal when closed so audio/video tracks don't keep playing in the background
document.querySelector('.close-btn').addEventListener('click', () => {
    const modal = document.getElementById('case-study-modal');
    const modalVideo = modal.querySelector('.modal-video');
    
    if (modalVideo) {
        modalVideo.pause();
        modalVideo.src = ""; // Clears the stream cache instantly
    }
    
    modal.classList.remove('open');
});

// PARALLAX BANNER

gsap.to(".banner-bg",{
    y:-150,
    ease:"none",
    scrollTrigger:{
        trigger:".luxury-banner",
        start:"top bottom",
        end:"bottom top",
        scrub:true
    }
});

// PROCESS IMAGE REVEAL

gsap.utils.toArray(".process-item").forEach((item)=>{

    gsap.from(item,{
        opacity:0,
        y:80,
        duration:1,
        scrollTrigger:{
            trigger:item,
            start:"top 85%"
        }
    });

});



