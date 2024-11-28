import { useState } from 'react'
import './App.css'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
import PrintDialog from './components/Print/Print'
import PrinterSelectionDialog from './components/Print2/Print2'
import PrintConfirmationDialog from './components/Print3/Print3'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import axios from 'axios';
import Role from './components/Role/Role'
import SPSO from './components/SPSO/SPSO'


function App() {
  const [currentPage, setCurrentPage] = useState<'role' | 'login' | 'dashboard' | 'spso'>('role');
  const [role, setRole] = useState<'student' | 'admin' | null>(null);

  const handleRoleSelection = (selectedRole: 'student' | 'admin') => {
    setRole(selectedRole);
    setCurrentPage('login');
  };

  const handleLogin = () => {
    if (role === 'student') {
      setCurrentPage('dashboard');
    } else if (role === 'admin') {
      setCurrentPage('spso');
    }
  };


  // const handleLogout = () => {
  //   axios.get('http://localhost:8081/logout')
  //       .then(res => {
  //           if (res.data.Status === "Success") {
  //             navigate('/login');
  //           }
  //           else {
  //               alert("error");
  //           }
  //       }).catch(err => console.log(err))
  // };

      {/* {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard onLogout={handleLogout} />
      )} */}
            const handleLogout = () => {
              setCurrentPage('role');
              setRole(null);
            };
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Dashboard onLogout={handleLogout} />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </BrowserRouter>
      
      return (
        <>
      {currentPage === 'role' && <Role onSelectRole={handleRoleSelection} />}
      {currentPage === 'login' && <Login />}
      {currentPage === 'dashboard' && <Dashboard onLogout={handleLogout} />}
      {currentPage === 'spso' && <SPSO onLogout={handleLogout} />}
    </>
  );
}

export default App;

 {/* Test UI of each components
//</> function App() {
//   return (
//     <>
//     <SPSO />
//   </>
//       );
// } */}
