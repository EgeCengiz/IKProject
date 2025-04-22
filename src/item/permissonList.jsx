import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { FaSearch } from "react-icons/fa";
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PermissionPageContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const PermissionTitle = styled.h4`
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

const Card = styled(motion.div)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 15px;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const SearchInput = styled.input`
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

const SearchIcon = styled(FaSearch)`
  color: #4299e1;
  margin-left: 10px;
  font-size: 1rem;
`;

const PermissionTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    /* Küçük ekranlarda tabloyu kaydırılabilir yap */
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const TableHead = styled.thead`
  background-color: #edf2f7;
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

const DateBadge = styled.div`
  background-color: #e2e8f0;
  padding: 5px 10px;
  border-radius: 6px;
  font-size: 0.8rem;
  color: #2d3748;
`;

const cardVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function PermissionList({ refreshSignal }) {
  const [data, setData] = useState([]);

  const getStatePermission = async () => {
    try {
      const response = await axios.get(UsersApi.ENDPOINTS.GET_PERMISSION_ALL, {
        headers: {
          Authorization: 'Bearer ' + UsersApi.TOKEN
        }
      });
      setData(response.data);
    } catch (error) {
      console.error("Hata:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    getStatePermission();
  }, [refreshSignal]);

  return (
    <PermissionPageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}>İzin Tablosu</h5>
      <ContentWrapper>
        <Card variants={cardVariants} initial="initial" animate="animate" exit="exit">
          <SearchForm action="/search" method="GET">
            <SearchInput
              type="text"
              name="name"
              placeholder="İsme göre ara..."
              aria-label="İsim"
            />
            <SearchIcon />
          </SearchForm>
          <PermissionTable>
            <TableHead>
              <tr>
                <TableHeader>Ad Soyad</TableHeader>
                <TableHeader>İzin Açıklaması</TableHeader>
                <TableHeader>Gün</TableHeader>
                <TableHeader>Tarih Aralığı</TableHeader>
                <TableHeader>Onay Durumu</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              {data.map((response) => (
                <TableRow key={response.id}>
                  <TableData>{response.username}</TableData>
                  <TableData>
                    <i>{response.permissionName}</i>
                    <br />
                    {response.permissionDescription}
                  </TableData>
                  <TableData>
                    {Math.ceil(
                      (new Date(response.permissionEndDateTime) - new Date(response.permissionStartDateTime)) /
                        (1000 * 60 * 60 * 24)
                    )}
                  </TableData>
                  <TableData>
                    <div className="d-flex align-items-center gap-2">
                      <DateBadge>
                        {new Date(response.permissionStartDateTime).toLocaleDateString('tr-TR')}
                      </DateBadge>
                      <span>-</span>
                      <DateBadge>
                        {new Date(response.permissionEndDateTime).toLocaleDateString('tr-TR')}
                      </DateBadge>
                    </div>
                  </TableData>
                  <TableData>{response.state}</TableData>
                </TableRow>
              ))}
            </TableBody>
          </PermissionTable>
        </Card>
      </ContentWrapper>
    </PermissionPageContainer>
  );
}

export default PermissionList;