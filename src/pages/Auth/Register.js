import "./Auth.css";
import Logo from '../../assets/images/logo.png'

//components
import { Link } from 'react-router-dom'
import Message from "../../components/Message";

//hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'

//Redux
import { register, reset } from "../../slices/authSlice"


const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()
  const {loading, error} = useSelector((state) => state.auth)
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const user = {
      name,
      email,
      password,
      confirmPassword
    }

     dispatch(register(user))
  }

  //Clean al auth states
  useEffect(() => {
    dispatch(reset())
  },[dispatch])

  return (
    <div className="auth-content">
      <div className="auth-area">
        <img src={Logo} alt="Market List Logo" />
        <p>Cadastre-se para utilizar o sistema.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Insira seu nome."
            onChange={(e) => setName(e.target.value)}
            value={name || ""}
          />
          <input
            type="email"
            placeholder="Insira seu e-mail."
            onChange={(e) => setEmail(e.target.value)}
            value={email || ""}
          />
          <input
            type="password"
            placeholder="Insira uma senha."
            onChange={(e) => setPassword(e.target.value)}
            value={password || ""}
          />
          <input
            type="password"
            placeholder="Confirme sua senha."
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword || ""}
          />
          {!loading && <input type="submit" value="Cadastrar" />}
          {loading && <input type="submit" value="Aguarde" disabled />}
          {error && <Message msg={error} type="error"/>}
        </form>
        <p>
          Já tem conta? <Link to="/login">Clique aqui</Link>
        </p>
        <p>
          Esqueceu sua senha? <Link to="/forgot">Clique aqui</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
