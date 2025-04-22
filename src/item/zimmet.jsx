import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TbListDetails } from "react-icons/tb";
import { motion } from 'framer-motion';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';

const ZimmetPageContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;


const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 900px;
`;

const Card = styled(motion.div)`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 15px;
  flex: 1;
`;

const AddZimmetCard = styled(Card)``;
const ZimmetTableCard = styled(Card)`
  padding: 0;
`;

const ZimmetFormGroup = styled.div`
  margin-bottom: 12px;
`;

const ZimmetLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #2c5282;
  font-size: 0.85rem;
  font-weight: 500;
`;

const ZimmetInput = styled.input`
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #a0aec0;
  font-size: 0.9rem;
  color: #2d3748;
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66,153,225,0.2);
  }
`;

const ZimmetSelect = styled.select`
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #a0aec0;
  font-size: 0.9rem;
  color: #2d3748;
  appearance: none;
  background-image: url('data:image/svg+xml;charset=UTF-8,<svg fill="%232d3748" viewBox="0 0 24 24"><path d="M7 10l5 5 5-5z"/></svg>');
  background-repeat: no-repeat;
  background-position: right 12px center;
  background-size: 14px;
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66,153,225,0.2);
  }
`;

const ZimmetTextarea = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #a0aec0;
  font-size: 0.9rem;
  color: #2d3748;
  height: 80px;
  resize: vertical;
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66,153,225,0.2);
  }
`;

const ZimmetButtonGroup = styled.div`
  text-align: right;
`;

const SaveButton = styled.button`
  padding: 8px 16px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  &:hover { background-color: #2b6cb0; }
  &:focus { box-shadow: 0 0 0 2px rgba(49,130,206,0.3); }
`;

const ZimmetTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const TableHead = styled.thead`
  background-color: #edf2f7;
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  font-size: 0.85rem;
  font-weight: 500;
  color: #2c5282;
`;

const TableBody = styled.tbody`
  tr { border-bottom: 1px solid #e2e8f0; }
  tr:last-child { border-bottom: none; }
`;

const TableRow = styled.tr`
  &:hover { background-color: #f7fafc; }
`;

const TableData = styled.td`
  padding: 10px;
  font-size: 0.85rem;
  color: #2d3748;
`;

const DetailIcon = styled(TbListDetails)`
  color: #4299e1;
  cursor: pointer;
  font-size: 1rem;
  &:hover { color: #2b6cb0; }
`;

const cardVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

function Zimmet() {
  const [itemName, setItemName] = useState('');
  const [importance, setImportance] = useState('Az');
  const [selectedPersonel, setSelectedPersonel] = useState('');
  const [assignmentDate, setAssignmentDate] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);
  const [person, setPerson] = useState([]);

  const getAllDeposit = async () => {
    try {
      const { data } = await axios.get(UsersApi.ENDPOINTS.GET_DEPOSIT_ALL, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });
      setData(data);
    } catch (err) {
      console.error(err);
    }
  };
  const getAllPersonNames = async () => {
    try {
      const { data } = await axios.get(UsersApi.ENDPOINTS.GET_DEPOSIT_PERSON_NAME, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });
      setPerson(data);
    } catch (err) {
      console.error(err);
    }
  };


  const postAddDeposit = async (newZimmet) => {
    try {
      await axios.post(UsersApi.ENDPOINTS.POST_DEPOSIT, newZimmet, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });
      getAllDeposit(); // Eklemeden sonra tabloyu güncelle
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getAllDeposit();
    getAllPersonNames();
  }, []);

  const personnelList = [
    { id: 'p1', name: 'Ahmet Yılmaz' },
    { id: 'p2', name: 'Mehmet Demir' },
    { id: 'p3', name: 'Ayşe Kara' },
  ];

  const handleSave = () => {
    if (!itemName || !selectedPersonel) {
      alert('Eşya adı ve personel seçimi zorunludur.');
      return;
    }
  
    const personNameText = personnelList.find(p => p.id === selectedPersonel)?.name || 'Bilinmiyor';
  
    const newZimmet = {
      name: itemName,
      degreeName: importance,
      personName: personNameText,
      date: assignmentDate || new Date().toISOString().split('T')[0],
  
      description: description
    };
  
    console.log(newZimmet);
    postAddDeposit(newZimmet);
  
    setItemName('');
    setImportance('Az');
    setSelectedPersonel('');
    setAssignmentDate('');
    setDescription('');
    setZimmetState('Verildi'); // temizle
  };
  

  const handleDetailClick = zimmet => {
    alert(`Detay: ${zimmet.name} - ${zimmet.personName}`);
  };

  return (
    <ZimmetPageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
            <h5 className=" m-3" style={{ color: "#4a5a6b" }}>Zimmet Takip </h5>

      <div className='row'>
        <div className='col-md-4'>
          <AddZimmetCard
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ZimmetFormGroup>
              <ZimmetLabel>Eşya Adı</ZimmetLabel>
              <ZimmetInput
                type="text"
                value={itemName}
                onChange={e => setItemName(e.target.value)}
                placeholder="Eşya adı"
              />
            </ZimmetFormGroup>
            <ZimmetFormGroup>
              <ZimmetLabel>Önem Derecesi</ZimmetLabel>
              <ZimmetSelect
                value={importance}
                onChange={e => setImportance(e.target.value)}
              >
                <option value="Az">Az</option>
                <option value="Orta">Orta</option>
                <option value="Yüksek">Yüksek</option>
              </ZimmetSelect>
            </ZimmetFormGroup>
            <ZimmetFormGroup>
              <ZimmetLabel>Personel</ZimmetLabel>
              <ZimmetSelect
                value={selectedPersonel}
                onChange={e => setSelectedPersonel(e.target.value)}
              >
                <option value="">Seçiniz</option>
                {person.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </ZimmetSelect>
            </ZimmetFormGroup>
            <ZimmetFormGroup>
              <ZimmetLabel>Tarih</ZimmetLabel>
              <ZimmetInput
                type="date"
                value={assignmentDate}
                onChange={e => setAssignmentDate(e.target.value)}
              />
            </ZimmetFormGroup>
            <ZimmetFormGroup>
              <ZimmetLabel>Açıklama</ZimmetLabel>
              <ZimmetTextarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Açıklama"
              />
            </ZimmetFormGroup>
            <ZimmetButtonGroup>
              <SaveButton onClick={handleSave}>Kaydet</SaveButton>
            </ZimmetButtonGroup>
          </AddZimmetCard>
        </div>
        <div className='col-md-8'>
          <ZimmetTableCard
            variants={cardVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ZimmetTable>
              <TableHead>
                <tr>
                  <TableHeader>Personel</TableHeader>
                  <TableHeader>Eşya</TableHeader>
                  <TableHeader>Derece</TableHeader>
                  <TableHeader>Tarih</TableHeader>
                  <TableHeader>Detay</TableHeader>
                </tr>
              </TableHead>
              <TableBody>
                {data.map(z => (
                  <TableRow key={z.id}>  
                    <TableData>{z.personName}</TableData>
                    <TableData>{z.name}</TableData>
                    <TableData>{z.degreeName}</TableData>
                    <TableData>{z.date}</TableData>
                    <TableData>
                      <DetailIcon onClick={() => handleDetailClick(z)} />
                    </TableData>
                  </TableRow>
                ))}
              </TableBody>
            </ZimmetTable>
          </ZimmetTableCard>
        </div>
      </div>
    </ZimmetPageContainer>
  );
}

export default Zimmet;
