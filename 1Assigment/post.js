const post = () => {
    const inputText = document.getElementById('inputText').value;
    const jsonObj = JSON.parse(inputText);
    const jsonTxt = JSON.stringify(jsonObj);


    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8080/data', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload= () =>{
        console.log(xhr.responseText);
    };
    xhr.send(jsonTxt);
}

const postFetch = () => {
    const inputText = document.getElementById('inputText').value;
    const jsonObj = JSON.parse(inputText);
    const jsonTxt = JSON.stringify(jsonObj);

    fetch('http://localhost:8080/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json',},
        body: jsonTxt,
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}