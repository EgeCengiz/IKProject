import React from "react";

const daysOfWeek = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

function getDaysInMonth(year, month) {
  const date = new Date(year, month, 1);
  const days = [];

  // Ayın ilk günü önce boş kutular ekle
  const startDay = date.getDay();
  const leadingEmpty = startDay === 0 ? 6 : startDay - 1;
  for (let i = 0; i < leadingEmpty; i++) {
    days.push(null);
  }

  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return days;
}

// Örnek izinli günler: 5 ve 12 Nisan
const izinliGunler = [5, 12];

export default function PermissionCalendar() {
  const year = 2025;
  const month = 3; // Nisan (0-indexed)
  const days = getDaysInMonth(year, month);

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.monthName}>Nisan 2025</h2>

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
          const isIzinli = izinliGunler.includes(day.getDate());
          return (
            <div
              key={idx}
              style={{
                ...styles.dayBox,
                backgroundColor: isIzinli ? "#fee2e2" : "#fff",
                border: isIzinli ? "2px solid #fca5a5" : "1px solid #ddd",
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

const styles = {
  wrapper: {
    maxWidth: "360px",
    margin: "0 auto",
    padding: "16px",
    backgroundColor: "#f8fafc",
    borderRadius: "8px",
    fontFamily: "'Segoe UI', Tahoma, sans-serif",
  },
  monthName: {
    textAlign: "center",
    marginBottom: "12px",
    fontSize: "22px",
    color: "#1e293b",
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
