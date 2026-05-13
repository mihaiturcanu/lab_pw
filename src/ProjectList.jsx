import {useState, useEffect} from 'react';
import Card from './Card';

function ProjectList(){
    const[projects, setProjects] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const[search, setSearch] = useState('');
    async function handleDelete(id){
        try {
            await fetch('http://localhost:3000/api/projects/' + id ,{
                method: 'DELETE'
            });
            setProjects(projects.filter(p => p._id !== id)) 
        } catch (err) {
            return ("Error: " + err);
        }
    }

    async function handleToggle(id, currentDone){
        try {
            const response = await fetch('http://localhost:3000/api/projects/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: !currentDone }) 
            });
            const updatedProject = await response.json();
            setProjects(projects.map(p => p._id === id ? updatedProject : p))
        } catch(err) {
            return ("Error: " + err);
        }
    }

    useEffect(function(){
        fetch('http://localhost:3000/api/projects').then(function(response){
            return response.json();
        }).then(function(data){
            setProjects(data);
            setLoading(false);
        }).catch(function(err){
            setError('Eroare la incarcarea datelor ' + err);
            setLoading(false);
        });
    }, []);
    if(loading){
        return <p>Se incarca...</p>
    }
    if(error) return <p>{error}</p>
    return(
        <div>
            <h3>Proiecte</h3>
            <input value={search} onChange={(e) => setSearch(e.target.value)}></input>
            {projects.filter(function(p){
                return p.title.toLowerCase().includes(search.toLowerCase());
            }).map(function(project, index){
                if(project.done)
                return (
                <div>
                    <Card key={index} title={project.title} description={project.tech}/>
                    <button onClick={() => handleDelete(project._id)}>Sterge proiect</button>
                    <button onClick={() => handleToggle(project._id, project.done)}>Actualizeaza status</button>
                </div>
                );
            })}
            <div>
                <h3>Statistica</h3>
                <p><b>Total proiecte:</b> {projects.length}</p>
                <p><b>Finalizate:</b> {projects.filter(p => p.done).length}</p>
                <p><b>In lucru: </b>{projects.filter(p => !p.done).length}</p>
            </div>
        </div>
    );
}

export default ProjectList;