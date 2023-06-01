const login=document.getElementById("login_form");
login.addEventListener("submit",(event)=>{
    event.preventDefault();
    let obj={};
    obj["email"]=document.getElementById("email").value;
    obj["password"]=document.getElementById("password").value;
    userLoginFn(obj);
})


async function userLoginFn(obj){
    try {
        let res=await fetch(`http://localhost:3400/login`,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(obj)
        })
        let fin=await res.json();
        if(res.status==201){
            sessionStorage.setItem("token_user",fin.token);
            sessionStorage.setItem("username",fin.username);
            alert(fin.msg);
            window.location.href="../html/weather.html";
        }else{
            alert(fin.msg);
        }
    } catch (error) {
        alert("unable to do login");
    }
}