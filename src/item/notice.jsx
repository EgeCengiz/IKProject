import React, { useState } from 'react';
import styled from 'styled-components';
import { TbListDetails } from "react-icons/tb";
import { motion } from 'framer-motion';

const NoticePageContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const NoticeTitle = styled.h4`
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

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 20px;
  }
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 15px;
  flex: 1;
`;

const AddNoticeCard = styled(Card)`
`;

const NoticeFormGroup = styled.div`
  margin-bottom: 12px;
`;

const NoticeLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #2c5282;
  font-size: 0.85rem;
  font-weight: 500;
`;

const NoticeInput = styled.input`
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

const NoticeSelect = styled.select`
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

const NoticeTextarea = styled.textarea`
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

const NoticeButtonGroup = styled.div`
  text-align: right;
`;

const PublishButton = styled.button`
  padding: 8px 16px;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: Ch 500;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #2b6cb0;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(49, 130, 206, 0.3);
  }
`;

const NoticeTableCard = styled(Card)`
`;

const NoticeTable = styled.table`
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

function notice() {
  const [itemName, setItemName] = useState('');
  const [selectedPersonel, setSelectedPersonel] = useState('');
  const [description, setDescription] = useState('');
  const [notices, setNotices] = useState([
    { id: 1, publisher: 'Okan Karaçor', recipients: 'Tüm Kullanıcılar', message: 'Mesaj burada yer alacak', date: '30.03.2025' },
    { id: 2, publisher: 'Okan Karaçor', recipients: 'Ahmet, Mehmet, +3', message: 'Mesaj burada yer alacak', date: '30.03.2025' },
    { id: 3, publisher: 'Okan Karaçor', recipients: 'Tüm Kullanıcılar', message: 'Mesaj', date: '30.03.2025' },
  ]);

  const personnelList = [
    { id: 'p1', name: 'Ahmet Yılmaz' },
    { id: 'p2', name: 'Mehmet Demir' },
    { id: 'p3', name: 'Ayşe Kara' },
    { id: 'p4', name: 'Zeynep Güneş' },
  ];

  const handleSave = () => {
    if (!itemName || !description) {
      alert('Duyuru başlığı ve açıklama zorunludur.');
      return;
    }

    const newNotice = {
      id: Date.now(),
      publisher: 'Kullanıcı Adı',
      recipients: selectedPersonel ? personnelList.find(p => p.id === selectedPersonel)?.name : 'Tüm Kullanıcılar',
      message: description,
      date: new Date().toLocaleDateString('tr-TR'),
    };
    setNotices([...notices, newNotice]);
    setItemName('');
    setSelectedPersonel('');
    setDescription('');
  };

  const handleDetailClick = (notice) => {
    alert(`Detay: ${notice.message} - ${notice.recipients}`);
  };

  return (
    <NoticePageContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}>Duyurular</h5>
      <br />
      <div className="row">
        <div className="col-md-4">
          <AddNoticeCard  initial="initial" animate="animate" exit="exit">
            <NoticeFormGroup>
              <NoticeLabel htmlFor="itemName">Duyuru Başlığı</NoticeLabel>
              <NoticeInput
                type="text"
                id="itemName"
                placeholder="Duyuru başlığı"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
            </NoticeFormGroup>
            <NoticeFormGroup>
              <NoticeLabel htmlFor="personnel">Alıcılar</NoticeLabel>
              <NoticeSelect
                id="personnel"
                value={selectedPersonel}
                onChange={(e) => setSelectedPersonel(e.target.value)}
              >
                <option value="">Tüm Personel</option>
                {personnelList.map((person) => (
                  <option key={person.id} value={person.id}>
                    {person.name}
                  </option>
                ))}
              </NoticeSelect>
            </NoticeFormGroup>
            <NoticeFormGroup>
              <NoticeLabel htmlFor="description">Açıklama</NoticeLabel>
              <NoticeTextarea
                id="description"
                placeholder="Açıklama"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </NoticeFormGroup>
            <NoticeButtonGroup>
              <PublishButton onClick={handleSave}>Yayınla</PublishButton>
            </NoticeButtonGroup>
          </AddNoticeCard>
        </div>
        <div className="col-md-8">
          <NoticeTableCard  initial="initial" animate="animate" exit="exit">
            <NoticeTable>
              <TableHead>
                <tr>
                  <TableHeader>Yayınlayan</TableHeader>
                  <TableHeader>Alıcılar</TableHeader>
                  <TableHeader>Mesaj</TableHeader>
                  <TableHeader>Tarih</TableHeader>
                  <TableHeader>Detay</TableHeader>
                </tr>
              </TableHead>
              <TableBody>
                {notices.map((notice) => (
                  <TableRow key={notice.id}>
                    <TableData>{notice.publisher}</TableData>
                    <TableData>{notice.recipients}</TableData>
                    <TableData>{notice.message}</TableData>
                    <TableData>{notice.date}</TableData>
                    <TableData>
                      <DetailIcon onClick={() => handleDetailClick(notice)} />
                    </TableData>
                  </TableRow>
                ))}
              </TableBody>
            </NoticeTable>
          </NoticeTableCard>
        </div>
      </div>
    </NoticePageContainer>
  );
}

export default notice;