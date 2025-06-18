
import { useAuthStore } from "../../store/useAuthStore";
import {useNavigate} from 'react-router-dom'
import "./index.css"
const Header = () =>{
    const navigate = useNavigate();
    const {logout,authUser} = useAuthStore();

    const handleLogout = () => {
        if (authUser){
            logout();
            navigate('/login');
        }
        
    }

    
    
    return (
        <nav className="nav-header">
            <div className='navbar-maincontainer'>
                <div className="navbar-firstcontainer">
                    <img src="https://res.cloudinary.com/dze7v0evj/image/upload/v1749575999/Store_explorer_q9miw7.png" className='credit-logo'/>
                    
                    
                </div>
                
                
               
                <div className="navbar-lastcontainers">
                    
                       
                    <select className="select" disabled>
                        <option className="select-options" >{authUser.role}</option>
                        
                    </select>
                    <span className="user-name">{authUser.fullName}</span>
                    <button className="logout-button1" onClick={handleLogout}>
                        <img src="logout.png" className="images"/>
                    </button>
                    </div>   
            </div>
        </nav> 
    )
}
export default Header