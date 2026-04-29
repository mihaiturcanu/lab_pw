const express = require('express');
const app = express();

const mongoose = require('mongoose'); 
const Project = require('./models/Project');

mongoose.connect('mongodb://localhost:27017/dashboard') 
.then(function() { 
    console.log('Conectat la MongoDB!'); 
}) 
.catch(function(err) { 
    console.error('Eroare conectare MongoDB:', err); 
}); 

const PORT = 3000;

app.use(express.json());
// POST /api/projects - adauga un proiect nou 
app.post('/api/projects', async function(req, res) {     
    try {         
        const newProject = new Project({             
            title: req.body.title,             
            tech: req.body.tech,             
            done: req.body.done || false,         
        });         
        const saved = await newProject.save();         
        res.status(201).json(saved);     
    } catch (err) {         
        res.status(400).json({ error: err.message });     
    } 
}); 

// Prima ruta: raspunde la GET / 
app.get('/api/projects', async function(req, res) {     
    try {         
        const projects = await Project.find();         
        res.json(projects);     
    } catch (err) {         
        res.status(500).json({ error: 'Eroare ' + err });     
    } 
}); 

// Date (temporar in memorie, vom folosi MongoDB mai tarziu) 

// GET /api/projects - returneaza toate proiectele 
app.get('/api/projects', function(req, res) {     
    res.json(projects); 
});

app.get('/', function(req, res) {
    res.json({'response': 'server working!'});
});

/*app.get('/api/projects/:id', function(req, res){
    const project = projects.find(p => p.id === parseInt(req.params.id));
    if(project==null){
        res.status(404).json({ error: 'Not found' })
    }
    else res.json(project);
});
*/

/*app.get('/api/stats', function(req, res){
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
*/

/*app.delete('/api/projects/:id', function(req, res){
    const ID = parseInt(req.params.id);
    const index = projects.findIndex(p => p.id === ID);
    if(index===-1) res.status(404).json({error: 'Not found'});
    else {
        projects.splice(index, 1);
        res.json({message: 'Deleted'});
    }

});
*/

/*app.put('/api/projects/:id', function(req, res) {
    const ID = parseInt(req.params.id);
    const project = projects.find(p => p.id === ID);
    if (!project) {
        return res.status(404).send({ message: 'Project not found' });
    }
    Object.keys(req.body).forEach(key => {
        project[key] = req.body[key];
    });
    res.send(project);
});
*/

// Porneste serverul 
app.listen(PORT, function() { 
    console.log('Server pornit pe http://localhost:' + PORT); 
}); 