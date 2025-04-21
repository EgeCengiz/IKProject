import React, { useState } from 'react';
import PersonMenu from '../items/personMenu';
import { FaPen } from 'react-icons/fa';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components based on BirthdayPage design
const PersonHomeContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
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
  font-size: 1.5rem;
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

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 15px;
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;

const ProfileDetails = styled.div`
  h4 {
    color: #2d3748;
    font-size: 1.25rem;
    margin: 0;
  }
  p {
    color: #718096;
    font-size: 0.9rem;
    margin: 5px 0;
  }
  span {
    color: #2d3748;
    font-size: 0.85rem;
    i {
      color: #1e40af;
    }
  }
`;

const EditIcon = styled(FaPen)`
  color: #1e40af;
  cursor: pointer;
  &:hover {
    color: #2c5282;
  }
`;

const NavTabs = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #e2e8f0;
  padding: 0;
  margin: 0 0 20px;
`;

const NavItem = styled.li`
  a {
    display: block;
    padding: 10px;
    color: #2d3748;
    font-size: 0.9rem;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    &.active {
      color: #1e40af;
      font-weight: 500;
      border-bottom: 2px solid #1e40af;
    }
    &:hover {
      color: #1e40af;
    }
  }
`;

const TabContent = styled.div`
  padding: 20px 0;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const SectionTitle = styled.h5`
  color: #2d3748;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ContactItem = styled.div`
  h6 {
    color: #2d3748;
    font-size: 0.8rem;
    text-transform: uppercase;
    margin-bottom: 5px;
 
  }
  a {
    color: #1e40af;
    font-size: 0.85rem;
    text-decoration: underline;
    &:hover {
      color: #2c5282;
    }
  }
`;

const SocialList = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
  padding: 0;
  margin: 0;
`;

const SocialItem = styled.li`
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 1px solid;
    &.border-primary {
      border-color: #1e40af;
      color: #1e40af;
    }
    &.border-danger {
      border-color: #e53e3e;
      color: #e53e3e;
    }
    &.border-info {
      border-color: #38b2ac;
      color: #38b2ac;
    }
    &.border-secondary {
      border-color: #718096;
      color: #718096;
    }
    &:hover {
      background-color: #f7fafc;
    }
  }
`;

const ProjectCard = styled.div`
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 10px;
  h4, h6 {
    color: #2d3748;
    font-size: 1rem;
    margin: 0;
  }
`;

const SkillRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  p {
    color: #2d3748;
    font-size: 0.85rem;
    margin: 0;
    i {
      color: #1e40af;
    }
  }
`;
const ProjectTable = styled.table`
   width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    /* Küçük ekranlarda tabloyu kaydırılabilir yap */
    display: block;
    overflow-x: auto;
    
  }
`;

const ProjectTableHead = styled.thead`
  background-color: #edf2f7;
`;

const ProjectTableHeader = styled.th`
  padding: 10px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 500;
  color: #2c5282;
`;

const ProjectTableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #e2e8f0;
  }
  tr:last-child {
    border-bottom: none;
  }
`;

const ProjectTableRow = styled.tr`
  &:hover {
    background-color: #f7fafc;
  }
`;

const ProjectTableData = styled.td`
  padding: 10px;
  font-size: 0.85rem;
  color: #2d3748;
  
`;
const ProgressBar = styled.div`
  flex: 1;
  height: 8px;
  background-color: #edf2f7;
  border-radius: 4px;
  overflow: hidden;
  div {
    height: 100%;
    background-color: #1e40af;
    transition: width 0.3s ease-in-out;
  }
`;

const ExperienceItem = styled.li`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
`;

const ExperienceIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #edf2f7;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ExperienceDetails = styled.div`
  h5 {
    color: #2d3748;
    font-size: 1rem;
    margin-bottom: 5px;
  }
  div {
    color: #718096;
    font-size: 0.85rem;
    margin-bottom: 5px;
  }
  p {
    color: #2d3748;
    font-size: 0.85rem;
    margin: 0;
  }
`;

const EducationItem = styled.li`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
`;

const EducationIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #edf2f7;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EducationDetails = styled.div`
  h5 {
    color: #2d3748;
    font-size: 1rem;
    margin-bottom: 5px;
  }
  p {
    color: #2d3748;
    font-size: 0.85rem;
    margin-bottom: 5px;
  }
  div {
    color: #718096;
    font-size: 0.85rem;
  }
`;

const FormCard = styled(Card)`
  margin-bottom: 0;
`;

const FormHeader = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e2e8f0;
  h4 {
    color: #2d3748;
    font-size: 1.25rem;
    margin: 0;
  }
`;

const FormBody = styled.div`
  padding: 15px;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  label {
    color: #2d3748;
    font-size: 0.85rem;
    margin-bottom: 5px;
    display: block;
  }
  input {
    width: 100%;
    padding: 8px;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 0.85rem;
    color: #2d3748;
    &:focus {
      outline: none;
      border-color: #1e40af;
      box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.2);
    }
  }
`;

const InputGroup = styled.div`
  display: flex;
  align-items: center;
  span {
    padding: 8px;
    background-color: #edf2f7;
    border: 1px solid #e2e8f0;
    border-right: none;
    border-radius: 4px 0 0 4px;
    color: #718096;
  }
  input {
    border-radius: 0 4px 4px 0;
  }
`;

const Button = styled.button`
  padding: 8px 16px;
  background-color: #1e40af;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  &:hover {
    background-color: #2c5282;
  }
`;

const Footer = styled.footer`
  margin-top: 20px;
  text-align: center;
  font-size: 0.8rem;
  color: #718096;
  a {
    color: #2d3748;
    font-weight: 500;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Sample data (replace with actual data source)
const profileData = {
  name: 'Ege Cengiz Ortakcı',
  role: 'Backend Dev',
  languages: ['English', 'Turkish'],
  email: 'ege@gmail.com',
  social: [
    { platform: 'facebook', color: 'primary', icon: 'mdi-facebook' },
    { platform: 'google', color: 'danger', icon: 'mdi-google' },

  ],
  location: 'Ankara/Keçiören',
  about: 'Burayı personel kendi öz geçmişi ile dolduracak cv deki gibi olabilir',
  projects: [
    {
      personnel: 'Ege Cengiz Ortakcı',
      position: 'Backend Developer',
      project: 'AZ Projesi',
    },
    {
      personnel: 'Okan Karaçor',
      position: 'Frontend Developer',
      project: 'Sahil Net Projesi',
    },
    {
      personnel: 'Kevser Yılmaz',
      position: 'Project Manager',
      project: 'AZ Projesi',
    },
  ],
  skills: [
    { name: 'Spring Boot', level: 92 },
    { name: 'React', level: 85 },
    { name: 'HTML', level: 100 },
    { name: 'CSS', level: 100 },
    { name: 'Docker', level: 55 },
    { name: 'Git', level: 75 },
  ],
  experience: [
    {
      title: 'Chief Product Officer',
      company: 'Notion',
      type: 'Full-time',
      period: 'Jan 2020 - Present',
      duration: '2 years',
      description: 'Responsible for the product management, product design, research and product partnerships teams at Notion.',
      icon: '<svg>...</svg>', // Replace with actual SVG
    },
    // Add other experiences...
  ],
  education: [
    {
      institution: 'Middles Earth Technic University',
      degree: 'Master Degree In Computer Science and Mathematics',
      date: 'January 2018',
      location: 'Istanbul, Turkey',
      icon: '<svg>...</svg>', // Replace with actual SVG
    },
    // Add other education entries...
  ],
};

function PersonHome() {
  const [activeTab, setActiveTab] = useState('profile_about');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  return (
    <div>
      <PersonMenu />
      <div className="content-page">
        <div className="content">
          <div className="container-xxl">
            <br></br>
            <PersonHomeContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >

              <Header>
                <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}>Profil</h5>
                <Breadcrumb>
                  <BreadcrumbItem><a href="javascript:void(0);">Components</a></BreadcrumbItem>
                  <BreadcrumbItem className="active">Profile</BreadcrumbItem>
                </Breadcrumb>
              </Header>
              <Card>
                <ProfileHeader>
                  <ProfileInfo>
                    <ProfileImage src="../src/images/profile.png" alt="profile" />
                    <ProfileDetails>
                      <h4>{profileData.name}</h4>
                      <p>{profileData.role}</p>
                      <span>
                        <i className="mdi mdi-message me-2 align-middle"></i>
                        Speaks: {profileData.languages.join(', ')}
                      </span>
                    </ProfileDetails>
                  </ProfileInfo>
                  <EditIcon />
                </ProfileHeader>
                <NavTabs>
                  <NavItem>
                    <a
                      className={activeTab === 'profile_about' ? 'active' : ''}
                      onClick={() => handleTabChange('profile_about')}
                    >
                      Hakkında
                    </a>
                  </NavItem>
                  <NavItem>
                    <a
                      className={activeTab === 'profile_education' ? 'active' : ''}
                      onClick={() => handleTabChange('profile_education')}
                    >
                      Eğitim Bilgileri
                    </a>
                  </NavItem>
                  <NavItem>
                    <a
                      className={activeTab === 'profile_setting' ? 'active' : ''}
                      onClick={() => handleTabChange('profile_setting')}
                    >
                      Ayarlar
                    </a>
                  </NavItem>
                </NavTabs>
                <TabContent>
                  {activeTab === 'profile_about' && (
                    <>
                      <Grid>
                        <Section>
                          <div className="d-flex justify-content-between align-items-center">
                            <SectionTitle>Hakkında</SectionTitle>
                            <EditIcon />
                          </div>
                          <p>{profileData.about}</p>
                        </Section>
                        <Section>
                          <div className="d-flex justify-content-between align-items-center">
                            <SectionTitle>İletişim Bilgileri</SectionTitle>
                            <EditIcon />
                          </div>

                          <div className='d-flex '>
                            <div className='row' style={{ width: "100%" }}>
                              <div className='col-md-4'>
                                <ContactItem>
                                  <h6>Email Address</h6>
                                  <a href="#">{profileData.email}</a>
                                </ContactItem>
                              </div>
                              <div className='col-md-4'>
                                <ContactItem>
                                  <h6>Social Media</h6>
                                  <SocialList>
                                    {profileData.social.map((item, index) => (
                                      <SocialItem key={index}>
                                        <a href="javascript:void(0);" className={`social-item border-${item.color}`}>
                                          <i className={`mdi ${item.icon} fs-14`}></i>
                                        </a>
                                      </SocialItem>
                                    ))}
                                  </SocialList>
                                </ContactItem>
                              </div>
                              <div className='col-md-4'>
                                <ContactItem>
                                  <h6>Location</h6>
                                  <a href="#">{profileData.location}</a>
                                </ContactItem>
                              </div>
                            </div>



                          </div>


                        </Section>
                      </Grid>
                      <Grid>
                        <Section>
                          <SectionTitle>Projeler</SectionTitle>
                          <ProjectTable>
                            <ProjectTableHead>
                              <tr>
                                <ProjectTableHeader>Personel</ProjectTableHeader>
                                <ProjectTableHeader>Pozisyon</ProjectTableHeader>
                                <ProjectTableHeader>Görev Aldığı Proje</ProjectTableHeader>
                              </tr>
                            </ProjectTableHead>
                            <ProjectTableBody>
                              {profileData.projects.map((project, index) => (
                                <ProjectTableRow key={index}>
                                  <ProjectTableData>{project.personnel}</ProjectTableData>
                                  <ProjectTableData>{project.position}</ProjectTableData>
                                  <ProjectTableData>{project.project}</ProjectTableData>
                                </ProjectTableRow>
                              ))}
                            </ProjectTableBody>
                          </ProjectTable>
                        </Section>
                        <Section>
                          <SectionTitle>Bilgiler</SectionTitle>
                          {profileData.skills.map((skill, index) => (
                            <SkillRow key={index}>
                              <p><i className="mdi mdi-circle-medium me-2"></i>{skill.name}</p>
                              <ProgressBar>
                                <div style={{ width: `${skill.level}%` }}></div>
                              </ProgressBar>
                            </SkillRow>
                          ))}
                        </Section>
                      </Grid>
                    </>
                  )}
                  {activeTab === 'profile_education' && (
                    <Section>
                      <div className="d-flex justify-content-between align-items-center">
                        <SectionTitle>My Education</SectionTitle>
                        <EditIcon />
                      </div>
                      <Grid>
                        {profileData.education.map((edu, index) => (
                          <EducationItem key={index}>
                            <EducationIcon dangerouslySetInnerHTML={{ __html: edu.icon }} />
                            <EducationDetails>
                              <h5>{edu.institution}</h5>
                              <p>{edu.degree}</p>
                              <div>
                                {edu.date} • {edu.location}
                              </div>
                            </EducationDetails>
                          </EducationItem>
                        ))}
                      </Grid>
                    </Section>
                  )}
                  {activeTab === 'profile_setting' && (
                    <Grid>
                      <FormCard>
                        <FormHeader>
                          <h4>Personel Bilgileri</h4>
                        </FormHeader>
                        <FormBody>
                          <FormGroup>
                            <label>Ad</label>
                            <input type="text" value="Ege" />
                          </FormGroup>
                          <FormGroup>
                            <label>Soyad</label>
                            <input type="text" value="Ortakcı" />
                          </FormGroup>
                          <FormGroup>
                            <label>Telefon</label>
                            <InputGroup>
                              <span><i className="mdi mdi-phone-outline"></i></span>
                              <input type="text" value="+61 399615" placeholder="Phone" />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <label>Email</label>
                            <InputGroup>
                              <span><i className="mdi mdi-email"></i></span>
                              <input type="text" value="egecengiz@smartict.com" placeholder="Email" />
                            </InputGroup>
                          </FormGroup>
                          <FormGroup>
                            <label>Address</label>
                            <input type="text" value="Turkey" />
                          </FormGroup>
                          <div className="d-flex justify-content-end">
                            <Button type="submit">Kaydet</Button>
                          </div>
                        </FormBody>
                      </FormCard>
                      <FormCard>
                        <FormHeader>
                          <h4>Change Password</h4>
                        </FormHeader>
                        <FormBody>
                          <FormGroup>
                            <label>Eski Şifre</label>
                            <input type="password" placeholder="Old Password" />
                          </FormGroup>
                          <FormGroup>
                            <label>Yeni Şifre</label>
                            <input type="password" placeholder="New Password" />
                          </FormGroup>
                          <FormGroup>
                            <label>Tekrar Yeni Şifre</label>
                            <input type="password" placeholder="Confirm Password" />
                          </FormGroup>
                          <div className="d-flex justify-content-end">
                            <Button type="submit">Şifreyi Değiştir</Button>
                          </div>
                        </FormBody>
                      </FormCard>
                    </Grid>
                  )}
                </TabContent>
              </Card>
              <Footer>
                © {new Date().getFullYear()} - <a href="#!">SmartICT</a>
              </Footer>
            </PersonHomeContainer>
          </div>
        </div>
      </div>



    </div>

  );
}

export default PersonHome;