import React from 'react'
import { useNavigate } from "react-router-dom";
import Menu from './menu'
import { TbListDetails } from "react-icons/tb";
function personinfo() {
    const navigate = useNavigate();
    return (
        <div>



            <div class="row">
                <div class="col-12">  
                    <h5 class=" m-3"  style={{color:"#4a5a6b"}}>Personel Listesi </h5>
                    <div class="card">
                       
                        <div class="card-body">
                            <div class="table-responsive">
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th>Customer Name</th>
                                            <th>Email</th>
                                            <th>Phone No</th>
                                            <th>Lead  Score</th>
                                            <th>Company</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        <tr>
                                            <td><img src="src/images/profile.png" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />Miraç<small class="badge bg-soft-pink ms-1">New</small></td>
                                            <td>xyx@gmail.com</td>
                                            <td>+123456789</td>
                                            <td>68</td>
                                            <td>Ege Cengiz Ortakcı</td>

                                            <td>
                                            <TbListDetails  color='blue'  onClick={() => navigate("/personDetails")} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img src="src/images/profile.png" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />Mustafa</td>
                                            <td>xyx@gmail.com</td>
                                            <td>+123456789</td>
                                            <td>112</td>
                                            <td>Okan Karaçor</td>

                                            <td>
                                            <TbListDetails  color='blue'/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img src="src/images/profile.png" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />Ege Cengiz<small class="badge bg-soft-blue ms-1">New</small></td>
                                            <td>xyx@gmail.com</td>
                                            <td>+123456789</td>
                                            <td>64</td>
                                            <td>Ziya</td>

                                            <td>
                                            <TbListDetails  color='blue'/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img src="src/images/profile.png" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />Emine</td>
                                            <td>xyx@gmail.com</td>
                                            <td>+123456789</td>
                                            <td>124</td>
                                            <td>Recep</td>

                                            <td>
                                            <TbListDetails  color='blue'/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img src="src/images/profile.png" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />Safa</td>
                                            <td>xyx@gmail.com</td>
                                            <td>+123456789</td>
                                            <td>33</td>
                                            <td>Ülkü</td>

                                            <td>
                                            <TbListDetails  color='blue'/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img src="src/images/profile.png" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />Hasan</td>
                                            <td>xyx@gmail.com</td>
                                            <td>+123456789</td>
                                            <td>84</td>
                                            <td>Hasan</td>

                                            <td>
                                            <TbListDetails  color='blue'/>
                                            </td>
                                        </tr>

                                    </tbody>
                                </table>
                            </div>
                            <div class="row">
                                <div class="col">
                                    <button class="btn btn-outline-light btn-sm px-4 ">+ Add New</button>
                                </div>
                                <div class="col-auto">
                                    <nav aria-label="...">
                                        <ul class="pagination pagination-sm mb-0">
                                            <li class="page-item disabled">
                                                <a class="page-link" href="#" tabindex="-1">Previous</a>
                                            </li>
                                            <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                                            </li>
                                            <li class="page-item"><a class="page-link" href="#">3</a></li>
                                            <li class="page-item">
                                                <a class="page-link" href="#">Next</a>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default personinfo