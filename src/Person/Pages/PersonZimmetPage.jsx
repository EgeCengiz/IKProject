import React, { useEffect, useState } from 'react';
import PersonMenu from '../items/personMenu';
import { PiClockCountdown } from 'react-icons/pi';
import { FaRegCircleCheck } from 'react-icons/fa6';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import UsersApi from '../../Api/UsersApi';
import axios from 'axios';

// Responsive Styled Components
const ZimmetPageContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;

  @media (max-width: 576px) {
    padding: 10px;
  }
`;

const CardWrapper = styled.div`
  margin: 0 auto 20px;
  width: 100%;
  max-width: 800px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const CardBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px;

  @media (max-width: 576px) {
    flex-direction: column;
    align-items: center;
  }
`;

const DateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-right: 16px;
  border-right: 2px solid #dee2e6;
  background-color: #f8f9fa;
  border-radius: 10px;
  min-width: 80px;

  @media (max-width: 576px) {
    margin-right: 0;
    border-right: none;
    border-bottom: 2px solid #dee2e6;
    margin-bottom: 8px;
  }
`;

const Day = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Month = styled.div`
  font-size: 14px;
`;

const Year = styled.div`
  font-size: 18px;
  font-weight: 500;
`;

const InfoSection = styled.div`
  flex: 1;
  min-width: 0;
`;

const InfoRow = styled.div`
  font-size: 14px;
  margin-bottom: 6px;
`;

const StateBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px;
  margin-left: 16px;
  border-left: 2px solid #dee2e6;
  background-color: #f8f9fa;
  border-radius: 10px;
  min-width: 90px;

  @media (max-width: 576px) {
    margin-left: 0;
    border-left: none;
    border-top: 2px solid #dee2e6;
    margin-top: 8px;
  }
`;

function PersonZimmetPage() {
  const [depositData, setDepositData] = useState([]);

  const getAllDeposit = async () => {
    try {
      const response = await axios.get(
        `${UsersApi.ENDPOINTS.GET_DEPOSIT_ALL}/${localStorage.getItem('username')}`,
        { headers: { Authorization: `Bearer ${UsersApi.TOKEN}` } }
      );
      setDepositData(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllDeposit();
  }, []);

  const turkishMonths = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  return (
    <div>
    
      <ZimmetPageContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {depositData.map((item) => {
          const date = new Date(item.date);
          const day = String(date.getDate()).padStart(2, '0');
          const monthName = turkishMonths[date.getMonth()];
          const year = date.getFullYear();

          return (
            <CardWrapper key={item.id}>
              <CardBody>
                <DateBox>
                  <Day>{day}</Day>
                  <Month>{monthName}</Month>
                  <Year>{year}</Year>
                </DateBox>

                <InfoSection>
                  <InfoRow><b>Zimmet Adı:</b> {item.name}</InfoRow>
                  <InfoRow><b>Önem Derecesi:</b> {item.degreeName}</InfoRow>
                  <InfoRow><b>Açıklama:</b> {item.description}</InfoRow>
                </InfoSection>

                <StateBox>
                  {item.state == null ? (
                    <>
                      <PiClockCountdown size={27} />
                      <div style={{ fontSize: 12 }}>Devam Ediyor</div>
                    </>
                  ) : (
                    <>
                      <FaRegCircleCheck size={27} />
                      <div style={{ fontSize: 12 }}>Teslim Edildi</div>
                    </>
                  )}
                </StateBox>
              </CardBody>
            </CardWrapper>
          );
        })}
      </ZimmetPageContainer>
    </div>
  );
}

export default PersonZimmetPage;
