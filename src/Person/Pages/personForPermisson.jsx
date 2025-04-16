
import React from 'react';
import PersonMenu from '../items/personMenu';
import { FaPaperPlane } from 'react-icons/fa';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components based on BirthdayPage design
const PermissionPageContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.4fr;
  gap: 20px;
  @media (max-width: 992px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 15px;
`;

const Title = styled.h4`
  color: #1e40af;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 15px;
`;

const FormContainer = styled(Card)`
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

const TableCard = styled(Card)`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
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

const PermissionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    overflow-x: auto;
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
  color: ${props => props.status === 'ONAYLANDI' ? '#38a169' : '#e53e3e'};
  font-weight: 500;
`;

const postPermission= async ()=>{

  //Kullanıcı İzin Talebi gönderebilecek
  



}


// Sample permission data (replace with actual data source)
const permissionData = [
  {
    id: 1,
    personnel: 'Ege Cengiz Ortakcı',
    reason: 'Mazeret',
    description: 'Orta',
    date: '30.03.2025',
    status: 'ONAYLANDI',
    image: '../src/images/profile.png',
  },
  {
    id: 2,
    personnel: 'Ege Cengiz Ortakcı',
    reason: 'Mazeret',
    description: 'Yüksek',
    date: '30.03.2025',
    status: 'RED',
    image: '../src/images/profile.png',
  },
  {
    id: 3,
    personnel: 'Ege Cengiz Ortakcı',
    reason: 'Yıllık İzin',
    description: 'Orta',
    date: '30.03.2025',
    status: 'RED',
    image: '../src/images/profile.png',
  },
];

function PersonForPermission() {
  return (
    <div>
      <PersonMenu />
      <div className="content-page">
        <div className="content">
          <div className="container-xxl">
            <br></br>
            <PermissionPageContainer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >

              <ContentWrapper>

                <div className='row'>
                  <div className='col-md-4'>
                    <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}>İzin Talep Formu</h5>
                    <FormContainer>

                      <form>
                        <div className="mb-3">
                          <FormLabel htmlFor="izinAciklamasi">İzin Açıklaması</FormLabel>
                          <FormTextarea
                            id="izinAciklamasi"
                            rows="3"
                            placeholder="İzin açıklamanızı buraya yazın..."
                          ></FormTextarea>
                        </div>
                        <div className="mb-3">
                          <FormLabel htmlFor="izinGerekcesi">İzin Gerekçesi</FormLabel>
                          <FormSelect id="izinGerekcesi" defaultValue="">
                            <option value="" disabled>Seçiniz...</option>
                            <option value="bayram">Bayram İzni</option>
                            <option value="mazeret">Mazeret İzni</option>
                            <option value="yillik">Yıllık İzin</option>
                            <option value="ucretli">Ücretli İzin</option>
                            <option value="ucretsiz">Ücretsiz İzin</option>
                            <option value="kisa">Kısa Süreli İzin</option>
                          </FormSelect>
                        </div>
                        <div className="mb-3">
                          <FormLabel htmlFor="baslangicTarihi">Başlangıç Tarihi</FormLabel>
                          <FormInput type="date" id="baslangicTarihi" />
                        </div>
                        <div className="mb-3">
                          <FormLabel htmlFor="bitisTarihi">Bitiş Tarihi</FormLabel>
                          <FormInput type="date" id="bitisTarihi" />
                        </div>
                        <div className="text-center">
                          <SubmitButton type="submit">
                            <FaPaperPlane /> Gönder
                          </SubmitButton>
                        </div>
                      </form>
                    </FormContainer>
                  </div>
                  <div className='col-md-8'>
                  <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}>İzin Tablosu</h5>
                    <TableCard>
                      
                      <PermissionTable>
                        <PermissionTableHead>
                          <tr>
                            <PermissionTableHeader>#</PermissionTableHeader>
                            <PermissionTableHeader>Personel Ad</PermissionTableHeader>
                            <PermissionTableHeader>İzin Gerekçesi</PermissionTableHeader>
                            <PermissionTableHeader>Açıklama</PermissionTableHeader>
                            <PermissionTableHeader>Tarih</PermissionTableHeader>
                            <PermissionTableHeader>Sonuç</PermissionTableHeader>
                          </tr>
                        </PermissionTableHead>
                        <PermissionTableBody>
                          {permissionData.map((item) => (
                            <PermissionTableRow key={item.id}>
                              <PermissionTableData>
                                <ProfileImage src={item.image} alt="profile" />
                              </PermissionTableData>
                              <PermissionTableData>{item.personnel}</PermissionTableData>
                              <PermissionTableData>{item.reason}</PermissionTableData>
                              <PermissionTableData>{item.description}</PermissionTableData>
                              <PermissionTableData>{item.date}</PermissionTableData>
                              <PermissionTableData>
                                <Status status={item.status}>{item.status}</Status>
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
