import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import styled from 'styled-components';
import PublicHoliday from './publicHoliday';
import { IoCalendarNumber } from "react-icons/io5";
import { IoMdPerson } from "react-icons/io";
import axios from 'axios';
import UsersApi from '../Api/UsersApi';

const COLORS = ["#4ade80", "#60a5fa", "#facc15", "#f87171", "#a78bfa", "#fb923c"];

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
  const [pie, setPie] = useState([]);

  // API'den çekip pie state'ine ata
  const getPie = async () => {
    try {
      const response = await axios.get(UsersApi.ENDPOINTS.GET_PIE, {
        headers: {
          Authorization: 'Bearer ' + UsersApi.TOKEN,
        },
      });
      // response.data: [{ name: 'Backend', value: '19' }, …]
      // value string olabilir, parseInt ile number'a çeviriyoruz
      const parsed = response.data.map(item => ({
        name: item.name,
        value: Number(item.value) || 0,
      }));
      setPie(parsed);
    } catch (err) {
      console.error("Pie verisi alınırken hata:", err);
    }
  };

  useEffect(() => {
    getPie();
  }, []);

  // toplam kullanıcı sayısı
  const total = pie.reduce((sum, entry) => sum + entry.value, 0);

  return (
    <div className='row ps-4'>
      <div className='col-md-4'>
        <br></br>
        <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}>
          <IoMdPerson /> Personel Dağılımı (Toplam: {total})
        </h5>
        <PieChartCard style={{ border: "3px solid #edf2f7" }}>
          <div className='d-flex justify-content-center'>
            <PieChart width={400} height={325}>
              <Pie
                data={pie}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                nameKey="name"
              >
                {pie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value}`} />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                formatter={(value, entry) => `${value}: ${entry.payload.value}`}
              />
            </PieChart>
          </div>
        </PieChartCard>
      </div>
      <div className='col-md-8'>
        <br></br>
        <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}>
          <IoCalendarNumber /> Yaklaşan Resmi Tatiller
        </h5>
        <PublicHoliday />
      </div>
    </div>
  );
}

export default PieAnalist;
