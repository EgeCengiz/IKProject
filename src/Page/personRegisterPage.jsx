import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBriefcase, FaCamera, FaGraduationCap, FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';

const RegisterPageContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Card = styled(motion.div)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 15px;
  flex: 1;
`;

const FormGroup = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #2c5282;
  font-size: 0.85rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Input = styled.input`
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

const ButtonGroup = styled.div`
  text-align: right;
  display: flex;
  justify-content: end;
`;

const SaveButton = styled.button`
  padding: 8px 16px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #2b6cb0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.3);
  }
`;

const AddButton = styled.button`
  padding: 6px 12px;
  background-color: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
  margin-top: 10px;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #3182ce;
  }
`;

const RemoveButton = styled.button`
  padding: 6px 12px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 500;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #c53030;
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 10px;
`;

const ErrorMessage = styled.p`
  color: #e53e3e;
  font-size: 0.8rem;
  margin-top: 5px;
`;

const cardVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function PersonRegisterPage() {
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [userData, setUserData] = useState({
    username: '',
    userImage: profilePicture,
    email: '',
    password: '',
    phone: '',
    role: '',
    createDate: '',
    birthDate: '',
    position: '',
  });

  const [userDataEducation, setUserDataEducation] = useState([
    {
      universityName: '',
      degree: '',
      section: '',
      location: '',
      startDate: '',
      endDate: '',
      username: userData.username,
    },
  ]);

  // Personel bilgisi değişikliklerini yönet
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  // Eğitim bilgisi değişikliklerini yönet
  const handleEducationChange = (index, field, value) => {
    setUserDataEducation((prev) => {
      const newEducations = [...prev];
      newEducations[index] = { ...newEducations[index], [field]: value, username: userData.username };
      return newEducations;
    });
  };

  // Profil resmi seçimi
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        setError('Sadece JPG, PNG veya GIF dosyaları kabul edilir.');
        setProfilePicture(null);
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Dosya boyutu 5MB\'tan büyük olamaz.');
        setProfilePicture(null);
        return;
      }
      setError('');
      setProfilePicture(file);
    }
  };

  // Eğitim ekleme
  const addEducation = () => {
    setUserDataEducation((prev) => [
      ...prev,
      {
        universityName: '',
        degree: '',
        section: '',
        location: '',
        startDate: '',
        endDate: '',
        username: userData.username,
      },
    ]);
  };

  // Eğitim silme

  const removeEducation = (index) => {
    setUserDataEducation((prev) => prev.filter((_, i) => i !== index));
  };


  //Personel Images
  const addPersonImages = async(username)=>{
  
         const formData = new FormData();
      formData.append("file", profilePicture);
      formData.append("username",username);

      let responseImages;
      try {
        responseImages = await axios.put(UsersApi.ENDPOINTS.PUT_USERS_IMAGES_ADD, formData, {
          headers: {
            Authorization: 'Bearer ' + UsersApi.TOKEN,
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(responseImages.data);
      } catch (err) {
        console.error("Upload failed", err);
        responseImages = null;
      }

  }


  // Personel Ekle
  const addPersonData = async () => {
    try {
      const responseUsers = await axios.post(
        UsersApi.ENDPOINTS.POST_USERS_ADD,
        userData,
        {
          headers: {
            Authorization: 'Bearer ' + UsersApi.TOKEN,
          },
        }
      );
      console.log("User data:", userData);
  
      if (responseUsers.status === 200 || responseUsers.status === 201) {
        await addPersonImages(userData.username); // Await image upload
  
        const responseEducation = await axios.post(
          UsersApi.ENDPOINTS.POST_USERS_EDUCATION_ADD,
          userDataEducation,
          {
            headers: {
              Authorization: 'Bearer ' + UsersApi.TOKEN,
            },
          }
        );
  
        if (responseEducation.status === 200 || responseEducation.status === 201) {
          const userDetails = {
            about: "Hakkımızda Kısmını doldurunuz..",
            socialMedia: '',
            location: "Adress giriniz..",
            speaks: "Türkçe",
            email: "mail giriniz..",
            position: "Pozisyon giriniz..",
            username: userData.username  
          };
  
          const responseDetails = await axios.post(
            UsersApi.ENDPOINTS.POST_PERSON_DETAILS,
            userDetails,
            {
              headers: {
                Authorization: 'Bearer ' + UsersApi.TOKEN,
              },
            }
          );

          const shiftDetails={
            username: userData.username  ,
            email: "",
            position: "",
            createDate: new Date(),
            permissionYear: 0,
            pricePermission: 0,
            permission: 0
          }

          const responseShift = await axios.post(UsersApi.ENDPOINTS.POST_SHIFT,shiftDetails,{
            headers:{
              Authorization:'Bearer '+UsersApi.TOKEN
            }
          });

          console.log(responseShift.data);



        } else {
          console.error("Eğitim bilgisi eklenemedi");
        }
      } else {
        console.error("Kullanıcı eklenemedi");
      }
    } catch (error) {
      console.error("Hata:", error.response ? error.response.data : error.message);
      throw error; // Re-throw for handleSubmit to catch
    }
  };

  // Form gönderimi
  const handleSubmit = async () => {
    if (!userData.username || !userData.email || !userData.position) {
      setError('Ad, email ve pozisyon alanları zorunludur.');
      return;
    }

    if (
      userDataEducation.some(
        (edu) =>
          !edu.universityName ||
          !edu.degree ||
          !edu.section ||
          !edu.location ||
          !edu.startDate ||
          !edu.endDate
      )
    ) {
      setError('Tüm eğitim bilgileri doldurulmalıdır.');
      return;
    }

    try {
      await addPersonData();
      alert('Personel başarıyla kaydedildi!');
      setUserData({
        username: '',
        email: '',
        password: '',
        phone: '',
        role: '',
        createDate: '',
        birthDate: '',
        position: '',
      });
      setUserDataEducation([
        {
          universityName: '',
          degree: '',
          section: '',
          location: '',
          startDate: '',
          endDate: '',
          username: '',
        },
      ]);
      setProfilePicture(null);
      setError('');
    } catch (error) {
      console.error('Hata:', error.response ? error.response.data : error.message);
      setError('Personel kaydedilirken bir hata oluştu.');
    }
  };

  return (
    <StyleSheetManager shouldForwardProp={isPropValid}>
      <div className="content-page">
        <div className="content">
          <div className="container-xxl">
            <br />
            <RegisterPageContainer initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h5 className="card-title mb-2 mt-2" style={{ color: '#4a5a6b' }}>
                Personel Kayıt
              </h5>
              <ContentWrapper>
                <Card variants={cardVariants} initial="initial" animate="animate" exit="exit">
                  <FormGroup>
                    <Label htmlFor="profilePicture">
                      <FaCamera /> Profil Resmi
                    </Label>
                    <Input
                      type="file"
                      id="profilePicture"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                    />
                    {profilePicture && (
                      <ProfileImage src={URL.createObjectURL(profilePicture)} alt="Profil Resmi" />
                    )}
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="username">
                      <FaUser /> Ad Soyad
                    </Label>
                    <Input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Personel Ad Soyad Giriniz.."
                      value={userData.username}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="email">
                      <FaEnvelope /> Email
                    </Label>
                    <Input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Personel Mail Giriniz.."
                      value={userData.email}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="password">
                      <FaLock /> Şifre
                    </Label>
                    <Input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="Şifrenizi giriniz"
                      value={userData.password}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="position">
                      <FaBriefcase /> Pozisyon
                    </Label>
                    <Select id="position" name="position" value={userData.position} onChange={handleInputChange}>
  <option value="">Pozisyon Seçiniz</option>
  <option value="Aşçı">Aşçı</option>
  <option value="Backend Developer">Backend Developer</option>
  <option value="Barista">Barista</option>
  <option value="Bilgi Teknolojileri Uzmanı">Bilgi Teknolojileri Uzmanı</option>
  <option value="Biyolog">Biyolog</option>
  <option value="Doktor">Doktor</option>
  <option value="Eğitimci">Eğitimci</option>
  <option value="Elektrik Mühendisi">Elektrik Mühendisi</option>
  <option value="Finans Analisti">Finans Analisti</option>
  <option value="Frontend Developer">Frontend Developer</option>
  <option value="Garson">Garson</option>
  <option value="Grafik Tasarımcı">Grafik Tasarımcı</option>
  <option value="Halkla İlişkiler Uzmanı">Halkla İlişkiler Uzmanı</option>
  <option value="Hemşire">Hemşire</option>
  <option value="IK (İnsan Kaynakları)">IK (İnsan Kaynakları)</option>
  <option value="İnşaat Mühendisi">İnşaat Mühendisi</option>
  <option value="Kimyager">Kimyager</option>
  <option value="Komi">Komi</option>
  <option value="Lojistik Uzmanı">Lojistik Uzmanı</option>
  <option value="Makine Mühendisi">Makine Mühendisi</option>
  <option value="Mimar">Mimar</option>
  <option value="Muhasebeci">Muhasebeci</option>
  <option value="Mühendis">Mühendis</option>
  <option value="Müdür">Müdür</option>
  <option value="Müdür Yardımcısı">Müdür Yardımcısı</option>
  <option value="Operasyon Yöneticisi">Operasyon Yöneticisi</option>
  <option value="Pazarlama Uzmanı">Pazarlama Uzmanı</option>
  <option value="Personel">Personel</option>
  <option value="Proje Yöneticisi">Proje Yöneticisi</option>
  <option value="Psikolog">Psikolog</option>
  <option value="Resepsiyonist">Resepsiyonist</option>
  <option value="Satış Temsilcisi">Satış Temsilcisi</option>
  <option value="Siber Güvenlik Uzmanı">Siber Güvenlik Uzmanı</option>
  <option value="Sosyal Medya Yöneticisi">Sosyal Medya Yöneticisi</option>
  <option value="Şoför">Şoför</option>
  <option value="Takım Lideri">Takım Lideri</option>
  <option value="Tasarımcı">Tasarımcı</option>
  <option value="Teknisyen">Teknisyen</option>
  <option value="UX Tasarımcı">UX Tasarımcı</option>
  <option value="Veri Analisti">Veri Analisti</option>
  <option value="Web Geliştirici">Web Geliştirici</option>
  <option value="Yazılım Geliştirici">Yazılım Geliştirici</option>
  <option value="Yetkili">Yetkili</option>
  <option value="Yetkili">Diğer</option>
</Select>
                  
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="phone">
                      <FaPhone /> Telefon
                    </Label>
                    <Input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="Personel Telefon Numarası Giriniz.."
                      value={userData.phone}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="role">
                      <FaBriefcase /> Rol
                    </Label>
                    <Select id="role" name="role" value={userData.role} onChange={handleInputChange}>
                      <option value="">Rol Seçiniz</option>
                      <option value="Admin">Admin (Tüm Yetkilere Sahip)</option>
                      <option value="Yonetici">Yönetici (Yetki Sahibi)</option>
                      <option value="IK">IK (İnsan Kaynakları Personeli)</option>
                      <option value="Personel">Personel (Kısıtlı Erişim)</option>
                    
                     
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="createDate">
                      <FaBriefcase /> İşe Başlama Tarihi
                    </Label>
                    <Input
                      type="date"
                      id="createDate"
                      name="createDate"
                      value={userData.createDate}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label htmlFor="birthDate">
                      <FaUser /> Doğum Tarihi
                    </Label>
                    <Input
                      type="date"
                      id="birthDate"
                      name="birthDate"
                      value={userData.birthDate}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Card>
                <Card variants={cardVariants} initial="initial" animate="animate" exit="exit">
                  <FormGroup>
                    <Label>
                      <FaGraduationCap /> Eğitim Bilgileri
                    </Label>
                    {userDataEducation.map((edu, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: '12px',
                          border: '1px solid #e2e8f0',
                          borderRadius: '6px',
                          padding: '10px',
                        }}
                      >
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <FormGroup style={{ flex: 1 }}>
                            <Label>Üniversite Adı</Label>
                            <Input
                              type="text"
                              placeholder="Üniversite adını giriniz"
                              value={edu.universityName}
                              onChange={(e) => handleEducationChange(index, 'universityName', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup style={{ flex: 1 }}>
                            <Label>Derece</Label>
                            <Input
                              type="text"
                              placeholder="Dereceyi giriniz"
                              value={edu.degree}
                              onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                            />
                          </FormGroup>
                        </div>
                        <FormGroup>
                          <Label>Bölüm</Label>
                          <Input
                            type="text"
                            placeholder="Bölümü giriniz"
                            value={edu.section}
                            onChange={(e) => handleEducationChange(index, 'section', e.target.value)}
                          />
                        </FormGroup>
                        <FormGroup>
                          <Label>Konum</Label>
                          <Input
                            type="text"
                            placeholder="Konum giriniz"
                            value={edu.location}
                            onChange={(e) => handleEducationChange(index, 'location', e.target.value)}
                          />
                        </FormGroup>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <FormGroup style={{ flex: 1 }}>
                            <Label>Başlama Tarihi</Label>
                            <Input
                              type="date"
                              value={edu.startDate}
                              onChange={(e) => handleEducationChange(index, 'startDate', e.target.value)}
                            />
                          </FormGroup>
                          <FormGroup style={{ flex: 1 }}>
                            <Label>Bitirme Tarihi</Label>
                            <Input
                              type="date"
                              value={edu.endDate}
                              onChange={(e) => handleEducationChange(index, 'endDate', e.target.value)}
                            />
                          </FormGroup>
                        </div>
                        {userDataEducation.length > 1 && (
                          <RemoveButton onClick={() => removeEducation(index)}>
                            <FaTrash /> Sil
                          </RemoveButton>
                        )}
                      </div>
                    ))}
                    <AddButton onClick={addEducation}>
                      <FaPlus /> Eğitim Ekle
                    </AddButton>
                  </FormGroup>
                  {error && <ErrorMessage>{error}</ErrorMessage>}
                  <ButtonGroup>
                    <SaveButton onClick={handleSubmit}>Kaydet</SaveButton>
                  </ButtonGroup>
                </Card>
              </ContentWrapper>
            </RegisterPageContainer>
          </div>
        </div>
      </div>
    </StyleSheetManager>
  );
}

export default PersonRegisterPage;