import React from 'react'
import PersonMenu from '../items/personMenu'
import { TbReportAnalytics, TbListDetails } from "react-icons/tb";
import { FaPaperPlane } from "react-icons/fa";
function personNoticePage() {
  return (
    <div>
      <PersonMenu />
      <div class="content-page">
        <div class="content">
          <div class="container-xxl">
             <div className='row d-flex justify-content-center'>
        <div className='col-md-9'>
          <br></br>
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

export default personNoticePage