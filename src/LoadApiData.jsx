import {useState} from 'react';
import {useEffect} from 'react';

function LoadApiData(){
     const [data, setData] = useState([]);         // Datele     
     const [loading, setLoading] = useState(true); // verificare daca se incarca     
     const [error, setError] = useState(null);     // pentru error handling      
     useEffect(function() {         
        fetch('https://jsonplaceholder.typicode.com/users')           // Cerere HTTP             
        .then(function(response) {                 
            return response.json();    // Parseaza JSON             
        })             
        .then(function(data) {                 
            setData(data);             // Salveaza datele                 
            setLoading(false);         // Incarcarea s-a terminat             
        })             
        .catch(function(err) {                 
            setError('Eroare: ' + err);        // Trateaza erorile                 
            setLoading(false);             
        });     
    }, []);  // [] = ruleaza o singura data      
    if (loading) return <p>Se incarca...</p>;     
    if (error) return <p>{error}</p>;      
    return (         
    <ul>             
        {data.map(function(item) {                 
            return <li key={item.id}>{item.name}, {item.email}</li>;             
        })}         
    </ul>     
    ); 
}

export default LoadApiData;