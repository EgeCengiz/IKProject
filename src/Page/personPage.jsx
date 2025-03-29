import React from 'react'
import Personinfo from '../item/personinfo'
import { TiPinOutline } from "react-icons/ti";
import Menu from '../item/menu'
function personPage() {
    return (
        <div>
            <Menu></Menu>

            <div class="content-page">

                <div class="content">
                    <div class="container-xxl">
                        <br></br>
                        <div className='row'>
                       
                        <div class=" col-md-4 col-xl-4" >
                                <a href="#">
                                    <div class="card border rounded-3 px-2 py-3 text-center">
                                        <p class="mb-2 text-dark">Personel Sayısı</p>
                                        <h3 class="m-0 mb-2 fs-24 text-black">52</h3>
                                        <p class="text-muted mb-0 fs-13">

                                        </p>
                                    </div>
                                </a>
                            </div>

                      
                            <div class="col-md-4 col-xl-4" >
                                <a href="#">
                                    <div class=" card border rounded-3 px-2 py-3 text-center">
                                        <p class="mb-2 text-dark">Stajer Sayısı</p>
                                        <h3 class="m-0 mb-2 fs-24 text-black">3</h3>
                                        <p class="text-muted mb-0 fs-13">

                                        </p>
                                    </div>
                                </a>
                            </div>




                            <div class="col-md-4 col-xl-4" >
                                <a href="#">
                                    <div class="card border rounded-3 px-2 py-3 text-center">
                                        <p class="mb-2 text-dark">İzinli Sayısı</p>
                                        <h3 class="m-0 mb-2 fs-24 text-black">2</h3>
                                        <p class="text-muted mb-0 fs-13">

                                        </p>
                                    </div>
                                </a>
                            </div>



                        </div>
                        <br></br>
                        <Personinfo />

                    </div>
                </div></div>




        </div>
    )
}

export default personPage