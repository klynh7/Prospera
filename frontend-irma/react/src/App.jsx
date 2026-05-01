import { useState } from 'react';
import Sidebar from './components/Sidebar';
import BiAnalytics from './pages/BiAnalytics';
import Index from './pages/Index';
import SmartPredict from './pages/SmartPredict';

function App() {
    const [currentPage, setCurrentPage] = useState('index');

    return (
        <>
            <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
            <main className="main-content">
                {currentPage === 'index' && <Index />}
                {currentPage === 'bi-analytics' && <BiAnalytics />}
                {currentPage === 'smart-predict' && <SmartPredict />}
            </main>
        </>
    );
}

export default App;
