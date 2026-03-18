import { useState } from "react";

function ContactForm(){
    const[name, setName] = useState('');
    const[email, setEmail] = useState('');
    const[message, setMessage] = useState('');
    const[feedback, setFeedback] = useState('');

    function submit(){
        if(name.trim()==='' || email.trim()==='' || message.trim===''){
            setFeedback('Completeaza toate campurile!');
        }
        else setFeedback('Multumim,' + name + '!');
    }
    return(
        <div>
            <input value={name} onChange={(e) => setName(e.target.value)}/>
            <input value={email} onChange={(e) => setEmail(e.target.value)}/>
            <textarea value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={submit}>Submit</button>
            <p>{feedback}</p>
        </div>
    );
}

export default ContactForm;