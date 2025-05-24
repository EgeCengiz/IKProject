import React from 'react'
import smartImg from '../images/PETRA.svg'
function settingPage() {
    return (
        <>
            <div className="content-page">
                <div className="content">
                    <div className="container-xxl">
                        <br></br>
                        <div className="card p-4">
                            <h5>Ayarlar</h5>
                            <hr />
                            <form>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label htmlFor="companyName" className="form-label">Şirket İsmi</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="companyName"
                                            placeholder="Şirket Adı Giriniz.."
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor="companyDescription" className="form-label">Şirket Açıklaması</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="companyDescription"
                                            placeholder="Şirket Açıklaması Giriniz.."
                                        />
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-md-6">
                                        <label className="form-label">Logo Değiştir</label>
                                        <input type="file" className="form-control" />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label">Mevcut Logo</label>
                                        <div className='d-flex justify-content-center p-3' style={{ border: "1px solid black", borderRadius: 5 }}>
                                            <img src={smartImg} alt="Mevcut Logo" className="img-fluid" />
                                        </div>

                                    </div>
                                </div>
                                <div className="mb-3">
                                    <p>Sürüm Bilgisi: 1.0.0</p>
                                    <p>Yazılım Bilgisi: Smart Software</p>
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-primary">Kaydet</button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>


        </>
    )
}

export default settingPage