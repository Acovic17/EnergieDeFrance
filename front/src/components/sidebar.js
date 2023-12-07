import './styles/sidebar.css'
import { Link } from 'react-router-dom';

const SidebarData = [
    {
        route: '/',
        icon: 'Home',
        text: 'Accueil'
    },
    {
        route: '/byyear',
        icon: 'Calendar',
        text: 'Par Années'
    },
    {
        route: '/byenergy',
        icon: 'Bulb',
        text: 'Par Energie'
    },
]

function CustomSidebar() {
    return (
        <div className='sidebar'>
            <div className='logoContainer'>
                <img src='favicon.ico' alt='logo' className='logo'/>
            </div>
            <div className='iconContainer'>
                {SidebarData.map((item, index) => (
                    <Link key={index} to={item.route} className='item'>
                        <ion-icon size='large' name={item.icon}/>
                        <span>{item.text}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default CustomSidebar