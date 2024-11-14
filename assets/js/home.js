async function fetchUnits() {
    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/units'); 
        const units = await response.json();
  
        const unitContainer = document.getElementById('unitContainer');
        unitContainer.innerHTML = '';
  
        units.forEach(unit => {
            let imagesHtml = `<div class="scroll-container">`;
            unit.UnitImages.forEach(image => {
                const imageUrl = `https://drive.google.com/thumbnail?id=${image.fileId}`;
                imagesHtml += `<img src="${imageUrl}" alt="${image.filename}" class="img-fluid">`;
            });
            imagesHtml += `</div>`;
  
            const unitCard = document.createElement('div');
            unitCard.className = 'col-md-4 mb-4';
            unitCard.style.width = '450px';
            unitCard.style.maxWidth = '450px';

            const availability = unit.isAvailable ? "Available" : "Not available";

            unitCard.innerHTML = `
                <div class="card" style="margin: 16px;">
                    <div class="card-body" style="max-width: 520px;">
                        <h5 class="card-title">${unit.unitName}</h5>
                        <h6 class="text-muted card-subtitle mb-2">${unit.location}</h6>
                        <p class="card-text">${unit.description}</p>
                        <p><strong>Inclusion:</strong> ${unit.inclusion}</p>
                        <p><strong>Price:</strong> ${unit.unitPrice}</p>
                        <p><strong>Area:</strong> ${unit.location}</p>
                        <p><strong>Availability:</strong> ${availability}</p>
                        ${imagesHtml}
                    </div>
                </div>
            `;
            unitContainer.appendChild(unitCard);
        });
    } catch (error) {
        console.error('Error fetching units:', error);
    }
  }
  
  window.onload = fetchUnits;