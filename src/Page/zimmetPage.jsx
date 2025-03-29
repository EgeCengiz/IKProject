import React, { useState } from 'react';
import Zimmet from '../item/zimmet';
import Menu from '../item/menu';

function ZimmetPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Örnek personel listesi
    const personnelList = [
        { id: 'p1', name: 'Ahmet Yılmaz' },
        { id: 'p2', name: 'Mehmet Demir' },
        { id: 'p3', name: 'Ayşe Kara' },
    ];

    return (
        <div className="zimmet-page">
            <Menu />
            <div className="content-page">
                <div className="content">
                    <div className="container-xxl">
                        <br></br>
                        <div className='row'>
                            <div className='col-md-4'>
                                <div className='card'>
                                    <div className='card-body p-3 '>
                                        <div className='d-flex justify-content-center'>
                                            <h6 >Zimmet Takip</h6>

                                        </div>
                                        <hr></hr>
                                        <Zimmet personnelList={personnelList} />
                                    </div>

                                </div>
                            </div>
                            <div className='col-md-8'>

                                <div className='card'>
                                    <div className='card-body'>

                                        <div class="py-3 d-flex align-items-sm-center flex-sm-row flex-column">
                                            <div class="flex-grow-1">
                                                <h4 class="fs-18 fw-semibold m-0">Zimmet Tablosu</h4>
                                            </div>

                                            <div class="text-end">
                                                <ol class="breadcrumb m-0 py-0">
                                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Tables</a></li>
                                                    <li class="breadcrumb-item active">Zimmet</li>
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
                                                                        <th scope="col">#</th>
                                                                        <th scope="col">Personel Ad</th>
                                                                        <th scope="col">Zimmet Edilen Eşya</th>
                                                                        <th scope="col">Derece</th>
                                                                        <th scope="col">Tarih</th>
                                                                        <th scope="col">Aksiyon</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">1</th>
                                                                        <td>Warren Jackson</td>
                                                                        <td>Jackson</td>
                                                                        <td>336-508-2157</td>
                                                                        <td>Jackson</td>
                                                                        <td>336-508-2157</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">2</th>
                                                                        <td>Amy</td>
                                                                        <td>Cunha</td>
                                                                        <td>646-473-2057</td>
                                                                        <td>Jackson</td>
                                                                        <td>336-508-2157</td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">3</th>
                                                                        <td>Steven</td>
                                                                        <td>Loch</td>
                                                                        <td>281-308-0793</td>
                                                                        <td>Jackson</td>
                                                                        <td>336-508-2157</td>
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
    );
}

export default ZimmetPage;