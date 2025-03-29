import React from 'react'
import { TiPinOutline } from "react-icons/ti";
function personPermission() {
    return (
        <div>

            <br></br>
            <div>
                <h5 style={{ color: "#4a5a6b" }}>İzin Talepleri</h5>
                <br></br>
            </div>
            <div className='row'>
                <div class="col-sm-12 col-lg-12">
                    <div class="card d-block">
                        <div class="card-header d-flex justify-content-between">
                            <span color='dark' style={{fontSize:18}}>İzin Talebi</span>
                            <TiPinOutline />
                        </div>
                        <div class="card-body">
                            <blockquote class="card-blockquote mb-0 ">


                                <p class="card-text text-muted">Burda neden izin istendiğiyle ilgili bilgiler gelecek izin tarih aralığı 3 günlük izin talebi 10.03.2025-15.03.2025</p>


                                <footer class="blockquote-footer mt-0 font-size-12">
                                    <div className='d-flex justify-content-between'>
                                        <div>
                                            28.03.2025 <cite title="Source Title">Ege Cengiz Ortakcı</cite>
                                        </div>

                                        <div>
                                            <button type="button" class="btn btn-primary m-1">İzni Onayla</button>
                                            <button type="button" class="btn btn-danger m-1">Reddet</button>
                                        </div>
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

export default personPermission