
import PersonMenu from '../items/personMenu'
import React, { useState } from 'react';
import CommonShare from '../../item/commonShare';
import { TbListDetails } from "react-icons/tb";
function personCommonSharePage() {

    const [isModalOpen, setIsModalOpen] = useState(false);
      // Örnek personel listesi
      const personnelList = [
          { id: 'p1', name: 'Ahmet Yılmaz' },
          { id: 'p2', name: 'Mehmet Demir' },
          { id: 'p3', name: 'Ayşe Kara' },
      ];
  return (
    <div>
          <PersonMenu />
    <div class="content-page">
      <div class="content">
        <div class="container-xxl">
        <br></br>
                      <div className='row'>
                          <div className='col-md-4'>
                            <h6 style={{ color: "#4a5a6b" }}>Dosya Paylaş</h6>
                            <br></br>
                              <div className='card'>
                                  <div className='card-body p-3 '>
                                  
                                      <CommonShare personnelList={personnelList} />
                                  </div>

                              </div>
                          </div>
                          <div className='col-md-8'>
<h4 class="fs-18 fw-semibold m-0" style={{ color: "#4a5a6b" }}>Paylaşılan Dosyalar</h4>
<br></br>
                              <div className='card'>
                                  <div className='card-body'>

                                      <div class="py-3 d-flex align-items-sm-center flex-sm-row flex-column">
                                          <div class="flex-grow-1">
                                              
                                          </div>

                                          <div class="text-end">
                                              <ol class="breadcrumb m-0 py-0">
                                                  <li class="breadcrumb-item"><a href="javascript: void(0);">Tables</a></li>
                                                  <li class="breadcrumb-item active">Dosya</li>
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
                                                            
                                                                      <th scope="col">Dosya Adı</th>
                                                                      <th scope="col">Dosya Boyutu</th>
                                                                      <th scope="col">Açıklama</th>
                                                                      <th scope="col">Paylaşılma Tarih</th>
                                                                      <th scope="col">Aksiyon</th>
                                                                  </tr>
                                                              </thead>
                                                              <tbody>
                                                                  <tr>
                                                                   
                                                                      <td>Warren Jackson</td>
                                                                      <td>17KB</td>
                                                                      <td>Orta</td>
                                                                      <td>30.03.2025</td>
                                                                      <td><TbListDetails  color='blue'  /></td>
                                                                  </tr>
                                                                  <tr>
                                                                    
                                                                      <td>Amy</td>
                                                                      <td>50KB</td>
                                                                      <td>Yüksek</td>
                                                                      <td>30.03.2025</td>
                                                                      <td><TbListDetails  color='blue'  /></td>
                                                                  </tr>
                                                                  <tr>
                                                                     
                                                                      <td>Steven</td>
                                                                      <td>1GB</td>
                                                                      <td>Orta</td>
                                                                      <td>30.03.2025</td>
                                                                      <td> <TbListDetails  color='blue'  /></td>
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

export default personCommonSharePage