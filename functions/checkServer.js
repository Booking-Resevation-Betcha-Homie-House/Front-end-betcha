async function ping() {
    console.log('Loading Server...');

    fetch('https://betcha-booking-api-master.onrender.com/ping')
        .then(response => {
            if (!response.ok) {
                throw new Error('Server is down');
            }
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                return response.text();
            }
        })
        .then(data => {
            if (typeof data === 'string' && data === "Server is alive!") {

                const modal = new bootstrap.Modal(document.getElementById('serverStatusModal'));
                modal.show();

                document.getElementById('okayButton').onclick = function () {
                    modal.hide();
                    window.location.href = 'Login.html';
                };
            } else {
                console.log('Unexpected server response:', data);
                setTimeout(ping, 1000);
            }
        })
        .catch(error => {
            console.log('Error checking server status:', error);
            setTimeout(ping, 1000);
        });
}