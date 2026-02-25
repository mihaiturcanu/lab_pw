function submitForm(){
    var nume = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var message = document.getElementById("message").value;
    console.log(nume);
    console.log(email);
    console.log(message);
    console.warn("Goodbye, World!");
}

function greeting(){
    date = new Date().getHours();
    if(date>=6 && date <=11){
        document.querySelector('header p').textContent = "Bună dimineața! Bine ai venit pe pagina mea.";
    }
    else if(date>=12 && date<=17){
        document.querySelector('header p').textContent = "Bună ziua! Bine ai venit pe pagina mea.";
    }
    else{
        document.querySelector('header p').textContent = "Bună seara! Bine ai venit pe pagina mea.";
    }
}

greeting();