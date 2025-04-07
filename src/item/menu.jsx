import { React, useState, useEffect } from 'react'
import { TiThMenu } from "react-icons/ti";
import { FaHome, FaRegFilePdf } from "react-icons/fa";
import { IoMdPerson, IoMdSettings, IoIosBusiness } from "react-icons/io";
import { NavLink } from 'react-router-dom';
function menu() {
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
                                <li className="d-none d-lg-block">
                                    <div className="position-relative topbar-search">
                                        <input type="text" className="form-control bg-light bg-opacity-75 border-light ps-4" placeholder="Personel Ara..." />
                                        <i className="mdi mdi-magnify fs-16 position-absolute text-muted top-50 translate-middle-y ms-2"></i>
                                    </div>
                                </li>
                            </ul>

                            <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center">

                                <li className="d-none d-sm-flex">
                                    <button type="button" className="btn nav-link" data-toggle="fullscreen">
                                        <i data-feather="maximize" className="align-middle fullscreen noti-icon"></i>
                                    </button>
                                </li>



                                <li className="dropdown notification-list topbar-dropdown">
                                    <a className="nav-link dropdown-toggle nav-user me-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        <img src="src/images/profile.png" alt="user-image" className="rounded-circle" />
                                        <span className="pro-user-name ms-1">
                                            Okan Karaçor
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

                <div className="app-sidebar-menu" style={{ backgroundColor: '#1D1D41' }} >
                    <div className="h-100" data-simplebar>
                        <div id="sidebar-menu" >

                            <div className="d-flex justify-content-center p-3 " style={{ width: '100%', backgroundColor: 'white' }}>
                                <img src="src/images/smart.png" style={{ width: '75%' }} />
                            </div>
                            <br></br>
                            <ul id="side-menu">

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
                                                <NavLink to="/" className="tp-link" activeClassName="active">
                                                    Anasayfa
                                                </NavLink>
                                            </li>

                                        </ul>
                                    </div>
                                </li>

                                <li className="menu-title">Personel</li>

                                <li>
                                    <a href="#sidebarDashboards" data-bs-toggle="collapse" aria-expanded="true">
                                        <IoMdPerson />
                                        <span> Personel Bilgileri </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse show" id="sidebarDashboards">



                                        <ul className="nav-second-level">
                                            <li>
                                                <NavLink to="/person" className="tp-link" activeClassName="active">
                                                    Özlük Belgeleri
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/personPermission" className="tp-link" activeClassName="active">
                                                    İzin Talepleri
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/shift" className="tp-link" activeClassName="active">
                                                    Mesai Takip
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/zimmet" className="tp-link" activeClassName="active">
                                                    Zimmet Takip
                                                </NavLink>
                                            </li>
                                        </ul>
                                    </div>
                                </li>


                                <li className="menu-title">İK Yönetim</li>

                                <li>
                                    <a href="#sidebarAuth" data-bs-toggle="collapse" aria-expanded="true">
                                        <IoMdSettings />
                                        <span> Yönetim </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse show" id="sidebarAuth">

                                        <ul className="nav-second-level">
                                            <li>
                                                <NavLink to="/notes" className="tp-link" activeClassName="active">
                                                    Notlar
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/notice" className="tp-link" activeClassName="active">
                                                    Duyurular
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/companyDay" className="tp-link" activeClassName="active">
                                                    Şirket Etkinlikleri
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/personregister" className="tp-link" activeClassName="active">
                                                    Personel Ekle
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/calender" className="tp-link" activeClassName="active">
                                                    Takvim
                                                </NavLink>
                                            </li>
                                        </ul>




                                    </div>
                                </li>
                                <li className="menu-title">Ekler</li>
                                <li>
                                    <a href="#sidebarError" data-bs-toggle="collapse" aria-expanded="true">
                                        <FaRegFilePdf />
                                        <span> Dosyalar </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse show" id="sidebarError">
                                        <ul className="nav-second-level">

                                            <li>
                                                <NavLink to="/commonshare" className="tp-link" activeClassName="active">
                                                    Ortak Dosya Paylaşımı
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

export default menu