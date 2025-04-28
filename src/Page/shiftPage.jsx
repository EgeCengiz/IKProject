import React, { use, useEffect, useState } from 'react';
import Menu from '../item/menu';
import { FaSearch } from "react-icons/fa";
import { TbListDetails } from "react-icons/tb";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PermissionCalendar from '../item/permissionCalender';
import PerformancePie from '../item/performancePie';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { FaRegCalendarAlt, FaChartBar } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { LuPlane } from "react-icons/lu";
import { MdWorkOutline, MdCheck, MdOutlineIndeterminateCheckBox } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { IoCheckboxOutline } from "react-icons/io5";
import { CgCloseO } from "react-icons/cg";



// Orijinal shiftData dizisi
const shiftData = [
  { name: 'Ubeyde Rizaoglu', position: 'Project Manager', mail: 'egecengizortakci@gmail.com', annualLeave: 10, usedLeave: 3 },
  { name: 'Ziya', position: 'Backend', mail: 'egecengizortakci@gmail.com', annualLeave: 8, usedLeave: 3 },
  { name: 'Ege Cengiz Ortakcı', position: 'Stajer', mail: 'egecengizortakci@gmail.com', annualLeave: 5, usedLeave: 1 },
  { name: 'Okan Karaçor', position: 'IK Menager', mail: 'egecengizortakci@gmail.com', annualLeave: 15, usedLeave: 2 },
  { name: 'Ülkü', position: 'Project Manager', mail: 'egecengizortakci@gmail.com', annualLeave: 10, usedLeave: 3 },
  { name: 'Recep', position: 'Project Manager', mail: 'egecengizortakci@gmail.com', annualLeave: 15, usedLeave: 3 },
  { name: 'Sefa', position: 'Project Manager', mail: 'egecengizortakci@gmail.com', annualLeave: 12, usedLeave: 3 },
];

const ShiftPageContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ShiftTitle = styled.h4`
  color: #1e40af;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 1.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 15px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
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

const SearchIcon = styled(FaSearch)`
  color: #4299e1;
  margin-left: 10px;
  font-size: 1rem;
`;

const ShiftTable = styled.table`
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
`;

// Modal bileşenleri
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background: #fff;
   position: fixed;
  top: 50px;
  border-radius: 8px;
  width: 90%;
  max-width: 1200px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 20px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ModalTitle = styled.h5`
  margin: 0;
  font-size: 1.25rem;
  color: #1e40af;
`;

const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
`;

const ModalBody = styled.div`
  pre {
    background: #f7fafc;
    padding: 15px;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 0.85rem;
    line-height: 1.4;
  }
`;


function ShiftPage() {
  const [showModal, setShowModal] = useState(false);
  const [shift, setShift] = useState([]);

  const [selectPerson, setSelectedPersonel] = useState({
    createDate: "",
    permissionYear: "",
    permissionMoney: "",
    permissionNoneMoney: "",
    shift: ""
  })



  const getShift = async () => {
    try {
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_SHIFT_ALL}`, {
        headers: {
          Authorization: `Bearer ${UsersApi.TOKEN}`,
        },
      });

      console.log('Shift :', response.data);
      setShift(response.data);
      
    } catch (error) {
      console.error('Hata:', error);
      setError('Kullanıcı detayları alınırken bir hata oluştu: ' + (error.response?.data?.message || error.message));
    }
  };

  const [details, setDetails] = useState({});
  const getDetails = async (selectPerson) => {
    try {
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_PERSON_DETAILS}${selectPerson}`, {
        headers: {
          Authorization: `Bearer ${UsersApi.TOKEN}`,
        },
      });
      setDetails(response.data);
      console.log(`${UsersApi.ENDPOINTS.GET_PERSON_DETAILS}${selectPerson}`);
  
    } catch (error) {
      console.error('Hata:', error);
      setError('Kullanıcı detayları alınırken bir hata oluştu: ' + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    getShift();
  }, []);


  // Personel Resmini Alacam Ama Seçilen Personelin Resmi Olmalı
  const [profileImage, setProfileImage] = useState([]);
  const getProfileImages = async (selectPerson) => {
    try {
      if (!selectPerson) {
        setError('Kullanıcı adı bulunamadı.');
        return;
      }
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_USERS_IMAGE}?username=${selectPerson}`, {
        headers: {
          Authorization: `Bearer ${UsersApi.TOKEN}`,
        },
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(response.data);
      setProfileImage({ image: imageUrl });
    } catch (error) {
      setError('Profil resmi alınırken hata: ' + (error.response?.data?.message || error.message));
    }
  };




  return (
    <>
      <div className="content-page">
        <div className="content">
          <div className="container-xxl">
            <ShiftPageContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}><MdWorkOutline /> Mesai Tablosu</h5>
              <ContentWrapper>
                <Card>
                  <SearchForm action="/search" method="GET">
                    <SearchInput
                      type="text"
                      name="name"
                      placeholder="İsme göre ara..."
                      aria-label="İsim"
                    />
                    <SearchIcon />
                  </SearchForm>
                  <ShiftTable>
                    <TableHead>
                      <tr>
                        <TableHeader>Ad Soyad</TableHeader>
                        <TableHeader>Pozisyon</TableHeader>
                        <TableHeader>Email</TableHeader>
                        <TableHeader>Yıllık İzin Hakediş</TableHeader>
                        <TableHeader>İzin Kullanılan Gün Sayısı</TableHeader>
                        <TableHeader>Aksiyon</TableHeader>
                      </tr>
                    </TableHead>
                    <TableBody>
                      {shift.map((person, index) => (
                        <TableRow key={index}>
                          <TableData>{person.username}</TableData>
                          <TableData>{person.position}</TableData>
                          <TableData>{person.email}</TableData>
                          <TableData>{person.permissionYear === "" ? "-" : person.permissionYear}</TableData>
                          <TableData>{person.permission === "" ? "-" : person.permission}</TableData>
                          <TableData>
                            <DetailIcon onClick={() => {
                              setShowModal(true);
                              setSelectedPersonel({
                                createDate: person.createDate,
                                permissionYear:  person.permissionYear,
                                permissionMoney: "",
                                permissionNoneMoney: person.permission,
                                shift: ""

                              })
                              getProfileImages(person.username);
                              getDetails(person.username);
                            }} />
                          </TableData>
                        </TableRow>
                      ))}
                    </TableBody>
                  </ShiftTable>
                </Card>
              </ContentWrapper>


              {showModal && (
                <ModalOverlay
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowModal(false)}
                >
                  <ModalContent
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    onClick={e => e.stopPropagation()}
                  >

                    <ModalHeader>
                      <ModalTitle>Mesai Takip Sistemi</ModalTitle>
                      <CloseButton onClick={() => setShowModal(false)}><CgCloseO size={25} color='red' /></CloseButton>
                    </ModalHeader>
                    <ModalBody>
                      <div className='d-flex '>
                        <img src={profileImage.image} width={70} className='rounded-circle' />
                        <div className='p-1 m-2'>
                          {details.username}<br></br>
                          <small>{details.position}</small>

                        </div>
                      </div>

                      <div>
                        {/*Bu alana takvim gelecek */}
                        <div className='row'>
                          <div className='col-md-4 p-2'>
                            <h6 className="text-center"> <FaRegCalendarAlt /> İzin Takvimi</h6>
                            <hr />
                            <PermissionCalendar />
                          </div>
                          <div className='col-md-8 p-2'>
                            <div className='row'>
                              <div className='col-md-6 d-flex justify-content-center'>
                                <div className="container">
                                  <h6 className="text-center mb-3"><LuPlane />  Yıllık İzin Hakediş</h6>
                                  <hr className="mb-4" />
                                  <br></br>
                                  <table className="table ">
                                    <tbody>
                                      <tr>
                                        <th scope="row" style={{ fontSize: 14, fontWeight: 500 }} className=" pe-3"><FiLogIn /> İşe Giriş Tarih</th>
                                        <td>{new Date(selectPerson.createDate).toLocaleDateString("TR", "tr")}</td>
                                      </tr>
                                      <tr>
                                        <th scope="row" style={{ fontSize: 14, fontWeight: 500 }} className=" pe-3"><IoCheckboxOutline /> Kullanılan Ücretli İzin Sayısı</th>
                                        <td>{selectPerson.permissionNoneMoney=="" ? 0 : selectPerson.permissionNoneMoney }</td>
                                      </tr>
                                      <tr>
                                        <th scope="row" style={{ fontSize: 14, fontWeight: 500 }} className="pe-3"><MdOutlineIndeterminateCheckBox /> Kullanılan Ücretsiz İzin Sayısı</th>
                                        <td>0</td>
                                      </tr>
                                      <tr>
                                        <th scope="row" style={{ fontSize: 14, fontWeight: 500 }} className=" pe-3"><GiProgression /> Yıllık İzin Hakediş Kalan Gün</th>
                                        <td>95</td>
                                      </tr>
                                      <tr>
                                        <th scope="row" style={{ fontSize: 14, fontWeight: 500 }} className="pe-3"><LuPlane /> Mevcut Yıllık İzin</th>
                                        <td>{selectPerson.permissionYear=="" ? 0 : selectPerson.permissionYear}</td>
                                      </tr>

                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div className='col-md-6'>
                                <h6 className="text-center mb-3"><FaChartBar /> Personel İzin & Çalışma Dağılımı</h6>
                                <hr className="mb-4" />

                                <PerformancePie />

                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </ModalBody>
                  </ModalContent>
                </ModalOverlay>
              )}
            </ShiftPageContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShiftPage;
