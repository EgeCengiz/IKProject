
import React from 'react';
import PersonMenu from '../items/personMenu';
import { TbListDetails } from 'react-icons/tb';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components based on BirthdayPage design
const ZimmetPageContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  flex: 1;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
margin: 0 20px 0 20px;
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
  font-size: 1.25rem;
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

const ZimmetTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    overflow-x: auto;
    white-space: nowrap;
    display: block;
  }
`;

const ZimmetTableHead = styled.thead`
  background-color: #edf2f7;
`;

const ZimmetTableHeader = styled.th`
  padding: 10px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 500;
  color: #2c5282;
`;

const ZimmetTableBody = styled.tbody`
  tr {
    border-bottom: 1px solid #e2e8f0;
  }
  tr:last-child {
    border-bottom: none;
  }
`;

const ZimmetTableRow = styled.tr`
  &:hover {
    background-color: #f7fafc;
  }
`;

const ZimmetTableData = styled.td`
  padding: 10px;
  font-size: 0.85rem;
  color: #2d3748;
  vertical-align: middle;
`;


const ActionIcon = styled(TbListDetails)`
  color: #1e40af;
  cursor: pointer;
  &:hover {
    color: #2c5282;
  }
`;

// Sample zimmet data (replace with actual data source)
const zimmetData = [
  {
    id: 1,
    personnel: 'Ege Cengiz Ortakcı',
    item: '17 Numaralı Bilgisayar',
    degree: 'Orta',
    date: '30.03.2025',
    image: 'src/images/profile.png',
  },
  {
    id: 2,
    personnel: 'Ege Cengiz Ortakcı',
    item: 'Sunucu',
    degree: 'Yüksek',
    date: '30.03.2025',
    image: 'src/images/profile.png',
  },
  {
    id: 3,
    personnel: 'Ege Cengiz Ortakcı',
    item: '14 Numaralı Bilgisayar',
    degree: 'Orta',
    date: '30.03.2025',
    image: 'src/images/profile.png',
  },
];

function PersonZimmetPage() {
  return (

    <div>
    <PersonMenu />
    <div class="content-page">

      <div class="content">
        <div class="container-xxl">
          <br></br>
              <ZimmetPageContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
    <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}>Zimmet Tablosu</h5>
    <br></br>
      <ContentWrapper>
        <Card>
        
          <ZimmetTable>
            <ZimmetTableHead>
              <tr>
                <ZimmetTableHeader>#</ZimmetTableHeader>
                <ZimmetTableHeader>Personel Ad</ZimmetTableHeader>
                <ZimmetTableHeader>Zimmet Edilen Eşya</ZimmetTableHeader>
                <ZimmetTableHeader>Derece</ZimmetTableHeader>
                <ZimmetTableHeader>Tarih</ZimmetTableHeader>
                <ZimmetTableHeader>Aksiyon</ZimmetTableHeader>
              </tr>
            </ZimmetTableHead>
            <ZimmetTableBody>
              {zimmetData.map((item) => (
                <ZimmetTableRow key={item.id}>
                  <ZimmetTableData>
                  <ZimmetTableData>#{item.id}</ZimmetTableData>
                  </ZimmetTableData>
                  <ZimmetTableData>{item.personnel}</ZimmetTableData>
                  <ZimmetTableData>{item.item}</ZimmetTableData>
                  <ZimmetTableData>{item.degree}</ZimmetTableData>
                  <ZimmetTableData>{item.date}</ZimmetTableData>
                  <ZimmetTableData>
                    <ActionIcon />
                  </ZimmetTableData>
                </ZimmetTableRow>
              ))}
            </ZimmetTableBody>
          </ZimmetTable>
        </Card>
      </ContentWrapper>
    </ZimmetPageContainer>
          </div>
          </div>
          </div>
</div>

  );
}

export default PersonZimmetPage;
