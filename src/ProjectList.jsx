import {useState, useEffect} from 'react';
import Card from './Card';

function ProjectList(){
    const[projects, setProjects] = useState([]);
    const[loading, setLoading] = useState(true);
    useEffect(function(){
        fetch('/data/projects.json').then(function(response){
            return response.json();
        }).then(function(data){
            setProjects(data.projects);
            setLoading(false);
        });
    }, []);
    if(loading){
        return <p>Se incarca...</p>
    }
    return(
        <div>
            <h3>Proiecte</h3>
            {projects.map(function(project, index){
                if(project.done)
                return <Card key={index} title={project.title} description={project.tech}/>
            })}
        </div>
    );
}

export default ProjectList;