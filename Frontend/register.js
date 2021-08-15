function formSubmit() {
    var formData = realFormData();
    newData(formData)   
}

function readData(){
    var formData = {};
    formData["name"] = document.getElementById("name").value;
    formData["username"] = document.getElementById("username").value;
    formData["password"] = document.getElementById("password").value;
    formData["email"] = document.getElementById("email").value;
    return formData;
}

