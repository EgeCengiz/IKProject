import React from 'react'
import { TiPinOutline } from "react-icons/ti";
import { FaRegTrashCan } from "react-icons/fa6";
function notes() {
    return (
        <div>
    
                        <br></br>
                        <div>
                            <h5 style={{color:"#4a5a6b"}}>Notlar</h5>
                         <br></br>
                        </div>
                        <div className='row'>
                            <div class="col-sm-6 col-lg-4">
                                <div class="card d-block">
                                    <div class="card-header d-flex justify-content-between">Hazırlanan Not
                                        <TiPinOutline />
                                    </div>
                                    <div class="card-body">
                                        <blockquote class="card-blockquote mb-0">
                                            <p class="card-text text-muted">Notun Açıklama kısmı burada olacak ve bu not tarihi yaklaştığı zaman gösterilecek</p>
                                            <footer class="blockquote-footer mt-0 font-size-12 ">
                                               <div className='d-flex justify-content-between'>
                                                 <div >28.03.2025 <cite title="Source Title">Okan Karaçor</cite></div>
                                                <FaRegTrashCan style={{color:"#e27171", width:15,height:15,cursor:'pointer'}} />
                                               </div>
                                               
                                            </footer>
                                        </blockquote>
                                    </div>
                                </div>
                            </div>

                            <div class="col-sm-6 col-lg-4">
                                <div class="card d-block">
                                    <div class="card-header d-flex justify-content-between">Hazırlanan Not
                                        <TiPinOutline />

                                    </div>

                                    <div class="card-body">
                                        <blockquote class="card-blockquote mb-0">
                                            <p class="card-text text-muted">Notun Açıklama kısmı burada olacak ve bu not tarihi yaklaştığı zaman gösterilecek</p>
                                            <footer class="blockquote-footer mt-0 font-size-12">
                                            <div className='d-flex justify-content-between'>
                                                 <div >28.03.2025 <cite title="Source Title">Okan Karaçor</cite></div>
                                                <FaRegTrashCan style={{color:"#e27171", width:15,height:15,cursor:'pointer'}} />
                                               </div>
                                            </footer>
                                        </blockquote>
                                    </div>

                                </div>
                            </div>




                            <div class="col-sm-6 col-lg-4">
                                <div class="card d-block">
                                    <div class="card-header d-flex justify-content-between">Hazırlanan Not
                                        <TiPinOutline />

                                    </div>

                                    <div class="card-body">
                                        <blockquote class="card-blockquote mb-0">
                                            <p class="card-text text-muted">Notun Açıklama kısmı burada olacak ve bu not tarihi yaklaştığı zaman gösterilecek</p>
                                            <footer class="blockquote-footer mt-0 font-size-12">
                                            <div className='d-flex justify-content-between'>
                                                 <div >28.03.2025 <cite title="Source Title">Okan Karaçor</cite></div>
                                                <FaRegTrashCan style={{color:"#e27171", width:15,height:15, cursor:'pointer'}} />
                                               </div>
                                            </footer>
                                        </blockquote>
                                    </div>

                                </div>
                            </div>


                        </div>
                    


        



        </div>
    )
}

export default notes