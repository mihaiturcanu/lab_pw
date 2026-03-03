function submitForm(){
    const nume = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const form = document.querySelector('form');
    form.addEventListener('submit', function(event) { 
        event.preventDefault();
        const numeVal = nume.value;
        const emailVal = email.value;
        const messageVal = message.value;
        const messageLength = messageVal.length;
        const formFeedback = document.getElementById('form-feedback');
        if(numeVal.length>=2 && emailVal.includes('@') && messageLength>=10){
            formFeedback.textContent = `Multumim, ${numeVal}! Mesajul a fost trimis.`;
            formFeedback.style.color = 'green';
        } else{
            formFeedback.textContent = 'Eroare! Numele trebuie sa fie de cel putin 2 caractere, email-ul sa contina @, iar mesajul trebuie sa aiba cel putin 10 caractere.';
            formFeedback.style.color = 'red';
        }
        
    }); 
    console.log(nume);
    console.log(email);
    console.log(message);
    console.warn('Goodbye, World!');
}

function greeting(){
    date = new Date().getHours();
    if(date>=6 && date <=11){
        document.querySelector('header p').textContent = 'Bună dimineața! Bine ai venit pe pagina mea.';
    }
    else if(date>=12 && date<=17){
        document.querySelector('header p').textContent = 'Bună ziua! Bine ai venit pe pagina mea.';
    }
    else{
        document.querySelector('header p').textContent = 'Bună seara! Bine ai venit pe pagina mea.';
    }
}

greeting();