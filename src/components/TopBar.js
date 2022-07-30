import './TopBar.css'


const TopBar = ({title}) => {
  return (
    <div className="topbar">
        <div className="topbar-content">
            <h2>{title}</h2>
        </div>
    </div>
  )
}

export default TopBar