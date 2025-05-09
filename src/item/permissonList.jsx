import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { FaSearch } from "react-icons/fa";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { LuPlane } from "react-icons/lu";
import PersonnelSearch from '../item/PersonnelSearch';
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

function PermissionList({ refreshSignal, userData }) {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  const fetchPermissions = async (endpoint) => {
    try {
      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${UsersApi.TOKEN}` }
      });
      setData(res.data || []);
    } catch (err) {
      console.error('Hata:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchPermissions(UsersApi.ENDPOINTS.GET_PERMISSION_ALL);
  }, [refreshSignal]);

  const handleSearch = async e => {
    e.preventDefault();
    if (!query.trim()) return;
    await fetchPermissions(
      `${UsersApi.ENDPOINTS.GET_PERMISSION_SEARCH}/${encodeURIComponent(query)}`
    );
  };

  // Birleştirilmiş veri kaynağı
  const permissions = userData ?? data;

  return (
    <PermissionPageContainer
      initial="initial"
      animate="animate"
      variants={cardVariants}
      transition={{ duration: 0.3 }}
    >
      <h5 style={{ color: '#4a5a6b' }}><LuPlane /> İzin Tablosu</h5>

      {refreshSignal != null && (
        <SearchForm onSubmit={handleSearch}>
          <SearchInput
            placeholder="İsme göre ara..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <SearchIcon />
        </SearchForm>
      )}

      <Card variants={cardVariants}>
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
            {permissions.map(item => {
              const start = new Date(item.permissionStartDateTime);
              const end   = new Date(item.permissionEndDateTime);
              const days  = Math.ceil((end - start) / (1000*60*60*24));
              const opts  = { day:'2-digit', month:'numeric', year:'numeric' };

              return (
                <TableRow key={item.id}>
                  <TableData>{item.username}</TableData>
                  <TableData>
                    <i>{item.permissionName}</i><br />
                    {item.permissionDescription}
                  </TableData>
                  <TableData>{days}</TableData>
                  <TableData>
                    <div className="d-flex align-items-center gap-2">
                      <DateBadge>{start.toLocaleDateString('tr-TR', opts)}</DateBadge>
                      <span>-</span>
                      <DateBadge>{end.toLocaleDateString('tr-TR', opts)}</DateBadge>
                    </div>
                  </TableData>
                  <TableData>{item.state}</TableData>
                </TableRow>
              );
            })}
          </TableBody>
        </PermissionTable>
      </Card>
    </PermissionPageContainer>
  );
}

export default PermissionList;