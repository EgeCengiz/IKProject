import React from 'react'
import { FaPlus } from "react-icons/fa";
import CompanyDay from '../item/companyDay';
function companyDayPage() {
    return (
        <div>

            <div>

                <div class="content-page">

                    <div class="content">
                        <div class="container-xxl">
                            <br></br>
                            <CompanyDay />
                            <div style={{ position: 'fixed', bottom: 50, right: 60, borderRadius: 50, width: 50, height: 50 }} className='btn btn-primary d-flex justify-content-center align-items-center'
                                onClick={() => console.log("Artı butonuna tıklandı")}>
                                <FaPlus style={{ width: '100%' }} />
                            </div>
                            <div style={{ position: 'fixed', bottom: 30, right: 35, borderRadius: 50, fontSize: 12 }}>
                                <span>Yeni Etkinlik Oluştur</span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>


        </div>
    )
}

export default companyDayPage