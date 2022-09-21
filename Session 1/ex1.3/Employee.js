import Person from "./Person.js";
const Employee = (salary, name = null, age = null) => {
    const employee = {};
    if(name){
        employee.name = name;
        employee.age = age;
        employee.salary = salary;
    }else{
        employee.salary = salary;
        employee.name = Person.name;
        employee.age = Person.age;
    }
    employee.getSalary = () => {
        return employee.salary;
    }
    employee.setSalary = (newSalary) => {
        employee.salary = newSalary;
    }
    employee.toString = () => {
        return `Name: ${employee.name}, Age: ${employee.age}, Salary: ${employee.salary}`;
    }

    employee.equals = (other) => {
        return employee.name === other.name && employee.age === other.age && employee.salary === other.salary;
    }
    return employee;
}

export default Employee;
