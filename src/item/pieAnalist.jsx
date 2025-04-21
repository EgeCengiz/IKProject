import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styled from 'styled-components';
import PublicHoliday from './publicHoliday';
import { IoCalendarNumber } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
const data = [
    { name: "Backend", value: 19 },
    { name: "Frontend", value: 22 },
    { name: "Test", value: 4 },
    { name: "Takım Lideri", value: 4 },
    { name: "IK", value: 2 },
    { name: "Yardımcı Personel", value: 1 },
];

const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171"];

const PieChartTitle = styled.h5`
  color: #4a5a6b;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 1.25rem;
  padding: 10px;
`;

const PieChartCard = styled.div`
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

function PieAnalist() {
    const total = data.reduce((sum, entry) => sum + entry.value, 0);


 



    return (
        <>
            <div className='row' style={{ marginLeft: 40 }}>
                <div className='col-md-6'>
                <h5 className="card-title mb-2 mt-2"  style={{ color: "#4a5a6b" }}><IoMdPerson/> Personel Dağılımı</h5>
                    <PieChartCard style={{border:"3px solid #edf2f7"}}>
                       
                        <div style={{ padding: '20px' }}  className='d-flex justify-content-center'>
                            <PieChart width={400} height={300}>
                                <Pie
                                    data={data}
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    dataKey="value"
                                  
                                >
                                    {data.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]}  />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend layout="vertical" align="right" verticalAlign="middle" />
                            </PieChart>
                        </div>
                    </PieChartCard>
                </div>
                <div className='col-md-6'>
                <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}><IoCalendarNumber/> Yaklaşan Resmi Tatiller</h5>
                    <PublicHoliday />
                </div>
            </div>
        </>
    );
}

export default PieAnalist;