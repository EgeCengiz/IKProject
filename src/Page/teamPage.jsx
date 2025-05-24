import React from 'react'
import { PiMicrosoftTeamsLogoDuotone } from "react-icons/pi";
import { FaPeopleGroup } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import { TbTargetArrow } from "react-icons/tb";
import { GrUserPolice } from "react-icons/gr";
import { FaPlus } from "react-icons/fa";
import { AiOutlineTeam } from "react-icons/ai";
function teamPage() {
    return (
        <>
            <div className="content-page">
                <div className="content">
                    <div className="container-xxl">
                        <br></br>
                        <div className='m-3 d-flex justify-content-between'>
                            <h4><PiMicrosoftTeamsLogoDuotone/> Takım</h4>
                            <a className='btn btn-primary'><AiOutlineTeam className='mb-1'/> OLUŞTUR</a>

                        </div>
                        <hr></hr>

                          <div className="card shadow-sm rounded-4 mx-auto my-3">
                            <div className="card-header text-center bg-white py-3 border-bottom">
                                <h5 className="mb-0"><FaPeopleGroup/> Takım Adı</h5>
                            </div>
                            <div className="card-body">
                                <div className="d-flex flex-wrap justify-content-between align-items-center">
                                    {/* Profil & Lider Bilgisi */}
                                    <div className="d-flex align-items-center mb-3 mb-md-0">
                                        <img
                                            src="../src/images/ege.jpg"
                                            className="rounded-circle me-3"
                                            width="60"
                                            height="60"
                                            alt="Takım Lideri"
                                        />
                                        <div>
                                            <div className="fw-semibold"> <GrUserPolice className='mb-1'/>  Ege Cengiz </div>
                                            <small className="text-muted">Takım Lideri</small>
                                        </div>
                                    </div>
                                    {/* İstatistik & Görev */}
                                    <div className="text-center mb-3 mb-md-0">
                                        <div className="fw-medium"><i className="bi bi-people me-1"></i>Personel: <span className="fw-bold text-primary">12</span></div>
                                        <small className="text-muted"><TbTargetArrow className='mb-1' style={{fontSize:18}}/> Anlık Görev: Az Projesi</small>
                                    </div>
                                    {/* Butonlar */}
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-outline-primary"><FaPlus className='mb-1'/> Personel Ekle/Sil</button>
                                        <button className="btn btn-outline-success"><TbListDetails/> Takım Detayları</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                          <div className="card shadow-sm rounded-4 mx-auto my-3">
                            <div className="card-header text-center bg-white py-3 border-bottom">
                                <h5 className="mb-0"><FaPeopleGroup/> Takım Adı</h5>
                            </div>
                            <div className="card-body">
                                <div className="d-flex flex-wrap justify-content-between align-items-center">
                                    {/* Profil & Lider Bilgisi */}
                                    <div className="d-flex align-items-center mb-3 mb-md-0">
                                        <img
                                            src="../src/images/ege.jpg"
                                            className="rounded-circle me-3"
                                            width="60"
                                            height="60"
                                            alt="Takım Lideri"
                                        />
                                        <div>
                                            <div className="fw-semibold"> <GrUserPolice className='mb-1'/>  Ege Cengiz </div>
                                            <small className="text-muted">Takım Lideri</small>
                                        </div>
                                    </div>
                                    {/* İstatistik & Görev */}
                                    <div className="text-center mb-3 mb-md-0">
                                        <div className="fw-medium"><i className="bi bi-people me-1"></i>Personel: <span className="fw-bold text-primary">12</span></div>
                                        <small className="text-muted"><TbTargetArrow className='mb-1' style={{fontSize:18}}/> Anlık Görev: Az Projesi</small>
                                    </div>
                                    {/* Butonlar */}
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-outline-primary"><FaPlus className='mb-1'/> Personel Ekle/Sil</button>
                                        <button className="btn btn-outline-success"><TbListDetails/> Takım Detayları</button>
                                    </div>
                                </div>
                            </div>
                        </div>







                    </div>
                </div>
            </div>


        </>
    )
}

export default teamPage