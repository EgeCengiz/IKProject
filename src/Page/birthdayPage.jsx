import React, { useEffect, useState } from 'react';
import Menu from '../item/menu';
import { CgProfile } from "react-icons/cg";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { FaBirthdayCake } from "react-icons/fa";
// Container
const BirthdayPageContainer = styled(motion.div)`
  padding: 0 10% 0 0;
  display: flex;
  flex-direction: column;
    @media (max-width: 768px) {
     padding: 0 0 0 0;
    }
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
  width: 100%;
`;

// Table: keep desktop layout, only enable scrolling on mobile
const BirthdayTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
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

function BirthdayPage() {
  const [birthdayData, setBirthdayData] = useState([]);
  const [error, setError] = useState(null);
  const defaultImageUrl = '../src/images/profile.png';

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const response = await axios.get(UsersApi.ENDPOINTS.GET_USERS_BIRTHDAY, {
          headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
        });
        const users = response.data;

        const usersWithImages = await Promise.all(
          users.map(async (user) => {
            try {
              const imgRes = await axios.get(
                `${UsersApi.ENDPOINTS.GET_USERS_IMAGE}?username=${encodeURIComponent(user.username)}`,
                {
                  headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
                  responseType: 'blob',
                }
              );
              const imageUrl = URL.createObjectURL(imgRes.data);
              return {
                id: `#30${user.id}`,
                name: user.username,
                days: user.daysUntilBirthday,
                image: imageUrl,
              };
            } catch (imgError) {
              console.error(`Error fetching image for ${user.username}:`, imgError);
              return {
                id: `#30${user.id}`,
                name: user.username,
                days: user.daysUntilBirthday,
                image: defaultImageUrl,
              };
            }
          })
        );

        usersWithImages.sort((a, b) => a.days - b.days);
        setBirthdayData(usersWithImages);
      } catch (err) {
        console.error('Error fetching birthdays:', err);
        setError(err.message || 'Error loading birthdays');
      }
    };

    fetchBirthdays();
  }, []);

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }

  return (
    <BirthdayPageContainer>
 
  <h6 style={{ color: '#4a5a6b', width: '100%', padding: '10px' }}>
  <LiaBirthdayCakeSolid />  Doğum Günü Listesi
      </h6>
      <ContentWrapper>
        <Card>
          <BirthdayTable>
            <TableHead>
              <tr>
                <TableHeader>ID</TableHeader>
                <TableHeader>Personel</TableHeader>
                <TableHeader>Gün</TableHeader>
              </tr>
            </TableHead>

            <TableBody>
              {birthdayData.map((person) => (
                   <TableRow key={person.id}>
                  <TableData>
                    <a href="#" className="text-reset">
                      {person.id}
                    </a>
                  </TableData>
                  <TableData>
                    <div className="d-flex align-items-center">
                      <ProfileImage src={person.image} alt={person.name} />
                      <span>{person.name}</span>
                    </div>
                  </TableData>
                 {person.days=="0"? <TableData>
                  <FaBirthdayCake className='m-1 ' style={{fontSize:18, color:"blue"}}/>
               </TableData>:<TableData>{person.days}</TableData>}
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