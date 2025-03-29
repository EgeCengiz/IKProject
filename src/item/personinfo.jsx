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
                    <div class="card">
                        <div class="card-header">
                            <div class="row align-items-center">
                                <div class="col">
                                    <h4 class="card-title">Contacts Details</h4>
                                </div>
                            </div>
                        </div>
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
                                            <td><img src="assets/images/users/user-10.jpg" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />Donald Gardner<small class="badge bg-soft-pink ms-1">New</small></td>
                                            <td>xyx@gmail.com</td>
                                            <td>+123456789</td>
                                            <td>68</td>
                                            <td>Starbucks coffee</td>

                                            <td>
                                            <TbListDetails  color='blue'  onClick={() => navigate("/personDetails")} />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img src="assets/images/users/user-9.jpg" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />Matt Rosales</td>
                                            <td>xyx@gmail.com</td>
                                            <td>+123456789</td>
                                            <td>112</td>
                                            <td>Mac Donald</td>

                                            <td>
                                            <TbListDetails  color='blue'/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img src="assets/images/users/user-8.jpg" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />Michael Hill<small class="badge bg-soft-blue ms-1">New</small></td>
                                            <td>xyx@gmail.com</td>
                                            <td>+123456789</td>
                                            <td>64</td>
                                            <td>Life Good</td>

                                            <td>
                                            <TbListDetails  color='blue'/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img src="assets/images/users/user-7.jpg" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />Nancy Flanary</td>
                                            <td>xyx@gmail.com</td>
                                            <td>+123456789</td>
                                            <td>124</td>
                                            <td>Flipcart</td>

                                            <td>
                                            <TbListDetails  color='blue'/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img src="assets/images/users/user-6.jpg" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />Dorothy Key</td>
                                            <td>xyx@gmail.com</td>
                                            <td>+123456789</td>
                                            <td>33</td>
                                            <td>Adidas</td>

                                            <td>
                                            <TbListDetails  color='blue'/>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><img src="assets/images/users/user-5.jpg" alt="" class="thumb-sm rounded-circle me-2" style={{ width: 40 }} />Joseph Cross</td>
                                            <td>xyx@gmail.com</td>
                                            <td>+123456789</td>
                                            <td>84</td>
                                            <td>Reebok</td>

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