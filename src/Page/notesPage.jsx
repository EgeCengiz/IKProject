import React from 'react'
import Menu from '../item/menu'
import { FaPlus } from "react-icons/fa";
import NotePageItems from '../item/notePageItems';
function notesPage() {
    return (
        <div>

            <div class="content-page">

                <div class="content">
                    <div class="container-xxl">
                        <br></br>
                        <NotePageItems />

                        <div style={{ position: 'fixed', bottom: 50, right: 55, borderRadius: 50, width: 50, height: 50 }} className='btn btn-primary d-flex justify-content-center align-items-center'
                            onClick={() => console.log("Artı butonuna tıklandı")}>
                            <FaPlus style={{ width: '100%' }} />
                        </div>
                        <div style={{ position: 'fixed', bottom: 30, right: 40, borderRadius: 50, fontSize: 12 }}>
                            <span>Yeni Not Oluştur</span>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default notesPage