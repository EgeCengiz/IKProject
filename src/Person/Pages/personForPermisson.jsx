import React, { useState } from "react";
import PersonMenu from "../items/personMenu";
import { FaPaperPlane } from "react-icons/fa";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios"; // axios'u import ettiğinizden emin olun
import UsersApi from "../../Api/UsersApi";

// Styled components (önceki kodunuzdan alındı, değiştirilmedi)
const PermissionPageContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 20px;
`;

const FormLabel = styled.label`
  color: #2d3748;
  font-size: 0.85rem;
  margin-bottom: 5px;
  display: block;
`;

const FormTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #2d3748;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #1e40af;
    box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.2);
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 8px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 0.85rem;
  color: #2d3748;
  background-color: #fff;
  &:focus {
    outline: none;
    border-color: #1e40af;
    box-shadow: 0 0 0 2px rgba(30, 64, 175, 0.2);
  }
`;

const FormInput = styled.input`
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
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: #1e40af;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  cursor: pointer;
  width: 100%;
  &:hover {
    background-color: #2c5282;
  }
`;

const TableCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 20px;
`;

const PermissionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    overflow-x: auto;   
    display: block;
    white-space: nowrap;
  }
`;

const PermissionTableHead = styled.thead`
  background-color: #edf2f7;
`;

const PermissionTableHeader = styled.th`
  padding: 10px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 500;
  color: #2c5282;
`;

const PermissionTableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #e2e8f0;
  }
  tr:last-child {
    border-bottom: none;
  }
`;

const PermissionTableRow = styled.tr`
  &:hover {
    background-color: #f7fafc;
  }
`;

const PermissionTableData = styled.td`
  padding: 10px;
  font-size: 0.85rem;
  color: #2d3748;
  vertical-align: middle;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
`;

const Status = styled.span`
  color: ${(props) => (props.status === "ONAYLANDI" ? "#38a169" : "#e53e3e")};
  font-weight: 500;
`;

// Örnek izin verileri (değiştirilmedi)
const permissionData1 = [
  {
    id: 1,
    personnel: "Ege Cengiz Ortakcı",
    reason: "Mazeret",
    description: "Orta",
    date: "30.03.2025",
    status: "ONAYLANDI",
    image: "../src/images/profile.png",
  },
  {
    id: 2,
    personnel: "Ege Cengiz Ortakcı",
    reason: "Mazeret",
    description: "Yüksek",
    date: "30.03.2025",
    status: "RED",
    image: "../src/images/profile.png",
  },
  {
    id: 3,
    personnel: "Ege Cengiz Ortakcı",
    reason: "Yıllık İzin",
    description: "Orta",
    date: "30.03.2025",
    status: "RED",
    image: "../src/images/profile.png",
  },
];

function PersonForPermission() {
  // Form verilerini tutmak için state
  const [formData, setFormData] = useState({
    permissionDescription: "",
    permissionName: "",
    permissionStartDateTime: "",
    permissionEndDateTime: "",
  });

  // Yükleme, hata ve başarı durumları için state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Form input değişikliklerini yönetme
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id === "izinAciklamasi"
        ? "permissionDescription"
        : id === "izinGerekcesi"
        ? "permissionName"
        : id === "baslangicTarihi"
        ? "permissionStartDateTime"
        : "permissionEndDateTime"]: value,
    }));
  };
// POST isteği için veri nesnesi
    const permissionData = {
      id: null, // Sunucu tarafından oluşturulacak
      permissionName: formData.permissionName,
      permissionDescription: formData.permissionDescription,
      permissionStartDateTime: formData.permissionStartDateTime
        ? new Date(formData.permissionStartDateTime).toISOString()
        : null,
      permissionEndDateTime: formData.permissionEndDateTime
        ? new Date(formData.permissionEndDateTime).toISOString()
        : null,
      state: "Onay Bekliyor",
      Today: new Date().toISOString(),
      username: "Ege Cengiz Ortakcı",
      authorized: "Okan Karaçor", 
    };
  // Form submit işlemi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      // POST isteği (axios.get yerine axios.post kullanıyoruz)
      const response = await axios.post(
        UsersApi.ENDPOINTS.POST_PERMISSION_PERSON,
        permissionData,
        {
          headers: {
            Authorization: "Bearer " + UsersApi.TOKEN,
          },
        }
      );

      setSuccess("İzin talebi başarıyla oluşturuldu!");
      setFormData({
        permissionDescription: "",
        permissionName: "",
        permissionStartDateTime: "",
        permissionEndDateTime: "",
      }); // Formu sıfırla
      console.log(permissionData);
      console.log("Yanıt:", response.data);
    } catch (error) {
      console.log(permissionData);
      setError("İzin talebi oluşturulurken bir hata oluştu: " + error.message);
      console.error("Hata:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PersonMenu />
      <div className="content-page">
        <div className="content">
          <div className="container-xxl">
            <br />
            <PermissionPageContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ContentWrapper>
                <div className="row">
                  <div className="col-md-4">
                    <h5
                      className="card-title mb-2 mt-2"
                      style={{ color: "#4a5a6b" }}
                    >
                      İzin Talep Formu
                    </h5>
                    <FormContainer>
                      <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <FormLabel htmlFor="izinAciklamasi">
                            İzin Açıklaması
                          </FormLabel>
                          <FormTextarea
                            id="izinAciklamasi"
                            rows="3"
                            placeholder="İzin açıklamanızı buraya yazın..."
                            value={formData.permissionDescription}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <FormLabel htmlFor="izinGerekcesi">
                            İzin Gerekçesi
                          </FormLabel>
                          <FormSelect
                            id="izinGerekcesi"
                            value={formData.permissionName}
                            onChange={handleChange}
                          >
                            <option value="" disabled>
                              Seçiniz...
                            </option>
                            <option value="bayram">Bayram İzni</option>
                            <option value="mazeret">Mazeret İzni</option>
                            <option value="yillik">Yıllık İzin</option>
                            <option value="ucretli">Ücretli İzin</option>
                            <option value="ucretsiz">Ücretsiz İzin</option>
                            <option value="kisa">Kısa Süreli İzin</option>
                          </FormSelect>
                        </div>
                        <div className="mb-3">
                          <FormLabel htmlFor="baslangicTarihi">
                            Başlangıç Tarihi
                          </FormLabel>
                          <FormInput
                            type="date"
                            id="baslangicTarihi"
                            value={formData.permissionStartDateTime}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-3">
                          <FormLabel htmlFor="bitisTarihi">
                            Bitiş Tarihi
                          </FormLabel>
                          <FormInput
                            type="date"
                            id="bitisTarihi"
                            value={formData.permissionEndDateTime}
                            onChange={handleChange}
                          />
                        </div>
                        {error && (
                          <div className="alert alert-danger">{error}</div>
                        )}
                        {success && (
                          <div className="alert alert-success">{success}</div>
                        )}
                        <div className="text-center">
                          <SubmitButton type="submit" disabled={loading}>
                            <FaPaperPlane />{" "}
                            {loading ? "Gönderiliyor..." : "Gönder"}
                          </SubmitButton>
                        </div>
                      </form>
                    </FormContainer>
                  </div>
                  <div className="col-md-8">
                    <h5
                      className="card-title mb-2 mt-2"
                      style={{ color: "#4a5a6b" }}
                    >
                      İzin Tablosu
                    </h5>
                    <TableCard>
                      <PermissionTable>
                        <PermissionTableHead>
                          <tr>
                            <PermissionTableHeader>#</PermissionTableHeader>
                            <PermissionTableHeader>
                              Personel Ad
                            </PermissionTableHeader>
                            <PermissionTableHeader>
                              İzin Gerekçesi
                            </PermissionTableHeader>
                            <PermissionTableHeader>
                              Açıklama
                            </PermissionTableHeader>
                            <PermissionTableHeader>Tarih</PermissionTableHeader>
                            <PermissionTableHeader>Sonuç</PermissionTableHeader>
                          </tr>
                        </PermissionTableHead>
                        <PermissionTableBody>
                          {permissionData1.map((item) => (
                            <PermissionTableRow key={item.id}>
                              <PermissionTableData>
                                <ProfileImage
                                  src={item.image}
                                  alt="profile"
                                />
                              </PermissionTableData>
                              <PermissionTableData>
                                {item.personnel}
                              </PermissionTableData>
                              <PermissionTableData>
                                {item.reason}
                              </PermissionTableData>
                              <PermissionTableData>
                                {item.description}
                              </PermissionTableData>
                              <PermissionTableData>
                                {item.date}
                              </PermissionTableData>
                              <PermissionTableData>
                                <Status status={item.status}>
                                  {item.status}
                                </Status>
                              </PermissionTableData>
                            </PermissionTableRow>
                          ))}
                        </PermissionTableBody>
                      </PermissionTable>
                    </TableCard>
                  </div>
                </div>
              </ContentWrapper>
            </PermissionPageContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PersonForPermission;