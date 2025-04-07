import React from 'react'
import Menu from '../item/menu'
import { TbListDetails } from "react-icons/tb";
function personRegisterPage() {
    return (
        <div>
          
            <div className="content-page">
                <div className="content">
                    <div className="container-xxl">
                        <br></br>

                        <div class="row">
                            <div class="col-md-4 ">
                                <div className='card p-5'>

                                    <div class="mb-0 border-0 p-md-5 p-lg-0 p-4">
                                        <div class="mb-4 p-0">
                                            <a href="index.html" class="auth-logo d-flex justify-content-center">
                                                <img src="../src/images/smart_logo.png" alt="logo-dark" class="mx-auto" height="50" />
                                            </a>
                                        </div>

                                        <div class="pt-0">
                                            <form action="index.html" class="my-4">
                                                <div class="form-group mb-3">
                                                    <label for="username" class="form-label">Username</label>
                                                    <input class="form-control" name="username" type="text" id="username" required="" placeholder="Enter your Username" />
                                                </div>

                                                <div class="form-group mb-3">
                                                    <label for="emailaddress" class="form-label">Email address</label>
                                                    <input class="form-control" type="email" id="emailaddress" required="" placeholder="Enter your email" />
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="position" class="form-label">Position</label>
                                                    <input class="form-control" name="position" type="text" id="position" required="" placeholder="Enter your Position" />
                                                </div>
                                                <div class="form-group mb-3">
                                                    <label for="password" class="form-label">Password</label>
                                                    <input class="form-control" type="password" required="" id="password" placeholder="Enter your password" />
                                                </div>

                                                <div class="form-group mb-0 row">
                                                    <div class="col-12">
                                                        <div class="d-grid">
                                                            <button class="btn btn-primary" type="submit"> Personel Ekle</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>


                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className='col-md-8'>
                                <h4 class="fs-18 fw-semibold m-0"  style={{color:"#4a5a6b"}}>Personel Tablosu</h4>
                                <br></br>
                                <div className='card '>
                                    <div className='card-body'>

                                        <div class="py-3 d-flex align-items-sm-center flex-sm-row flex-column">
                                           
                                            <div class="text-end">
                                                <ol class="breadcrumb m-0 py-0">
                                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Tables</a></li>
                                                    <li class="breadcrumb-item active">Personel</li>
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
                                                                        <th scope="col">Pozisyon</th>
                                                                   
                                                                        <th scope="col">Tarih</th>
                                                                        <th scope="col">Aksiyon</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            <img src="src/images/profile.png" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />
                                                                        </th>
                                                                        <td>Ubeyde</td>
                                                                        <td>17 Numaralı Bilgisayar</td>
                                                                        
                                                                        <td>30.03.2025</td>
                                                                        <td><TbListDetails color='blue' /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            <img src="src/images/profile.png" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />
                                                                        </th>
                                                                        <td>Rıza</td>
                                                                        <td>Sunucu</td>
                                                                       
                                                                        <td>30.03.2025</td>
                                                                        <td><TbListDetails color='blue' /></td>
                                                                    </tr>
                                                                    <tr>
                                                                        <th scope="row">
                                                                            <img src="src/images/profile.png" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />
                                                                        </th>
                                                                        <td>Ziya</td>
                                                                        <td>14 Numaralı Bilgisayar</td>
                                                                        
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







        </div >
    )
}

export default personRegisterPage