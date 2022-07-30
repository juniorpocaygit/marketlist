import './Footer.css'
import { BsFacebook, BsInstagram } from "react-icons/bs";


const Footer = () => {
  return (
    <footer>
      <p>
        <small>
          Desenvolvido por <span>Navecon</span>
        </small>
      </p>
      <div className="social">
        <div>
          <BsFacebook />
          <BsInstagram />
        </div>
      </div>
    </footer>
  );
}

export default Footer 