import { NavLink } from 'react-router-dom';

function Sidebar() {
    const menu = [
        { path: '/', label: 'Analisis Lengkap', icon: 'fas fa-layer-group' },
        { path: '/bi-analytics', label: 'Analitik Bisnis', icon: 'fas fa-chart-bar' },
        { path: '/smart-predict', label: 'Fitur Pintar', icon: 'fas fa-robot' },
    ];

    return (
        <aside className="sidebar">
            <div className="logo px-2">
                <i className="fas fa-layer-group"/><span>Prospera</span>
            </div>
            <ul className="nav flex-column">
                {menu.map((item) => (
                    <li className="nav-item" key={item.path}>
                        <NavLink 
                            to={item.path} 
                            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                        >
                            <i className={item.icon} />
                            <span className="nav-text">{item.label}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;
