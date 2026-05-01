import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import BiAnalytics from './pages/BiAnalytics';
import Index from './pages/Index';
import SmartPredict from './pages/SmartPredict';

function App() {
    return (
        <Router>
            <Sidebar />
            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/bi-analytics" element={<BiAnalytics />} />
                    <Route path="/smart-predict" element={<SmartPredict />} />
                    {/* Redirect old hash URLs if needed or just handle 404 */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </Router>
    );
}

export default App;
