import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import UsersApi from '../Api/UsersApi';

function authority() {


    //İmgs Verilerini getir
    const [personData, setpersonData] = useState([]);
    const [error, setError] = useState(null);
    const defaultImageUrl = '../src/images/profile.png';

    useEffect(() => {
        const fetchBirthdays = async () => {
            try {
                const response = await axios.get(UsersApi.ENDPOINTS.GET_USERS_ALL, {
                    headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
                });
                const users = response.data;

                const usersWithImages = await Promise.all(
                    users.map(async (user) => {
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
                                birthDate: user.birthDate,
                                position: user.position,
                                name: user.username,
                                image: imageUrl,
                            };
                        } catch (imgError) {
                            console.error(`Error fetching image for ${user.username}:`, imgError);
                            return {
                                birthDate: user.birthDate,
                                name: user.username,
                                position: user.position,
                                image: defaultImageUrl,
                            };
                        }
                    })
                );

                usersWithImages.sort((a, b) => a.days - b.days);
                setpersonData(usersWithImages);
                console.log(usersWithImages);
            } catch (err) {
                console.error('Error fetching birthdays:', err);
                setError(err.message || 'Error loading birthdays');
            }
        };

        fetchBirthdays();
    }, []);






    return (
        <div>
            <div className="content-page">
                <div className="content">
                    <div className="container-xxl">


                        <br></br>
                        <div className='row'>

                            <div className='col-md-12  '>
                                <div className="card p-3 border-0 shadow-sm position-relative overflow-hidden" style={{ transition: 'transform 0.2s' }}>
                                    <form className="form-inline my-2 my-lg-0 d-flex ">
                                        <input className="form-control mr-sm-2" type="search" placeholder="Personel Ara" aria-label="Search" />
                                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Ara</button>
                                    </form>
                                </div>
                            </div>

                            {personData.map((list, index) => {
                                return (
                                    <div key={index} className="col-md-3">
                                        <div className="card  border-0 shadow-sm position-relative overflow-hidden" style={{ transition: 'transform 0.2s' }}>
                                            {/* Badge */}
                                            <span
                                                className="position-absolute top-0 end-0 m-2 py-1 px-3 rounded-pill text-white"
                                                style={{ backgroundColor: '#6300ff', fontSize: 12 }}
                                            >
                                                 YAŞ {new Date().getFullYear() - new Date(list.birthDate).getFullYear()}
                                            </span>

                                            {/* Card Body */}
                                            <div className="card-body text-center p-4">
                                                <img
                                                    className="rounded-circle border border-3 border-white shadow"
                                                    src={list.image}

                                                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                                                />
                                                <h5 className="mt-3 mb-1 fw-bold text-dark">{list.name}</h5>
                                                <p className="text-secondary mb-3" style={{ fontSize: '0.9rem' }}>
                                                    {list.position}
                                                </p>
                                                <div className="d-grid">
                                                    <button className="btn btn-outline-primary btn-sm rounded-pill py-2 fw-medium">
                                                        <MdOutlineSecurity className='mb-1' />  Yetkilendir
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Hover Effect */}

                                        </div>
                                        <style>{`
                                    .card:hover { transform: scale(1.02); }
                                `}</style>

                                    </div>
                                )



                            })}




                        </div>

                    </div></div>
            </div>
        </div>
    )
}

export default authority