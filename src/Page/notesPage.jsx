import React, { useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa";
import NotePageItems from '../item/notePageItems';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';



//Note Ekleme Ekranı
function NotesPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [importance, setImportance] = useState('Normal');
    const [notesDatas, setNotesDatas] = useState({ notesName: '', dateTarget: '', description: '' });


    const [data, setData] = useState([]);

    const getAllNotes = async () => {
      try {
        const response = await axios.get(UsersApi.ENDPOINTS.GET_NOTES, {
          headers: {
            Authorization: 'Bearer ' + UsersApi.TOKEN
          }
        });



        







        setData(response.data);
      } catch (error) {
        console.error("Hata:", error.response ? error.response.data : error.message);
      }
    };
  
    useEffect(() => {
      getAllNotes();
    }, []);
  


    const AddNotes = async () => {

        const newEventCalender = {
            title: " Not : "+notesDatas.notesName,
            startDate:  notesDatas.dateTarget,
            endDate:  notesDatas.dateTarget,
            color: "#3e14d7",
          };

        const newEvent = {
            notesName: notesDatas.notesName,
            createDate: new Date().toISOString().slice(0, 10), // Yıl-ay-gün formatı
            dateTarget: notesDatas.dateTarget,
            username: UsersApi.username,
            description: notesDatas.description

        };
        console.log(newEvent);
        try {
            const response = await axios.post(
                UsersApi.ENDPOINTS.POST_NOTES,
                newEvent,
                {
                    headers: {
                        Authorization: 'Bearer ' + UsersApi.TOKEN
                    }
                }
            );
            await getAllNotes();
            console.log("Not başarıyla kaydedildi:", response.data);
          
                //İzin Onaylanmışsa Calender Tablosunada Eklensin
                const responseCalender = await axios.post(
                  `${UsersApi.ENDPOINTS.POST_CALENDER_DATA}`,
                  newEventCalender,
                  {
                    headers: {
                      Authorization: 'Bearer ' + UsersApi.TOKEN,
                    },
                  }
                );
              
            closeModal();
        } catch (error) {
            console.error("Hata:", error.response ? error.response.data : error.message);
        }
    };

    const openModal = () => {
        setIsOpen(true);
        setTimeout(() => setIsVisible(true), 10);
    };

    const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => setIsOpen(false), 500);
    };

    return (
        <div>
            <div className="content-page">
                <div className="content">
                    <div className="container-xxl">
                        <br />
                        <NotePageItems notes={data}/>
                        <div
                            style={{ position: 'fixed', bottom: 50, right: 55, borderRadius: 50, width: 50, height: 50 }}
                            className="btn btn-primary d-flex justify-content-center align-items-center"
                            onClick={openModal}
                        >
                            <FaPlus style={{ width: '100%' }} />
                        </div>
                        <div style={{ position: 'fixed', bottom: 30, right: 40, borderRadius: 50, fontSize: 12 }}>
                            <span>Yeni Not Oluştur</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isOpen && (
                <div className={`modal fade ${isVisible ? 'show' : ''}`} style={{ display: 'block' }}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <form onSubmit={(e) => { e.preventDefault(); AddNotes(); }}>
                                <div className="modal-header">
                                    <h5 className="modal-title">Yeni Not Oluştur</h5>
                                    <button type="button" className="btn-close" onClick={closeModal}></button>
                                </div>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Başlık</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={notesDatas.notesName}
                                            onChange={(e) => setNotesDatas({ ...notesDatas, notesName: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Açıklama</label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={notesDatas.description}
                                            onChange={(e) => setNotesDatas({ ...notesDatas, description: e.target.value })}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Hedef Tarih</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            value={notesDatas.dateTarget}
                                            onChange={(e) => setNotesDatas({ ...notesDatas, dateTarget: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Önem Derecesi</label>
                                        <select
                                            className="form-control"
                                            value={importance}
                                            onChange={(e) => setImportance(e.target.value)}
                                        >
                                            <option value="Düşük">Düşük</option>
                                            <option value="Normal">Normal</option>
                                            <option value="Yüksek">Yüksek</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Kaydet</button>
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>İptal</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default NotesPage;
