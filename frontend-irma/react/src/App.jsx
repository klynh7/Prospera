import React from 'react';
import Sidebar from './components/Sidebar';
import StatCard from './components/StatCard';
import { SalesTrendChart } from './components/Charts';

function App() {
    return (
        <div className="d-flex">
            <Sidebar />
            <div className="main-content flex-grow-1">
                <header className="d-flex justify-content-between align-items-center mb-4">
                    <h1 className="h3 fw-bold">Analytics Overview</h1>
                    <div className="d-flex align-items-center gap-3">
                        <div className="text-end d-none d-sm-block">
                            <div className="fw-semibold">Irma Tiara</div>
                            <small className="text-muted">Administrator</small>
                        </div>
                        <div className="avatar rounded-circle">IT</div>
                    </div>
                </header>

                {/* 1. Profit & Loss Tracking */}
                <div className="row g-4 mb-4">
                    <div className="col-md-3">
                        <StatCard
                            title="Total Sales"
                            value="$124,500"
                            icon="fas fa-shopping-cart"
                            delta="12.5%"
                            deltaType="up"
                        />
                    </div>
                    <div className="col-md-3">
                        <StatCard
                            title="Total Expenses"
                            value="$45,200"
                            icon="fas fa-receipt"
                            delta="5.2%"
                            deltaType="down"
                        />
                    </div>
                    <div className="col-md-3">
                        <StatCard
                            title="Net Profit"
                            value="$79,300"
                            icon="fas fa-chart-bar"
                            delta="18.2%"
                            deltaType="up"
                            valueStyle={{ color: 'var(--green-primary)' }}
                        />
                    </div>
                    <div className="col-md-3">
                        <StatCard
                            title="Gross Margin"
                            value="63.7%"
                            icon="fas fa-percentage"
                            delta="2.1%"
                            deltaType="up"
                        />
                    </div>
                </div>

                <div className="row g-4 mb-4">
                    {/* 3. Time Series Analysis */}
                    <div className="col-lg-8">
                        <div className="card border-0 shadow-sm rounded-4 p-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h5 className="fw-bold m-0">Sales & Profit Trend</h5>
                                <select className="form-select form-select-sm w-auto">
                                    <option>Last 6 Months</option>
                                    <option>Last Year</option>
                                </select>
                            </div>
                            <div style={{ height: '300px' }}>
                                <SalesTrendChart />
                            </div>
                        </div>
                    </div>

                    {/* 2. Top Performance & 4. Forecast */}
                    <div className="col-lg-4">
                        <div className="card border-0 shadow-sm rounded-4 p-4 mb-4">
                            <h5 className="fw-bold mb-3">Top Performance</h5>
                            <div className="table-responsive">
                                <table className="table table-borderless align-middle mb-0">
                                    <thead className="text-muted small text-uppercase">
                                        <tr>
                                            <th>Product</th>
                                            <th className="text-end">Growth</th>
                                        </tr>
                                    </thead>
                                    <tbody className="small">
                                        <tr>
                                            <td>Digital Services</td>
                                            <td className="text-end"><span className="badge" style={{ background: 'var(--green-light)', color: 'var(--green-medium)' }}>+24%</span></td>
                                        </tr>
                                        <tr>
                                            <td>Web Hosting</td>
                                            <td className="text-end"><span className="badge" style={{ background: 'var(--green-light)', color: 'var(--green-medium)' }}>+12%</span></td>
                                        </tr>
                                        <tr>
                                            <td>SaaS Sub</td>
                                            <td className="text-end"><span className="badge" style={{ background: 'var(--green-light)', color: 'var(--green-medium)' }}>+18%</span></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Sales Summary & Forecasting */}
                        <div className="card forecast-card shadow-sm rounded-4 p-4">
                            <small className="opacity-75">Projected Sales (Next Month)</small>
                            <div className="h2 fw-bold my-2">$142,000</div>
                            <p className="small opacity-75 mb-3">AI-driven analysis based on seasonality and current market trends.</p>
                            <button className="btn btn-forecast w-100">View Detailed Report</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
