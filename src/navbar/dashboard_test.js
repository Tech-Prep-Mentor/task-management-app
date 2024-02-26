import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from '../navbar/navbar';

const Dashboard = () => {
    return (
        <div>
            <Navbar />
            {/* Other dashboard content */}
        </div>
    );
};

ReactDOM.render(
    <React.StrictMode>
        <Dashboard />
    </React.StrictMode>,
    document.getElementById('root')
);

export default Dashboard;