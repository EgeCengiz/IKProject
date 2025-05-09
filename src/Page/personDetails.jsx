import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { PiClockCountdown } from "react-icons/pi";
import { FaRegCircleCheck } from "react-icons/fa6";
import PermissionList from '../item/permissonList';
import { FaRegFilePdf } from "react-icons/fa";

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
  const handleInputChange = (e) => {
    const { name, value } = e.target;

  };
  const [permission,setPermission] =useState([])
 const getStatePermission = async () => {
    try {
      const response = await axios.get(UsersApi.ENDPOINTS.GET_PERMISSION_FIND+`/${username}`, {
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
                            <SectionTitle>Hakkında</SectionTitle>
                            <AboutText>{details.about || 'Hakkında bilgi bulunamadı.'}</AboutText>
                          </div>
                          <div>
                            <SectionTitle>İletişim Bilgileri</SectionTitle>
                            <ContactGrid>
                              <ContactItem>
                                <ContactLabel>Email</ContactLabel>
                                <ContactLink href={`mailto:${details.email}`}>{details.email || 'Bilinmiyor'}</ContactLink>
                              </ContactItem>
                              <ContactItem>
                                <ContactLabel>Sosyal Medya</ContactLabel>
                                <SocialList>
                                  <SocialItem>
                                    <SocialLink href={details.socialMedia || '#'}>
                                      <i className="mdi mdi-linkedin fs-14"></i>
                                    </SocialLink>
                                    <span>{details.socialMedia || 'Bilinmiyor'}</span>
                                  </SocialItem>
                                </SocialList>
                              </ContactItem>
                              <ContactItem>
                                <ContactLabel>Konum</ContactLabel>
                                <ContactLink href="#">{details.location || 'Bilinmiyor'}</ContactLink>
                              </ContactItem>
                            </ContactGrid>
                          </div>
                        </Grid>
                        <Grid>
                          <div>
                            <SectionTitle>Projeler</SectionTitle>
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
                            <SectionTitle>Bilgiler</SectionTitle>
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
                                <EducationImage src="../src/images/university.png" alt="university" />
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
                          <PermissionList  userData={permission} />
                        </div>
                      </div>
                    )}
                    {activeTab === 'info' && (
                      <div>
                        <SectionTitle>Özlük Belgeleri</SectionTitle>

                        <div className="m-3">
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
                            <div
                              key={index}
                              className="d-flex align-items-center justify-content-start mb-3"
                            >
                              <div className="d-flex align-items-center" style={{ minWidth: 200 }}>
                                <FaRegFilePdf className="mb-3 me-2" />
                                <p style={{ fontSize: 14 }}>{label}:</p>
                              </div>
                              <div className="input-group" style={{ maxWidth: 105 }}>
                                <input type="file" className="form-control" />
                              </div>
                              <div className="input-group" style={{ maxWidth: 350 }}>
                                {index == 2 ? <div>Belge Eksik</div> : <div style={{ backgroundColor: "rgba(167 167 255 / 30%)", borderRadius: 5 }} className='p-2'>Özlük belgesi.pdf</div>}
                              </div>
                            </div>
                          ))}
                          <div className='btn btn-primary '>Kaydet</div>
                        </div>
                      </div>

                    )}
                    {activeTab === 'settings' && (
                      <div>
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
                                  <Select id="role" name="role" onChange={handleInputChange}>
                                    <option value="">Rol Seçiniz</option>
                                    <option value="Admin">Admin (Tüm Yetkilere Sahip)</option>
                                    <option value="Yonetici">Yönetici (Yetki Sahibi)</option>
                                    <option value="IK">IK (İnsan Kaynakları Personeli)</option>
                                    <option value="Personel">Personel (Kısıtlı Erişim)</option>


                                  </Select>
                                </div> : <></>}
                                {index == 2 ? <div className='mb-3'>
                                  <Select id="role2" name="role" onChange={handleInputChange}>

                                    <option value="Aktif">Devam Eden Aktif Personel</option>
                                    <option value="Pasif">İş Çıkışı Yapılan Personel</option>



                                  </Select>
                                </div> : <></>}

                              </div>
                            </div>
                          ))}
                          <div className='btn btn-primary'> Kaydet</div>

                        </div>
                      </div>
                    )}
                  </TabContent>
                </Card>
                <Footer>
                  © {new Date().getFullYear()} - <FooterLink href="#!">SmartICT</FooterLink>
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