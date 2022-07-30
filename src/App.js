import './App.css';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

//Hook
import { useAuth } from './hooks/useAuth';

//Pages
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ProfileEdit from './pages/ProdfileEdit/ProfileEdit';
import Lists from './pages/Lists/Lists';
import Forgot from './pages/Auth/Forgot';
import Reset from './pages/Auth/Reset';
import Listprod from './pages/Listprod/Listprod';


function App() {
  const {auth, loading} = useAuth()

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />
          <Route
            path="register"
            element={!auth ? <Register /> : <Navigate to="/" />}
          />
          <Route
            path="forgot"
            element={!auth ? <Forgot /> : <Navigate to="/" />}
          />
          <Route
            path="reset/:resetToken"
            element={!auth ? <Reset /> : <Navigate to="/" />}
          />
          <Route element={auth ? <Home /> : <Navigate to="login" />}>
            <Route
              path="profile"
              element={auth ? <ProfileEdit /> : <Navigate to="login" />}
            />
            <Route
              path="listprod/:id"
              element={auth ? <Listprod /> : <Navigate to="login" />}
            />
            <Route
              path="/"
              element={auth ? <Lists /> : <Navigate to="login" />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
