import {useState, useEffect} from 'react';
import Card from './Card';

function ProjectList(){
    const[projects, setProjects] = useState([]);
    const[loading, setLoading] = useState(true);
    const[error, setError] = useState(null);
    const[search, setSearch] = useState('');
    useEffect(function(){
        fetch('/data/projects.json').then(function(response){
            return response.json();
        }).then(function(data){
            setProjects(data.projects);
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
                return <Card key={index} title={project.title} description={project.tech}/>
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