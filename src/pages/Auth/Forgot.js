import './Auth.css'
import Logo from "../../assets/images/logo.png";

//Components
import { Link } from 'react-router-dom'
import Message from '../../components/Message'

//Hooks
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

//Redux
import { forgot, reset } from '../../slices/authSlice';

const Forgot = () => {
  const [email, setEmail] = useState("");
  
  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email
    };

    dispatch(forgot(user));
    setEmail("");
  };

  //Clean al auth states
  useEffect(() => {
    dispatch(reset())
  }, [dispatch]);

  return (
    <div className="auth-content">
      <div className="auth-area">
        <img src={Logo} alt="Market List Logo" />
        <p>Insira seu email para resetar sua senha.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
          {!loading && <input type="submit" value="Enviar" />}
          {loading && <input type="submit" value="Aguarde" disabled />}
          {error && <Message msg={error} type="error" />}
          {message && <Message msg={message} type="success" />}
        </form>
        <p>
          Ainda não tem conta? <Link to="/register">Clique aqui</Link>
        </p>
        <p>
          Lembrou sua senha? <Link to="/login">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default Forgot