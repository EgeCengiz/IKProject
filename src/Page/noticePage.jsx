import React, { useState } from 'react';
import Menu from '../item/menu'
import { TbListDetails } from "react-icons/tb";
import Notice from '../item/notice';

function noticePage() {
      const [isModalOpen, setIsModalOpen] = useState(false);
        // Örnek personel listesi
        const personnelList = [
            { id: 'p1', name: 'Ahmet Yılmaz' },
            { id: 'p2', name: 'Mehmet Demir' },
            { id: 'p3', name: 'Ayşe Kara' },
        ];
    return (
        <div>
            
            <div className="content-page">
                <div className="content">
                    <div className="container-xxl">
                        <br></br>
                        <div className='row'>
                            <div className='col-md-4'>
                                <h6 style={{ color: "#4a5a6b" }}>Duyuru Ekle</h6>
                                <br></br>
                                <div className='card'>
                                    <div className='card-body p-3 '>
                                       
                                      
                                        <Notice personnelList={personnelList} />
                                    </div>

                                </div>
                            </div>
                            <div className='col-md-8'>
                                <h4 class="fs-18 fw-semibold m-0" style={{ color: "#4a5a6b" }}>Duyuru Tablosu</h4>
                                <br></br>
                                <div className='card'>
                                    <div className='card-body'>

                                        <div class="py-3 d-flex align-items-sm-center flex-sm-row flex-column">
                                            <div class="flex-grow-1">

                                            </div>

                                            <div class="text-end">
                                                <ol class="breadcrumb m-0 py-0">
                                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Tables</a></li>
                                                    <li class="breadcrumb-item active">Duyrular</li>
                                                </ol>
                                            </div>
                                        </div>

                                        <div class="row">

                                            <div class="col-xl-12">
                                                <div class="p-2">


                                                    <div >
                                                        <div class="table-responsive">
                                                            <table class="table mb-0">
                                                                <thead>
                                                                    <tr>
                                                                     
                                                                        <th scope="col">Duyuru Yayınlayan</th>
                                                                        <th scope="col">Yayınlanan</th>
                                                                        <th scope="col">Duyuru</th>
                                                                        <th scope="col">Tarih</th>
                                                                        <th scope="col">Aksiyon</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                      
                                                                        <td>Okan Karaçor</td>
                                                                        <td>Tüm Kullanıcılar</td>
                                                                        <td>Mesaj burada yer alacak</td>
                                                                        <td>30.03.2025</td>
                                                                        <td><TbListDetails color='blue' /></td>
                                                                    </tr>
                                                                    <tr>
                                                                      
                                                                        <td>Okan Karaçor</td>
                                                                        <td>Ahmet,Mehmet, +3</td>
                                                                        <td>mesaj burada yer alacak</td>
                                                                        <td>30.03.2025</td>
                                                                        <td><TbListDetails color='blue' /></td>
                                                                    </tr>
                                                                    <tr>
                                                                       
                                                                        <td>Okan Karaçor</td>
                                                                        <td>Tüm Kullanıcılar</td>
                                                                        <td>mesaj</td>
                                                                        <td>30.03.2025</td>
                                                                        <td> <TbListDetails color='blue' /></td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>


                                        </div>
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

export default noticePage