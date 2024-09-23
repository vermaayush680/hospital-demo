const baseUrl = 'https://hospital-demo-backend.vercel.app';
// const baseUrl = "http://localhost:3001";

const checkAuth = () => {
  let cookie = sessionStorage.getItem("cookie");
  let cookie_time = sessionStorage.getItem("cookie-expiry");
  let cookie_tenant = sessionStorage.getItem("cookie-tenant");
  let now = Date.now();
  if (!cookie || now > cookie_time) window.location.href = "./login.html";
  return { cookie, subTenant: cookie_tenant };
};

checkAuth();

const registerStudent = async (event) => {
  if (event && event.preventDefault) event.preventDefault();

  let { cookie, subTenant } = checkAuth();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;
  let code = document.getElementById("code").value;
  let mobileNumber = document.getElementById("mobileNumber").value;
  let address = document.getElementById("address").value;
  let city = document.getElementById("city").value;
  let zip = document.getElementById("zip").value;
  let state = document.getElementById("state").value;
  let schoolId = document.getElementById('schoolName').value;
  let dateOfBirth = document.getElementById('dateOfBirth').value;
  let sex = document.getElementById('sex').value;

  const apiUrl = `${baseUrl}/api/student/create`;
  const data = {
    name: name,
    email: email,
    studentCode: code,
    mobileNumber: mobileNumber,
    address: address,
    city: city,
    zip: zip,
    state: state,
    dateOfBirth:dateOfBirth,
    schoolId: schoolId,
    sex:sex,
  };
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookie,
      Subtenant: subTenant,
    },
    body: JSON.stringify(data),
  };

  let response = await fetch(apiUrl, requestOptions);
  let responseData = await response.json();
  if (!response.ok) {
    alert(responseData.message);
  } else {
    window.location.href = "./Student_registration.html";
  }
  //   }
  return false;
};


const getStudentData = async () => {

  let { cookie, subTenant } = checkAuth();
  
  let apiUrl = `${baseUrl}/api/vaccination-history`;

  // let search = document.getElementById('searchText').value;
  // if(search && search.length) apiUrl += `?search=${search}`;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + cookie,
      Subtenant: subTenant,
    },
  };

  let response = await fetch(apiUrl, requestOptions);
  let responseData = await response.json();
  if (!response.ok) {
    alert('Student Data Not Found');
  } else {
    responseData = responseData.data;
    console.log(responseData);
    let tbody = document.getElementById("vaccinationData");
        tbody.innerHTML = `<tr>
              <th scope="row">Birth</th>
              <td>
                <div class="card-body">
                  <ul>
                    <li>BCG</li>
                    <li>Hep B1 </li>
                    <li>OPV 0</li>
                  </ul>
                </div>
              </td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
              
              
            </tr>

            <tr class="table-primary">
              <th scope="row">6 Weeks</th>
              <td><div class="card-body">
                <ul>
                  <li>DTaP/DTwP 1</li>
                  <li>Hib 1 </li>
                  <li>IPV 1</li>
                  <li>Hep B2</li>
                  <li>PCV 1</li>
                  <li>Rota Virus 1</li>
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-secondary">
              <th scope="row">10 Weeks</th>
              <td><div class="card-body">
                <ul>
                  <li>DTaP/DTwP 2</li>
                  <li>Hib 2 </li>
                  <li>IPV 2</li>
                  <li>Hep B3</li>
                  <li>PCV 2</li>
                  <li>Rota Virus 2</li>
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>

            </tr>
            <tr class="table-success">
              <th scope="row">14 Weeks</th>
              <td><div class="card-body">
                <ul>
                  <li>DTaP/DTwP 3</li>
                  <li>Hib 3 </li>
                  <li>IPV 3</li>
                  <li>Hep B4</li>
                  <li>PCV 3</li>
                  <li>Rota Virus 3</li>
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>

            </tr>
            <tr class="table-danger">
              <th scope="row">6 Months</th>
              <td><div class="card-body">
                <ul>
                  <li>TCV</li>
                  <li>Influenza vaccine </li>
                  
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-warning">
              <th scope="row">7 Months</th>
              <td><div class="card-body">
                <ul>
                 
                  <li>Influenza Vaccine</li>
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-info">
              <th scope="row">9 Months</th>
              <td><div class="card-body">
                <ul>
                  <li>MMR 1</li>
                  <li>MCV 1 </li>
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-light">
              <th scope="row">12 Months</th>
              <td><div class="card-body">
                <ul>
                  
                  <li>HepA 1</li>
                  <li>MCV 2</li>
                </ul>
              </div></td>
              <td>01/01/2021</td>

              <td>
                <input type="date" class="form-control" id="birthday" name="birthday"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                  <option value="Complete">Complete</option>
                  <option value="Incomplete">Incomplete</option>
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname"><br><br>
              </td> 
            </tr>
            <tr class="table-dark">
              <th scope="row">15 Months</th>
              <td><div class="card-body">
                <ul>
                  <li>PCV B1</li>
                  <li>MMR 2</li>
                  <li>Varicella 1</li>
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-primary">
              <th scope="row">16-18 Months</th>
              <td><div class="card-body">
                <ul>
                  <li>DTaP/DTwP  B1</li>
                  <li>Hib B1 </li>
                  <li>IPV B1</li>
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-warning">
              <th scope="row">18-24 Months</th>
              <td><div class="card-body">
                <ul>
                  <li>Varicella 2</li>
                  <li>Hep A2</li>
                </ul>
              </div></td>
              <td>01/01/2021</td>

              <td>
                <input type="date" class="form-control" id="birthday" name="birthday"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                  <option value="Complete">Complete</option>
                  <option value="Incomplete">Incomplete</option>
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname"><br><br>
              </td>
            </tr>
            <tr class="table-success">
              <th scope="row">2 Years</th>
              <td><div class="card-body">
                <ul>
                  
                  <li>Influenza vaccine</li>
                  <li>MCV
                  </li>
                </ul>
              </div></td>
              <td>01/01/2021</td>

              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-light">
              <th scope="row">3 Years</th>
              <td><div class="card-body">
                <ul>
                  
                  <li>Influenza Vaccine</li>
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            
            <tr class="table-danger">
              <th scope="row">4 Years</th>
              <td><div class="card-body">
                <ul>
                  <li>Influenza Vaccine</li>
                 
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-light">
              <th scope="row">4-6 Years</th>
              <td><div class="card-body">
                <ul>
                 
                  <li>IPV B2</li>
                  <li>DTaP/DTwP B2</li>
                  <li>MMR 3</li>
                </ul>
              </div></td>
              <td>01/01/2021</td>

              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-success">
              <th scope="row">5 Years</th>
              <td><div class="card-body">
                <ul>
                  <li>Influenza Vaccine</li>
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-warning">
              <th scope="row">6 Years</th>
              <td><div class="card-body">
                <ul>
                
                  <li>Influenza Vaccine</li>
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-danger">
              <th scope="row">7 Years</th>
              <td><div class="card-body">
                <ul>
                  <li>Influenza Vaccine</li>
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-primary">
              <th scope="row">8 Years</th>
              <td><div class="card-body">
                <ul>
                  <li>Influenza Vaccine</li>
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-success">
              <th scope="row">9-14 Years</th>
              <td><div class="card-body">
                <ul>
                  <li>Tdap/Td</li>
                  <li>HPV 1 </li>
                  <li>HPV 2</li>
                  
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>
            <tr class="table-dark">
              <th scope="row">15-18 Years</th>
              <td><div class="card-body">
                <ul>
                  <li>HPV 1</li>
                  <li>HPV 2</li>
                  <li>HPV 3</li>
                </ul>
              </div></td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>
            </tr>`;


            let tObody = document.getElementById("vaccinationOtherData");
        tObody.innerHTML = `<tr>
              <th scope="row">Rabies</th>
              <td>
                <div class="card-body">
                  <ul>
                    
                    <li>Single Dose</li>
                  </ul>
                </div>
              </td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Rabies'].given_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Rabies'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}
                  
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Rabies'].remarks || ""}"><br><br>
              </td>  
            </tr>

            <tr>
              <th scope="row">Cholera</th>
              <td>
                <div class="card-body">
                  <ul>
                    <li>Dose 1</li>
                    <li>Dose 2</li>
                  </ul>
                </div>
              </td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Cholera'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Cholera'].due_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Cholera'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}       
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Cholera'].remarks || ""}"><br><br>
              </td>  
            </tr>

            <tr>
              <th scope="row">JE</th>
              <td>
                <div class="card-body">
                  <ul>
                    <li>Dose 1</li>
                    <li>Dose 2</li>
                  </ul>
                </div>
              </td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['JE'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['JE'].due_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['JE'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}       
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['JE'].remarks || ""}"><br><br>
              </td>  
            </tr>
           
            <tr>
              <th scope="row">Yellow Fever</th>
              <td>
                <div class="card-body">
                  <ul>
                   
                    <li>Single Dose</li>
                  </ul>
                </div>
              </td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Yellow Fever'].due_date || ""}"></td>
              <td>
                <input type="date" class="form-control" id="birthday" name="birthday" value="${responseData['Yellow Fever'].due_date || ""}"></td>
              <td> <div class="card-body">
                <select name="cars" id="cars">
                ${responseData['Yellow Fever'].status == 0?'<option value="0">Complete</option><option value="0" selected="true">Incomplete</option>':'<option value="1" selected="true">Complete</option><option value="0">Incomplete</option>'}       
                </select>
                </div></td>
              <td>  <input type="text" id="fname" name="fname" value="${responseData['Yellow Fever'].remarks || ""}"><br><br>
              </td>  
            </tr>`;

    document.getElementById('vaccination-data').classList.remove('d-none');
    document.getElementById('vaccination-other-data').classList.remove('d-none');
  }
  //   }
  return false;
};

getStudentData();

// let searchText = document.getElementById('searchText');
// searchText.addEventListener('input', (input) => {
//   console.log(searchText.value);
//   let text = searchText.value;
//   getStudentData(); 
  
// });