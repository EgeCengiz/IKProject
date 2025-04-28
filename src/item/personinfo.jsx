import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Menu from './menu'
import { TbListDetails } from "react-icons/tb";
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { FaSearch } from "react-icons/fa";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { IoMdPerson } from "react-icons/io";


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

const ActionIcon = styled(TbListDetails)`
  color: #1e40af;
  cursor: pointer;
  &:hover {
    color: #2c5282;
  }
`;
function personinfo() {
    const navigate = useNavigate();


    const [userData, setUserData] = useState([]);


    const getUser = async () => {
        try {
            const response = await axios.get(UsersApi.ENDPOINTS.GET_USERS_ALL, {
                headers: {
                    Authorization: 'Bearer ' + UsersApi.TOKEN
                }
            });
            
            setUserData(response.data);
        
        } catch (error) {
            console.error("Hata:", error);
        }
    }
    


    useEffect(() => {
    
        getUser();
    }, []);


    return (
        <div>
  <PermissionPageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
       <h6 className=" mt-2 mb-2" style={{ color: "#4a5a6b" }}><IoMdPerson/> Personel Listesi </h6>
      <ContentWrapper>
        <Card variants={cardVariants} initial="initial" animate="animate" exit="exit">
    
          <PermissionTable>
            <TableHead>
              <tr>
                <TableHeader>Personel</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Telefon</TableHeader>
                <TableHeader>Pozisyon</TableHeader>
                <TableHeader>Role</TableHeader>
                <TableHeader>Aksiyon</TableHeader>
              </tr>
            </TableHead>
            <TableBody>
              {userData.map((response) => (
                <TableRow key={response.id}>
                  <TableData>{response.username}</TableData>
                  <TableData>
                    <i>{response.email}</i>
                   
                  </TableData>
                  <TableData>
                  {response.phone}
                  </TableData>
                  <TableData>
                  {response.position}
                  </TableData>
                  <TableData>{response.role}</TableData>
                  <TableData>
                    <ActionIcon onClick={() => navigate(`/personDetails/${response.username}`)} />
                  </TableData>
                </TableRow>
              ))}
            </TableBody>
          </PermissionTable>
        </Card>
      </ContentWrapper>
    </PermissionPageContainer>
        </div>
    )
}

export default personinfo