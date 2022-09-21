const Person = (name, age) => {
    const Person = {
        name,
        age,
    };
    const Person1 = {
        name
    };

    Person.getName = () => Person.name;
    Person.getAge = () => Person.age;
    Person.setName = (name) => Person.name = name;
    Person.setAge = (age) => Person.age = age;
    Person.toString = () => `Person: ${Person.name}, ${Person.age}`;
    Person.equals = (other) => Person.name === other.name && Person.age === other.age;
    return Person;
};
export default Person;