// import './App.css';
// import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
// import Login from '../src/Pages/Auth/Login'
// import Resetpassword from '../src/Pages/Auth/Resetpassword';
// import Verify from '../src/Pages/Auth/Verify';
// import Dashboard from '../src/Pages/Dashboard/Dashboard';
// import Create from '../src/Pages/Dashboard/Create';
// import Starred from '../src/Pages/Dashboard/Starred';
// import RecycleBin from '../src/Pages/Dashboard/RecycleBin'
// import Folders from '../src/Pages/Dashboard/Folders'
// import Sidebar from './Components/Sidebar';

// function App() {
//   return (
//     <BrowserRouter>
//     <Sidebar/>
//       <Routes>
//         {/* Redirect "/" to "/login" */}
//         <Route path="/" element={<Navigate to="/login" replace />} />
        
//         {/* Define the login route */}
//         <Route path="/login" element={<Login />} />
        
//         {/* Define the reset password route */}
//         <Route path="/resetpassword" element={<Resetpassword />} />
        
//         {/* Define the verify route */}
//         <Route path="/verify" element={<Verify />} />

//         {/* Dashboard routes */}
//         {/* <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/dashboard/create" element={<Create />} />
//         <Route path="/dashboard/starred" element={<Starred />} />
//         <Route path="/dashboard/recycle-bin" element={<RecycleBin />} />
//         <Route path="/dashboard/folders" element={<Folders/>} /> */}

//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/create" element={<Create />} />
//         <Route path="/folders" element={<Folders />} />
//         <Route path="/starred" element={<Starred />} />
//         <Route path="/recyclebin" element={<RecycleBin/>} />


        
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// Dashboard

import './App.css';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './Pages/Auth/Login';
import Resetpassword from './Pages/Auth/Resetpassword';
import Verify from './Pages/Auth/Verify';
// import Dashboard from './Pages/Dashboard/Dashboard';
import Dashboard from '../src/Pages/Dashboard/Dashboard';
import Create from './Pages/Dashboard/Create';
import Starred from './Pages/Dashboard/Starred';
import RecycleBin from './Pages/Dashboard/RecycleBin';
import Folders from './Pages/Dashboard/Folders';
import Sidebar from './Components/Sidebar';
import Logout from './Pages/Dashboard/Logout';
import Success from './Pages/Auth/Success';

function App() {
  const location = useLocation();

  // Paths where Sidebar should be displayed
  const sidebarPaths = [
    '/dashboard',
    '/create',
    '/folders',
    '/starred',
    '/recyclebin',
  ];

  const isSidebarVisible = sidebarPaths.some(path =>
    location.pathname.startsWith(path)
  );

  return (
    <div className="App">
      {/* Conditionally render Sidebar */}
      {isSidebarVisible && <Sidebar />}

      <Routes>
        {/* Redirect "/" to "/login" */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Define the auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/resetpassword" element={<Resetpassword />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/success" element={<Success/>} />
        
        {/* Dashboard routes */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create" element={<Create />} />
        <Route path="/folders" element={<Folders />} />
        <Route path="/starred" element={<Starred />} />
        <Route path="/recyclebin" element={<RecycleBin />} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>
    </div>
  );
}

function RootApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default RootApp;


