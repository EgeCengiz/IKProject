import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import styled from 'styled-components';

const COLORS = ['#4ade80', '#60a5fa', '#facc15'];

const PieChartTitle = styled.h5`
  color: #4a5a6b;
  margin-bottom: 10px;
  font-weight: 600;
  font-size: 1.25rem;
  padding: 10px;
`;

const PieChartCard = styled.div`

`;

function PerformancePie() {
  const [pieData, setPieData] = useState([]);

  // Rastgele veri oluştur
  useEffect(() => {
    const çalışmaGünleri = Math.floor(Math.random() * 20) + 10; // 10-29 gün
    const ücretliİzin = Math.floor(Math.random() * 10); // 0-9 gün
    const ücretsizİzin = Math.floor(Math.random() * 5); // 0-4 gün

    setPieData([
      { name: 'Çalışma Günleri', value: çalışmaGünleri },
      { name: 'Ücretli İzin', value: ücretliİzin },
      { name: 'Ücretsiz İzin', value: ücretsizİzin },
    ]);
  }, []);

  return (
    <div className="row" style={{ marginLeft: 40 }}>
      <div className="col-md-12">
        <PieChartCard >
        
          <div className="d-flex justify-content-center">
            <PieChart width={300} height={325}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                nameKey="name"
               
              >
                {pieData.map((entry, idx) => (
                  <Cell key={`cell-${idx}`} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} gün`} />
              <Legend
                layout="horizontal"
                align="center"
                verticalAlign="bottom"
                fontSize={12}
                formatter={(value, entry) => `${value}: ${entry.payload.value} gün`}
              />
            </PieChart>
          </div>
        </PieChartCard>
      </div>
    </div>
  );
}

export default PerformancePie;
