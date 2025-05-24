import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBriefcase, FaCamera, FaGraduationCap, FaPlus, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { StyleSheetManager } from 'styled-components';
import isPropValid from '@emotion/is-prop-valid';
const PublicHolidayContainer = styled(motion.div)`

  display: flex;
  flex-direction: column;
`;

const HolidayTitle = styled.h5`
  color: #4a5a6b;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 1.25rem;
  padding: 10px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

const HolidayTable = styled.table`
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


function PublicHoliday() {


const [holiday,setHoliday]= useState([]);

const getAllHoliday= async()=> {
   
  const response = await axios.get(
    UsersApi.ENDPOINTS.GET_PUBLIC_HOLIDAY,
    {
      headers: {
        Authorization: 'Bearer ' + UsersApi.TOKEN,
      },
    }
  );  
  setHoliday(response.data);
}
useEffect(()=>{
getAllHoliday();
},[])

  return (
    <PublicHolidayContainer className='pe-4'>
        
      <Card>
    
        <HolidayTable>
          <TableHead>
            <tr>
              <TableHeader>ID</TableHeader>
              <TableHeader>Resmi Tatil</TableHeader>
              <TableHeader>Kalan Gün</TableHeader>
           
            </tr>
          </TableHead>
          <TableBody>
            {holiday.map((day,index) => (
              <TableRow key={index}>
                <TableData>
                  <a href="javascript:void(0);" className="text-reset">#35{index}</a>
                </TableData>
                <TableData>
                  <span>{day.holidayName}</span>
                </TableData>
                <TableData className='d-flex justify-content-center'><div style={{color:"#a69595", marginRight:10}}>
                  {Math.ceil((new Date(day.holidayDate)-new Date()) / (1000 * 60 * 60 * 24))}g  </div>
                  <p>{new Date(day.holidayDate).toLocaleDateString('tr-TR')}</p></TableData>
              </TableRow>
            ))}
          </TableBody>
        </HolidayTable>
      </Card>
    </PublicHolidayContainer>
  );
}

export default PublicHoliday;