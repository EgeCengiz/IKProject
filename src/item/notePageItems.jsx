import React from 'react';
import styled from 'styled-components';
import { TiPinOutline } from "react-icons/ti";
import { FaRegTrashCan } from "react-icons/fa6";
import { motion } from 'framer-motion';

const NotePageContainer = styled(motion.div)`
  padding: 20px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const NotePageTitle = styled.h5`
color:rgb(71, 82, 101);
  margin-bottom: 30px;
 
  text-align: center;
`;

const NoteCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 90%;
  padding:0;
  max-width: 1200px;
`;

const NoteItem = styled(motion.div)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.05);
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const NoteHeader = styled.div`
    display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding:10px;
  border-radius: 8px 8px 0 0;
  color:#2c5282;
  background-color: #edf2f7 !important;
`;

const NoteTitle = styled.div`
  font-weight: 500;
  color: #444;
`;

const PinIcon = styled(TiPinOutline)`
  font-size: 18px;
   color:rgb(71, 82, 101);
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #777;
  }
`;

const NoteContent = styled.blockquote`
  margin-bottom: 10px;
  padding:10px;
`;

const NoteText = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const NoteFooter = styled.footer`
  font-size: 0.8rem;
  color: #999;
  display: flex;
    padding:10px;
  justify-content: space-between;
  align-items: center;
`;

const TrashIcon = styled(FaRegTrashCan)`
  color: #ccc;
  width: 16px;
  height: 16px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #aaa;
  }
`;

const cardVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function NotePageItems() {
  // Örnek not verileri (gerçek uygulamada API'den çekilir)
  const notesData = [
    { id: 1, title: "Hazırlanan Not", description: "Notun Açıklama kısmı burada olacak ve bu not tarihi yaklaştığı zaman gösterilecek", date: "28.03.2025", author: "Okan Karaçor" },
    { id: 2, title: "Diğer Önemli Not", description: "Bu da başka bir önemli notun içeriği...", date: "15.04.2025", author: "Ayşe Demir" },
    { id: 3, title: "Hatırlatma", description: "Unutulmaması gereken bir hatırlatma notu.", date: "01.05.2025", author: "Mehmet Yılmaz" },
    { id: 4, title: "Alışveriş Listesi", description: "Süt, ekmek, yumurta...", date: "17.04.2025", author: "Elif Kaya" },
    { id: 5, title: "Proje Fikirleri", description: "Yeni proje için beyin fırtınası notları.", date: "22.04.2025", author: "Can Tekin" },
    { id: 6, title: "Kitap Önerileri", description: "Okunması gereken kitapların listesi.", date: "30.04.2025", author: "Selin Öztürk" },
  ];

  return (
    <NotePageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <NotePageTitle>Notlarım</NotePageTitle>
      <NoteCardGrid>
        {notesData.map((note) => (
          <NoteItem key={note.id} variants={cardVariants} initial="initial" animate="animate" exit="exit">
            <NoteHeader>
              <NoteTitle>{note.title}</NoteTitle>
              <PinIcon />
            </NoteHeader>
            <NoteContent>
              <NoteText>{note.description}</NoteText>
            </NoteContent>
            <NoteFooter>
              <div>{note.date} <cite title="Source Title">{note.author}</cite></div>
              <TrashIcon />
            </NoteFooter>
          </NoteItem>
        ))}
      </NoteCardGrid>
    </NotePageContainer>
  );
}

export default NotePageItems;