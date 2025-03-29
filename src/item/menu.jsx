import { React, useState, useEffect } from 'react'
import { TiThMenu } from "react-icons/ti";
import { FaHome,FaRegFilePdf} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdPerson, IoMdSettings, IoIosBusiness} from "react-icons/io";

function menu() {

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
                                        <input type="text" className="form-control bg-light bg-opacity-75 border-light ps-4" placeholder="Search..." />
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
                                        <img src="assets/images/users/user-11.jpg" alt="user-image" className="rounded-circle" />
                                        <span className="pro-user-name ms-1">
                                            Okan Karaçor <i className="mdi mdi-chevron-down"></i>
                                        </span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end profile-dropdown ">

                                        <div className="dropdown-header noti-title">
                                            <h6 className="text-overflow m-0">Welcome !</h6>
                                        </div>


                                        <a href="pages-profile.html" className="dropdown-item notify-item">
                                            <i className="mdi mdi-account-circle-outline fs-16 align-middle"></i>
                                            <span>My Account</span>
                                        </a>


                                        <a href="auth-lock-screen.html" className="dropdown-item notify-item">
                                            <i className="mdi mdi-lock-outline fs-16 align-middle"></i>
                                            <span>Lock Screen</span>
                                        </a>

                                        <div className="dropdown-divider"></div>


                                        <a href="auth-logout.html" className="dropdown-item notify-item">
                                            <i className="mdi mdi-location-exit fs-16 align-middle"></i>
                                            <span>Logout</span>
                                        </a>

                                    </div>
                                </li>

                            </ul>
                        </div>

                    </div>

                </div>

                <div className="app-sidebar-menu" >
                    <div className="h-100" data-simplebar>
                        <div id="sidebar-menu">

                            <div className="d-flex justify-content-center m-3">
                                <img src="src/images/smart_logo.png" alt="" height="45" />
                            </div>

                            <ul id="side-menu">
                           
                            <li className="menu-title">Genel</li>
                                <li>
                                    <a href="#sidebarDashboards2" data-bs-toggle="collapse" aria-expanded="true">
                                    <FaHome  />
                                        <span> Anasayfa </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse show" id="sidebarDashboards2">
                                        <ul className="nav-second-level">
                                            <li>
                                                <a href="/" className="tp-link">Anasayfa</a>
                                            </li>
                                        
                                        </ul>
                                    </div>
                                </li>

                                <li className="menu-title">Personel</li>

                                <li>
                                    <a href="#sidebarDashboards" data-bs-toggle="collapse" aria-expanded="true">
                                        <IoMdPerson/>
                                        <span> Personel Bilgileri </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse show" id="sidebarDashboards">
                                        <ul className="nav-second-level">
                                            <li>
                                                <a href="/person" className="tp-link">Özlük Belgeleri</a>
                                            </li>
                                            <li>
                                                <a href="ecommerce.html" className="tp-link">İzin Talepleri</a>
                                            </li>
                                            <li>
                                                <a href="ecommerce.html" className="tp-link">Doğum Günü Takip</a>
                                            </li>
                                            <li>
                                                <a href="ecommerce.html" className="tp-link">Mesai Takip</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>
                                <li>
                                    <a href="#sidebarDashboards1" data-bs-toggle="collapse" aria-expanded="true">
                                        <IoIosBusiness/>
                                        <span> Şirket Takip </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse show" id="sidebarDashboards1" >
                                        <ul className="nav-second-level">
                                            <li>
                                                <a href="index.html" className="tp-link">Zimmet Takip</a>
                                            </li>
                                            <li>
                                                <a href="ecommerce.html" className="tp-link">Harcama Prim Avans</a>
                                            </li>
                                            <li>
                                                <a href="ecommerce.html" className="tp-link">Yemek Kartı</a>
                                            </li>
                                           
                                        </ul>
                                    </div>
                                </li>


                                <li className="menu-title">İK Yönetim</li>

                                <li>
                                    <a href="#sidebarAuth" data-bs-toggle="collapse" aria-expanded="true">
                                        <IoMdSettings/>
                                        <span> Yönetim </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse show" id="sidebarAuth">
                                        <ul className="nav-second-level">
                                            <li>
                                                <a href="auth-login.html" className="tp-link">Notlar</a>
                                            </li>
                                            <li>
                                                <a href="auth-register.html" className="tp-link">Duyurular</a>
                                            </li>
                                            <li>
                                                <a href="auth-recoverpw.html" className="tp-link">Şirket İçi Etkinlik</a>
                                            </li>
                                            <li>
                                                <a href="ecommerce.html" className="tp-link">Personel Ekle</a>
                                            </li>
                                            <li>
                                                <a href="error-503.html" className="tp-link">Takvim</a>
                                            </li>


                                        </ul>
                                    </div>
                                </li>

                                <li>
                                    <a href="#sidebarError" data-bs-toggle="collapse" aria-expanded="true">
                                        <FaRegFilePdf/>
                                        <span> Dosyalar </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse show" id="sidebarError">
                                        <ul className="nav-second-level">
                                            <li>
                                                <a href="error-404.html" className="tp-link">Ortak Dosya Paylaşımı</a>
                                            </li>
                                            <li>
                                                <a href="error-500.html" className="tp-link">Raporlar</a>
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