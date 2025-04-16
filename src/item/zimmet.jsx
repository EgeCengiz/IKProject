import React, { useState } from 'react';
import styled from 'styled-components';
import { TbListDetails } from "react-icons/tb";
import { motion } from 'framer-motion';

const ZimmetPageContainer = styled(motion.div)`
  padding: 20px;
 
  display: flex;
  flex-direction: column;

`;

const ZimmetTitle = styled.h4`
  color: #1e40af;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 1.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
  max-width: 900px;


`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 15px;
  flex: 1;
`;

const AddZimmetCard = styled(Card)`

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
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
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
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
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
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
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
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2b6cb0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.3);
  }
`;

const ZimmetTableCard = styled(Card)`
 
`;

const ZimmetTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    /* Küçük ekranlarda tabloyu kaydırılabilir yap */
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
  tr {
    border-bottom: 1px solid #e2e8f0;
  }
  tr:last-child {
    border-bottom: none;
  }
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f7fafc;
  }
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
  transition: color 0.2s ease;

  &:hover {
    color: #2b6cb0;
  }
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
  const [zimmetler, setZimmetler] = useState([
    { id: 1, personelAd: 'Warren Jackson', esya: '17 Numaralı Bilgisayar', derece: 'Orta', tarih: '30.03.2025' },
    { id: 2, personelAd: 'Amy', esya: 'Sunucu', derece: 'Yüksek', tarih: '30.03.2025' },
    { id: 3, personelAd: 'Steven', esya: '14 Numaralı Bilgisayar', derece: 'Orta', tarih: '30.03.2025' },
  ]);

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

    const newZimmet = {
      id: Date.now(),
      personelAd: personnelList.find(p => p.id === selectedPersonel)?.name || 'Bilinmiyor',
      esya: itemName,
      derece: importance,
      tarih: assignmentDate ? new Date(assignmentDate).toLocaleDateString('tr-TR') : new Date().toLocaleDateString('tr-TR'),
    };
    setZimmetler([...zimmetler, newZimmet]);
    setItemName('');
    setImportance('Az');
    setSelectedPersonel('');
    setAssignmentDate('');
    setDescription('');
  };

  const handleDetailClick = (zimmet) => {
    alert(`Detay: ${zimmet.esya} - ${zimmet.personelAd}`);
  };

  return (
    <ZimmetPageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}>Zimmet Takip</h5>
      <br></br>

        <div className='row'>
          <div className='col-md-4'>
              <AddZimmetCard variants={cardVariants} initial="initial" animate="animate" exit="exit">
          <ZimmetFormGroup>
            <ZimmetLabel htmlFor="itemName">Eşya Adı</ZimmetLabel>
            <ZimmetInput
              type="text"
              id="itemName"
              placeholder="Eşya adı"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
          </ZimmetFormGroup>
          <ZimmetFormGroup>
            <ZimmetLabel htmlFor="importance">Önem Derecesi</ZimmetLabel>
            <ZimmetSelect
              id="importance"
              value={importance}
              onChange={(e) => setImportance(e.target.value)}
            >
              <option value="Az">Az</option>
              <option value="Orta">Orta</option>
              <option value="Yüksek">Yüksek</option>
            </ZimmetSelect>
          </ZimmetFormGroup>
          <ZimmetFormGroup>
            <ZimmetLabel htmlFor="personnel">Personel</ZimmetLabel>
            <ZimmetSelect
              id="personnel"
              value={selectedPersonel}
              onChange={(e) => setSelectedPersonel(e.target.value)}
            >
              <option value="">Seçiniz</option>
              {personnelList.map((person) => (
                <option key={person.id} value={person.id}>
                  {person.name}
                </option>
              ))}
            </ZimmetSelect>
          </ZimmetFormGroup>
          <ZimmetFormGroup>
            <ZimmetLabel htmlFor="assignmentDate">Tarih</ZimmetLabel>
            <ZimmetInput
              type="date"
              id="assignmentDate"
              value={assignmentDate}
              onChange={(e) => setAssignmentDate(e.target.value)}
            />
          </ZimmetFormGroup>
          <ZimmetFormGroup>
            <ZimmetLabel htmlFor="description">Açıklama</ZimmetLabel>
            <ZimmetTextarea
              id="description"
              placeholder="Açıklama"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </ZimmetFormGroup>
          <ZimmetButtonGroup>
            <SaveButton onClick={handleSave}>Kaydet</SaveButton>
          </ZimmetButtonGroup>
        </AddZimmetCard>
          </div>
          <div className='col-md-8'>
               <ZimmetTableCard variants={cardVariants} initial="initial" animate="animate" exit="exit">
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
              {zimmetler.map((zimmet) => (
                <TableRow key={zimmet.id}>
                  <TableData>{zimmet.personelAd}</TableData>
                  <TableData>{zimmet.esya}</TableData>
                  <TableData>{zimmet.derece}</TableData>
                  <TableData>{zimmet.tarih}</TableData>
                  <TableData>
                    <DetailIcon onClick={() => handleDetailClick(zimmet)} />
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