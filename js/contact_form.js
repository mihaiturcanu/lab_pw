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

function toggleMode(){
    const toggle = document.getElementById('toggle');
    toggle.addEventListener('click', function(){
    const isDark = document.body.classList.toggle('dark-mode');
    if (isDark) {
        toggle.textContent = "Light Mode";
    } else {
        toggle.textContent = "Dark Mode";
    }
    
    });
}

function toggleVisibility(){
    const list = document.querySelectorAll('main h2');
    list.forEach(function(h2){
        h2.addEventListener('click', function(){
            let next = h2.nextElementSibling;
            while(next && next.tagName !== 'h2'){
                next.classList.toggle('hidden');
                next = next.nextElementSibling;
            }
        });
    });
}

function scrollToTop(){
    const backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.classList.remove("hidden");
        } else {
            backToTop.classList.add("hidden");
        }
    });
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

greeting();
toggleMode();
toggleVisibility();
scrollToTop();