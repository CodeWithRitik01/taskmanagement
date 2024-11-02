import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

function Navbar(){

  const handleLogout = () =>{
    localStorage.removeItem("user")
    window.location.reload()
    toast.success("You are logged out")
  }

  return(
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Studiovity Dashboard</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="addtask" className="nav-link active">Add task</NavLink>
        </li>

      </ul>
 
      <button className="btn btn-outline-danger" type="submit" onClick={handleLogout}>Logout</button>

    </div>
  </div>
</nav>
    )
}

export default Navbar;