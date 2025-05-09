import { React, useState, useEffect } from 'react'
import { TiThMenu } from "react-icons/ti";
import { FaHome,FaExclamation, FaRegFilePdf, FaRegStickyNote } from "react-icons/fa";
import { IoMdPerson, IoMdSettings, IoIosBusiness } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import { MdHeight, MdWorkOutline } from 'react-icons/md';
import { IoMailOutline, IoPersonCircle, IoMailUnreadOutline, IoPersonAddOutline, IoPersonOutline, IoHomeOutline, IoClose } from "react-icons/io5";
import { LuPlane } from "react-icons/lu";
import { BsBox2 } from "react-icons/bs";
import { AiOutlineFontSize, AiOutlineNotification } from "react-icons/ai";
import { SlCalender } from "react-icons/sl";
import UsersApi from '../Api/UsersApi';
import axios from 'axios';
import Notification from '../item/notification';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import styled, { keyframes } from 'styled-components';
import smartImg from '../images/smart.png'
const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
`;

const BlinkingIcon = styled(FaExclamation)`
  color: red;
  font-size:14px;
  animation: ${blink} 1s infinite;
`;


function menu() {
    const [activeLink, setActiveLink] = useState(''); // Aktif linki tutacak state

    const [mail, setMail] = useState(false);
    const [state, setState] = useState(false);
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
        notificationState()
    }, []);


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


    // Sidebar durumunu yöneten state
    const [sidebarState, setSidebarState] = useState('default');

    // Sidebar durumunu değiştiren fonksiyon
    const toggleSidebar = () => {
        setSidebarState((prevState) => (prevState === 'default' ? 'hidden' : 'default'));
    };
    const handleMailClick = (e) => {
        e.preventDefault();      // eğer link davranışını durdurmak isterseniz

        notificationOpen();
        setMail(false);
    };

    const allNotification = (e) => {
        e.preventDefault();      // eğer link davranışını durdurmak isterseniz

        setState(1);

    };
    // State değiştiğinde DOM'u güncelle
    useEffect(() => {
        document.getElementById("body").setAttribute('data-sidebar', sidebarState);
        console.log("Sidebar state:", sidebarState);
    }, [sidebarState]); // `sidebarState` değiştiğinde çalışır


    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);


    const [search, setSearch] = useState([]);

    const handleSearch = async e => {
        e.preventDefault();
        if (!query.trim()) return;
        try {
            const response = await axios.get(
                `${UsersApi.ENDPOINTS.GET_USERS_SEARCH}/${encodeURIComponent(query)}`,
                { headers: { Authorization: `Bearer ${UsersApi.TOKEN}` } }
            );

            const usersWithImages = await Promise.all(
                response.data.map(async (user) => {
                    try {
                        const imgRes = await axios.get(
                            `${UsersApi.ENDPOINTS.GET_USERS_IMAGE}?username=${encodeURIComponent(user.username)}`,
                            {
                                headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
                                responseType: 'blob',
                            }
                        );
                        const imageUrl = URL.createObjectURL(imgRes.data);
                        return {
                            position: user.position,
                            username: user.username,
                            email: user.email,
                            image: imageUrl,
                        };
                    } catch (imgError) {
                        console.error(`Error fetching image for ${user.username}:`, imgError);
                        return {
                            position: user.position,
                            username: user.username,
                            email: user.email,
                            image: defaultImageUrl,

                        };
                    }
                })
            );
            setSearch(usersWithImages)


            console.log(response.data);
            setResults(response.data || []);
            setIsOpen(true);
        } catch (err) {
            console.error('Personel arama hatası:', err);
            setResults([]);
            setIsOpen(true);
        }
    };


    const navigate = useNavigate();

    const handleLogout = () => {
    
      localStorage.removeItem('token');
      localStorage.removeItem('username');
   
      delete axios.defaults.headers.common['Authorization'];
    
      navigate('/login', { replace: true });
    };

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
                                        <div className="personnel-search position-relative" style={{ width: 400 }}>
                                            {/* Arama Formu */}
                                            <form onSubmit={handleSearch} className="d-flex">
                                                <input
                                                    type="text"
                                                    className="form-control bg-light bg-opacity-50 border-light ps-2"
                                                    placeholder="Personel Ara"
                                                    value={query}
                                                    onChange={e => setQuery(e.target.value)}
                                                />

                                            </form>

                                            {/* Sonuç Kartı */}
                                            <AnimatePresence>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: -10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        exit={{ opacity: 0, y: -10 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="card position-absolute w-100 shadow-lg rounded mt-1"
                                                        style={{ zIndex: 1000 }}
                                                    >
                                                        <div className="card-body p-3">
                                                            {/* Kapat Butonu */}
                                                            <div className="d-flex justify-content-end">
                                                                <button
                                                                    className="btn btn-light btn-sm p-1"
                                                                    onClick={() => setIsOpen(false)}
                                                                    title="Kapat"
                                                                >
                                                                    <MdClose size={18} />
                                                                </button>
                                                            </div>

                                                            {/* Başlık */}
                                                            <div className="text-center mb-2">
                                                                <strong>Personel Listesi</strong>
                                                            </div>

                                                            {/* Kaydırılabilir Liste Konteynırı */}
                                                            <div
                                                                className="list-group"
                                                                style={{
                                                                    maxHeight: results.length > 4 ? '30rem' : 'auto',
                                                                    overflowY: results.length > 4 ? 'auto' : 'visible',
                                                                }}
                                                            >
                                                                {results.length === 0 ? (
                                                                    <p className="text-center text-muted mb-0">Personel bulunamadı</p>
                                                                ) : (
                                                                    search.map(person => (
                                                                        
                                                                        <a href={`/personDetails/${person.username}/0`} className="pe-3 ps-3" >
                                                                            
                                                                        <motion.div
                                                                            key={person.id}
                                                                            initial={{ opacity: 0, x: -10 }}
                                                                            animate={{ opacity: 1, x: 0 }}
                                                                            exit={{ opacity: 0, x: -10 }}
                                                                            transition={{ duration: 0.2 }}
                                                                            whileHover={{ scale: 1.02 }}
                                                                            className="list-group-item list-group-item-action d-flex align-items-center border-0 mb-2 p-3 shadow-sm rounded"
                                                                        >
                                                                               {/* Avatar */}
                                                                                <div
                                                                                    className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center"
                                                                                    style={{ width: 40, height: 40 }}
                                                                                >
                                                                                    <img src={person.image} className="rounded-circle" style={{ width: 40, height: 40 }} />
                                                                                </div>

                                                                                {/* Bilgiler */}
                                                                                <div className="ms-3 flex-grow-1">

                                                                                    <h6 className="mb-1">{person.username}</h6>
                                                                                    <p className="mb-1 text-muted small">{person.email}</p>
                                                                                    <span className="badge text-dark">{person.position}</span>
                                                                                </div>
                                                                        </motion.div></a>
                                                                    ))
                                                                )}
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </div>
                                </li>
                            </ul>

                            <ul className="list-unstyled topnav-menu mb-0 d-flex align-items-center">

                                <li className="dropdown notification-list topbar-dropdown">
                                    <a className="nav-link dropdown-toggle" onClick={handleMailClick} data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        {mail == false ?  <IoMailOutline fontSize={22} /> :<><BlinkingIcon /> <IoMailUnreadOutline fontSize={22} color='red' /></> }
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
                                        <img src={profileImage.image} alt="user-image" className="rounded-circle" />
                                        <span className="pro-user-name ms-1">
                                            {localStorage.getItem('username')}
                                        </span>
                                    </a>
                                    <div className="dropdown-menu dropdown-menu-end profile-dropdown ">
                                        <a href={`/personDetails/${localStorage.getItem("username")}`} className="dropdown-item notify-item">
                                            <i className="mdi mdi-account-circle-outline fs-16 align-middle"></i>
                                            <span>Profil</span>
                                        </a>
                                        <div className="dropdown-divider"></div>
                                        <a  onClick={handleLogout} className="dropdown-item notify-item">
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
                              <img src={smartImg} style={{ width: '60%' }} />

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
                                                <NavLink to="/" className="tp-link">
                                                    <IoHomeOutline className='me-1 mb-1' /> Anasayfa
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
                                                <NavLink to="/person" className="tp-link" >
                                                    <IoPersonOutline className='me-1 mb-1' />  Özlük Belgeleri
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/personPermission" className="tp-link" >
                                                    <LuPlane className='me-1 mb-1' />  İzin Talepleri
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/shift" className="tp-link" >
                                                    <MdWorkOutline className='me-1 mb-1' />  Mesai Takip
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/zimmet" className="tp-link" >
                                                    <BsBox2 className='me-1 mb-1 ' />  Zimmet Takip
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
                                                <NavLink to="/notes" className="tp-link">
                                                    <FaRegStickyNote className='me-1 mb-1 ' />   Notlar
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/notice" className="tp-link" >
                                                    <AiOutlineNotification className='me-1 mb-1 ' />  Duyurular
                                                </NavLink>
                                            </li>

                                            <li>
                                                <NavLink to="/personregister" className="tp-link">
                                                    <IoPersonAddOutline className='me-1 mb-1 ' />  Personel Ekle
                                                </NavLink>
                                            </li>
                                            <li>
                                                <NavLink to="/calender" className="tp-link">
                                                    <SlCalender className='me-1 mb-1 '/> Şahsi Takvim
                                                </NavLink>
                                            </li>
                                        </ul>




                                    </div>
                                </li>
                                <li className="menu-title">Ekler</li>
                                <li>
                                    <a href="#sidebarError" data-bs-toggle="collapse" aria-expanded="true">
                                        <FaRegFilePdf />
                                        <span> Mülakat </span>
                                        <span className="menu-arrow"></span>
                                    </a>
                                    <div className="collapse show" id="sidebarError">
                                        <ul className="nav-second-level">

                                            <li>
                                                <NavLink to="/commonshare" className="tp-link">
                                                    Aday Başvuru
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