import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PiClockCountdown } from "react-icons/pi";
import { FaRegCircleCheck } from "react-icons/fa6";
import PermissionList from '../item/permissonList';
import { FaRegFilePdf, FaPhoneAlt } from "react-icons/fa";
import smartImg from '../images/university.png'
import { TbListDetails } from "react-icons/tb";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { LuContact } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import PerformancePie from '../item/performancePie';
import { IoLocationOutline, IoMailOutline, IoSaveOutline } from "react-icons/io5";
import { MdOutlineChangeCircle } from "react-icons/md";
import PermissionCalendar from '../item/permissionCalender';
import { FaRegCalendarAlt, FaChartBar } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { LuPlane } from "react-icons/lu";
import { MdWorkOutline, MdCheck, MdOutlineIndeterminateCheckBox } from "react-icons/md";
import { GiProgression } from "react-icons/gi";
import { IoCheckboxOutline } from "react-icons/io5";
import { CgCloseO } from "react-icons/cg";

// Styled components with responsive adjustments
const DetailsContainer = styled(motion.div)`
  padding: 20px;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 20px;
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
  @media (max-width: 576px) {
    width: 60px;
    height: 60px;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

const ProfileInfo = styled.div`
  flex: 1;
`;

const Username = styled.h4`
  color: #2d3748;
  font-size: 1.5rem;
  margin: 0;
`;

const Position = styled.p`
  color: #718096;
  font-size: 0.9rem;
  margin: 5px 0;
`;

const Speaks = styled.p`
  color: #2d3748;
  font-size: 0.85rem;
  margin: 0;
`;

const NavTabs = styled.ul`
  display: flex;
  border-bottom: 1px solid #e2e8f0;
  margin-bottom: 20px;
  list-style: none;
  padding: 0;
  overflow-x: auto;
  @media (max-width: 576px) {
    flex-wrap: nowrap;
  }
`;

const NavItem = styled.li`
  margin-right: 10px;
`;
const Select = styled.select`
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

const NavLink = styled.button`
  display: block;
  padding: 8px 16px;
  font-size: 0.9rem;
  color: #2d3748;
  text-decoration: none;
  border: none;
  background: none;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  ${(props) =>
    props.active &&
    `
    background-color: #edf2f7;
    color: #1e40af;
    font-weight: 500;
  `}
  &:hover {
    background-color: #f7fafc;
  }
`;

const TabContent = styled.div`
  padding: 20px 0;
`;

const SectionTitle = styled.h5`
  color: #2d3748;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 15px;
  text-transform: capitalize;
`;


const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.p`
  color: #2d3748;
  font-size: 0.85rem;
  line-height: 1.6;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const ContactItem = styled.div`
  font-size: 0.85rem;
`;

const ContactLabel = styled.h6`
  color: #718096;
  font-size: 0.75rem;
  text-transform: uppercase;
  margin-bottom: 5px;
`;

const ContactLink = styled.a`
  color: #1e40af;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const SocialList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  gap: 5px;
`;

const SocialItem = styled.li`
  display: flex;
  align-items: center;
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: 1px solid #1e40af;
  color: #1e40af;
  border-radius: 4px;
  &:hover {
    background-color: #1e40af;
    color: #fff;
  }
`;

const ProjectTable = styled.table`
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
  vertical-align: middle;
`;

const SkillRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const SkillLabel = styled.p`
  color: #2d3748;
  font-size: 0.85rem;
  width: 100px;
  margin: 0;
`;

const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
`;

const ProgressFill = styled.div`
  height: 100%;
  background-color: #1e40af;
  width: ${(props) => props.width}%;
  transition: width 0.3s ease;
`;

const EducationGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  @media (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const EducationCard = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 10px;
`;

const EducationImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  margin-right: 10px;
`;

const EducationInfo = styled.div`
  flex: 1;
`;

const UniversityName = styled.h5`
  color: #2d3748;
  font-size: 1rem;
  margin: 0;
`;

const Section = styled.p`
  color: #2d3748;
  font-size: 0.85rem;
  font-weight: 500;
  margin: 5px 0;
`;

const EducationDetails = styled.div`
  font-size: 0.8rem;
  color: #718096;
`;

const Footer = styled.footer`
  margin-top: 20px;
  padding: 10px 0;
  text-align: center;
  font-size: 0.8rem;
  color: #718096;
`;

const FooterLink = styled.a`
  color: #2d3748;
  font-weight: 500;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function calculateWorkDays(startDate) {
  const today = new Date();
  let currentDate = new Date(startDate);
  let daysCount = 0;

  // İşe giriş tarihi ile bugünün tarihi arasındaki tüm günleri say
  while (currentDate <= today) {
    // Eğer gün Pazar değilse, sayıya ekle
    if (currentDate.getDay() !== 0) { // getDay() 0'ı Pazar olarak döndürür
      daysCount++;
    }
    // Bir gün ilerlet
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return daysCount;
}

function PersonDetails() {
  const { username, id } = useParams();
  const [details, setDetails] = useState({});
  const [project, setProject] = useState([]);
  const [information, setInformation] = useState([]);
  const [education, setEducation] = useState([]);
  const [activeTab, setActiveTab] = useState('about');
  const [profileImage, setProfileImage] = useState([]);
  const [error, setError] = useState('');

  const getDetails = async () => {
    try {
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_PERSON_DETAILS}${username}`, {
        headers: {
          Authorization: `Bearer ${UsersApi.TOKEN}`,
        },
      });
      setDetails(response.data);
      console.log(`${UsersApi.ENDPOINTS.GET_PERSON_DETAILS}${username}`);
      console.log('Detaylar:', response.data);
    } catch (error) {
      console.error('Hata:', error);
      setError('Kullanıcı detayları alınırken bir hata oluştu: ' + (error.response?.data?.message || error.message));
    }
  };
  const handleInputChange = async (e) => {
    const { name, value } = e.target;
    console.log("changing", name, "to", value);
    setDetails(prev => ({
      ...prev,
      [name]: value
    }));
    const userDetails = {
      about: "",
      socialMedia: '',
      location: "",
      speaks: "",
      email: "",
      role: value,
      position: "",
      username: details.username
    };
    try {
      const response = await axios.put(`${UsersApi.ENDPOINTS.PUT_USERS}`, userDetails, {
        headers: {
          Authorization: `Bearer ${UsersApi.TOKEN}`,
        },
      });
      alert("Yetki Değiştirildi");
    } catch (error) {
      console.error('Hata:', error);
      setError('Eğitim bilgileri alınırken bir hata oluştu: ' + (error.response?.data?.message || error.message));
    }


  };
  const [permission, setPermission] = useState([])
  const getStatePermission = async () => {
    try {
      const response = await axios.get(UsersApi.ENDPOINTS.GET_PERMISSION_FIND + `/${username}`, {
        headers: {
          Authorization: 'Bearer ' + UsersApi.TOKEN
        }
      });
      setPermission(response.data);
    } catch (error) {
      console.error("Hata:", error.response ? error.response.data : error.message);
    }
  };


  const getProfileImages = async () => {
    try {
      if (!details.username) {
        setError('Kullanıcı adı bulunamadı.');
        return;
      }
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_USERS_IMAGE}?username=${details.username}`, {
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

  const getProjects = async () => {
    try {
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_PERSON_DETAILS_PROJECT}${username}`, {
        headers: {
          Authorization: `Bearer ${UsersApi.TOKEN}`,
        },
      });
      setProject(response.data);
    } catch (error) {
      console.error('Hata:', error);
      setError('Projeler alınırken bir hata oluştu: ' + (error.response?.data?.message || error.message));
    }
  };

  const getInformation = async () => {
    try {
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_PERSON_DETAILS_INFORMATION}${username}`, {
        headers: {
          Authorization: `Bearer ${UsersApi.TOKEN}`,
        },
      });
      setInformation(response.data);
    } catch (error) {
      console.error('Hata:', error);
      setError('Bilgiler alınırken bir hata oluştu: ' + (error.response?.data?.message || error.message));
    }
  };

  const getEducation = async () => {
    try {
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_PERSON_DETAILS_EDUCATION}${username}`, {
        headers: {
          Authorization: `Bearer ${UsersApi.TOKEN}`,
        },
      });
      setEducation(response.data);
    } catch (error) {
      console.error('Hata:', error);
      setError('Eğitim bilgileri alınırken bir hata oluştu: ' + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    { id == 1 ? setActiveTab("deposit") : setActiveTab("about") }
    getDetails();
    getAllDeposit();
    getStatePermission();
    getShift();
  }, [username]);

  useEffect(() => {
    if (details.username) {
      getProfileImages();
      getProjects();
      getInformation();
      getEducation();

    }
  }, [details.username]);

  const stateOk = async (id) => {

    const response = await axios.get(UsersApi.ENDPOINTS.PUT_DEPOSIT_STATE + "/" + id, {
      headers: {
        Authorization: 'Bearer ' + UsersApi.TOKEN
      }
    });
    getAllDeposit();
    console.log(response.data);
  }
  const [depositData, setDepositData] = useState([]);
  const getAllDeposit = async () => {
    try {
      const data = await axios.get(UsersApi.ENDPOINTS.GET_DEPOSIT_ALL + `/${username}`, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });
      console.log(data.data);
      setDepositData(data.data);
    } catch (err) {
      console.error(err);
    }
  };


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
          Authorization: 'Bearer ' + UsersApi.TOKEN,
        },
      });
      setSelectedPersonel(response.data);
      console.log(response.data);

    } catch (error) {
    
    }
  };

  return (
    <div>
      <div className="content-page">
        <div className="content">
          <div className="container-xxl">
            <DetailsContainer initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <h5 className="m-3" style={{ color: '#4a5a6b' }}>
                Profil
              </h5>
              {error && <p style={{ color: 'red' }}>{error}</p>}
              <ContentWrapper>
                <Card>
                  <ProfileHeader>
                    <ProfileImage src={profileImage.image || 'default-image-url'} alt="profile" />
                    <ProfileInfo>
                      <Username>{details.username || 'Kullanıcı Adı'}</Username>
                      <Position>{details.position || 'Pozisyon'}</Position>
                      <Speaks>Konuşulan Diller: {details.speaks || 'Bilinmiyor'}</Speaks>
                    </ProfileInfo>
                  </ProfileHeader>
                  <NavTabs>
                    <NavItem>
                      <NavLink active={activeTab === 'about'} onClick={() => setActiveTab('about')}>
                        Hakkında
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={activeTab === 'education'} onClick={() => setActiveTab('education')}>
                        Eğitim Bilgileri
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={activeTab === 'deposit'} onClick={() => setActiveTab('deposit')}>
                        Atanan Zimmetler
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={activeTab === 'permission'} onClick={() => setActiveTab('permission')}>
                        İzin Bilgileri
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={activeTab === 'shift'} onClick={() => setActiveTab('shift')}>
                        Mesai Bilgileri
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={activeTab === 'info'} onClick={() => setActiveTab('info')}>
                        Özlük Belgeleri
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink active={activeTab === 'settings'} onClick={() => setActiveTab('settings')}>
                        Personel Ayarlar
                      </NavLink>
                    </NavItem>
                  </NavTabs>
                  <TabContent>
                    {activeTab === 'about' && (
                      <div>
                        <Grid>
                          <div>
                            <SectionTitle> <TbListDetails /> Hakkında</SectionTitle>
                            <AboutText>{details.about || 'Hakkında bilgi bulunamadı.'}</AboutText>
                          </div>
                          <div>
                            <SectionTitle> <LuContact className='mb-1' />  İletişim Bilgileri</SectionTitle>
                            <ContactGrid>
                              <ContactItem>
                                <ContactLabel><IoMailOutline className='me-1 mb-1' /> Email</ContactLabel>
                                <ContactLink href={`mailto:${details.email}`}>{details.email || 'Bilinmiyor'}</ContactLink>
                              </ContactItem>
                              <ContactItem>
                                <ContactLabel><FaPhoneAlt className='me-1 mb-1' />Telefon</ContactLabel>
                                <SocialList>
                                  <SocialItem>

                                    <span>{details.socialMedia || 'Bilinmiyor'}</span>
                                  </SocialItem>
                                </SocialList>
                              </ContactItem>
                              <ContactItem>
                                <ContactLabel><IoLocationOutline className='mb-1' style={{ color: "black" }} /> Konum</ContactLabel>
                                <ContactLink href="#">{details.location || 'Bilinmiyor'}</ContactLink>
                              </ContactItem>
                            </ContactGrid>
                          </div>
                        </Grid>
                        <Grid>
                          <div>
                            <SectionTitle><LiaProjectDiagramSolid /> Projeler</SectionTitle>
                            <ProjectTable>
                              <TableHead>
                                <tr>
                                  <TableHeader>Proje</TableHeader>
                                  <TableHeader>Pozisyon</TableHeader>
                                  <TableHeader>Tarih</TableHeader>
                                </tr>
                              </TableHead>
                              <TableBody>
                                {project.length > 0 ? (
                                  project.map((data) => (
                                    <TableRow key={data.projectName}>
                                      <TableData>{data.projectName}</TableData>
                                      <TableData>{data.position}</TableData>
                                      <TableData>{data.createDate}</TableData>
                                    </TableRow>
                                  ))
                                ) : (
                                  <TableRow>
                                    <TableData colSpan="3">Proje bulunamadı.</TableData>
                                  </TableRow>
                                )}
                              </TableBody>
                            </ProjectTable>
                          </div>
                          <div>
                            <SectionTitle><FaCode /> Bilgiler</SectionTitle>
                            {information.length > 0 ? (
                              information.map((data) => (
                                <SkillRow key={data.softwareName}>
                                  <SkillLabel>
                                    <i className="mdi mdi-circle-medium text-primary me-2"></i>
                                    {data.softwareName}
                                  </SkillLabel>
                                  <ProgressBar>
                                    <ProgressFill width={data.degree} />
                                  </ProgressBar>
                                </SkillRow>
                              ))
                            ) : (
                              <p>Bilgi bulunamadı.</p>
                            )}
                          </div>
                        </Grid>
                      </div>
                    )}
                    {activeTab === 'education' && (
                      <div>
                        <SectionTitle>Eğitim Bilgileri</SectionTitle>
                        <EducationGrid>
                          {education.length > 0 ? (
                            education.map((data) => (
                              <EducationCard key={data.universityName}>
                                <EducationImage src={smartImg} alt="university" />
                                <EducationInfo>
                                  <UniversityName>{data.universityName}</UniversityName>
                                  <Section>{data.section}</Section>
                                  <EducationDetails>
                                    {data.startAndEndDate} - {data.location}
                                  </EducationDetails>
                                </EducationInfo>
                              </EducationCard>
                            ))
                          ) : (
                            <p>Eğitim bilgisi bulunamadı.</p>
                          )}
                        </EducationGrid>
                      </div>
                    )}
                    {activeTab === 'deposit' && (
                      <div>
                        <SectionTitle>Atanan Zimmetler</SectionTitle>
                        {depositData.map((data) => {

                          const date = new Date(data.date);
                          const day = String(date.getDate()).padStart(2, '0');
                          const year = date.getFullYear();
                          const turkishMonths = [
                            "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
                            "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
                          ];
                          const monthName = turkishMonths[date.getMonth()];

                          return (
                            <div className="w-100 d-flex justify-content-center" key={data.id}>
                              <div className="m-2 card shadow rounded" style={{ width: "800px" }}>
                                <div className="card-body d-flex p-3">
                                  {/* Tarih */}
                                  <div
                                    className="d-flex flex-column align-items-center justify-content-center px-3 me-3"
                                    style={{
                                      borderRight: "2px solid #dee2e6",
                                      backgroundColor: "#f8f9fa",
                                      borderRadius: "10px",
                                      minWidth: "80px",
                                    }}
                                  >
                                    <div style={{ fontSize: 20, fontWeight: "bold" }}>{day}</div>
                                    <div style={{ fontSize: 14 }}>{monthName}</div>
                                    <div style={{ fontSize: 18, fontWeignht: "500" }}>{year}</div>
                                  </div>

                                  {/* Bilgi alanı */}
                                  <div className="flex-grow-1">
                                    <div style={{ fontSize: 14, marginBottom: 6 }}>
                                      <b>Zimmet Adı:</b> {data.name}
                                    </div>
                                    <div style={{ fontSize: 14, marginBottom: 6 }}>
                                      <b>Önem Derecesi:</b> {data.degreeName}
                                    </div>
                                    <div style={{ fontSize: 14 }}>
                                      <b>Zimmet Açıklama:</b> {data.description}
                                    </div>
                                  </div>



                                  <div
                                    className="ms-2 d-flex flex-column align-items-center justify-content-center px-2 me-3"
                                    style={{
                                      borderRight: "2px solidrgb(255, 255, 255)",
                                      backgroundColor: "#f8f9fa",
                                      borderRadius: "10px",
                                      minWidth: "90px",
                                    }}
                                  >

                                    {data.state == null ? <> <a href="#" onClick={() => stateOk(data.id)} >
                                      <div
                                        className="d-flex flex-column justify-content-center align-items-center"
                                        style={{ height: '100%', textAlign: 'center' }}
                                      >
                                        <PiClockCountdown style={{ fontSize: 27, color: "green" }} />
                                        <p style={{ fontSize: 12, margin: 0 }}>Devam Ediyor</p>
                                      </div></a></> :
                                      <>
                                        <div
                                          className="d-flex flex-column justify-content-center align-items-center"
                                          style={{ height: '100%', textAlign: 'center' }}
                                        > <FaRegCircleCheck style={{ fontSize: 27, color: "blue" }} />
                                          <p style={{ fontSize: 12, margin: 0 }}>Teslim Edildi</p></div></>}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}




                      </div>
                    )}
                    {activeTab === 'permission' && (
                      <div>
                        <SectionTitle>İzin Bilgileri</SectionTitle>
                        <div>
                          <PermissionList userData={permission} />
                        </div>
                      </div>
                    )}
                    {activeTab === 'info' && (
                      <div>
                        <SectionTitle>Özlük Belgeleri</SectionTitle>

                        <div className="m-3 d-flex justify-content-start">
                          <div className=" list-group w-50">
                            {[
                              "CV",
                              "Askerlik Belgesi",
                              "Adli Sicil Kaydı",
                              "İkametgah Adresi",
                              "Diploma Fotokopisi",
                              "Nüfus Kayıt Fotokopisi",
                              "Vesikalık Fotoğraf",
                              "Sağlık Raporu",
                              "Diğer",
                            ].map((label, index) => (
                              <div className="list-group-item d-flex align-items-center" key={index}>
                                <div className="me-3 d-flex align-items-center" style={{ minWidth: 200 }}>
                                  <FaRegFilePdf className="me-2" style={{ fontSize: 18, color: "rgba(118, 117, 117, 0.7)" }} />
                                  <span style={{ fontSize: 14 }}>{label}:</span>
                                </div>
                                <input
                                  type="file"
                                  id={`file-${index}`}
                                  style={{ display: "none" }}
                                  onChange={(e) => handleFileUpload(e, label)}
                                />
                                {index === 2 ? (
                                  <label htmlFor={`file-${index}`} className="btn btn-outline-primary btn-sm">
                                    <FaPlus className='mt-1 me-1' /> Yükle
                                  </label>
                                ) : (
                                  <div className="d-flex align-items-center">
                                    <span className="me-3 text-muted" style={{ fontSize: 14 }}>Özlük belgesi.pdf</span>
                                    <label htmlFor={`file-${index}`} className="btn btn-outline-secondary btn-sm">
                                      <MdOutlineChangeCircle className='mt-1 me-1' /> Değiştir
                                    </label>
                                  </div>
                                )}
                              </div>
                            ))}<div className="d-flex justify-content-end mt-3">
                              <button className="btn btn-primary"><IoSaveOutline className='mb-1' /> Kaydet</button>
                            </div>
                          </div>

                        </div>
                      </div>

                    )}
                    {activeTab === 'settings' && (
                      <div className="container mx-auto p-4">
                        <SectionTitle>Personel Ayarlar</SectionTitle>
                        <div className="m-3">
                          {[
                            "Personel İşe Giriş Tarihi",
                            "Personel Yetki",
                            "Peronel Durumu",


                          ].map((label, index) => (
                            <div
                              key={index}
                              className="d-flex align-items-center justify-content-center mb-2"
                            >
                              <div className="d-flex align-items-center" style={{ minWidth: 200 }}>
                                <p style={{ fontSize: 15 }}>{label}:</p>
                              </div>
                              <div className="input-group" >
                                {index == 0 ? <div className='mb-3'>20.05.2025</div> : <></>}
                                {index == 1 ? <div className='mb-3'>

                                  <Select id="role" value={details.role || ""} name="role" className="border rounded p-2 w-full max-w-xs" onChange={handleInputChange}>
                                    <option value="">Rol Seçiniz</option>
                                    <option value="Admin">Admin (Tüm Yetkilere Sahip)</option>
                                    <option value="Yonetici">Yönetici (Yetki Sahibi)</option>
                                    <option value="IK">IK (İnsan Kaynakları Personeli)</option>
                                    <option value="Personel">Personel (Kısıtlı Erişim)</option>
                                  </Select>
                                </div> : <></>}
                                {index == 2 ? <div className='mb-3'>
                                  <Select id="role2" name="role" className="border rounded p-2 w-full max-w-xs" >
                                    <option value="Aktif">Devam Eden Aktif Personel</option>
                                    <option value="Pasif">İş Çıkışı Yapılan Personel</option>
                                  </Select>
                                </div> : <></>}
                              </div>
                            </div>
                          ))}

                        </div>
                      </div>
                    )}
                    {activeTab === 'shift' && (
                      <>


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
                                          <td>{selectPerson.permissionNoneMoney == "" ? 0 : selectPerson.permissionNoneMoney}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" style={{ fontSize: 14, fontWeight: 500 }} className="pe-3"><MdOutlineIndeterminateCheckBox /> Kullanılan Ücretsiz İzin Sayısı</th>
                                          <td>{selectPerson.permissionMoney}</td>
                                        </tr>
                                        <tr>
                                          <th scope="row" style={{ fontSize: 14, fontWeight: 500 }} className=" pe-3"><GiProgression /> Yıllık İzin Hakediş Kalan Gün</th>
                                          <td></td>
                                        </tr>
                                        <tr>
                                          <th scope="row" style={{ fontSize: 14, fontWeight: 500 }} className="pe-3"><LuPlane /> Mevcut Yıllık İzin</th>
                                          <td>{selectPerson.permissionYear == "" ? 0 : selectPerson.permissionYear}</td>
                                        </tr>

                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div className='col-md-6'>
                                  <h6 className="text-center mb-3"><FaChartBar /> Personel İzin & Çalışma Dağılımı</h6>
                                  <hr className="mb-4" />

                                  <PerformancePie
                                    calisma={calculateWorkDays(selectPerson.createDate)}
                                    ucretli={selectPerson.permissionMoney}
                                    ucretsiz={selectPerson.permissionNoneMoney}
                                  />

                                </div>
                              </div>
                            </div>
                          </div>

                        </div>
                      </>
                    )}
                  </TabContent>
                </Card>
                <Footer>
                  © {new Date().getFullYear()} - <FooterLink href="#!">PETRABAYT AI</FooterLink>
                </Footer>
              </ContentWrapper>
            </DetailsContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonDetails;