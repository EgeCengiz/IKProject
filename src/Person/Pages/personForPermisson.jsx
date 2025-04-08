import React from 'react';
import PersonMenu from '../items/personMenu';
import '../Pages/PermissionForm.css'
import { TbReportAnalytics, TbListDetails } from "react-icons/tb";
import { FaPaperPlane } from "react-icons/fa";

function PersonForPermission() {
  return (
    <div className="permission-page">
      <PersonMenu />
      <div class="content-page">
        <div class="content">
          <div class="container-xxl">
            <div className="row d-flex justify-content-center">
              <div className="col-md-5">
                <div className="container"> 
                <br></br>
                <h4 class="fs-18 fw-semibold m-0" style={{ color: "#4a5a6b" }}>İzin Talep Formu</h4>
                <br></br>
                  <div className="form-container">
                   
                    <form>
                      <div className="mb-3">
                        <label htmlFor="izinAciklamasi" className="form-label">
                         İzin Açıklaması
                        </label>
                        <textarea
                          className="form-control"
                          id="izinAciklamasi"
                          rows="3"
                          placeholder="İzin açıklamanızı buraya yazın..."
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="izinGerekcesi" className="form-label">
                          İzin Gerekçesi
                        </label>
                        <select className="form-select" id="izinGerekcesi">
                          <option defaultValue>Seçiniz...</option>
                          <option value="bayram">Bayram İzni</option>
                          <option value="mazeret">Mazeret İzni</option>
                          <option value="yillik">Yıllık İzin</option>
                          <option value="ucretli">Ücretli İzin</option>
                          <option value="ucretsiz">Ücretsiz İzin</option>
                          <option value="ucretsiz">Kısa Süreli İzin</option>
                        </select>
                      </div>
                      <div className="mb-3">
                        <label htmlFor="baslangicTarihi" className="form-label">
                         Başlangıç Tarihi
                        </label>
                        <input type="date" className="form-control" id="baslangicTarihi" />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="bitisTarihi" className="form-label">
                        Bitiş Tarihi
                        </label>
                        <input type="date" className="form-control" id="bitisTarihi" />
                      </div>
                      <div className="text-center">
                        <button type="submit" className="btn btn-submit text-white">
                          <FaPaperPlane /> Gönder
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-md-7">

                <br></br>
                <h4 class="fs-18 fw-semibold m-0" style={{ color: "#4a5a6b" }}>İzin Tablosu</h4>
                <br></br>
                <div className='card'>
                  <div className='card-body'>

                    <div class="py-3 d-flex align-items-sm-center flex-sm-row flex-column">
                      <div class="flex-grow-1">

                      </div>

                      <div class="text-end">
                        <ol class="breadcrumb m-0 py-0">
                          <li class="breadcrumb-item"><a href="javascript: void(0);">Tables</a></li>
                          <li class="breadcrumb-item active">İzinlerim</li>
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
                                    <th scope="col">İzin Gerekçesi</th>
                                    <th scope="col">Açıklama</th>
                                    <th scope="col">Tarih</th>
                                    <th scope="col">Sonuç</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">
                                      <img src="src/images/profile.png" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />
                                    </th>
                                    <td>Ege Cengiz Ortakcı</td>
                                    <td>Mazaret</td>
                                    <td>Orta</td>
                                    <td>30.03.2025</td>
                                    <td>ONAYLANDI</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">
                                      <img src="src/images/profile.png" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />
                                    </th>
                                    <td>Ege Cengiz Ortakcı</td>
                                    <td>Mazeret</td>
                                    <td>Yüksek</td>
                                    <td>30.03.2025</td>
                                    <td>RED</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">
                                      <img src="src/images/profile.png" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />
                                    </th>
                                    <td>Ege Cengiz Ortakcı</td>
                                    <td>Yıllık İzin</td>
                                    <td>Orta</td>
                                    <td>30.03.2025</td>
                                    <td> RED</td>
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

export default PersonForPermission;
