document.addEventListener("DOMContentLoaded", function() {
    const imageUrls = [
        'https://placehold.co/600x400',
        'https://placehold.co/600x400',
        'https://placehold.co/600x400',
    ];
    
    const carouselInner = document.getElementById('carousel-inner');
    
    // Duplicate the images for infinite loop effect
    const duplicateUrls = imageUrls.concat(imageUrls);
    
    duplicateUrls.forEach((url, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('carousel-item');
        
        const img = document.createElement('img');
        img.src = url;
        img.alt = `Product ${index + 1}`;
        
        itemDiv.appendChild(img);
        carouselInner.appendChild(itemDiv);
    });
    
    let index = 0;
    const items = document.querySelectorAll('.carousel-item');
    const totalItems = items.length / 2; // Because we duplicated the array

    function showNextItem() {
        index = (index + 1) % totalItems;
        carouselInner.style.transform = `translateX(-${index * 100}%)`;
        
        if (index === 0) {
            setTimeout(() => {
                carouselInner.style.transition = 'none';
                carouselInner.style.transform = 'translateX(0)';
                setTimeout(() => {
                    carouselInner.style.transition = 'transform 0.5s ease-in-out';
                }, 50);
            }, 500); // Time to complete the transition before resetting
        }
    }

    setInterval(showNextItem, 3000); // Change image every 3 seconds
});
