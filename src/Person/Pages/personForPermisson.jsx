import React, { useEffect, useState } from "react";
import PersonMenu from "../items/personMenu";
import { FaPaperPlane } from "react-icons/fa";
import styled from "styled-components";
import { motion } from "framer-motion";
import axios from "axios";
import UsersApi from "../../Api/UsersApi";

// Styled components with added media queries
const PermissionPageContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const FormContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 157, 255, 0.5);
  padding: 20px;
  @media (max-width: 576px) {
    padding: 15px;
  }
`;

const FormLabel = styled.label`
  color: #2d3748;
  font-size: 0.85rem;
  margin-bottom: 5px;
  display: block;
  @media (max-width: 576px) {
    font-size: 0.75rem;
  }
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
  @media (max-width: 576px) {
    font-size: 0.75rem;
    padding: 6px;
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
  @media (max-width: 576px) {
    font-size: 0.75rem;
    padding: 6px;
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
  @media (max-width: 576px) {
    font-size: 0.75rem;
    padding: 6px;
  }
`;
const DateBadge = styled.div`
  background-color: #e2e8f0;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #2d3748;
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
  @media (max-width: 576px) {
    font-size: 0.75rem;
    padding: 6px 12px;
  }
`;

const TableCard = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 20px;
  @media (max-width: 576px) {
    padding: 15px;
  }
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
  @media (max-width: 576px) {
    font-size: 0.75rem;
    padding: 8px;
  }
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
  @media (max-width: 576px) {
    font-size: 0.75rem;
    padding: 8px;
  }
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 8px;
  @media (max-width: 576px) {
    width: 30px;
    height: 30px;
  }
`;

const Status = styled.span`
  color: ${(props) => (props.status === "ONAYLANDI" ? "#38a169" : "#e53e3e")};
  font-weight: 500;
`;

function PersonForPermission() {
  const [formData, setFormData] = useState({
    permissionDescription: "",
    permissionName: "",
    permissionStartDateTime: "",
    permissionEndDateTime: "",
  });
  const [permissionData1, setpermissionData1] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
  const fetchPermissions = async () => {
    try {
      const res = await axios.get(UsersApi.ENDPOINTS.GET_PERMISSION_FIND +`/${localStorage.getItem("username")}`, {
        headers: { Authorization: `Bearer ${UsersApi.TOKEN}` }
      });
      setpermissionData1(res.data || []);
    } catch (err) {
      console.error('Hata:', err.response?.data || err.message);
    }
  };


  const permissionData = {
    id: null,
    permissionName: formData.permissionName,
    permissionDescription: formData.permissionDescription,
    permissionStartDateTime: formData.permissionStartDateTime
      ? new Date(formData.permissionStartDateTime).toISOString().split('T')[0]
      : null,
    permissionEndDateTime: formData.permissionEndDateTime
      ? new Date(formData.permissionEndDateTime).toISOString().split('T')[0]
      : null,
    state: "Onay Bekliyor",
    Today: new Date().toISOString(),
    username: localStorage.getItem("username"),
    authorized: "Admin",
  };
  useEffect(()=>{
    fetchPermissions();
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
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
      });
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
      <PermissionPageContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
      
          <div className="row">
            <div className="col-md-4">
              <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}>
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
                    <FormLabel htmlFor="izinGerekcesi">İzin Gerekçesi</FormLabel>
                    <FormSelect
                      id="izinGerekcesi"
                      value={formData.permissionName}
                      onChange={handleChange}
                    >
                      <option value="" disabled>
                        Seçiniz...
                      </option>
                      <option value="Yıllık Ücretli İzin">Yıllık Ücretli İzin</option>
                      <option value="Hastalık İzni (Raporlu)">Hastalık İzni (Raporlu)</option>
                      <option value="Mazeret İzni (Evlilik)">Mazeret İzni (Evlilik)</option>
                      <option value="Mazeret İzni (Ölüm)">Mazeret İzni (Ölüm)</option>
                      <option value="Doğum İzni">Doğum İzni</option>
                      <option value="Babalık İzni">Babalık İzni</option>
                      <option value="Süt İzni">Süt İzni</option>
                      <option value="Adli İzin">Adli İzin (mahkeme, tanıklık gibi zorunlu durumlarda)</option>
                      <option value="Ücretsiz İzin">Ücretsiz İzin</option>
                      <option value="Askerlik İzni">Askerlik İzni</option>
                      <option value="Uzun Süreli Sağlık İzni">Uzun Süreli Sağlık İzni</option>
                      <option value="Doğum Sonrası Ücretsiz İzin">Doğum Sonrası Ücretsiz İzin</option>
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
                    <FormLabel htmlFor="bitisTarihi">Bitiş Tarihi</FormLabel>
                    <FormInput
                      type="date"
                      id="bitisTarihi"
                      value={formData.permissionEndDateTime}
                      onChange={handleChange}
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  {success && <div className="alert alert-success">{success}</div>}
                  <div className="text-center">
                    <SubmitButton type="submit" disabled={loading}>
                      <FaPaperPlane /> {loading ? "Gönderiliyor..." : "Gönder"}
                    </SubmitButton>
                  </div>
                </form>
              </FormContainer>
            </div>
            <div className="col-md-8">
              <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}>
                İzin Tablosu
              </h5>
              <TableCard>
                <PermissionTable>
                  <PermissionTableHead>
                    <tr>
                   
                      <PermissionTableHeader>Personel Ad</PermissionTableHeader>
                      <PermissionTableHeader>İzin Gerekçesi</PermissionTableHeader>
                      <PermissionTableHeader>Açıklama</PermissionTableHeader> 
                        <PermissionTableHeader>Gün</PermissionTableHeader>
                      <PermissionTableHeader>Tarih</PermissionTableHeader>
                      <PermissionTableHeader>Sonuç</PermissionTableHeader>
                    </tr>
                  </PermissionTableHead>
                  <PermissionTableBody>
                    {permissionData1.map((item) => {
                            const start = new Date(item.permissionStartDateTime);
                            const end   = new Date(item.permissionEndDateTime);
                            const days  = Math.ceil((end - start) / (1000*60*60*24));
                            const opts  = { day:'2-digit', month:'numeric', year:'numeric' };
                      return(
                      <PermissionTableRow key={item.id}>
                       
                        <PermissionTableData>{item.username}</PermissionTableData>
                        <PermissionTableData>{item.permissionName}</PermissionTableData>
                        <PermissionTableData>{item.permissionDescription}</PermissionTableData>
                        <PermissionTableData>
                          {days}
                        </PermissionTableData>
                        <PermissionTableData> 
                          <div className="d-flex align-items-center gap-2">
                      <DateBadge>{start.toLocaleDateString('tr-TR', opts)}</DateBadge>
                      <span>-</span>
                      <DateBadge>{end.toLocaleDateString('tr-TR', opts)}</DateBadge>
                    </div></PermissionTableData>
                        <PermissionTableData>
                          <Status status={item.state}>{item.state}</Status>
                        </PermissionTableData>
                      </PermissionTableRow>
                    )})}
                  </PermissionTableBody>
                </PermissionTable>
              </TableCard>
            </div>
          </div>
       
      </PermissionPageContainer>
    </div>
  );
}

export default PersonForPermission;