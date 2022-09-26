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