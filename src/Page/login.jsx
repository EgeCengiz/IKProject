import React, { useState } from 'react'
import { PiPersonSimpleRunBold } from "react-icons/pi";
import { FiMail } from "react-icons/fi";
import { PiPasswordBold } from "react-icons/pi";
import { IoLogInOutline } from "react-icons/io5";
import { MdOutlinePersonOutline } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { NavLink } from 'react-router-dom';

function login() {


    const [data, setData] = useState({ username: '', password: '' });

    const handleChangeUsername = (e) => {
        setData(prev => ({ ...prev, username: e.target.value }));
    };

    const handleChangePassword = (e) => {
        setData(prev => ({ ...prev, password: e.target.value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                UsersApi.ENDPOINTS.POST_LOGIN,
                data,
                { headers: { 'Content-Type': 'application/json' } }
            );
           
        
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username',data.username);

            if(response.data.role == "Admin" || response.data.role == "IK" || response.data.role == "Yonetici"){
                window.location.href = '/';
            }else{
                window.location.href='/person/home';
            }
          
        } catch (err) {
            console.error('Login error:', err);
            if (err.response?.status === 401) {
                alert('Kullanıcı adı veya şifre yanlış.');
            } else {
                alert('Sunucu hatası: ' + err.message);
            }
        }
    };

    return (
        <div>
            <div className="account-page">
                <div className="container-fluid p-0">
                    <div className="row align-items-center g-0" style={{ backgroundColor:'white'}}>
                        <div className="col-xl-5">
                            <div className="row  ">
                                <div className="col-md-7 card mx-auto">
                                    <div className="mb-0 m-3 border-0 p-md-5 p-lg-0 p-4">
                                        <div className="mb-4  p-0">
                                            <a href="index.html" className="auth-logo d-flex justify-content-center p-3">
                                                <img src='../src/images/H.svg' style={{width:"100%"}} className='p-3'></img>
                                            </a>
                                        </div>
                                        <div className="pt-0 ">
                                            <form className="my-4">
                                                <div className="form-group mb-3">
                                                    <label htmlFor="emailaddress" className="form-label">
                                                        <FiMail className='mt-1 me-2' /> Email address</label>
                                                    <input
                                                        id="emailaddress"
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Eposta adresini giriniz.."
                                                        value={data.username}
                                                        onChange={handleChangeUsername}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group mb-3">
                                                    <label htmlFor="password" className="form-label">
                                                        <PiPasswordBold className="mt-1 me-2" /> Password
                                                    </label>
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Şifre giriniz.."
                                                        value={data.password}
                                                        onChange={handleChangePassword}
                                                        required
                                                    />
                                                </div>

                                                <div className="form-group d-flex mb-3">
                                                    <div className="col-sm-6">
                                                        <div className="form-check">
                                                            <input type="checkbox" className="form-check-input" id="checkbox-signin" />
                                                            <label className="form-check-label" >Remember me</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-sm-6 text-end">
                                                        <a className='text-muted fs-14' href='auth-recoverpw.html'>Forgot password?</a>
                                                    </div>
                                                </div>

                                                <div className="form-group mb-0 row">
                                                    <div className="col-12">
                                                        <div className="d-grid">
                                                            <button className="btn btn-primary" onClick={handleLogin}  ><IoLogInOutline /> Log In </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <div className="saprator my-4"  role="button">
                                                <MdOutlinePersonOutline /> Personel Ekranı
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-7" >
                            <div className="account-page-bg p-md-5 p-4" style={{ backgroundColor: "rgba(190 211 247 / 20%)" }}>
                                <div className="text-center" >
                                    <div className="auth-image">
                                        <img src="../src/images/HR_COMPANY.png" className="mx-auto img-fluid" alt="images" />
                                     
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
















        </div>
    )
}

export default login