import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { FaRegStickyNote } from 'react-icons/fa';
import { FaRegTrashCan } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { TiPinOutline } from 'react-icons/ti';

const NotesContainer = styled(motion.div)`
  padding: 0 0 0 5%;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const NotesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 15px;
  }
`;

const NoteCard = styled(motion.div)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;


  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const NoteHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 8px 8px 0 0;
  color: #2c5282;
  background-color: #edf2f7 !important;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const NoteTitleText = styled.p`
  margin-bottom: 0;
  color: rgb(71, 82, 101);
  font-size: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const PinIcon = styled(TiPinOutline)`
  font-size: 16px;
  color: #a0aec0;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #4299e1;
  }
`;

const NoteContent = styled.div`
  margin-bottom: 10px;
  padding: 15px;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const NoteText = styled.p`
  color: #4a5568;
  font-size: 0.9rem;
  line-height: 1.5;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const NoteFooter = styled.footer`
  font-size: 0.8rem;
  color: #718096;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;

  @media (max-width: 768px) {
    font-size: 0.75rem;
    padding: 8px;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

const TrashIcon = styled(FaRegTrashCan)`
  color: #e53e3e;
  width: 16px;
  height: 16px;
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
      await axios.delete(
        UsersApi.ENDPOINTS.DELETE_NOTES + `?id=${ID}`,
        { headers: { Authorization: 'Bearer ' + UsersApi.TOKEN } }
      );
      alert('Başarı ile Silindi');
      getAllNotes();
    } catch (error) {
      console.error('Hata:', error.response ? error.response.data : error.message);
    }
  };

  const getAllNotes = async () => {
    try {
      const response = await axios.get(UsersApi.ENDPOINTS.GET_NOTES, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });
      const sortedNotes = response.data
        .filter(note => note.dateTarget)
        .sort((a, b) => {
          const dateA = new Date(a.dateTarget);
          const dateB = new Date(b.dateTarget);
          return Math.abs(Date.now() - dateA) - Math.abs(Date.now() - dateB);
        })
        .slice(0, 4);
      setData(sortedNotes);
    } catch (error) {
      console.error('Hata:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  return (
    <NotesContainer>
      <h6 style={{ color: '#4a5a6b', width: '100%', padding: '10px' }}>
        <FaRegStickyNote /> Notlarım
      </h6>
      <NotesGrid>
        {data.map((notesData, index) => (
          <NoteCard key={index} variants={cardVariants} transition={{ delay: index * 0.1 }}>
            <NoteHeader>
              <NoteTitleText>{notesData.notesName}</NoteTitleText>
              <PinIcon />
            </NoteHeader>
            <NoteContent>
              <NoteText>{notesData.description}</NoteText>
            </NoteContent>
            <NoteFooter>
              <div>
                {notesData.dateTarget
                  ? new Date(notesData.dateTarget).toLocaleDateString('tr-TR')
                  : new Date().toLocaleDateString('tr-TR')}{' '}
                <cite title="Source Title">Okan Karaçor</cite>
              </div>
              <TrashIcon onClick={() => deleteNotes(`${notesData.id}`)} />
            </NoteFooter>
          </NoteCard>
        ))}
      </NotesGrid>
    </NotesContainer>
  );
}

export default Notes;
