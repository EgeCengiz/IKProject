import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TiPinOutline } from "react-icons/ti";
import { FaRegTrashCan } from "react-icons/fa6";
import { motion } from 'framer-motion';
import { FaRegStickyNote } from "react-icons/fa";
import axios from 'axios';
import UsersApi from '../Api/UsersApi';



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
   font-size: 0.9rem;
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


//Sayfada NOTLARIN gösterildiğ kısım
function NotePageItems({notes}) {

 const deleteNotes = async (ID) => {
    try {
      await axios.delete(
        UsersApi.ENDPOINTS.DELETE_NOTES + `?id=${ID}`,
        { headers: { Authorization: 'Bearer ' + UsersApi.TOKEN } }
      );
      alert('Başarı ile Silindi');
      window.location.reload();
    } catch (error) {
      console.error('Hata:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <>
     <NotePageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <NotePageTitle><FaRegStickyNote/> Notlarım</NotePageTitle>
      <NoteCardGrid>
        {notes.map((note) => (
          <NoteItem key={note.id} variants={cardVariants} initial="initial" animate="animate" exit="exit">
            <NoteHeader>
              <NoteTitle>{note.notesName}</NoteTitle>
              <PinIcon />
            </NoteHeader>
            <NoteContent>
              <NoteText>{note.description}</NoteText>
            </NoteContent>
            <NoteFooter>
              <div>{note.createDate} <cite title="Source Title">{note.username}</cite></div>
              <TrashIcon onClick={() => deleteNotes(`${note.id}`)} />
            </NoteFooter>
          </NoteItem>
        ))}
      </NoteCardGrid>
    </NotePageContainer>






    </>
   
  );
}

export default NotePageItems;