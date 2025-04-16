import { React, useState, useEffect } from 'react'
import { TiThMenu } from "react-icons/ti";
import { FaHome, FaRegFilePdf } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdPerson, IoMdSettings, IoIosBusiness } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { IoMailOutline } from "react-icons/io5";
function personMenu() {
    const [activeLink, setActiveLink] = useState(''); // Aktif linki tutacak state

    const handleLinkClick = (link) => {

        setActiveLink(link); // Tıklanan linki state'e ata

    };

    // Sidebar durumunu yöneten state
    const [sidebarState, setSidebarState] = useState('default');

    // Sidebar durumunu değiştiren fonksiyon
    const toggleSidebar = () => {
        setSidebarState((prevState) => (prevState === 'default' ? 'hidden' : 'default'));
    };

    // State değiştiğinde DOM'u güncelle
    useEffect(() => {
        document.getElementById("body").setAttribute('data-sidebar', sidebarState);
        console.log("Sidebar state:", sidebarState);
    }, [sidebarState]); // `sidebarState` değiştiğinde çalışır
    return (
        <div >

            <div id="app-layout">

                <div className="topbar-custom">
                    <div className="container-xxl">
                        <div className="d-flex justify-content-between">
                            <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center">
                                <li>
                                    <button className=" nav-link ps-0" onClick={toggleSidebar} >
                                        <TiThMenu />
                                    </button>
                                </li>

                            </ul>

                            <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center">

                                <li className="d-none d-sm-flex " >
                                    <button type="button" className="btn nav-link" data-toggle="fullscreen">
                                        <div className=" rounded-circle d-flex justify-content-center align-items-center" style={{ backgroundColor: '#f5f5f9', width: 40, height: 40 }}>
                                            <IoMailOutline style={{ fontSize: 22 }} />
                                        </div>
                                    </button>
                                </li>



                                <li className="dropdown notification-list topbar-dropdown">
                                    <a className="nav-link dropdown-toggle nav-user me-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        <img src="../src/images/profile.png" alt="user-image" className="rounded-circle" />
                                        <span className="pro-user-name ms-1">
                                            Ege Cengiz Ortakcı
                                        </span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end profile-dropdown ">



                                        <a href="pages-profile.html" className="dropdown-item notify-item">
                                            <i className="mdi mdi-account-circle-outline fs-16 align-middle"></i>
                                            <span>Profil</span>
                                        </a>




                                        <div className="dropdown-divider"></div>


                                        <a href="auth-logout.html" className="dropdown-item notify-item">
                                            <i className="mdi mdi-location-exit fs-16 align-middle"></i>
                                            <span>Çıkış Yap</span>
                                        </a>

                                    </div>
                                </li>

                            </ul>
                        </div>

                    </div>

                </div>

                <div className="app-sidebar-menu" style={{ backgroundColor: '#1D1D41' }}>
                    <div className="h-100" data-simplebar>
                        <div id="sidebar-menu">

                            <div className="d-flex justify-content-center p-3 " style={{ width: '100%', backgroundColor: 'white' }}>
                            <img  src="../src/images/smart.png" style={{ width: '60%' }} />
                            </div>

                            <ul id="side-menu">
<br></br>
                                <li className="menu-title">Genel</li>
                                <li>
                                    <a href="#sidebarDashboards2" data-bs-toggle="collapse" aria-expanded="true">
                                        <FaHome />
                                        <span> Anasayfa </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse show" id="sidebarDashboards2">

                                        <ul className="nav-second-level">
                                            <li>
                                                <NavLink to="/person/home" className="tp-link" activeClassName="active">
                                                    Profil
                                                </NavLink>
                                            </li>

                                        </ul>
                                    </div>
                                </li>

                                <li className="menu-title">Personel</li>

                                <li>
                                    <a href="#sidebarDashboards" data-bs-toggle="collapse" aria-expanded="true">
                                        <IoMdPerson />
                                        <span> Personel İşlemleri </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse show" id="sidebarDashboards">



                                        <ul className="nav-second-level">
                                            <li>
                                                <NavLink to="/person/permisson" className="tp-link" activeClassName="active">
                                                    İzin İşlemleri
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/person/personNotice" className="tp-link" activeClassName="active">
                                                    Duyurular
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/person/zimmet" className="tp-link" activeClassName="active">
                                                    Personel Zimmet
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/person/personCompanyDay" className="tp-link" activeClassName="active">
                                                    Şirket Etkinlikleri
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/person/PersonCommonShare" className="tp-link" activeClassName="active">
                                                    Paylaşılan Dosyalar
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </li>







                            </ul>

                        </div>

                        <div className="clearfix"></div>

                    </div>
                </div>


            </div>
        </div>
    )
}

export default personMenu