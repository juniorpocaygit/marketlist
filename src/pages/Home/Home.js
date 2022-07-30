import { Outlet } from 'react-router-dom'

import Brand from '../../components/Brand'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Profile from '../../components/Profile'
import './Home.css'

const Home = (props) => {
  return (
    <div>
        <aside>
            <header>
               <Brand/>
               <Navbar/>
            </header>
            <Profile/>
            <Footer/>
        </aside>
        <div className='home-content'>
          <Outlet/>
        </div>
    </div>
  )
}

export default Home