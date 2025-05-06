import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import Menu from './item/menu';
import Home from './Page/home';
import PersonPage from './Page/personPage';
import PersonDetails from './Page/personDetails';
import PersonPermissionPage from './Page/personPermissionPage';
import ZimmetPage from './Page/zimmetPage';
import PersonRegisterPage from './Page/personRegisterPage';
import NotesPage from './Page/notesPage';
import ShiftPage from './Page/shiftPage';
import NoticePage from './Page/noticePage';
import Calender from './Page/calenderPage';
import CommonSharePage from './Page/commonSharePage';
import CompanyDayPage from './Page/companyDayPage';
import Login from './Page/login';
import PersonHome from './Person/Pages/personHome';
import PersonForPermisson from './Person/Pages/personForPermisson';
import PersonNoticePage from './Person/Pages/personNoticePage';
import PersonZimmetPage from './Person/Pages/PersonZimmetPage';
import PersonCompanyDay from './Person/Pages/personCompanyDay';
import PersonCommonSharePage from './Person/Pages/personCommonSharePage';

// Wrapper to conditionally render Menu based on current path
function Layout({ children }) {
  const location = useLocation();
  // Paths where Menu should be hidden
  const hideMenuOn = ['/login','/person/home'];

  const hideMenu = hideMenuOn.includes(location.pathname);

  return (
    <>
      {!hideMenu && <Menu />}
      {children}
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public / Auth Routes */}
          <Route path="/login" element={<Login />} />

          {/* Admin Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/person" element={<PersonPage />} />
          <Route path="/personDetails/:username" element={<PersonDetails />} />
          <Route path="/personPermission" element={<PersonPermissionPage />} />
          <Route path="/zimmet" element={<ZimmetPage />} />
          <Route path="/personregister" element={<PersonRegisterPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/shift" element={<ShiftPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/companyDay" element={<CompanyDayPage />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/commonshare" element={<CommonSharePage />} />

          {/* Personnel Pages */}
          <Route path="/person/home" element={<PersonHome />} />
          <Route path="/person/permisson" element={<PersonForPermisson />} />
          <Route path="/person/personNotice" element={<PersonNoticePage />} />
          <Route path="/person/zimmet" element={<PersonZimmetPage />} />
          <Route path="/person/personCompanyDay" element={<PersonCompanyDay />} />
          <Route path="/person/PersonCommonShare" element={<PersonCommonSharePage />} />

          {/* Catch-all: Redirect unknown to login or home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
