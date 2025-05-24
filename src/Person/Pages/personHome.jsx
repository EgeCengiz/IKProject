import React, { useEffect, useState } from 'react';
import PersonMenu from '../items/personMenu';
import { FaPen } from 'react-icons/fa';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import PersonForPermisson from '../Pages/personForPermisson';
import PersonZimmetPage from '../Pages/PersonZimmetPage';
import PersonNoticePage from '../Pages/personNoticePage';
import axios from 'axios';
import UsersApi from '../../Api/UsersApi';
import { TbListDetails } from "react-icons/tb";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { LuContact } from "react-icons/lu";
import { FaCode } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { IoSaveOutline } from "react-icons/io5";
import { FaUniversity } from "react-icons/fa";
// Styled components with media queries for mobile-friendliness
const PersonHomeContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  @media (max-width: 576px) {
    padding: 10px;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 15px;
  @media (max-width: 576px) {
    padding: 10px;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  @media (max-width: 576px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  @media (max-width: 576px) {
    width: 60px;
    height: 60px;
  }
`;

const ProfileDetails = styled.div`
  h4 {
    color: #2d3748;
    font-size: 1.25rem;
    margin: 0;
    @media (max-width: 576px) {
      font-size: 1rem;
    }
  }
  p {
    color: #718096;
    font-size: 0.9rem;
    margin: 5px 0;
    @media (max-width: 576px) {
      font-size: 0.8rem;
    }
  }
  span {
    color: #2d3748;
    font-size: 0.85rem;
    @media (max-width: 576px) {
      font-size: 0.75rem;
    }
    i {
      color: #1e40af;
    }
  }
`;

const EditIcon = styled(FaPen)`
  color: #1e40af;
  cursor: pointer;
  font-size: 1.2rem;
  &:hover {
    color: #2c5282;
  }
  @media (max-width: 576px) {
    font-size: 1rem;
  }
`;

const NavTabs = styled.ul`
  list-style: none;
  display: flex;
  gap: 10px;
  border-bottom: 1px solid #e2e8f0;
  padding: 0;
  margin: 0 0 20px;
  overflow-x: auto;
  white-space: nowrap;
  @media (max-width: 576px) {
    gap: 5px;
  }
`;

const NavItem = styled.li`
  a {
    display: inline-block;
    padding: 8px 12px;
    color: #2d3748;
    font-size: 0.9rem;
    text-decoration: none;
    border-bottom: 2px solid transparent;
    cursor: pointer;
    &.active {
      color: #1e40af;
      font-weight: 500;
      border-bottom: 2px solid #1e40af;
    }
    &:hover {
      color: #1e40af;
    }
    @media (max-width: 576px) {
      font-size: 0.8rem;
      padding: 6px 10px;
    }
  }
`;

const TabContent = styled.div`
  padding: 20px 0;
  @media (max-width: 576px) {
    padding: 10px 0;
  }
`;

const Section = styled.div`
  margin-bottom: 20px;
  @media (max-width: 576px) {
    margin-bottom: 15px;
  }
`;

const SectionTitle = styled.h5`
  color: #2d3748;
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 10px;
  @media (max-width: 576px) {
    font-size: 0.9rem;
  }
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
    @media (max-width: 576px) {
      font-size: 0.75rem;
    }
  }
`;

const ProjectTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
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
  @media (max-width: 576px) {
    font-size: 0.75rem;
    padding: 8px;
  }
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
  @media (max-width: 576px) {
    font-size: 0.75rem;
    padding: 8px;
  }
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

const EducationItem = styled.li`
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  @media (max-width: 576px) {
    gap: 10px;
  }
`;

const EducationIcon = styled.div`
  width: 40px;
  height: 40px;
  background-color: #edf2f7;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 576px) {
    width: 35px;
    height: 35px;
  }
`;

const EducationDetails = styled.div`
  h5 {
    color: #2d3748;
    font-size: 1rem;
    margin-bottom: 5px;
    @media (max-width: 576px) {
      font-size: 0.9rem;
    }
  }
  p {
    color: #2d3748;
    font-size: 0.85rem;
    margin-bottom: 5px;
    @media (max-width: 576px) {
      font-size: 0.75rem;
    }
  }
  div {
    color: #718096;
    font-size: 0.85rem;
    @media (max-width: 576px) {
      font-size: 0.75rem;
    }
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
    @media (max-width: 576px) {
      font-size: 1rem;
    }
  }
`;

const FormBody = styled.div`
  padding: 15px;
  @media (max-width: 576px) {
    padding: 10px;
  }
`;

const SkillRow = styled.tr`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 15px;
  td {
    color: #2d3748;
    font-size: 0.85rem;
    margin: 0;
    i {
      color: #1e40af;
    }
    @media (max-width: 576px) {
      font-size: 0.75rem;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  label {
    color: #2d3748;
    font-size: 0.85rem;
    margin-bottom: 5px;
    display: block;
    @media (max-width: 576px) {
      font-size: 0.75rem;
    }
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
    @media (max-width: 576px) {
      font-size: 0.75rem;
      padding: 6px;
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
    @media (max-width: 576px) {
      padding: 6px;
    }
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
  @media (max-width: 576px) {
    font-size: 0.75rem;
    padding: 6px 12px;
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
  @media (max-width: 576px) {
    font-size: 0.7rem;
  }
`;

// Sample static data (used as fallback)
const profileData = {
  name: localStorage.getItem("username") || "Unknown User",
  role: 'Backend Dev',
  languages: ['English', 'Turkish'],
  email: 'ege@gmail.com',
  phone: '05303816550',
  location: 'Ankara/Keçiören',
  about: 'Burayı personel kendi öz geçmişi ile dolduracak cv deki gibi olabilir',
  education: [
    {
      institution: 'Middles Earth Technic University',
      degree: 'Master Degree In Computer Science and Mathematics',
      date: 'January 2018',
      location: 'Istanbul, Turkey',
      icon: '<svg width="24" height="24"><path d="M12 2L2 7l10 5 10-5-10-5zm0 18l-8-4V9l8 4 8-4v7l-8 4z" fill="#718096"/></svg>',
    },
  ],
};

function PersonHome() {
  const [activeTab, setActiveTab] = useState('profile_about');
  const [profileImage, setProfileImage] = useState({});
  const [projects, setProjects] = useState([]);
  const [contacts, setContacts] = useState({ about: '', socialMedia: '', email: '', location: '', speaks: '', position: '', username: localStorage.getItem("username") });
  const [skills, setSkills] = useState([]);
  const [educationData, setEducationData] = useState([]);
  const [personalInfo, setPersonalInfo] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
  });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
  };

  const getProfileImages = async (person) => {
    try {
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_USERS_IMAGE}?username=${person}`, {
        headers: {
          Authorization: `Bearer ${UsersApi.TOKEN}`,
        },
        responseType: 'blob',
      });
      const imageUrl = URL.createObjectURL(response.data);
      setProfileImage({ image: imageUrl });
    } catch (error) {
      console.error('Error fetching profile image:', error);
    }
  };

  const getProjects = async () => {
    try {
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_PERSON_DETAILS_PROJECT}${localStorage.getItem("username")}`, {
        headers: {
          Authorization: `Bearer ${UsersApi.TOKEN}`,
        },
      });
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  const getInformation = async () => {
    try {
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_PERSON_DETAILS_INFORMATION}${localStorage.getItem("username")}`, {
        headers: {
          Authorization: `Bearer ${UsersApi.TOKEN}`,
        },
      });
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
    }
  };

  const getEducation = async () => {
    try {
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_PERSON_DETAILS_EDUCATION}${localStorage.getItem("username")}`, {
        headers: {
          Authorization: `Bearer ${UsersApi.TOKEN}`,
        },
      });
      setEducationData(response.data);
    } catch (error) {
      console.error('Error fetching education data:', error);
    }
  };

  const getDetails = async () => {
    try {
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_PERSON_DETAILS}${localStorage.getItem("username")}`, {
        headers: {
          Authorization: `Bearer ${UsersApi.TOKEN}`,
        },
      });
      setContacts({
        about: response.data.about || '',
        socialMedia: response.data.socialMedia || '',
        email: response.data.email || '',
        location: response.data.location || '',
        position: '',
        speaks: '',
        username: localStorage.getItem("username"),

      });
      setPersonalInfo({
        firstName: response.data.firstName || '',
        lastName: response.data.lastName || '',
        phone: response.data.socialMedia || '',
        email: response.data.email || '',
        address: response.data.location || '',
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
      getProfileImages(username);
      getProjects();
      getInformation();
      getEducation();
      getDetails();
    } else {
      console.error('Username not found in localStorage');
    }
  }, []);

  const handleAboutChange = (e) => setContacts({ ...contacts, about: e.target.value });

  const handleProjectChange = (index, field, value) => {
    const updated = [...projects];
    updated[index][field] = value;
    setProjects(updated);
  };

  const addProject = () => setProjects([...projects, { id: '', projectName: '', position: '' }]);
  const removeProject = async (index, projId) => {
    setProjects(projects.filter((_, i) => i !== index));
    if (projId) {
      try {
        await axios.delete(`${UsersApi.ENDPOINTS.DELETE_PROJECT}/${projId}`, {
          headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
        });
        alert('Delete Successful');
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project');
      }
    }
  };

  const handleContactChange = (field, value) => {
    setContacts({ ...contacts, [field]: value });
  };

  const handleSkillChange = (index, field, value) => {
    setSkills(prev => {
      const updated = [...prev];
      updated[index][field] = field === 'degree' ? Number(value) : value;
      return updated;
    });
  };
  const addSkill = () =>
    setSkills(prev => [
      ...prev,
      { softwareName: '', degree: 50 }  // yeni nesne de aynı property isimleriyle
    ]);

  const removeSkill = async (index, postId) => {
    setSkills(skills.filter((_, i) => i !== index));
    try {
      await axios.delete(`${UsersApi.ENDPOINTS.DELETE_INFORMATION}/${postId}`, {
        headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
      });
      alert('Delete Successful');
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project');
    }
  }
  const handleUpdateProfile = async () => {
    try {
      const toSave = projects.filter(proj => !proj.id);
      const toEdit = projects.filter(proj => proj.id);

      if (toSave.length > 0) {
        await axios.post(`${UsersApi.ENDPOINTS.POST_PROJECT}`, toSave, {
          headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
        });
      }

      if (toEdit.length > 0) {
        await axios.put(`${UsersApi.ENDPOINTS.PUT_PROJECT}`, toEdit, {
          headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
        });
      }
      await axios.put(`${UsersApi.ENDPOINTS.PUT_USERS_INFO}`, contacts, {
        headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
      });

      const toSaveInformation = skills.filter(proj => !proj.id);
      const toEditInformation = skills.filter(proj => proj.id);
      if (toSaveInformation.length > 0) {
        await axios.post(`${UsersApi.ENDPOINTS.POST_INFORMATION}`, toSaveInformation, {
          headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
        });
      }
      if (toEditInformation.length > 0) {
        await axios.put(`${UsersApi.ENDPOINTS.PUT_INFORMATION}`, toEditInformation, {
          headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
        });
      }



      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleSavePersonalInfo = async () => {
    try {
      await axios.put(`${UsersApi.ENDPOINTS.UPDATE_PERSONAL_INFO}${localStorage.getItem("username")}`, personalInfo, {
        headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
      });
      alert('Personal info updated successfully');
    } catch (error) {
      console.error('Error updating personal info:', error);
      alert('Failed to update personal info');
    }
  };

  const handlePasswordChange = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert('Yeni Şifre Uyuşmuyor.. Lütfen Kontrol Edin');
      return;
    }
    try {
      await axios.post(
        UsersApi.ENDPOINTS.POST_USERS_PASSWORD_CHANGE,
        {}, // boş body
        {
          params: {
            oldPassword: passwords.oldPassword,
            newPassword: passwords.newPassword,
          },
          headers: {
            Authorization: `Bearer ${UsersApi.TOKEN}`,
          },
        }
      );
      alert('Password changed successfully');
      setPasswords({ oldPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password');
    }


  };

  return (
    <div>
      <PersonMenu />
      <br />
      <div className="content">
        <div className="container-xxl">
          <PersonHomeContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <ProfileHeader>
                <ProfileInfo>
                  <ProfileImage src={profileImage.image} alt="profile" />
                  <ProfileDetails>
                    <h4>{profileData.name}</h4>
                    <p>{profileData.role}</p>
                    <span>
                      <i className="mdi mdi-message me-2 align-middle"></i>
                      Speaks: {profileData.languages.join(', ')}
                    </span>
                  </ProfileDetails>
                </ProfileInfo>
              </ProfileHeader>

              <NavTabs role="tablist" className='nav nav-pills nav-justified bg-light'>
                
                <NavItem role="presentation">
                  <a className={activeTab === 'profile_about' ? 'active nav-link' : ''} onClick={() => handleTabChange('profile_about')}>
                    Hakkında
                  </a>
                </NavItem>
                <NavItem>
                  <a className={activeTab === 'profile_education' ? 'active nav-link' : ''} onClick={() => handleTabChange('profile_education')}>
                    Eğitim Bilgileri
                  </a>
                </NavItem>
                <NavItem>
                  <a className={activeTab === 'permission' ? 'active nav-link' : ''} onClick={() => handleTabChange('permission')}>
                    İzin Talep
                  </a>
                </NavItem>
                <NavItem>
                  <a className={activeTab === 'deposit' ? 'active nav-link' : ''} onClick={() => handleTabChange('deposit')}>
                    Zimmet Bilgileri
                  </a>
                </NavItem>
                <NavItem>
                  <a className={activeTab === 'notice' ? 'active nav-link' : ''} onClick={() => handleTabChange('notice')}>
                    Duyurular
                  </a>
                </NavItem>
                <NavItem>
                  <a className={activeTab === 'profile_setting' ? 'active nav-link' : ''} onClick={() => handleTabChange('profile_setting')}>
                    Ayarlar
                  </a>
                </NavItem>
              </NavTabs>
              <TabContent>
                {activeTab === 'profile_about' && (
                  <>
                    <Grid>
                      <Section>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <SectionTitle>Hakkında</SectionTitle>
                        </div>
                        <p>{contacts.about}</p>
                      </Section>
                      <Section>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <SectionTitle>İletişim Bilgileri</SectionTitle>
                          <EditIcon data-bs-toggle="modal" data-bs-target="#aboutModal" />
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-4">
                            <ContactItem>
                              <h6>Telefon Numarası</h6>
                              <a href="#">{contacts.socialMedia}</a>
                            </ContactItem>
                          </div>
                          <div className="col-12 col-md-4">
                            <ContactItem>
                              <h6>Email Address</h6>
                              <a href="#">{contacts.email}</a>
                            </ContactItem>
                          </div>
                          <div className="col-12 col-md-4">
                            <ContactItem>
                              <h6>Location</h6>
                              <a href="#">{contacts.location}</a>
                            </ContactItem>
                          </div>
                        </div>
                      </Section>
                    </Grid>
                    <Grid>
                      <Section>
                        <SectionTitle>Projeler</SectionTitle>
                        <ProjectTable>
                          <ProjectTableHead>
                            <ProjectTableRow>
                              <ProjectTableHeader>Personel</ProjectTableHeader>
                              <ProjectTableHeader>Pozisyon</ProjectTableHeader>
                              <ProjectTableHeader>Görev Aldığı Proje</ProjectTableHeader>
                            </ProjectTableRow>
                          </ProjectTableHead>
                          <ProjectTableBody>
                            {projects.length === 0 ? (
                              <ProjectTableRow>
                                <ProjectTableData colSpan={3} className="d-flex p-2">Henüz Bir Proje Eklenmemiş</ProjectTableData>
                              </ProjectTableRow>
                            ) : (
                              projects.map((proj, idx) => (
                                <ProjectTableRow key={idx}>
                                  <ProjectTableData>{localStorage.getItem("username")}</ProjectTableData>
                                  <ProjectTableData>{proj.position}</ProjectTableData>
                                  <ProjectTableData>{proj.projectName}</ProjectTableData>
                                </ProjectTableRow>
                              ))
                            )}
                          </ProjectTableBody>
                        </ProjectTable>
                      </Section>
                      <Section>
                        <SectionTitle>Yetenekler</SectionTitle>
                        {skills.length === 0 ? (
                          <div className="d-flex p-2">Henüz Bir Yetenek Eklenmemiş</div>
                        ) : (
                          <table style={{ width: "100%" }}>
                            <tbody>
                              {skills.map((skill, idx) => (
                                <SkillRow key={idx}>
                                  <td>
                                    <i className="mdi mdi-circle-medium me-2"></i>
                                    {skill.softwareName}
                                  </td>
                                  <td>
                                    <ProgressBar>
                                      <div style={{ width: `${skill.degree}%` }} />
                                    </ProgressBar>
                                  </td>
                                </SkillRow>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </Section>
                    </Grid>
                  </>
                )}
                {activeTab === 'profile_education' && (
                  <Section>
                    <div className="d-flex justify-content-between align-items-center">
                      <SectionTitle>Eğitim Bilgileri</SectionTitle>

                    </div>
                    <Grid>
                      {educationData.length === 0 ? (
                        <p>Henüz eğitim bilgisi eklenmemiş</p>
                      ) : (
                        educationData.map((edu, index) => (
                          <EducationItem key={index}>
                            <FaUniversity className='mt-1 me-1' style={{ fontSize: 40 }} />
                            <EducationDetails>
                              <h5>{edu.universityName}</h5>
                              <p>{edu.section}</p>
                              <div>{new Date(edu.startDate).toLocaleDateString("tr", "TR")} • {new Date(edu.endDate).toLocaleDateString("tr", "TR")}</div>
                            </EducationDetails>
                          </EducationItem>
                        ))
                      )}
                    </Grid>
                  </Section>
                )}
                {activeTab === 'permission' && <PersonForPermisson />}
                {activeTab === 'deposit' && <PersonZimmetPage />}
                {activeTab === 'notice' && <PersonNoticePage />}
                {activeTab === 'profile_setting' && (
                  <div className='row'>
                    <div className='col-md-6'>

                      <FormCard>
                        <FormHeader>
                          <h4>Change Password</h4>
                        </FormHeader>
                        <FormBody>
                          <FormGroup>
                            <label>Eski Şifre</label>
                            <input
                              type="password"
                              value={passwords.oldPassword}
                              onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
                              placeholder="Old Password"
                            />
                          </FormGroup>
                          <FormGroup>
                            <label>Yeni Şifre</label>
                            <input
                              type="password"
                              value={passwords.newPassword}
                              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
                              placeholder="New Password"
                            />
                          </FormGroup>
                          <FormGroup>
                            <label>Tekrar Yeni Şifre</label>
                            <input
                              type="password"
                              value={passwords.confirmPassword}
                              onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })}
                              placeholder="Confirm Password"
                            />
                          </FormGroup>
                          <div className="d-flex justify-content-end">
                            <Button type="button" onClick={handlePasswordChange}>Şifreyi Değiştir</Button>
                          </div>
                        </FormBody>
                      </FormCard>


                    </div>
                  </div>



                )}
              </TabContent>
            </Card>
            <Footer>
              © {new Date().getFullYear()} - <a href="#!">SmartICT</a>
            </Footer>

            {/* Modal for Editing Profile */}
            <div className="modal fade" id="aboutModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="aboutModalLabel" aria-hidden="true">

              <div className="modal-dialog modal-lg modal-dialog-scrollable ">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="aboutModalLabel">Hakkımda Düzenle</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="aboutTextarea" className="form-label"><TbListDetails className='mt-1 me-1' /> Hakkımda</label>
                      <textarea
                        id="aboutTextarea"
                        className="form-control"
                        rows={4}
                        value={contacts.about}
                        onChange={handleAboutChange}
                      />
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6><LiaProjectDiagramSolid className='mt-1 me-1' /> Projeler</h6>
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={addProject}><FaPlus /> Ekle</button>
                    </div>
                    {projects.map((proj, idx) => (
                      <div key={idx} className="row g-2 align-items-end mb-3">
                        <div className="col-md-5">
                          <label htmlFor={`projName-${idx}`} className="form-label">Görev Aldığı Proje</label>
                          <input
                            type="text"
                            id={`projName-${idx}`}
                            className="form-control"
                            value={proj.projectName}
                            onChange={(e) => handleProjectChange(idx, 'projectName', e.target.value)}
                          />
                        </div>
                        <div className="col-md-5">
                          <label htmlFor={`projPos-${idx}`} className="form-label">Pozisyon</label>
                          <input
                            type="text"
                            id={`projPos-${idx}`}
                            className="form-control"
                            value={proj.position}
                            onChange={(e) => handleProjectChange(idx, 'position', e.target.value)}
                          />
                        </div>
                        <div className="col-md-2 mb-1">
                          <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => removeProject(idx, proj.id)}><MdDeleteOutline /> </button>
                        </div>
                      </div>
                    ))}
                    <hr />
                    <div className="mb-4">
                      <h6><LuContact className='mb-1 me-1' /> İletişim Bilgileri</h6>
                      <div className="row g-2">
                        <div className="col-md-4">
                          <label className="form-label">Telefon No</label>
                          <input
                            type="text"
                            className="form-control"
                            value={contacts.socialMedia}
                            onChange={(e) => handleContactChange('socialMedia', e.target.value)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            value={contacts.email}
                            onChange={(e) => handleContactChange('email', e.target.value)}
                          />
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Adres</label>
                          <input
                            type="text"
                            className="form-control"
                            value={contacts.location}
                            onChange={(e) => handleContactChange('location', e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6><FaCode className='me-1' /> Bildiği Yazılım Dilleri</h6>
                      <button type="button" className="btn btn-sm btn-outline-primary" onClick={addSkill}><FaPlus /> Ekle</button>
                    </div>
                    {skills.map((skill, idx) => (
                      <div key={idx} className="row g-2 mb-3">
                        <div className="col-md-5">
                          <label>Teknoloji Adı</label>
                          <input
                            className="form-control"
                            value={skill.softwareName}
                            onChange={e => handleSkillChange(idx, 'softwareName', e.target.value)}
                          />
                        </div>
                        <div className="col-md-5">
                          <label>Düzey ({skill.degree}%)</label>
                          <input
                            type="range"
                            className="form-range"
                            min={0}
                            max={100}
                            value={skill.degree}
                            onChange={e => handleSkillChange(idx, 'degree', e.target.value)}
                          />
                        </div>
                        <div className="col-md-2 mt-4">
                          <button onClick={() => removeSkill(idx, skill.id)} className="btn btn-sm btn-outline-danger">
                            <MdDeleteOutline />
                          </button>
                        </div>
                      </div>
                    ))}

                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Kapat</button>
                    <button type="button" className="btn btn-primary" onClick={handleUpdateProfile}><IoSaveOutline className='mb-1 me-1' /> Kaydet</button>
                  </div>
                </div>
              </div>
            </div>




          </PersonHomeContainer>
        </div>
      </div>
    </div>
  );
}

export default PersonHome;