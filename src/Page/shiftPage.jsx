import React from 'react'
import Menu from '../item/menu'
import { FaSearch } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
function shiftPage() {
    return (
        <div>

          
            <div class="content-page">

                <div class="content">
                    <div class="container-xxl">
                        <br></br>
     <h5 style={{ color: "#4a5a6b" }}>Mesai Tablosu</h5>
            <br></br>
            <div className='row'>

                <div class="col-12">
                    <div class="card">

                        <div class="card-header">

                            <br></br>
                            <form class="d-flex search-form align-item-center" action="/search" method="GET">
                                <input class="form-control" type="text" name="name" placeholder="İsme göre ara..." aria-label="İsim" />
                                <FaSearch style={{ margin: 5, width: 30 }} />
                            </form>
                        </div>

                        <div class="card-body">
                            <table id="datatable" class="table table-bordered dt-responsive table-responsive nowrap">
                                <thead>
                                    <tr>
                                        <th>Ad Soyad</th>
                                        <th>Position</th>                          
                                        <th>Yıllık İzin Hakediş</th>
                                        <th>İzin Kullanılan Gün Sayısı</th>
                                        <th>Aksiyon</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Ubeyde Rizaoglu</td>
                                        <td>Project Manager</td>
                                        <td>10</td>
                                        <td>3</td>
                                     
                                        <td>  <TbListDetails  color='blue'/></td>
                                    </tr>
                                    <tr>
                                        <td>Ziya</td>
                                        <td>Backend</td>
                                        <td>8</td>
                                        <td>3</td>
                                        <td>  <TbListDetails  color='blue'/></td>
                                    </tr>
                                    <tr>
                                        <td>Ege Cengiz Ortakcı</td>
                                        <td>Stajer</td>
                                        <td>5</td>
                                        <td>1</td>
                                        <td>  <TbListDetails  color='blue'/></td>
                                    </tr>
                                    <tr>
                                        <td>Okan Karaçor</td>
                                        <td>IK Menager</td>
                                        <td>15</td>
                                        <td>2</td>           
                                        <td>  <TbListDetails  color='blue'/></td>
                                    </tr>
                                    <tr>
                                        <td>Ülkü</td>
                                        <td>Project Manager</td>
                                        <td>10</td>
                                        <td>3</td>                           
                                        <td>  <TbListDetails  color='blue'/></td>
                                    </tr>
                                    <tr>
                                        <td>Recep</td>
                                        <td>Project Manager</td>
                                        <td>15</td>
                                        <td>3</td>                                 
                                        <td><TbListDetails  color='blue'/></td>
                                    </tr>
                                    <tr>
                                        <td>Sefa</td>
                                        <td>Project Manager</td>
                                        <td>12</td>
                                        <td>3</td>       
                                        <td>  <TbListDetails  color='blue'/></td>
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
    )
}

export default shiftPage