const express = require('express'); 
const app = express(); 
const PORT = 3000;

app.use(express.json());
// POST /api/projects - adauga un proiect nou 
app.post('/api/projects', function(req, res) {     
    const newProject = {         
        id: projects.length + 1,         
        title: req.body.title,         
        tech: req.body.tech,         
        done: req.body.done || false,     
    };     
    projects.push(newProject);     
    res.status(201).json(newProject); 
});

// Prima ruta: raspunde la GET / 
app.get('/', function(req, res) { 
    res.json({ message: 'Serverul functioneaza!' }); 
}); 

// Date (temporar in memorie, vom folosi MongoDB mai tarziu) 
const projects = [     
    { id: 1, title: "Pagina Personala", tech: "HTML, CSS", done: true },     
    { id: 2, title: "Calculator Buget", tech: "JS", done: true },     
    { id: 3, title: "Dashboard React", tech: "React", done: false },     
    { id: 4, title: "API Meteo", tech: "React, API", done: false }, 
];  

// GET /api/projects - returneaza toate proiectele 
app.get('/api/projects', function(req, res) {     
    res.json(projects); 
});

app.get('/api/projects/:id', function(req, res){
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if(project==null){
        res.status(404).json({ error: 'Not found' })
    }
    else res.json(project);
});

app.get('/api/stats', function(req, res){
    const count = projects.length;
    const finished = projects.filter(function(p){
        if(p.done === true) return p;
    }).length;
    const unfinished = projects.filter(function(p){
        if(p.done === false) return p;
    }).length;
    res.json({count: count,
              finished: finished,
              unfinished: unfinished
    }
    );

});

app.delete('/api/projects/:id', function(req, res){
    const ID = parseInt(req.params.id);
    const index = projects.findIndex(p => p.id === ID);
    if(index===-1) res.status(404).json({error: 'Not found'});
    else {
        projects.splice(index, 1);
        res.json({message: 'Deleted'});
    }

});

// Porneste serverul 
app.listen(PORT, function() { 
    console.log('Server pornit pe http://localhost:' + PORT); 
}); 