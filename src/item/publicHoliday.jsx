import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PublicHolidayContainer = styled(motion.div)`
  padding:  0 50px 0 0;
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

const holidayData = [
  { id: '#3413', name: 'New Year', daysUntil: 82 },
  { id: '#4125', name: 'Christmas', daysUntil: 93 },
  { id: '#6532', name: 'Easter', daysUntil: 56 },
  { id: '#7405', name: 'Thanksgiving', daysUntil: 68 },
  { id: '#4526', name: 'Independence Day', daysUntil: 52 },
  { id: '#1054', name: 'Labor Day', daysUntil: 45 },
  { id: '#1055', name: 'Halloween', daysUntil: 45 },
];

function PublicHoliday() {
  return (
    <PublicHolidayContainer>
        
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
            {holidayData.map((holiday) => (
              <TableRow key={holiday.id}>
                <TableData>
                  <a href="javascript:void(0);" className="text-reset">{holiday.id}</a>
                </TableData>
                <TableData>
                  <span>{holiday.name}</span>
                </TableData>
                <TableData>{holiday.daysUntil}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </HolidayTable>
      </Card>
    </PublicHolidayContainer>
  );
}

export default PublicHoliday;