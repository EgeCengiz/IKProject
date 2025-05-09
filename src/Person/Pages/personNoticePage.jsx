
import React, { useEffect, useState } from 'react';
import PersonMenu from '../items/personMenu';
import { TbListDetails } from 'react-icons/tb';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import UsersApi from '../../Api/UsersApi';
import { AiOutlineNotification } from "react-icons/ai";
import { HiOutlineArrowSmDown } from "react-icons/hi";
import { CgCloseO } from "react-icons/cg";
import { FaRegFilePdf } from "react-icons/fa";
import { MdPersonPin } from "react-icons/md";
import { GoPersonFill } from "react-icons/go";
import { BsCalendarDate  } from "react-icons/bs";
// Styled components based on BirthdayPage design
const NoticePageContainer = styled(motion.div)`

  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin:0 20px 0 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const Title = styled.h4`
  color: #1e40af;
  font-weight: 600;
  font-size: 1.25rem;
  margin: 0;
`;

const Breadcrumb = styled.ol`
  list-style: none;
  display: flex;
  gap: 8px;
  margin: 0;
  padding: 0;
  font-size: 0.85rem;
  color: #718096;
`;

const BreadcrumbItem = styled.li`
  a {
    color: #2d3748;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
  &.active {
    color: #1e40af;
    font-weight: 500;
  }
`;

const NoticeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    overflow-x: auto;
    display: block;
    white-space: nowrap;
  }
`;

const NoticeTableHead = styled.thead`
  background-color: #edf2f7;
`;

const NoticeTableHeader = styled.th`
  padding: 10px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 500;
  color: #2c5282;
`;

const NoticeTableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #e2e8f0;
  }
  tr:last-child {
    border-bottom: none;
  }
`;

const NoticeTableRow = styled.tr`
  &:hover {
    background-color: #f7fafc;
  }
`;

const NoticeTableData = styled.td`
  padding: 10px;
  font-size: 0.85rem;
  color: #2d3748;
  vertical-align: middle;
`;

const ActionIcon = styled(TbListDetails)`
  color: #1e40af;
  cursor: pointer;
  &:hover {
    color: #2c5282;
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

function PersonNoticePage() {
  const [noticeData, setNoticeData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNotice, setSelectedNotice] = useState({
    noteId: "",
    noticeName: "",
    noticeDescription: "",
    noticeDate: "",
    targetPerson: "",
    person: "",
    fileUrl: "___",
  });
  const getNotices = async () => {
    try {
      const response = await axios.get(UsersApi.ENDPOINTS.GET_NOTICES_ALL + `/Tüm Personel`, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });
      setNoticeData(response.data);
    } catch (error) {
      console.error('Error fetching notices:', error);
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
  
  useEffect(() => {
    getNotices();
  }, [])


  return (
    <div>
     
            <NoticePageContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
          
              <ContentWrapper>
                <Card>

                  <NoticeTable>
                    <NoticeTableHead>
                      <tr>
                        <NoticeTableHeader>Duyuru Yayınlayan</NoticeTableHeader>
                        <NoticeTableHeader>Duyuru</NoticeTableHeader>
                        <NoticeTableHeader>Alıcı</NoticeTableHeader>
                        <NoticeTableHeader>Tarih</NoticeTableHeader>
                        <NoticeTableHeader>Aksiyon</NoticeTableHeader>
                      </tr>
                    </NoticeTableHead>
                    <NoticeTableBody>
                      {noticeData.map((item) => (
                        <NoticeTableRow key={item.id}>
                          <NoticeTableData>{item.noticeAdmin}</NoticeTableData>
                          <NoticeTableData>{item.noticeName}</NoticeTableData>
                          <NoticeTableData>{item.noticeWho}</NoticeTableData>
                          <NoticeTableData>{new Date(item.noticeDate).toLocaleDateString('tr-TR')}</NoticeTableData>
                          <NoticeTableData>
                            <ActionIcon onClick={() => {

                              setSelectedNotice({
                                noteId: item.id,
                                noticeName: item.noticeName,
                                noticeDescription: item.noticeDescription,
                                noticeDate: new Date(item.noticeDate).toLocaleDateString('tr-TR'),
                                targetPerson: item.noticeWho,
                                person: item.noticeAdmin,
                                fileUrl: item.file,
                              });
                              setShowModal(true);

                            }} />
                          </NoticeTableData>
                        </NoticeTableRow>
                      ))}
                    </NoticeTableBody>
                  </NoticeTable>
                </Card>
              </ContentWrapper>

              {showModal && (
                <ModalOverlay initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}>
                  <ModalContent initial={{ scale: 0.8 }} animate={{ scale: 1 }} exit={{ scale: 0.8 }} onClick={e => e.stopPropagation()}>
                    <ModalHeader>
                      <ModalTitle><AiOutlineNotification /> Duyuru Takip</ModalTitle>
                      <CloseButton onClick={() => setShowModal(false)}><CgCloseO size={24} /></CloseButton>
                    </ModalHeader>
                    <ModalBody>
                      <ModalBodyWrapper>
                        <SectionCard>
                          <Info>
                            <div className='d-flex justify-content-end'>
                              <p><strong><BsCalendarDate className='mb-1' /> Tarih:</strong> {selectedNotice.noticeDate}</p>
                            </div>
                            <p className='d-flex justify-content-center p-3' style={{ fontSize: 24, fontWeight: 500 }}>{selectedNotice.noticeName}</p>
                            <div className="ql-editor p-3 m-3" dangerouslySetInnerHTML={{ __html: selectedNotice.noticeDescription }} />
                            <div className='d-flex justify-content-between'>
                              <p><strong><MdPersonPin /> Alıcı:</strong> {selectedNotice.targetPerson}</p>
                              <p className="text-right"><strong> <GoPersonFill /> Yayınlayan:</strong> {selectedNotice.person}</p>
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
                    
                    </ModalBody>
                  </ModalContent>
                </ModalOverlay>
              )}


            </NoticePageContainer>
        
    </div>

  );
}

export default PersonNoticePage;
