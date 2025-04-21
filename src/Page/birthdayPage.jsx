import React from 'react';
import Menu from '../item/menu';
import { CgProfile } from "react-icons/cg";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LiaBirthdayCakeSolid } from "react-icons/lia";
const BirthdayPageContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const BirthdayTitle = styled.h4`
  color: #1e40af;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 1.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
 
`;

const BirthdayTable = styled.table`
  width: 100%;
  border-collapse: collapse;
    @media (max-width: 768px) {
  
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const TableHead = styled.thead`
  background-color: #edf2f7;
    border-radius: 15px;
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
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
`;


const birthdayData = [
  { id: '#3413', name: 'Ubeyde', days: 82, image: 'src/images/okan.jpg' },
  { id: '#4125', name: 'Ege Cengiz', days: 93, image: 'src/images/ege.jpg' },
  { id: '#6532', name: 'Ziya', days: 56, image: 'src/images/profile.png' },
  { id: '#7405', name: 'Recep', days: 68, image: 'src/images/profile.png' },
  { id: '#4526', name: 'Berat', days: 52, image: 'src/images/profile.png' },
  { id: '#1054', name: 'Kevser', days: 45, image: 'src/images/profile.png' },
  { id: '#1054', name: 'Yaren', days: 45, image: 'src/images/profile.png' },
];

function BirthdayPage() {
  return (
    <BirthdayPageContainer
     
    
    >

<h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}><LiaBirthdayCakeSolid/> Doğum Günü Listesi</h5>
      <ContentWrapper>
        <Card >
          <BirthdayTable>
            <TableHead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Personel</TableHeader>
                <TableHeader>Gün</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              {birthdayData.map((person,index) => (
                <TableRow key={index}>
                  <TableData>
                    <a href="javascript:void(0);" className="text-reset">{person.id}</a>
                  </TableData>
                  <TableData>
                    <div className="d-flex align-items-center">
                      <ProfileImage src={person.image} alt={person.name} />
                      <span>{person.name}</span>
                    </div>
                  </TableData>
                  <TableData>{person.days}</TableData>
                </TableRow>
              ))}
            </TableBody>
          </BirthdayTable>
        </Card>
      </ContentWrapper>
    </BirthdayPageContainer>
  );
}

export default BirthdayPage;