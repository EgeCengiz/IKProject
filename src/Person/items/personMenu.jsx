import React, { useState, useEffect } from 'react';
import { TiThMenu } from "react-icons/ti";
import { FaHome, FaRegFilePdf,FaExclamation } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { IoMdPerson, IoMdSettings, IoIosBusiness } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { IoMailOutline,IoMailUnreadOutline  } from "react-icons/io5";
import axios from 'axios';
import UsersApi from '../../Api/UsersApi';
import styled, { keyframes } from 'styled-components';
import Notification from '../../item/notification';
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;
const BlinkingIcon = styled(FaExclamation)`
  color: red;
  font-size:14px;
  animation: ${blink} 1s infinite;
`;

function PersonMenu() {
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
            setProfileImage({ image: imageUrl });
        } catch (error) {
            console.log("Profil resmi alınamadı:", error);
        }
    };


 const [mail, setMail] = useState(false);




 const notificationState = async () => {
        try {
            const usernameEncoded = encodeURIComponent(UsersApi.username);
            const response = await axios.get(
                `${UsersApi.ENDPOINTS.GET_NOTIFICATION_STATE}/${usernameEncoded}`,
                { headers: { Authorization: `Bearer ${UsersApi.TOKEN}` } }
            );
            setMail(response.data);
            console.log(response.data);


        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };
 const notificationOpen = async () => {
        try {
            const usernameEncoded = encodeURIComponent(UsersApi.username);
            const response = await axios.get(
                `${UsersApi.ENDPOINTS.GET_NOTIFICATION_OPEN}/${usernameEncoded}`,
                { headers: { Authorization: `Bearer ${UsersApi.TOKEN}` } }
            );

            console.log(response.data);


        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

 const handleMailClick = (e) => {
        e.preventDefault();      // eğer link davranışını durdurmak isterseniz

        notificationOpen();
        setMail(false);
    };


    const [state, setState] = useState(false);

    useEffect(() => {
        notificationState();
        const username = localStorage.getItem('username');
        if (username) getProfileImages(username);
    }, []);

    const [sidebarState, setSidebarState] = useState('hidden');

    useEffect(() => {
        document.body.setAttribute('data-sidebar', sidebarState);
        console.log("Sidebar state:", sidebarState);
    }, [sidebarState]);

    return (
        <div>
            <div >
                <div style={{ backgroundColor: "white", padding: 20 }} className="card">
                    <div className="container-xxl">
                        <div className="d-flex justify-content-between">
                            <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center">
                                <li>
                                    <button className="nav-link ps-0">
                                        <img src="../src/images/smart.png" style={{ width: 120 }} alt="logo" />
                                    </button>
                                </li>
                            </ul>

                            <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center " >
                                 <li className="dropdown notification-list topbar-dropdown" style={{overflow: 'visible' }}>
                                    <a className="nav-link dropdown-toggle" onClick={handleMailClick} data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        {mail == false ?  <IoMailOutline fontSize={22} /> :<> <IoMailUnreadOutline fontSize={22} color='red' /></> }
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end dropdown-lg" style={{ width: 400 }}>


                                        <div className=" p-1 d-flex justify-content-center">
                                            <IoMailOutline className='mt-1 me-1' /><div>Bildirimler</div>

                                        </div>
                                        <hr className="m-0"></hr>
                                        <div className="noti-scroll" data-simplebar>
                                            <Notification data={state} />
                                        </div>
                                    </div>
                                </li>

                                <li className="dropdown notification-list topbar-dropdown">
                                    <a className="nav-link dropdown-toggle nav-user me-0" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        <img src={profileImage.image} alt="user" className="rounded-circle" />
                                        <span className="pro-user-name ms-1">
                                            {localStorage.getItem('username')}
                                        </span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end profile-dropdown">
                                        <a href="auth-logout.html" className="dropdown-item notify-item">
                                          
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
    );
}

export default PersonMenu;
