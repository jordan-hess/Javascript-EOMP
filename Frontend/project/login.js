fetch('https://flask-eomp1.herokuapp.com')
    .then(res => res.json())
    .then(data => console.log(data))