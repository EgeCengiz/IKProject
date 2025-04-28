import axios from "axios";
import React, { useEffect, useState } from "react";
import UsersApi from "../Api/UsersApi";

const daysOfWeek = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
const monthNames = [
  "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
  "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
];

// Bir aydaki günleri hesaplayan yardımcı fonksiyon
function getDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];

  // Haftanın ilk gününe göre boş hücreleri ekle
  const startDay = date.getDay();
  const leadingEmpty = startDay === 0 ? 6 : startDay - 1;
  for (let i = 0; i < leadingEmpty; i++) {
    days.push(null);
  }

  // Ayın günlerini ekle
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
}

// PermissionCalendar bileşeni
export default function PermissionCalendar({ initialDate = new Date() }) {
  const [current, setCurrent] = useState(new Date(initialDate));
  const [permission, setPermission] = useState([]);
  const year = current.getFullYear();
  const month = current.getMonth();
  const days = getDaysInMonth(year, month);

  // Bileşen yüklendiğinde yılı al
  useEffect(() => {
    getYear();
  }, []);

  // Önceki aya git
  const prevMonth = () => {
    const prev = new Date(year, month - 1, 1);
    setCurrent(prev);
  };

  // Sonraki aya git
  const nextMonth = () => {
    const next = new Date(year, month + 1, 1);
    setCurrent(next);
  };

  // API'den izin tarihlerini al
  const getYear = async () => {
    try {
      const response = await axios.get(UsersApi.ENDPOINTS.GET_YEAR_DETAILS + '/1', {
        headers: {
          Authorization: 'Bearer ' + UsersApi.TOKEN
        }
      });
      
      const permissionDates = response.data.map(item => {
    
        if (item && typeof item === 'object' && 'day' in item && 'month' in item && 'year' in item) {
     
          const correctedYear = item.day;  
          const correctedMonth = item.year
          const correctedDay = item.month;  
  
          
          const date = new Date(correctedYear, correctedMonth - 1, correctedDay);
  
      
          if (isNaN(date.getTime())) {
            console.error("Invalid date created from:", item);
            return null;
          }
          return date;
        } else {
          console.error("Invalid item format:", item);
          return null;
        }
      }).filter(date => date !== null); 
  
      setPermission(permissionDates);
   
    } catch (error) {
      console.error("İzin verilerini alma hatası:", error);
    }
  };

  // Belirli bir günün izinli olup olmadığını kontrol et
  const isIzinli = (date) => {
    return permission.some(izin =>
      izin.getFullYear() === date.getFullYear() &&
      izin.getMonth() === date.getMonth() &&
      izin.getDate() === date.getDate()
    );
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <button onClick={prevMonth} style={styles.navButton}>{'<'}</button>
        <h2 style={styles.monthName}>{monthNames[month]} {year}</h2>
        <button onClick={nextMonth} style={styles.navButton}>{'>'}</button>
      </div>

      <div style={styles.daysHeader}>
        {daysOfWeek.map((d, i) => (
          <div key={i} style={styles.headerBox}>{d}</div>
        ))}
      </div>

      <div style={styles.calendar}>
        {days.map((day, idx) => {
          if (!day) {
            return <div key={idx} style={styles.emptyBox} />;
          }
          const izin = isIzinli(day);
          return (
            <div
              key={idx}
              style={{
                ...styles.dayBox,
                backgroundColor: izin ? "#fee2e2" : "#fff",
                border: izin ? "2px solid #fca5a5" : "1px solid #ddd",
              }}
            >
              <span style={styles.date}>{day.getDate()}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Stil tanımları
const styles = {
  wrapper: {
    maxWidth: "360px",
    margin: "0 auto",
    padding: "16px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "12px",
  },
  navButton: {
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: "#1e293b",
  },
  monthName: {
    fontSize: "22px",
    color: "#1e293b",
    margin: 0,
  },
  daysHeader: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    backgroundColor: "#e2e8f0",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "4px",
  },
  headerBox: {
    textAlign: "center",
    fontWeight: "600",
    fontSize: "14px",
    padding: "6px 0",
    color: "#334155",
  },
  calendar: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "2px",
  },
  dayBox: {
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    transition: "background-color 0.2s, transform 0.1s",
    cursor: "pointer",
  },
  emptyBox: {
    height: "50px",
    backgroundColor: "transparent",
  },
  date: {
    fontWeight: "600",
    color: "#1e293b",
  },
};