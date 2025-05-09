import { React, useState, useEffect } from 'react'
import { TiThMenu } from "react-icons/ti";
import { FaHome, FaRegFilePdf } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdPerson, IoMdSettings, IoIosBusiness } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { IoMailOutline } from "react-icons/io5";
import axios from 'axios';
import UsersApi from '../../Api/UsersApi';
function personMenu() {


    const [profileImage, setProfileImage] = useState({});
    const getProfileImages = async (person) => {
        try {

            const response = await axios.get(`${UsersApi.ENDPOINTS.GET_USERS_IMAGE}?username=${person}`, {
                headers: {
                    Authorization: `Bearer ${UsersApi.TOKEN}`,
                },
                responseType: 'blob',
            });
            const imageUrl = URL.createObjectURL(response.data);
            console.log(imageUrl);
            setProfileImage({ image: imageUrl });
        } catch (error) {
            console.log(imageUrl);
        }
    };
    useEffect(() => {
        getProfileImages(localStorage.getItem('username'));

    }, []);


    // Sidebar durumunu yöneten state
    const [sidebarState, setSidebarState] = useState('hidden');

  

    // State değiştiğinde DOM'u güncelle
    useEffect(() => {
        document.getElementById("body").setAttribute('data-sidebar', "hidden");
        console.log("Sidebar state:", "hidden");
    }, [sidebarState]); // `sidebarState` değiştiğinde çalışır
    return (
        <div >

            <div id="app-layout">

                <div style={{backgroundColor:"white", padding:20}} className="card">
                    <div className="container-xxl">
                        <div className="d-flex justify-content-between">
                            <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center">
                                <li>
                                    <button className=" nav-link ps-0" >
                                        <img src="../src/images/smart.png" style={{width:120}}/>
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
                                        <img src={profileImage.image} alt="user-image" className="rounded-circle" />
                                        <span className="pro-user-name ms-1">
                                            {localStorage.getItem('username')}
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

            

            </div>
        </div>
    )
}

export default personMenu