const register=document.getElementById("register_form");
register.addEventListener("submit",(event)=>{
    event.preventDefault();
    let obj={};
    obj["name"]=document.getElementById("name").value;
    obj["email"]=document.getElementById("email").value;
    obj["password"]=document.getElementById("password").value;
    userRegisterFn(obj);
})


async function userRegisterFn(obj){
    try {
        let res=await fetch(`https://alphabin-weather-backend.onrender.com/register`,{
            method:"POST",
            headers:{
                "Content-Type":"Application/json"
            },
            body:JSON.stringify(obj)
        })
        let fin=await res.json();
        if(res.status==201){
            alert(fin.msg);
            window.location.href="./html/login.html";
        }else{
            alert(fin.msg);
        }
    } catch (error) {
        alert("unable to do registering");
    }
}