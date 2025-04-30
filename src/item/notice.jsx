import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { TbListDetails } from "react-icons/tb";
import { motion } from 'framer-motion';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { AiOutlineNotification } from "react-icons/ai";
import { HiOutlineArrowSmDown } from "react-icons/hi";
import { CgCloseO } from "react-icons/cg";
import { FaRegFilePdf } from "react-icons/fa";

const NoticePageContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const NoticeTitle = styled.h4`
  color: #1e40af;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 900px;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 20px;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 15px;
  flex: 1;
`;

const AddNoticeCard = styled(Card)``;

const NoticeFormGroup = styled.div`
  margin-bottom: 12px;
`;

const NoticeLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #2c5282;
  font-size: 0.85rem;
  font-weight: 500;
`;

const NoticeInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #a0aec0;
  font-size: 0.9rem;
  color: #2d3748;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }
`;

const NoticeSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #a0aec0;
  font-size: 0.9rem;
  color: #2d3748;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg fill="%232d3748" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }
`;

const NoticeTextarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #a0aec0;
  font-size: 0.9rem;
  color: #2d3748;
  height: 180px;
  resize: vertical;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }
`;

const NoticeButtonGroup = styled.div`
  text-align: right;
`;

const PublishButton = styled.button`
  padding: 8px 16px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2b6cb0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.3);
  }
`;

const NoticeTableCard = styled(Card)``;

const NoticeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const TableHead = styled.thead`
  background-color: #edf2f7;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 500;
  color: #2c5282;
`;

const TableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #e2e8f0;
  }
  tr:last-child {
    border-bottom: none;
  }
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f7fafc;
  }
`;

const TableData = styled.td`
  padding: 10px;
  font-size: 0.85rem;
  color: #2d3748;
`;

const DetailIcon = styled(TbListDetails)`
  color: #4299e1;
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.2s ease;

  &:hover {
    color: #2b6cb0;
  }
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

const ModalContentUptade = styled(motion.div)`
  background: #ffffff;
  border-radius: 12px;
  padding: 30px;
  width: 50%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 10px;
`;

const ModalTitle = styled.h5`
  margin: 0;
  font-size: 1.1rem;
  color: #2d3748;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  svg { color: #a0aec0; transition: color 0.2s; }
  &:hover svg { color: #e53e3e; }
`;

const ModalBody = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ModalBodyWrapper = styled.div`
  display: flex;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const SectionCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(142, 218, 222, 0.4);
  flex: 1;
`;

const ArrowIcon = styled(HiOutlineArrowSmDown)`
  font-size: 32px;
  color: #a0aec0;
  align-self: center;
  @media (max-width: 768px) {
    transform: rotate(90deg);
  }
`;

const Image = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  p { margin: 0; color: #4a5568; }
  strong { color: #2d3748; }
`;

const DownloadLink = styled.a`
  margin-left: 10px;
  padding: 6px 12px;
  background-color: #edf2f7;
  color: #3182ce;
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.85rem;
  display: inline-flex;
  align-items: center;
  svg { margin-right: 6px; }
  &:hover { background-color: #e2e8f0; }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const EditButton = styled.button`
  padding: 10px 18px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  &:hover { background-color: #2b6cb0; }
  &:focus { box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.3); }
`;

const DeliveredButton = styled.button`
  padding: 10px 18px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  &:hover { background-color: #c53030; }
  &:focus { box-shadow: 0 0 0 2px rgba(229, 62, 62, 0.3); }
`;

function Notice() {
  const [selectedPersonel, setSelectedPersonel] = useState('');
  const [selectedNotice, setSelectedNotice] = useState({
    noteId: "",
    noticeName: "",
    noticeDescription: "",
    noticeDate: "",
    targetPerson: "",
    person: "",
    fileUrl: "___",
  });
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [notices, setNotices] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [uploadNotice, setUploadNotice] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);
  const quillRef = useRef(null);
  const quillRef2 = useRef(null);
  const personnelList = [
    { id: 'p1', name: 'Yetkili Kullanıcılar' },
    { id: 'p2', name: 'Tüm Personel' },
    { id: 'p3', name: 'IK Personel' },
    { id: 'p4', name: 'CEO' },
  ];

  // Quill Editor for Main Form
  useEffect(() => {
    if (window.Quill && !quillRef.current) {
      quillRef.current = new window.Quill('#quill-editor', {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ header: [3, 4, 5, false] }],
            ['bold', 'italic', 'underline'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['clean'],
          ],
        },
      });
      quillRef.current.on('text-change', () => {
        setDescription(quillRef.current.root.innerHTML);
      });
    }
  }, []);

  // Quill Editor for Update Modal
  useEffect(() => {
    if (uploadNotice && window.Quill && !quillRef2.current) {
      const editorElement = document.querySelector('#quill-editor2');
      if (editorElement) {
        quillRef2.current = new window.Quill(editorElement, {
          theme: 'snow',
          modules: {
            toolbar: [
              [{ header: [3, 4, 5, false] }],
              ['bold', 'italic', 'underline'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              ['clean'],
            ],
          },
        });
        quillRef2.current.root.innerHTML = selectedNotice.noticeDescription;
        quillRef2.current.on('text-change', () => {
          setSelectedNotice(prev => ({
            ...prev,
            noticeDescription: quillRef2.current.root.innerHTML
          }));
        });
      }
      return () => {
        if (quillRef2.current) {
          quillRef2.current = null;
        }
      };
    }
  }, [uploadNotice]);

  // Fetch Notices
  const getNotices = async () => {
    try {
      const response = await axios.get(UsersApi.ENDPOINTS.GET_NOTICES_ALL, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });
      setNotices(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
    }
  };

  useEffect(() => { getNotices(); }, []);

  // File Upload Function
  const postFileNotice = async (noticeId) => {
    if (!uploadFile) return;

    const formData = new FormData();
    formData.append("file", uploadFile);
    formData.append("noticeId", noticeId);

    try {
      const response = await axios.put(UsersApi.ENDPOINTS.POST_NOTICE_FILE_UPLOAD, formData, {
        headers: {
          Authorization: 'Bearer ' + UsersApi.TOKEN,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("File uploaded successfully:", response.data);
    } catch (err) {
      console.error("Upload failed:", err);
    }
  };

  // File Download Function
  const handleDownload = async (noticeId, filename) => {
    try {
      const response = await axios.get(
        UsersApi.ENDPOINTS.GET_NOTICE_FILE + `/${noticeId}`,
        {
          headers: { Authorization: 'Bearer ' + UsersApi.TOKEN },
          responseType: 'blob'
        }
      );
      const blob = new Blob([response.data], { type: response.data.type });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  // Delete Notice Function
  const handleDelete = async (noteId) => {
    await axios.delete(UsersApi.ENDPOINTS.DELETE_NOTICE + `/${noteId}`, {
      headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
    });
    setShowModal(false);
    getNotices();
  };

  // Publish Notice Function
  const handlePublishClick = async () => {
    const currentDate = new Date().toISOString().split('T')[0];
    const newNotice = {
      noticeName: itemName,
      noticeDescription: description,
      noticeDate: currentDate,
      noticeAdmin: UsersApi.username,
      noticeWho: selectedPersonel
    };

    try {
      const response = await axios.post(UsersApi.ENDPOINTS.POST_NOTICES_ADD, newNotice, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });
      const noteId = response.data.id;
      await postFileNotice(noteId);
      getNotices();
      setItemName('');
      setDescription('');
      setSelectedPersonel('');
      setUploadFile(null);
      alert('Duyuru başarıyla yayınlandı!');
    } catch (error) {
      console.error('Error posting notice:', error);
      alert('Duyuru yayınlanırken bir hata oluştu.');
    }
  };

  // File Selection and Validation
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain',
        'text/csv'
      ];
      if (!allowedTypes.includes(file.type)) {
        alert('Sadece DOCX, PDF, XLS, CSV, TXT formatları kabul edilir.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Dosya boyutu 5MB\'tan büyük olamaz.');
        return;
      }
      setUploadFile(file);
    }
  };

  // Update Notice Function
  const handleUpdateClick = async () => {
    try {
      const updatedNotice = {
        noticeName: selectedNotice.noticeName,
        noticeDescription: selectedNotice.noticeDescription,
        noticeWho: selectedNotice.targetPerson,
      };
      await axios.put(UsersApi.ENDPOINTS.PUT_NOTICE + `/${selectedNotice.noteId}`, updatedNotice, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });
      alert('Duyuru başarıyla güncellendi!');
      setUploadNotice(false);
      await postFileNotice(selectedNotice.noteId);
      getNotices();
    } catch (error) {
      console.error('Error updating notice:', error);
      alert('Duyuru güncellenirken bir hata oluştu.');
    }
  };

  return (
    <NoticePageContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
      <h5 className="card-title mt-2" style={{ color: "#4a5a6b" }}><AiOutlineNotification /> Duyurular</h5>
      <br />
      <div className="row">
        <div className="col-md-4">
          <AddNoticeCard variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } }} initial="initial" animate="animate" exit="exit">
            <NoticeFormGroup>
              <NoticeLabel htmlFor="itemName">Duyuru Başlığı</NoticeLabel>
              <NoticeInput type="text" id="itemName" placeholder="Duyuru başlığı" value={itemName} onChange={e => setItemName(e.target.value)} />
            </NoticeFormGroup>
            <NoticeFormGroup>
              <NoticeLabel htmlFor="personnel">Alıcılar</NoticeLabel>
              <NoticeSelect id="personnel" value={selectedPersonel} onChange={e => setSelectedPersonel(e.target.value)}>
                <option value="">Seçiniz</option>
                {personnelList.map(person => <option key={person.id} value={person.name}>{person.name}</option>)}
              </NoticeSelect>
            </NoticeFormGroup>
            <NoticeFormGroup>
              <NoticeLabel htmlFor="quill-editor">Açıklama</NoticeLabel>
              <div id="quill-editor" style={{ height: 200 }} />
            </NoticeFormGroup>
            <NoticeFormGroup>
              <NoticeLabel htmlFor="file">Ek</NoticeLabel>
              <NoticeInput type="file" id="file" onChange={handleFileChange} />
            </NoticeFormGroup>
            <NoticeButtonGroup>
              <PublishButton onClick={handlePublishClick}>Yayınla</PublishButton>
            </NoticeButtonGroup>
          </AddNoticeCard>
        </div>
        <div className="col-md-8">
          <NoticeTableCard style={{ padding: '0' }} variants={{ initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } }} initial="initial" animate="animate" exit="exit">
            <NoticeTable>
              <TableHead><tr><TableHeader>Yayınlayan</TableHeader><TableHeader>Alıcılar</TableHeader><TableHeader>Başlık</TableHeader><TableHeader>Tarih</TableHeader><TableHeader>Detay</TableHeader></tr></TableHead>
              <TableBody>
                {notices.map(notice => (
                  <TableRow key={notice.id}>
                    <TableData>{notice.noticeAdmin}</TableData>
                    <TableData>{notice.noticeWho}</TableData>
                    <TableData>{notice.noticeName}</TableData>
                    <TableData>{new Date(notice.noticeDate).toLocaleDateString('tr-TR')}</TableData>
                    <TableData><DetailIcon onClick={() => {
                      setSelectedNotice({
                        noteId: notice.id,
                        noticeName: notice.noticeName,
                        noticeDescription: notice.noticeDescription,
                        noticeDate: new Date(notice.noticeDate).toLocaleDateString('tr-TR'),
                        targetPerson: notice.noticeWho,
                        person: notice.noticeAdmin,
                        fileUrl: notice.file,
                      });
                      setShowModal(true);
                    }} /></TableData>
                  </TableRow>
                ))}
              </TableBody>
            </NoticeTable>
          </NoticeTableCard>
        </div>
      </div>

      {showModal && (
        <ModalOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}>
          <ModalContent initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Duyuru Takip</ModalTitle>
              <CloseButton onClick={() => setShowModal(false)}><CgCloseO size={24} /></CloseButton>
            </ModalHeader>
            <ModalBody>
              <ModalBodyWrapper>
                <SectionCard>
                  <Info>
                    <div className='d-flex justify-content-end'>
                      <p><strong>Tarih:</strong> {selectedNotice.noticeDate}</p>
                    </div>
                    <p className='d-flex justify-content-center p-3' style={{ fontSize: 24, fontWeight: 500 }}>{selectedNotice.noticeName}</p>
                    <div className="ql-editor p-3 m-3" dangerouslySetInnerHTML={{ __html: selectedNotice.noticeDescription }} />
                    <div className='d-flex justify-content-between'>
                      <p><strong>Alıcı:</strong> {selectedNotice.targetPerson}</p>
                      <p className="text-right"><strong>Yayınlayan:</strong> {selectedNotice.person}</p>
                    </div>
                    {selectedNotice.fileUrl && typeof selectedNotice.fileUrl === 'string' && selectedNotice.fileUrl.includes("___") ? (
                      <div style={{ marginTop: '10px' }}>
                        <FaRegFilePdf /><DownloadLink
                          href="#"
                          onClick={(e) => {
                            e.preventDefault();
                            handleDownload(selectedNotice.noteId, selectedNotice.fileUrl);
                          }}
                        >
                          {selectedNotice.fileUrl.split("___")[1]}
                        </DownloadLink>
                      </div>
                    ) : (
                      <span></span>
                    )}
                  </Info>
                </SectionCard>
              </ModalBodyWrapper>
              <ButtonGroup>
                <EditButton onClick={() => {
                  setShowModal(false);
                  setUploadNotice(true);
                }}>Düzenle</EditButton>
                <DeliveredButton onClick={() => handleDelete(selectedNotice.noteId)}>Kaldır</DeliveredButton>
              </ButtonGroup>
            </ModalBody>
          </ModalContent>
        </ModalOverlay>
      )}

      {uploadNotice && (
        <ModalOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setUploadNotice(false)}>
          <ModalContentUptade initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={e => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>Duyuru Güncelle</ModalTitle>
              <CloseButton onClick={() => setUploadNotice(false)}><CgCloseO size={24} /></CloseButton>
            </ModalHeader>
            <div className='m-5'>
              <NoticeFormGroup>
                <NoticeLabel htmlFor="updateItemName">Duyuru Başlığı</NoticeLabel>
                <NoticeInput
                  type="text"
                  id="updateItemName"
                  placeholder="Duyuru başlığı"
                  value={selectedNotice.noticeName}
                  onChange={e => setSelectedNotice(prev => ({ ...prev, noticeName: e.target.value }))}
                />
              </NoticeFormGroup>
              <NoticeFormGroup>
                <NoticeLabel htmlFor="updatePersonnel">Alıcılar</NoticeLabel>
                <NoticeSelect
                  id="updatePersonnel"
                  value={selectedNotice.targetPerson}
                  onChange={e => setSelectedNotice(prev => ({ ...prev, targetPerson: e.target.value }))}
                >
                  <option value="">Seçiniz</option>
                  {personnelList.map(person => <option key={person.id} value={person.name}>{person.name}</option>)}
                </NoticeSelect>
              </NoticeFormGroup>
              <NoticeFormGroup>
                <NoticeLabel htmlFor="quill-editor2">Açıklama</NoticeLabel>
                <div id="quill-editor2" style={{ height: 200 }} />
              </NoticeFormGroup>
              <NoticeFormGroup>
                <NoticeLabel htmlFor="updateFile">Ek <small>(Güncelleme işleminde eski dosya otomatik silinir yeni dosya ekleyin)</small></NoticeLabel>
               
                <NoticeInput type="file" id="updateFile" onChange={handleFileChange} />
              </NoticeFormGroup>
              <ButtonGroup>
                <EditButton onClick={handleUpdateClick}>Kaydet</EditButton>
              </ButtonGroup>
            </div>
          </ModalContentUptade>
        </ModalOverlay>
      )}
    </NoticePageContainer>
  );
}

export default Notice;