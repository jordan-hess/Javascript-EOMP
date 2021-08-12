function login() {
    fetch("https://flask-eomp1.herokuapp.com", {
        method: "POST",
        body: JSON.stringify({
            'username': document.getElementById("usernm").value,
            'password': document.getElementById("user-pass").value,
        }),
        headers: {
            'Content-type': 'application/json',
        }
    }).then(response => response.json()).then(data => {
        console.log(data)
        console.log(data['access_token'])
        mystorage.setItem('jwt-token', data['access_token'])
        window.location.href = "./products.html"
    });
}

