import "./Auth.css";
import Logo from '../../assets/images/logo.png'

//components
import { Link } from 'react-router-dom'
import Message from "../../components/Message";

//hooks
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

//Redux
import { resetPassword, reset } from "../../slices/authSlice";


const Reset = () => {
  const navigate = useNavigate()
  const {resetToken} = useParams()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")


  const dispatch = useDispatch()
  const {loading, error, message} = useSelector((state) => state.auth)

  const msgsuccess = message
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    const user = {
      email,
      resetToken,
      password,
      confirmPassword,
    }
    console.log(user)
    await dispatch(resetPassword(user))
  }

  //Clean al auth states
  useEffect(() => {
    dispatch(reset())
  },[dispatch])

  //Clean al auth states
  if (msgsuccess) {
    setTimeout(()=>{
      navigate("/login")
    },2000)
  }
 
 

  return (
    <div className="auth-content">
      <div className="auth-area">
        <img src={Logo} alt="Market List Logo" />
        <p>Resetar senha do usuário.</p>
        <form onSubmit={handleSubmit}>
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
          {error && <Message msg={error} type="error" />}
          {message && <Message msg={message} type="success" />}
      
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

export default Reset;
