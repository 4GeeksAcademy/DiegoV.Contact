import React from "react";
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";

export const Navbar = () => { 
	const navigate = useNavigate(); 
	
	const addcontact=()=>{ 
		navigate('/add');
	}
	return (
		<nav className="navbar navbar-light bg-light mb-3">
	
			<img className="navbar-brand mb-0 h1" src="https://cdn-icons-png.flaticon.com/256/5381/5381674.png" alt="Contact" style={{height:"100px", marginLeft:"60px"}} />
	
			<div className="ml-auto">
			<button className='btn btn-primary' onClick={()=>addcontact()}>Add New Contact</button>
			</div>
		</nav>
	);
};
