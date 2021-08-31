function validate()
{
var username=document.getElementById("username").value;
var password=document.getElementById("password").value;
if(username=="jason"&& password=="pokemon")
{
    alert("login succesfully");
    window.location.href = 'http://127.0.0.1:5501/Frontend/project/profile.html';
    return false;

}
else
{
    alert("login failed");
}


}
