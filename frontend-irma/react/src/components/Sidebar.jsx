import React from 'react';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="logo px-2">
                <i className="fas fa-chart-line"></i>
                <span>Prospera</span>
            </div>
            <ul className="nav flex-column">
                <li className="nav-item">
                    <a href="#" className="nav-link active">
                        <i className="fas fa-th-large"></i>
                        <span className="nav-text">Dashboard</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i className="fas fa-wallet"></i>
                        <span className="nav-text">Transactions</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i className="fas fa-box"></i>
                        <span className="nav-text">Products</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a href="#" className="nav-link">
                        <i className="fas fa-users"></i>
                        <span className="nav-text">Customers</span>
                    </a>
                </li>
                <li className="nav-item mt-auto">
                    <a href="#" className="nav-link">
                        <i className="fas fa-cog"></i>
                        <span className="nav-text">Settings</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
