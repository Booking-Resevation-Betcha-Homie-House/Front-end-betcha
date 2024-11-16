const urlParams = new URLSearchParams(window.location.search);
const unitId = urlParams.get('id');
console.log('Unit ID from URL: ', unitId);

fetchUnitDetails();
async function fetchUnitDetails() {
    try {
        console.log("trying to fetch...");
        const response = await fetch(`https://betcha-booking-api-master.onrender.com/getUnitById/${unitId}`);
        const unit = await response.json();
        console.log("Fetched Unit: ", unit);

        if (unit) {
            const unitNameElement = document.getElementById('unitName');
            unitNameElement.innerHTML = `<strong>${unit.unitName}</strong>`;

            document.getElementById('unitLocation').innerHTML = unit.location;
            document.getElementById('unitDescription').innerHTML = "<strong>Description:</strong> " + unit.description;
            document.getElementById('unitPrice').innerHTML = "<strong>Price/Day:</strong> " + `₱ ${unit.unitPrice}`;
            document.getElementById('unitMaxPax').innerHTML = "<strong>Maximum Pax:</strong> " + unit.maxPax;

            const imagesContainer = document.getElementById('unitImages');
            unit.UnitImages.forEach(image => {
                const img = document.createElement('img');
                img.src = `https://drive.google.com/thumbnail?id=${image.fileId}&sz=w1920-h1080`;
                img.alt = image.filename;
                img.classList.add('img-fluid');
                img.style.width = '400px';  // Adjust width here
                img.style.height = 'auto';  // Adjust height (auto to maintain aspect ratio)
                imagesContainer.appendChild(img);
            });
            
        } else {
            console.log('No unit data available');
        }
    } catch (error) {
        console.error('Error fetching unit details:', error);
    }
}
