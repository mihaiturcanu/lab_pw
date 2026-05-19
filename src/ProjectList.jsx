import { useState, useEffect } from 'react';
import Card from './Card';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('toate');
    const [sortBy, setSortBy] = useState('data');

    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editTech, setEditTech] = useState('');

    async function handleDelete(id) {
        if (window.confirm('Sigur doriti sa stergeti acest proiect?')) {
            try {
                await fetch('http://localhost:3000/api/projects/' + id, {
                    method: 'DELETE'
                });

                setProjects(projects.filter(p => p._id !== id));
            } catch (err) {
                console.log("Error: " + err);
            }
        }
    }

    async function handleSave(id) {
        try {
            const response = await fetch('http://localhost:3000/api/projects/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: editTitle,
                    tech: editTech
                })
            });

            const updatedProject = await response.json();

            setProjects(projects.map(p => p._id === id ? updatedProject : p));
            setEditingId(null);
            setEditTitle('');
            setEditTech('');
        } catch (err) {
            console.log("Error: " + err);
        }
    }

    async function handleToggle(id, currentDone) {
        try {
            const response = await fetch('http://localhost:3000/api/projects/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ done: !currentDone })
            });

            const updatedProject = await response.json();

            setProjects(projects.map(p => p._id === id ? updatedProject : p));
        } catch (err) {
            console.log("Error: " + err);
        }
    }

    function startEdit(project) {
        setEditingId(project._id);
        setEditTitle(project.title);
        setEditTech(project.tech);
    }

    useEffect(function () {
        fetch('http://localhost:3000/api/projects')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                setProjects(data);
                setLoading(false);
            })
            .catch(function (err) {
                setError('Eroare la incarcarea datelor ' + err);
                setLoading(false);
            });
    }, []);

    const filteredProjects = projects
        .filter(function (p) {
            return p.title.toLowerCase().includes(search.toLowerCase());
        })
        .filter(function (p) {
            if (statusFilter === 'finalizate') {
                return p.done === true;
            }

            if (statusFilter === 'inLucru') {
                return p.done === false;
            }

            return true;
        })
        .sort(function (a, b) {
            if (sortBy === 'titlu') {
                return a.title.localeCompare(b.title);
            }

            if (sortBy === 'data') {
                return b._id.localeCompare(a._id);
            }

            return 0;
        });

    if (loading) {
        return <p>Se incarca...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div>
            <h3>Proiecte</h3>

            <div className="project-controls">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cauta proiect dupa titlu..."
                />

                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="toate">Toate</option>
                    <option value="finalizate">Finalizate</option>
                    <option value="inLucru">In lucru</option>
                </select>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="data">Sorteaza dupa data</option>
                    <option value="titlu">Sorteaza dupa titlu</option>
                </select>
            </div>

            {filteredProjects.map(function (project) {
                if (editingId === project._id) {
                    return (
                        <div key={project._id} className="edit-project">
                            <h3>Edit project</h3>

                            <input
                                value={editTitle}
                                onChange={(e) => setEditTitle(e.target.value)}
                                placeholder="Titlu proiect"
                            />

                            <input
                                value={editTech}
                                onChange={(e) => setEditTech(e.target.value)}
                                placeholder="Tehnologii"
                            />

                            <button onClick={() => handleSave(project._id)}>
                                Save
                            </button>

                            <button onClick={() => setEditingId(null)}>
                                Anuleaza
                            </button>
                        </div>
                    );
                }

                return (
                    <div key={project._id} className="project-item">
                        <Card
                            title={project.title}
                            description={project.tech}
                        />

                        <p>
                            <b>Status:</b> {project.done ? 'Finalizat' : 'In lucru'}
                        </p>

                        <button onClick={() => handleDelete(project._id)}>
                            Sterge proiect
                        </button>

                        <button onClick={() => handleToggle(project._id, project.done)}>
                            Actualizeaza status
                        </button>

                        <button onClick={() => startEdit(project)}>
                            Editeaza
                        </button>
                    </div>
                );
            })}

            <div>
                <h3>Statistica</h3>
                <p><b>Total proiecte:</b> {projects.length}</p>
                <p><b>Finalizate:</b> {projects.filter(p => p.done).length}</p>
                <p><b>In lucru:</b> {projects.filter(p => !p.done).length}</p>
            </div>
        </div>
    );
}

export default ProjectList;