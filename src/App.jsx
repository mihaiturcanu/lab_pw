import Card from './Card';
import QuickNote from './QuickNote';
import TodoList from './TodoList';
import ContactForm from './ContactForm';
import Clock from './Clock';
import { useState } from 'react';
import ProjectList from './ProjectList';
import LoadApiData from './LoadApiData';

function App() {
  const [count, setCount] = useState(0);
  const projects = [
    {title:"Proiect 1", description:"Pagina personala"},
    {title:"Proiect 2", description:"Calculator buget"},
    {title:"Proiect 3", description:"Dashboard React"},
    {title:"Proiect 4", description:"Password Generator"},
    {title:"Proiect 5", description:"Personal webpage"}
  ];   
  return (         
  <div>
    <Clock/>
    <LoadApiData/>             
    <h1>Dashboard</h1>             
    <p>Mihai Turcanu </p>
    <p>Student Calculatoare, anul II</p>
    <p>Ai apasat de {count} ori</p>
    <button onClick={() => setCount(count + 1)}>Click</button>
    <button onClick={() => setCount(count - 1)}>Decrease counter</button>
    <button onClick={() => setCount(0)}>Reset counter</button>
    {projects.map(function(item, index){
      return <Card key={index} title={item.title} description={item.description} />
    })}
    <ProjectList/>
    <QuickNote/>
    <TodoList/>
    <ContactForm/>
    </div>     
    ); 
  }  
  export default App; 