import React from 'react';

const StatCard = ({ title, value, icon, delta, deltaType, valueStyle }) => {
    return (
        <div className="stat-card shadow-sm">
            <div className="d-flex justify-content-between text-muted mb-2 small">
                {title} <i className={icon}></i>
            </div>
            <div className="h4 fw-bold mb-1" style={valueStyle}>{value}</div>
            <div className={`small ${deltaType === 'up' ? 'delta-up' : 'delta-down'}`}>
                <i className={`fas fa-arrow-${deltaType}`}></i> {delta}
            </div>
        </div>
    );
};

export default StatCard;
