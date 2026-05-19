const express = require('express');
const app = express();

const cors = require('cors'); 
app.use(cors()); 

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

app.get('/', function(req, res) {
    res.json({'response': 'server working!'});
});

app.get('/api/projects/:id', async function(req, res){
    try{
        const project = await Project.findById(req.params.id);
        if(project){
            res.json(project);
        }
        else res.status(404).json({message: 'Project ID not found'});
        
    } catch(err) {
        res.status(500).json({error: 'Eroare' + err});
    }
});

app.get('/api/stats', async function(req, res) { 
    try { 
        const total = await Project.countDocuments(); 
        const done = await Project.countDocuments({ 
            done: true 
        }); res.json({ 
            total: total, 
            done: done, 
            inProgress: total - done 
        }); 
    } catch (err) { 
        res.status(500).json({ error: 'Eroare server: ' + err}); 
    } 
}); 

app.delete('/api/projects/:id', async function(req, res){
    const deleted = await Project.findByIdAndDelete(req.params.id);
    if(!deleted){
        res.status(404).json({message: 'Project not found'});
    }
    else res.json({message: 'Deleted'});
});


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

app.put('/api/projects/:id', async function(req, res) { 
    try { 
        const updated = await Project.findByIdAndUpdate( 
            req.params.id, req.body, { 
                new: true 
            }   
            // returneaza documentul DUPA actualizare 
            ); 
            if (!updated) return res.status(404).json({ error: 'Not found' }); 
            res.json(updated); 
        } catch (err) { 
            res.status(400).json({ error: err.message }); 
        } 
    }); 

// Porneste serverul 
app.listen(PORT, function() { 
    console.log('Server pornit pe http://localhost:' + PORT); 
}); 