import {useState} from 'react';

function AddProject(){
    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');
    const [done, setDone] = useState('');
    const [projects, setProjects] = useState([]);
    async function handleSubmit() { 
        try { 
            const response = await fetch('http://localhost:3000/api/projects', { 
                method: 'POST', 
                headers: { 'Content-Type': 'application/json' }, 
                body: JSON.stringify({ title: title, tech: tech, done: done }), 
            }); 
            const newProject = await response.json(); 
            setProjects([...projects, newProject]); 
            setTitle('');  // Goleste input-urile 
            setTech('');
            setDone('');
            } catch (err) { 
                console.error('Eroare:', err); 
            } 
        }
        return(
            <div>
                <h3>Proiect nou</h3>
                <input value={title} onChange={(e) => setTitle(e.target.value)}/>
                <input value={tech} onChange={(e) => setTech(e.target.value)}/>
                <input value={done} onChange={(e) => setDone(e.target.value)}/>
                <button onClick={handleSubmit}>Adauga proiect</button>
            </div>
        );
}

export default AddProject;