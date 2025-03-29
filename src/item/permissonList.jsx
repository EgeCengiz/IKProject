import React from 'react'

import { FaSearch } from "react-icons/fa";
function permissonList() {
    return (
        <div>
      <h5 style={{ color: "#4a5a6b" }}>İzin Tablosu</h5>
      <br></br>
            <div className='row'>

                <div class="col-12">
                    <div class="card">

                        <div class="card-header">
                   
                            <br></br>
                            <form class="d-flex search-form align-item-center" action="/search" method="GET">
                                <input class="form-control" type="text" name="name" placeholder="İsme göre ara..." aria-label="İsim" />
                                <FaSearch style={{margin:5, width:30}}/>
                            </form>
                        </div>

                        <div class="card-body">
                            <table id="datatable" class="table table-bordered dt-responsive table-responsive nowrap">
                                <thead>
                                    <tr>
                                        <th>Ad Soyad</th>
                                        <th>Position</th>
                                        <th>İzin Açıklaması</th>
                                        <th>Gün</th>
                                        <th>Tarih aralığı</th>
                                        <th>Onay Durumu</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ubeyde Rizaoglu</td>
                                        <td>Project Manager</td>
                                        <td>Bayram Tatili izni</td>
                                        <td>3</td>
                                        <td>2025-03-29 | 2025-03-31</td>
                                        <td>ONAYLANDI</td>
                                    </tr>
                                    <tr>
                                        <td>Ziya</td>
                                        <td>Backend</td>
                                        <td>Bayram Tatili izni</td>
                                        <td>3</td>
                                        <td>2025-03-29 | 2025-03-31</td>
                                        <td>ONAYLANDI</td>
                                    </tr>
                                    <tr>
                                        <td>Ege Cengiz Ortakcı</td>
                                        <td>Stajer</td>
                                        <td>Hastalık</td>
                                        <td>1</td>
                                        <td>2025-03-29</td>
                                        <td>ONAYLANDI</td>
                                    </tr>
                                    <tr>
                                        <td>Okan Karaçor</td>
                                        <td>IK Menager</td>
                                        <td>Bayram Tatili izni</td>
                                        <td>2</td>
                                        <td>2025-03-29 | 2025-03-31</td>
                                        <td>ONAYLANDI</td>
                                    </tr>
                                    <tr>
                                        <td>Ülkü</td>
                                        <td>Project Manager</td>
                                        <td>Bayram Tatili izni</td>
                                        <td>3</td>
                                        <td>2025-03-29 | 2025-03-31</td>
                                        <td>RED</td>
                                    </tr>
                                    <tr>
                                        <td>Recep</td>
                                        <td>Project Manager</td>
                                        <td>Bayram Tatili izni</td>
                                        <td>3</td>
                                        <td>2025-03-29 | 2025-03-31</td>
                                        <td>ONAYLANDI</td>
                                    </tr>
                                    <tr>
                                        <td>Sefa</td>
                                        <td>Project Manager</td>
                                        <td>Bayram Tatili izni</td>
                                        <td>3</td>
                                        <td>2025-03-29 | 2025-03-31</td>
                                        <td>RED</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>






        </div>
    )
}

export default permissonList