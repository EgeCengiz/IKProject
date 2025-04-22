import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { FaThumbtack,FaRegStickyNote } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { motion } from 'framer-motion';
import styled from 'styled-components';
import Modal from 'react-modal';
import { TiPinOutline } from "react-icons/ti";

const NotesContainer = styled(motion.div)`
  padding: 0 0 0 40px;
  display: flex;
  flex-direction: column;
`;

const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;
`;

const NoteCard = styled(motion.div)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px 8px 0 0;
  color: #2c5282;
  background-color: #edf2f7 !important;
`;

const NoteTitleText = styled.p`
  margin-bottom: 0;
  color: rgb(71, 82, 101);
  font-size: 0.9rem;
`;

const PinIcon = styled(FaThumbtack)`
  font-size: 14px;
  color: #a0aec0;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #4299e1;
  }
`;

const NoteContent = styled.blockquote`
  margin-bottom: 10px;
  padding: 10px;
`;

const NoteText = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const NoteFooter = styled.footer`
  font-size: 0.8rem;
  color: #718096;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
`;

const TrashIcon = styled(FaRegTrashCan)`
  color: #e53e3e;
  width: 14px;
  height: 14px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: rgb(240, 26, 26);
  }
`;

const cardVariants = {};

function Notes() {
  const [data, setData] = useState([]);

  const deleteNotes = async (ID) => {
    try {
      const response = await axios.delete(
        UsersApi.ENDPOINTS.DELETE_NOTES + `?id=${ID}`,
        {
          headers: {
            Authorization: 'Bearer ' + UsersApi.TOKEN
          }
        }
      );
      alert("Başarı ile Silindi");
      getAllNotes(); // Silme sonrası listeyi güncelle
    } catch (error) {
      console.error("Hata:", error.response ? error.response.data : error.message);
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axios.get(UsersApi.ENDPOINTS.GET_NOTES, {
        headers: {
          Authorization: 'Bearer ' + UsersApi.TOKEN
        }
      });
      // Notları dateTarget'a göre sırala ve en yakın 4'ünü al
      const sortedNotes = response.data
        .filter(note => note.dateTarget) // dateTarget boş olanları filtrele
        .sort((a, b) => {
          const dateA = new Date(a.dateTarget);
          const dateB = new Date(b.dateTarget);
          return Math.abs(Date.now() - dateA) - Math.abs(Date.now() - dateB);
        })
        .slice(0, 4); // İlk 4 notu al
      setData(sortedNotes);
    } catch (error) {
      console.error("Hata:", error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <>
      <NotesContainer>
        <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}><FaRegStickyNote/> Notlarım</h5>
        <NotesGrid>
          {data.map((notesData, index) => (
            <NoteCard
              key={index}
              variants={cardVariants}
              transition={{ delay: index * 0.1 }}
            >
              <NoteHeader>
                <NoteTitleText>{notesData.notesName}</NoteTitleText>
                <TiPinOutline />
              </NoteHeader>
              <NoteContent>
                <NoteText>{notesData.description}</NoteText>
              </NoteContent>
              <NoteFooter>
                <div>
                  {notesData.dateTarget
                    ? new Date(notesData.dateTarget).toLocaleDateString('tr-TR')
                    : new Date().toLocaleDateString('tr-TR')}{" "}
                  <cite title="Source Title">Okan Karaçor</cite>
                </div>
                <TrashIcon onClick={() => deleteNotes(`${notesData.id}`)} />
              </NoteFooter>
            </NoteCard>
          ))}
        </NotesGrid>
      </NotesContainer>
    </>
  );
}

export default Notes;