function createDataPoint(type, time, place, value, unit) {
  const getType = () => type;
  const setType = (_type) => {
    type = _type;
  };
  const getTime = () => time;
  const setTime = (_time) => {
    time = _time;
  };
  const getPlace = () => place;
  const setPlace = (_place) => {
    place = _place;
  };
  const getValue = () => value;
  const setValue = (_value) => {
    value = _value;
  };
  const getUnit = () => unit;
  const setUnit = (_unit) => {
    unit = _unit;
  };

  return {
    getType,
    setType,
    getTime,
    setTime,
    getPlace,
    setPlace,
    getValue,
    setValue,
    getUnit,
    setUnit,
  };
}

function createPrecipitationDataPoint(
  type,
  time,
  place,
  value,
  unit,
  precipitation_type
) {
  const dataPoint = createDataPoint(type, time, place, value, unit);
  const getPrecipitationType = () => precipitation_type;
  const setPrecipitationType = (_precipitation_type) => {
    precipitation_type = _precipitation_type;
  };

  return { ...dataPoint, getPrecipitationType, setPrecipitationType };
}

function createWindDatapoint(type, time, place, value, unit, direction) {
  const dataPoint = createDataPoint(type, time, place, value, unit);
  const getDirection = () => direction;
  const setDirection = (_direction) => {
    direction = _direction;
  };

  return { ...dataPoint, getDirection, setDirection };
}

const update = () => {
  var method = "fetch";
  var selectedCity = document.getElementById("cityDropdown").value;
  switch(method) {
    case "XMLHttprequest":
      console.log("Using XMLHttprequest!");
      get24hForecast(selectedCity);
      getLastMeasurementSet(selectedCity);
      getHistoricData(selectedCity);
    case "fetch":
      console.log("Using Fetch!");
      await get24hForecastFetch(selectedCity);
      await getLastMeasurementSetFetch(selectedCity);
      await getHistoricDataFetch(selectedCity);
  }
  


};



const get24hForecast = (city) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:8080/forecast/${city}`);
  xhr.onload = () => {
    const data = xhr.responseText;
    console.log(data);
    prettyData = JSON.stringify(JSON.parse(data), null, 3);
    
    const makeTable = data =>
      document.getElementById("tbody").innerHTML = data.map(
        item => `<tr><td>${item.time}</td><td>${item.type}</td><td>${item.from}</td><td>${item.to}</td><td>${item.unit}</td></tr>`
      ).join("");
    makeTable(JSON.parse(data));
  };
  xhr.onerror = () => {
    console.log("Something went wrong");
  };
  xhr.send();
};

const getLastMeasurementSet = (city) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:8080/data/${city}`);
  xhr.onload = () => {
    const jsonData = xhr.responseText;
    var data = JSON.parse(jsonData);
    const l = data.length;
    for (let i = 0; i < 4; i++) {
      switch (data[l - i - 1].type) {
        case "temperature":
          var textArea = document.getElementById("lastTempMeasurementTextArea");
          textArea.value = JSON.stringify(data[l - i - 1], null, 3);
          break;
        case "precipitation":
          var textArea = document.getElementById("lastPrecipitationMeasurementTextArea");
          textArea.value = JSON.stringify(data[l - i - 1], null, 3);
          break;
        case "wind speed":
          var textArea = document.getElementById("lastWindMeasurementTextArea");
          textArea.value = JSON.stringify(data[l - i - 1], null, 3);
        case "cloud coverage":
          var textArea = document.getElementById("lastCloudMeasurementTextArea");
          textArea.value = JSON.stringify(data[l - i - 1], null, 3);
        default:
          break;
      }
    }
  };
  xhr.onerror = () => {
    document.getElementById("errorSpan").innerText = "Something went wrong.";
    console.log("Something went wrong");
  };
  xhr.send();
};

const getHistoricData = (city) => {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", `http://localhost:8080/data/${city}`);
  xhr.onload = () => {
    const jsonData = xhr.responseText;
    var data = JSON.parse(jsonData);
    var maxTemp = data[0].value;
    var minTemp = data[0].value;
    var totalPrecipitation = 0;
    var averageWindSpeed = 0;

    for (let i = 0; i < 96; i++) {
      switch (data[i].type) {
        case "temperature":
          if (data[i].value > maxTemp) maxTemp = data[i].value;
          if (data[i].value < minTemp) minTemp = data[i].value;
          break;
        case "precipitation":
          totalPrecipitation += data[i].value;
          break;
        case "wind speed":
          averageWindSpeed += data[i].value;
        default:
      }
    }

    document.getElementById("maxTempSpan").innerHTML = `${maxTemp} °C`;
    document.getElementById("minTempSpan").innerHTML = `${minTemp} °C`;
    document.getElementById("totalPrecipitationSpan").innerHTML = `${totalPrecipitation} mm`;
    averageWindSpeed /= 24;
    document.getElementById("averageWindSpeed").innerHTML = `${averageWindSpeed.toFixed(3)} m/s`;
  };
  xhr.onerror = () => {
    console.log("Something went wrong");
  };
  xhr.send();
};

// Fetch Methods

const async get24hForecastFetch = (city) => {
  const response = await fetch(`http://localhost:8080/forecast/${city}`);
  var data = await response.json();
  
  //console.log(data);
  //if (response) {
  //  hideloader();
  //} show(data);

  const makeTable = data =>
    document.getElementById("tbody").innerHTML = data.map(
      item => `<tr><td>${item.time}</td><td>${item.type}</td><td>${item.from}</td><td>${item.to}</td><td>${item.unit}</td></tr>`
    ).join("");

  makeTable(JSON.parse(data));
};

const async getLastMeasurementSetFetch = (city) => {
  const response = await fetch(`http://localhost:8080/forecast/${city}`);
  var data = await response.json();

  const l = data.length;
  for (let i = 0; i < 4; i++) {
    switch (data[l - i - 1].type) {
      case "temperature":
        var textArea = document.getElementById("lastTempMeasurementTextArea");
        textArea.value = JSON.stringify(data[l - i - 1], null, 3);
        break;
      case "precipitation":
        var textArea = document.getElementById("lastPrecipitationMeasurementTextArea");
        textArea.value = JSON.stringify(data[l - i - 1], null, 3);
        break;
      case "wind speed":
        var textArea = document.getElementById("lastWindMeasurementTextArea");
        textArea.value = JSON.stringify(data[l - i - 1], null, 3);
      case "cloud coverage":
        var textArea = document.getElementById("lastCloudMeasurementTextArea");
        textArea.value = JSON.stringify(data[l - i - 1], null, 3);
      default:
        break;
    }
  }
};

const async getHistoricDataFetch = (city) => {
  const response = await fetch(`http://localhost:8080/forecast/${city}`);
  var data = await response.json();

  var maxTemp = data[0].value;
  var minTemp = data[0].value;
  var totalPrecipitation = 0;
  var averageWindSpeed = 0;

  for (let i = 0; i < 96; i++) {
    switch (data[i].type) {
      case "temperature":
        if (data[i].value > maxTemp) maxTemp = data[i].value;
        if (data[i].value < minTemp) minTemp = data[i].value;
        break;
      case "precipitation":
        totalPrecipitation += data[i].value;
        break;
      case "wind speed":
        averageWindSpeed += data[i].value;
      default:
    }
  }

  document.getElementById("maxTempSpan").innerHTML = `${maxTemp} °C`;
  document.getElementById("minTempSpan").innerHTML = `${minTemp} °C`;
  document.getElementById("totalPrecipitationSpan").innerHTML = `${totalPrecipitation} mm`;
  averageWindSpeed /= 24;
  document.getElementById("averageWindSpeed").innerHTML = `${averageWindSpeed.toFixed(3)} m/s`;
};
