import './Navbar.css'
import { GoThreeBars } from 'react-icons/go'
import { TiThList } from "react-icons/ti"
import { FaUserAlt } from "react-icons/fa"
import { BsBoxArrowLeft } from 'react-icons/bs'

//Components
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

//Redux
import { logout, reset } from '../slices/authSlice'
import { useDispatch } from 'react-redux'

const Navbar = () => {
  const [show, setShow] = useState(false);

  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    window.location.reload();
   

  }


  return (
    <nav id="nav">
      <div className="nav-toggle" onClick={() => setShow(!show)}>
        <GoThreeBars />
      </div>
      <ul id="nav-links" className={`no_show ${show ? "show" : ""}`}>
        <NavLink to="/profile" onClick={() => setShow(!show)}>
          <FaUserAlt />
          Meu perfil
        </NavLink>
        <NavLink to="/" onClick={() => setShow(!show)}>
          <TiThList />
          Minhas listas
        </NavLink>
        <NavLink to="#" onClick={() => setShow(!show)}>
          <BsBoxArrowLeft />
          <span onClick={handleLogout}>Sair</span>
        </NavLink>
      </ul>
    </nav>
  );
}

export default Navbar