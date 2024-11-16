async function fetchUnits() {
    const style = document.createElement('style');
    style.textContent = `
        .card {
            border-radius: 15px;
            overflow: hidden;
            transition: background-color 0.3s ease, transform 0.3s ease;
            width: 100%;
            max-width: 320px;
            height: 450px;
            cursor: pointer;
        }
        .card:hover {
            background-color: rgba(0, 0, 0, 0.1);
            transform: scale(1.03);
        }
        .card-text {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 100%;
            display: block;
            max-width: 100%;
        }
        .carousel-container {
            position: relative;
            width: 100%;
            height: 250px;
            overflow: hidden;
        }
        .carousel-image {
            display: none;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .carousel-image.active {
            display: block;
        }
        .carousel-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: white;
            color: black;
            border: none;
            border-radius: 50%;
            padding: 10px;
            cursor: pointer;
            font-size: 16px;
            width: 30px;
            height: 30px;
            display: none;
            justify-content: center;
            align-items: center;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        }
        .carousel-button.left {
            left: 10px;
            background-image: url('assets/image/prevImage.png');
            background-size: 12px;
            background-repeat: no-repeat;
            background-position: center;
            color: transparent;
            font-size: 0;
        }
        .carousel-button.right {
            right: 10px;
            background-image: url('assets/image/nextImage.png');
            background-size: 12px;
            background-repeat: no-repeat;
            background-position: center;
            color: transparent;
            font-size: 0;
        }
        .carousel-container:hover .carousel-button {
            display: flex;
        }
        .card-body {
            overflow-y: auto;
            max-height: 250px;
        }
        @media (min-width: 1200px) {
            .unit-card {
                width: 25%;
            }
        }
        @media (max-width: 1199px) {
            .unit-card {
                width: 33.33%;
            }
        }
        @media (max-width: 767px) {
            .unit-card {
                width: 50%;
            }
        }
        @media (max-width: 480px) {
            .unit-card {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(style);

    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/units');
        const units = await response.json();

        const unitContainer = document.getElementById('unitContainer');
        unitContainer.innerHTML = '';

        units.forEach((unit, unitIndex) => {
            const unitCard = document.createElement('div');
            unitCard.className = 'col-md-4 col-lg-3 unit-card mb-4 text-decoration-none';

            unitCard.onclick = () => {
                console.log('clicked!')
                window.location.href = `/Login-UnitDetail.html?id=${unit._id}`;
            };

            const availability = unit.isAvailable ? "Available" : "Not available";

            const hasMultipleImages = unit.UnitImages.length > 1;
            const imagesHtml = `
                <div class="carousel-container" id="carousel-${unitIndex}">
                    ${unit.UnitImages.map((image, index) => 
                        `<img src="https://drive.google.com/thumbnail?id=${image.fileId}&sz=w1920-h1080" alt="${image.filename}" class="carousel-image ${index === 0 ? 'active' : ''}">`
                    ).join('')}
                    ${hasMultipleImages ? 
                        `<button class="carousel-button left" onclick="prevImage(${unitIndex}, event)">&lt;</button>
                         <button class="carousel-button right" onclick="nextImage(${unitIndex}, event)">&gt;</button>` 
                    : ''}
                </div>
            `;

            const truncatedDescription = unit.description.length > 25 ? unit.description.substring(0, 25) + '...' : unit.description;

            unitCard.innerHTML = `
                <div class="card shadow" style="margin: 16px; color: black;">
                    ${imagesHtml}
                    <div class="card-body">
                        <h4 class="card-title"><strong>${unit.unitName}</strong></h4>
                        <h6 class="text-muted card-subtitle mb-2">${unit.location}</h6>
                        <p class="card-text">${truncatedDescription}</p>
                        <p><strong>Price/Day: ₱</strong> ${unit.unitPrice}</p>
                    </div>
                </div>
            `;
            unitContainer.appendChild(unitCard);
        });
    } catch (error) {
        console.error('Error fetching units:', error);
    }
}

function nextImage(carouselIndex, event) {
    event.stopPropagation();
    const carousel = document.getElementById(`carousel-${carouselIndex}`);
    const images = carousel.querySelectorAll('.carousel-image');
    let activeIndex = Array.from(images).findIndex(image => image.classList.contains('active'));

    images[activeIndex].classList.remove('active');
    activeIndex = (activeIndex + 1) % images.length;
    images[activeIndex].classList.add('active');
}

function prevImage(carouselIndex, event) {
    event.stopPropagation();
    const carousel = document.getElementById(`carousel-${carouselIndex}`);
    const images = carousel.querySelectorAll('.carousel-image');
    let activeIndex = Array.from(images).findIndex(image => image.classList.contains('active'));

    images[activeIndex].classList.remove('active');
    activeIndex = (activeIndex - 1 + images.length) % images.length;
    images[activeIndex].classList.add('active');
}

window.onload = fetchUnits;
