const BASE_URL = "http://localhost:9090/";
const GET_PERSONS = BASE_URL + "persons/";
const GET_PERSON = (id) => GET_PERSONS + id;
const PATCH_PERSON = (id) => GET_PERSONS + id;
const GET_EMPLOYEES = BASE_URL + "employees/";
const POST_EMPLOYEE = GET_EMPLOYEES;
const GET_EMPLOYEE = (employeeId) => GET_EMPLOYEES + employeeId + "/";
const GET_SUBORDINATES = (employeeId) =>
  GET_EMPLOYEE(employeeId) + "subordinates";
const POST_SUBORDINATE = (employeeId) => GET_SUBORDINATES(employeeId);

const setValue = (selector, value) => 
    (document.querySelector(selector).innerHTML = value);

function getPersons(){
    fetch(GET_PERSONS)
    .then(response => response.json())
    .then((data) => setValue("#persons", JSON.stringify(data)))
    .catch((error) => alert(`Error: ${error}`));
}

function getPerson(id){
    fetch(GET_PERSON(id))
    .then(response => response.json())
    .then((data) => setValue("#person", JSON.stringify(data)))
    .catch((error) => alert(`Error: ${error}`));
}
function patchPerson(id,name,employeeId){
    var xhr = new XMLHttpRequest();
    xhr.open("PATCH", PATCH_PERSON(id), true);
    xhr.onload = () => {
        if(xhr.status == 200){
            setValue("#result", xhr.responseText);
        }
        if(xhr.status == 404){
            alert("404 Not Found: " + PATCH_PERSON(id));
        }
    };
    xhr.onerror = (error) => alert(`Error: ${error}`);
    xhr.send({id,name,employeeId});
}
function getEmployees(){
    fetch(GET_EMPLOYEES)
    .then(response => response.json())
    .then((data) => setValue("#employees", JSON.stringify(data)))
    .catch((error) => alert(`Error: ${error}`));
}