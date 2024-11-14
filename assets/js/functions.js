async function loadAdminData() {
    console.log('loading Data');
    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/getAllAdmins');
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        
        }

        const admins = await response.json();
        const tbody = document.getElementById('table-body');
        tbody.innerHTML = '';

        if (admins.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="no-data">No admin data available</td></tr>';
            return;
        }

        admins.forEach(admin => {
            const row = document.createElement('tr');

            const emailCell = document.createElement('td');
            emailCell.textContent = admin.email;
            row.appendChild(emailCell);

            const nameCell = document.createElement('td');
            nameCell.textContent = admin.adminName;
            row.appendChild(nameCell);

            const roleCell = document.createElement('td');
            roleCell.textContent = admin.role;
            row.appendChild(roleCell);

            const editAction = document.createElement('td');
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('btn','btn-primary');
            editBtn.addEventListener('click', function (){
                retrieveAdminId(admin._id);
            })
            editAction.appendChild(editBtn);
            row.appendChild(editAction);
        //    editBtn = () => retrieveAdminId(admin._id);

            const removeAction = document.createElement('td');
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove'
            removeBtn.classList.add('btn','btn-primary');
            removeBtn.setAttribute('data-bs-target', '#modal-admin-remove');
            removeBtn.setAttribute('data-bs-toggle', 'modal');
            removeBtn.style.background = 'var(--bs-form-invalid-color)';
            removeAction.appendChild(removeBtn);
            row.appendChild(removeAction);

            /*const actionCell = document.createElement('td');
            const actionBtn = document.createElement('button');
            actionBtn.textContent = 'Get ID';
            actionBtn.classList.add('action-btn');
            actionBtn.onclick = () => retrieveAdminId(admin._id);
            actionCell.appendChild(actionBtn);
            row.appendChild(actionCell); */

            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }

    function retrieveAdminId(adminId) {
        
        id = adminId.stringify;
        console.log('Admin ID:', adminId); 
        sessionStorage.setItem('adminId', adminId);
        window.location.href = 'AdminEdit.html';

    }

}

// Register Admin ng super admin 
function RegisterAdmin() {
    const email = document.getElementById('AdminUsername').value;
    const password = document.getElementById('UnitPrice').value;
    const adminName = document.getElementById('UnitLoc').value;

    if (!email || !password || !adminName) {
        alert("Please fill out all fields.");
        return;
    }
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Username:', adminName);

    const registerAdminData = {
        email: email,
        password: password,
        adminName: adminName
    };

    fetch('https://betcha-booking-api-master.onrender.com/createAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerAdminData)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data); 
        if (data && data.message) {
            alert('Registration successful: ' + data.message);
        } else {
            alert('Registration successful, but no message returned.');
        }
    })
    .catch(error => {
        console.error('Error during registration:', error);
        alert('Failed to register: ' + error.message);
    });
}



/*async function registerUser(){

    const firstName = document.getElementById('input-sign-up-fname').value;
    const middleName = document.getElementById('input-sign-up-mname').value;
    const lastName = document.getElementById('input-sign-up-lname').value;
    const phoneNumber = document.getElementById('input-sign-up-phone-num').value;
    const emailAddress = document.getElementById('input-sign-up--email').value;
    const passWord = document.getElementById('input-sign-up-pass').value;
    const confirmPassword = document.getElementById('').value; // no need na checker lang naman sa parameter// 
    const idPic = document.getElementById('file-input').value;
    try{
        if(firstName!= null &&  middleName!= null &&  lastName!= null &&  phoneNumber!= null && 
             emailAddress!= null &&  passWord!= null &&  idPic != null &&  password === confirmPassword) {
        
                if(firstName != ' ' && middleName != ' ' && lastName != ' ' && phoneNumber != ' ' && emailAddress != ' ' && passWord != ' ' && idPic != ' ' ){
            // input ng data
            const response = await fetch('https://rest-api-for-userlogin-test.onrender.com/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, middleName, lastName, phoneNumber, emailAddress, passWord})
                });
            }
        }


       const data = await response.json();

        if (data.ok) {
            alert('Register successful!');
        } else {
            alert('Fill all of the needed information!');
        }
    }
    catch(error){
        // yung error
        alert(error); 
    */ 
        //user side
        function RegisterButton() {
           // event.preventDefault();
        
           // document.getElementById('loader').style.display = 'block';
           // document.getElementById('overlay').style.display = 'block';
        
            const email = document.getElementById('input-sign-up--email').value;
            const password = document.getElementById('input-sign-up-pass').value;
            const phone = document.getElementById('input-sign-up-phone-num').value;
            const firstName = document.getElementById('input-sign-up-fname').value;
            const middleInitial = document.getElementById('input-sign-up-mname').value;
            const lastName = document.getElementById('input-sign-up-lname').value;
            const image = document.getElementById('file-input').files[0];
            
           
            const registerData = new FormData();
            registerData.append('email', email);
            registerData.append('password', password);
            registerData.append('phoneNumber', phone);
            registerData.append('firstName', firstName);
        
            if (middleInitial) {
                registerData.append('middleInitial', middleInitial);
            }
        
            registerData.append('lastName', lastName);
        
            if (image) {
                registerData.append('IdImage', image);
            }
        
            // Debugging the FormData to ensure file is appended
            for (let [key, value] of registerData.entries()) {
                console.log(`${key}:`, value);
            }
        
            fetch('https://betcha-booking-api-master.onrender.com/Register', {
                method: 'POST',
                body: registerData
            })
            .then(response => response.json())
            .then(data => {
                alert('Registration successful: ' + data.message);
                window.location.href = 'Login-Home.html';
            })
            .catch(error => {
                console.error('Error during registration:', error);
                alert('Failed to register: ' + error.message);
            })
        
        }
    
        
        // Ilagay sa locale storage yung User id na binato
        // delete after logout

        function LoginButton() {
            const email = document.getElementById('intput-log-in-email').value;
            const password = document.getElementById('input-log-in-password').value;
        
            const loginData = {
                email: email,
                password: password
            };
        
            console.log('Data:', JSON.stringify(loginData));
        
            fetch('https://betcha-booking-api-master.onrender.com/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(loginData)
            })
            .then(response => {
                console.log('Response Status:', response.status);
                if(response.status === 200){

                    window.location.href = 'Login-Home.html';   
                }
                else if (response.status === 400) {
                    console.log('Login failed. Attempting Super Admin login...');
                    return fetch('https://betcha-booking-api-master.onrender.com/superAdminLogin', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(loginData)
                    })

                    .then(superAdminResponse => {
                        if (superAdminResponse.status === 200){

                            window.location.href = 'Admin-Dashboard.html';
                        }
                        else if (superAdminResponse.status === 400) {
                            console.log('Super Admin login failed. Attempting Admin login...');
                            return fetch('https://betcha-booking-api-master.onrender.com/LoginAdmin', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(loginData)
                            });
                        } else if (!superAdminResponse.ok) {
                            throw new Error('Super Admin login failed');
                        }
                        return superAdminResponse.json();  // Return the parsed JSON response
                    });
                }
        
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
        
                return response.json();
            })
             .then(data => {
                // logic here
             })
             .catch(error => {
                 console.error('Error during fetch:', error);
                 alert('Failed to login: ' + 'Incorrect Credentials');
             })
           
         }

       // Displaying of ID/Img
       function DisplayID() {
   
        data.userId
        fetch(`https://betcha-booking-api-master.onrender.com/getUserIdImage/6730a4771caf96af85a0d776`)
            .then(response => response.json())
            .then(data => {
                console.log('data:', data); 
    
                if (data && data.data) {
                    console.log('data.data:', data.data); 
                    console.log(data.data.IdImage.fileId);
                    if (data.data.IdImage && data.data.IdImage.fileId) {
                        const fileId = data.data.IdImage.fileId;
                        const fullImageUrl = `https://drive.google.com/thumbnail?id=${fileId}`;
                        console.log('Full Image URL:', fullImageUrl);
    
                        document.getElementById('id-image').style=`background: url(${fullImageUrl}) center / cover no-repeat;border-radius: 10px;`;
                      //  document.getElementById('image-link').style.display = 'block';
                    } else {
                        console.log('Image not found in IdImage');
                        alert('Image not found for this user.');
                    }
                } else {
                    console.log('data or data.data is undefined or null');
                    alert('User data not found.');
                }
            })
            .catch(error => {
                console.error('Error during fetch:', error);
                alert('Failed to retrieve image.');
            })
    }
    

    //unfinished
    function DelUser() {
    
        const userId = document.getElementById('delete-userid').value;
    
        fetch(`https://betcha-booking-api-master.onrender.com/deleteUser/${userId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            alert('User deleted successfully');
        })
        .catch(error => {
            console.error('Error during delete:', error);
            alert('Failed to delete user: ' + error.message);
        })
        .finally(() => {
            document.getElementById('loader').style.display = 'none';
            document.getElementById('overlay').style.display = 'none';
        });
    }
    

async function loadUnits() {
    console.log('loading Data');
    try {
        const response = await fetch('https://betcha-booking-api-master.onrender.com/units');
        console.log(response);
        if (!response.ok) {
            throw new Error('Failed to fetch admin data');
        
        }

        const listUnit = await response.json();
        const tbody = document.getElementById('table-body');
        tbody.innerHTML = '';

        if (listUnit.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="no-data">No admin data available</td></tr>';
            return;
        }

        listUnit.forEach(listunits => {
            const row = document.createElement('tr');

            const unitCell = document.createElement('td');
            unitCell.textContent = listunits.unitName;
            row.appendChild(unitCell);

            const locationCell = document.createElement('td');
            locationCell.textContent = listunits.location;
            row.appendChild(locationCell);

            const maxCapacity = document.createElement('td');
            maxCapacity.textContent = listunits.maxPax;
            row.appendChild(maxCapacity);

            const unitPriceCell = document.createElement('td');
            unitPriceCell.textContent = listunits.unitPrice;
            row.appendChild(unitPriceCell);
            
            const pricePerPersonCell = document.createElement('td');
            pricePerPersonCell.textContent = listunits.pricePerPax;
            row.appendChild(pricePerPersonCell);
            
            const availability = listUnit.isAvailable ? "Available" : "Not available";
            const availabilityCell = document.createElement('td');
            availabilityCell.textContent = availability;
            row.appendChild(availabilityCell);

            const editAction = document.createElement('td');
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Edit';
            editBtn.classList.add('btn','btn-primary');
            editBtn.addEventListener('click', function (){
                retrieveAdminId(admin._id);
            })
            editAction.appendChild(editBtn);
            row.appendChild(editAction);
        //    editBtn = () => retrieveAdminId(admin._id);

            const removeAction = document.createElement('td');
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove'
            removeBtn.classList.add('btn','btn-primary');
            removeBtn.setAttribute('data-bs-target', '#modal-admin-remove');
            removeBtn.setAttribute('data-bs-toggle', 'modal');
            removeBtn.style.background = 'var(--bs-form-invalid-color)';
            removeAction.appendChild(removeBtn);
            row.appendChild(removeAction);

            /*const actionCell = document.createElement('td');
            const actionBtn = document.createElement('button');
            actionBtn.textContent = 'Get ID';
            actionBtn.classList.add('action-btn');
            actionBtn.onclick = () => retrieveAdminId(admin._id);
            actionCell.appendChild(actionBtn);
            row.appendChild(actionCell); */

            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function addUnit() {
    // event.preventDefault();
 
    // document.getElementById('loader').style.display = 'block';
    // document.getElementById('overlay').style.display = 'block';
 
     const unitName = document.getElementById('input-unit-name').value;
     const unitLocation = document.getElementById('input-unit-loc').value;
     const maxPax = document.getElementById('input-max-cap').value;
     const unitPrice = document.getElementById('input-unit-price').value;
     const pricePerPax = document.getElementById('input-price-per-person').value;
     const description = document.getElementById('form-desc').value;
     const images = document.getElementById('UnitImage').files;
     const inclusion = document.getElementById('form-inclusion').value;

    //var isChecked = document.getElementById('formCheck-1').checked;
    // const avialabitlity = isChecked ? "TRUE" : "FALSE";
    // const isAvailable = document.getElementById('input-sign-up-lname').value;
    
     const registerUnit = new FormData();
     registerUnit.append('unitName', unitName);
     registerUnit.append('location', unitLocation);
     registerUnit.append('description', description);
     registerUnit.append('inclusion', inclusion);
     registerUnit.append('unitPrice', unitPrice);
     registerUnit.append('maxPax', maxPax);
     registerUnit.append('pricePerPax', pricePerPax);
     //registerUnit.append('unitImages', image);

     for (let i = 0; i < images.length; i++) {
        registerUnit.append('unitImages', images[i]);
    }
 
    /* if (unitName) {
         registerData.append('middleInitial', middleInitial);
     }
 
     registerData.append('lastName', lastName);
 
     if (image) {
         registerData.append('IdImage', image);
     }
 
     // Debugging the FormData to ensure file is appended
     for (let [key, value] of registerData.entries()) {
         console.log(`${key}:`, value);
     } */
 
    
     fetch('https://betcha-booking-api-master.onrender.com/addUnit', {
        
         method: 'POST',
         body: registerUnit
     })
     .then(response => response.json())
     .then(data => {
         alert('Unit Added successful: ' + data.message);
         window.location.href = 'Admin-UnitsList.html';
     })
     .catch(error => {
         console.error('Error during registration:', error);
         alert('Failed to register: ' + error.message);
     })
 
 }