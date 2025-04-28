import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components (BirthdayPage ile uyumlu)
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
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
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
`;

const NavItem = styled.li`
  margin-right: 10px;
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
  const { username } = useParams();
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

  // İlk olarak sadece getDetails çağrılır
  useEffect(() => {
    getDetails();
  }, [username]);

  // details.username mevcut olduğunda diğer fonksiyonlar çağrılır
  useEffect(() => {
    if (details.username) {
      getProfileImages();
      getProjects();
      getInformation();
      getEducation();
    }
  }, [details.username]);

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