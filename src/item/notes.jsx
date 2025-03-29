import React from 'react'
import { TiPinOutline } from "react-icons/ti";
import { FaRegTrashCan } from "react-icons/fa6";
function notes() {
    return (
        <div>
              <div className='card' >
                <div className='card-body'>
                     <br></br>
                        <div>
                            <h5 style={{color:"#4a5a6b"}}>Notlar</h5>
                         <br></br>
                        </div>
                        <div className='row'>
                            <div class="col-sm-6 col-lg-6">
                                <div className="mb-3" style={{padding:10,borderRadius:10, border: '3px solid #EFF1F4'}} >
                                    <div class=" d-flex justify-content-between">Hazırlanan Not
                                        <TiPinOutline />
                                    </div>
                                    <div class="">
                                        <blockquote class="card-blockquote ">
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

                            <div className="mb-3" class="col-sm-6 col-lg-6">
                            <div style={{padding:10,borderRadius:10, border: '3px solid #EFF1F4'}} >
                                    <div class=" d-flex justify-content-between">Hazırlanan Not
                                        <TiPinOutline />

                                    </div>

                                    <div >
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




                            <div className="mb-3" class="col-sm-6 col-lg-6">
                            <div style={{padding:10,borderRadius:10, border: '3px solid #EFF1F4'}} >
                                    <div class=" d-flex justify-content-between">Hazırlanan Not
                                        <TiPinOutline />

                                    </div>

                                    <div >
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

                            <div className="mb-3" class="col-sm-6 col-lg-6">
                            <div style={{padding:10,borderRadius:10, border: '3px solid #EFF1F4'}} >
                                    <div class=" d-flex justify-content-between">Hazırlanan Not
                                        <TiPinOutline />

                                    </div>

                                    <div >
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
              </div>
                       


        



        </div>
    )
}

export default notes