import { useState } from 'react'
import './App.css'
import Home from './Page/home'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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
import Menu from './item/menu';
import PersonHome from './Person/Pages/personHome';
import PersonForPermisson from './Person/Pages/personForPermisson';
import PersonNoticePage from './Person/Pages/personNoticePage';
import PersonZimmetPage from './Person/Pages/PersonZimmetPage';
import PersonCompanyDay from './Person/Pages/personCompanyDay';
import PersonCommonSharePage from './Person/Pages/personCommonSharePage';
function App() {

  return (
    <>

      <Router>
        <Menu />
        <Routes>

          {/*Admin Sayfaları*/}

          <Route path="/" element={<Home />} />
          <Route path="/person" element={<PersonPage />} />
          <Route path="/personDetails" element={<PersonDetails />} />
          <Route path="/personPermission" element={<PersonPermissionPage />} />
          <Route path="/zimmet" element={<ZimmetPage />} />
          <Route path="/personregister" element={<PersonRegisterPage />} />
          <Route path="/notes" element={<NotesPage />} />
          <Route path="/shift" element={<ShiftPage />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/companyDay" element={<CompanyDayPage />} />
          <Route path="/calender" element={<Calender />} />
          <Route path="/commonshare" element={<CommonSharePage />} />
        </Routes>
      </Router>


  {/*Personel Sayfaları*/}


      <Router>
      
        <Routes>  
          <Route path="/person/home" element={<PersonHome />} />
          <Route path="/person/permisson" element={<PersonForPermisson />} />
          <Route path="/person/personNotice" element={<PersonNoticePage />} />
          <Route path="/person/zimmet" element={<PersonZimmetPage />} />
          <Route path="/person/personCompanyDay" element={<PersonCompanyDay />} />
          <Route path="/person/PersonCommonShare" element={<PersonCommonSharePage />} />
        </Routes>
      </Router>
    
    








    </>
  )
}

export default App
