import {NavLink} from 'react-router';

function Navbar(){
    return(
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/projects">Projects</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/addnew">Adauga proiect nou</NavLink>
        </nav>
    );
}

export default Navbar;