import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { TbListDetails } from "react-icons/tb";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { SlCalender } from "react-icons/sl";
import { MdOutlineLocalActivity } from "react-icons/md";
import { TbCategory2 } from "react-icons/tb";
import { IoColorPaletteOutline } from "react-icons/io5";
moment.locale('tr');
const localizer = momentLocalizer(moment);

// Styled Components
const CalendarContainer = styled(motion.div)`

  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  margin: 5px 30px 0 30px;
  padding: 15px;
`;

const CustomToolbar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ToolbarButton = styled.button`
  background-color: #fff;
  border: 1px solid #a0aec0;
  border-radius: 6px;
  padding: 8px 12px;
  font-size: 0.9rem;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.2s ease;
  &:hover {
    background-color: #f7fafc;
    border-color: #4299e1;
  }
`;

const ToolbarLabel = styled.span`
  font-weight: 500;
  font-size: 1rem;
  color: #4299e1;
`;

const EventCard = styled.div`
  background-color: #fff;
  border-left: 3px solid ${props => props.color};
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-1px);
  }
`;

const EventCardContent = styled.div`
  display: flex;
  align-items: center;
`;

const EventCardDetails = styled.div`
  text-align: right;
`;

const ProfileImage = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  margin-right: 8px;
`;

const Badge = styled.span`
  background-color: ${props => props.color};
  color: #fff;
  padding: 2px 5px;
  border-radius: 4px;
  font-size: 0.65rem;
  margin-left: 5px;
`;

const FormInput = styled.input`
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #a0aec0;
  font-size: 0.9rem;
  color: #2d3748;
  width: 100%;
  transition: border-color 0.2s ease;
  &:focus {
    outline: none;
    border-color: #4299e1;
    box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.2);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled(motion.div)`
  background-color: #fff;
  border-radius: 8px;
  width: 400px;
  padding: 20px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const ModalTitle = styled.h5`
  color: #2d3748;
  font-size: 1.2rem;
  margin: 0;
`;

const ModalCloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #a0aec0;
  cursor: pointer;
`;

const ModalBody = styled.div`
  margin-bottom: 15px;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ModalButton = styled.button`
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  border: none;
  &.save {
    background-color: ${props => props.color || '#4299e1'};
    color: #fff;
  }
  &.delete {
    background-color: ${props => props.color || '#e53e3e'};
    color: #fff;
  }
  &.close {
    background-color: #edf2f7;
    color: #2d3748;
  }
  &:hover {
    opacity: 0.9;
  }
`;

function CustomToolbarComponent({ label, onNavigate }) {
  return (
    <CustomToolbar>
      <ToolbarButton onClick={() => onNavigate('PREV')}>← Geri</ToolbarButton>
      <ToolbarLabel>{label}</ToolbarLabel>
      <ToolbarButton onClick={() => onNavigate('NEXT')}>İleri →</ToolbarButton>
    </CustomToolbar>
  );
}

// Event Card Component
const EventCardComponent = ({ event, onSelect }) => {
  return (
    <EventCard color={event.color} style={{ backgroundColor: 'rgb(90 154 63 / 10%)' }}>
      <EventCardContent>
        <ProfileImage src={event.image} alt="Kullanıcı" />
        <div>
          <div style={{ fontSize: '0.8rem' }}>
            {event.user} <Badge color={event.color}>{event.category}</Badge>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{event.title}</div>
        </div>
      </EventCardContent>
      <EventCardDetails>
        <div style={{ fontSize: '0.7rem', color: '#6b7280' }}>
          {moment(event.start).format('DD.MM.YYYY')} - {moment(event.end).format('DD.MM.YYYY')}
        </div>
        <TbListDetails
          color={event.color}
          onClick={() => onSelect(event)}
          style={{ cursor: 'pointer', marginTop: '4px', fontSize: '1rem' }}
        />
      </EventCardDetails>
    </EventCard>
  );
};

function CalendarComponent(control) {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalData, setModalData] = useState({ title: '', color: '#5a9bd4' ,category:''});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleNavigate = (date) => {
    setCurrentDate(date);
    const year = moment(date).year();
    const month = moment(date).month() + 1;
    setEvents([]);
    getCalender(year, month);
  };

  const handleSelectSlot = (slotInfo) => {
    setSelectedSlot(slotInfo);
    setSelectedEvent(null);
    setModalData({ title: '', color: '#5a9bd4'  ,category:''});
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalData(null); 
    setShowModal(true);
  };

  const handleSaveModalEvent = async () => {
    if (!modalData.title || !selectedSlot) return;
    const isSingleDay = moment(selectedSlot.start).isSame(selectedSlot.end, 'day');
    const newEvent = {
      title: modalData.title,
      startDate: moment(selectedSlot.start).format('YYYY-MM-DD'),
      control: control.control,
      category: modalData.category,
      endDate: isSingleDay
        ? moment(selectedSlot.start).format('YYYY-MM-DD')
        : moment(selectedSlot.end).subtract(1, 'days').format('YYYY-MM-DD'),
      color: modalData.color,
    };
    try {
      const response = await axios.post(UsersApi.ENDPOINTS.POST_CALENDER_DATA, newEvent, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });
      console.log(" Category : "+newEvent.category);
      const savedEvent = {
        id: response.data.id,
        title: response.data.title,
        start: new Date(response.data.startDate),
        end: new Date(response.data.endDate),
        control: control.control,
        category:  modalData.category,
        color: response.data.color,
      };
      setEvents(prev => [...prev, savedEvent]);
      setShowModal(false);
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      getCalender(year, month);
    } catch (error) {
      console.error("Etkinlik ekleme hatası:", error);
      alert("Etkinlik eklenirken bir hata oluştu.");
    }
  };

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return;
    try {
      await axios.delete(`${UsersApi.ENDPOINTS.DELETE_CALENDER_DATA}/${selectedEvent.id}`, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });
      setEvents(prev => prev.filter(ev => ev.id !== selectedEvent.id));
      setShowModal(false);
      alert("Etkinlik Başarıyla Silindi");
    } catch (error) {
      console.error("Etkinlik silme hatası:", error);
      alert("Etkinlik silinirken bir hata oluştu.");
    }
  };

  const getCalender = async (year, month) => {
    try {
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_CALENDER_ALL}/${control.control}?year=${year}&month=${month}`, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });

      const users = response.data;

      const usersWithImages = await Promise.all(
        users.map(async (user) => {
          try {
            const imgRes = await axios.get(
              `${UsersApi.ENDPOINTS.GET_USERS_IMAGE}?username=${encodeURIComponent(user.username)}`,
              {
                headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
                responseType: 'blob',
              }
            );
            const imageUrl = URL.createObjectURL(imgRes.data);
            return {
              id: user.id,
              user: user.username,
              title: user.title,
              category: user.category, 
              start: new Date(user.startDate),
              end: new Date(user.endDate),
              color: user.color,
              image: imageUrl,
            };
          } catch (imgError) {
            console.error(`Error fetching image for ${user.username}:`, imgError);
            return {
              id: user.id,
              title: user.title,
              user: user.username,
              start: new Date(user.startDate),
              end: new Date(user.endDate),
              color: user.color,
              image: null,
            };
          }
        })
      );

      setEvents(usersWithImages);
    } catch (error) {
      console.error("Takvim verisi çekme hatası:", error);
    }
  };

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: 'none',
        padding: '2px 4px',
        fontSize: '0.85rem',
      }
    };
  };

  useEffect(() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    getCalender(year, month);
  }, []);

  // Filter events to show only those that include today
  const today = moment().startOf('day');
  const todayEvents = events.filter(event => {
    const start = moment(event.start).startOf('day');
    const end = moment(event.end).startOf('day');
    return today.isSameOrAfter(start) && today.isSameOrBefore(end);
  });

  return (
    <CalendarContainer>
      <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b", marginLeft: '30px' }}>
        <SlCalender className='me-1 mb-1' /> Şirket Takvimi
      </h5>
      <ContentWrapper>
        <Card className='p-3'>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            selectable
            onSelectSlot={handleSelectSlot}
            onSelectEvent={handleSelectEvent}
            onNavigate={handleNavigate}
            views={['month']}
            defaultView="month"
            eventPropGetter={eventStyleGetter}
            components={{ toolbar: CustomToolbarComponent }}
            popup={true}
          />
        </Card>
        <Card>
          <h6 style={{ fontSize: '0.85rem', color: '#2d3748', marginBottom: '12px' }}>
            Bugün
          </h6>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {todayEvents.length > 0 ? (
              todayEvents.map((data) => (
                <EventCardComponent key={data.id} event={data} onSelect={handleSelectEvent} />
              ))
            ) : (
              <div style={{ textAlign: 'center', color: '#a0aec0', Mapadding: '15px', fontSize: '0.8rem' }}>
                Bugün için etkinlik bulunamadı
              </div>
            )}
          </div>
        </Card>
      </ContentWrapper>

      {showModal && (
        <ModalOverlay>
          <ModalContent style={{ maxWidth: '400px', margin: 'auto', padding: '20px', borderRadius: '8px', backgroundColor: '#fff' }}>
            <ModalHeader style={{ borderBottom: 'none', textAlign: 'center' }}>
              <ModalTitle style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                {selectedEvent ? 'Etkinlik Detayları' : <> <MdOutlineLocalActivity/> Yeni Etkinlik</>}
              </ModalTitle>
              <ModalCloseButton onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', fontSize: '1.2rem' }}>
                ×
              </ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              {selectedEvent ? (
                <div style={{ 
                  borderLeft: `5px solid ${selectedEvent.color}`, 
                  padding: '10px 15px', 
                  backgroundColor: '#f9fafb', 
                  borderRadius: '4px' 
                }}>
                  <h6 style={{ 
                    color: '#2d3748', 
                    marginBottom: '10px', 
                    fontWeight: '600' 
                  }}>
                    {selectedEvent.title}
                  </h6>
                  <div style={{ 
                    display: 'flex', 
                    gridTemplateColumns: 'auto 1fr', 
                    gap: '10px', 
                    margin:'50px 0 5px 0',
                    fontSize: '0.9rem', 
                    color: '#4a5568' 
                  }}>
                    <strong>Başlangıç:</strong>
                    <span>{moment(selectedEvent.start).format('DD.MM.YYYY')}</span>
                    <strong>Bitiş:</strong>
                    <span>{moment(selectedEvent.end).format('DD.MM.YYYY')}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    gridTemplateColumns: 'auto 1fr', 
                    gap: '10px', 
                    margin:'5px',
                    fontSize: '0.9rem', 
                    color: '#4a5568' 
                  }}>
                    <strong>Renk:</strong>
                    <span style={{ 
                      display: 'inline-block', 
                      width: '20px', 
                      height: '20px', 
                      backgroundColor: selectedEvent.color, 
                      borderRadius: '4px', 
                      verticalAlign: 'middle' 
                    }}></span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    gridTemplateColumns: 'auto 1fr', 
                    gap: '10px', 
                    margin:'5px',
                    fontSize: '0.9rem', 
                    color: '#4a5568' 
                  }}>
                    <strong>Yayınlayan:</strong>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {selectedEvent.image && (
                        <img 
                          src={selectedEvent.image} 
                          alt="Yayınlayan" 
                          style={{ 
                            width: '30px', 
                            height: '30px', 
                            borderRadius: '50%', 
                            border: '1px solid #e2e8f0' 
                          }} 
                        />   
                      )}  
                      <span>{selectedEvent.user}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  {/* Başlık */}
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Başlık</label>
                    <textarea
                      style={{ width: '100%', padding: '10px', borderRadius: '4px', borderColor: '#ccc', resize: 'none' }}
                      placeholder="Etkinlik başlığı"
                      value={modalData.title}
                      onChange={e => setModalData(prev => ({ ...prev, title: e.target.value }))}
                      rows={2}
                    />
                  </div>

                  {/* Kategori Seçimi */}
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>
                      <TbCategory2 className='mt-1 me-1' /> Kategori
                    </label>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      {['Toplantı', 'Mülakat', 'Önemli', 'Duyuru', 'Diğer'].map((label, index) => (
                        <label key={index} style={{ fontSize: '0.9rem' }}>
                          <input
                            type="radio"
                            name="category"
                            value={label}
                            checked={modalData.category === label}
                            onChange={() => setModalData(prev => ({ ...prev, category: label }))}
                          />
                          {label}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Renk Seçimi */}
                  <div style={{ marginBottom: '15px' }}>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>
                      <IoColorPaletteOutline className='mt-1 me-1' /> Renk
                    </label>
                    <input
                      type="color"
                      value={modalData.color}
                      onChange={e => setModalData(prev => ({ ...prev, color: e.target.value }))}
                      style={{ width: '25%', height: '40px', border: 'none' }}
                    />
                  </div>

                  {/* Tarih Aralığı */}
                  <div>
                    <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>Tarih Aralığı</label>
                    <div style={{ fontSize: '0.9rem' }}>
                      <div><strong>Başlangıç:</strong> {moment(selectedSlot?.start).format('DD.MM.YYYY')}</div>
                      <div><strong>Bitiş:</strong> {moment(selectedSlot?.end).format('DD.MM.YYYY')}</div>
                    </div>
                  </div>
                </>
              )}
            </ModalBody>
            <ModalFooter style={{ borderTop: 'none', display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button 
                onClick={() => setShowModal(false)} 
                style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#ccc', border: 'none' }}
              >
                Kapat
              </button>
              {!selectedEvent && (
                <button 
                  onClick={handleSaveModalEvent} 
                  style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: modalData.color, border: 'none', color: '#fff' }}
                >
                  Kaydet
                </button>
              )}
              {selectedEvent && selectedEvent.user === localStorage.getItem("username") && (
                <button 
                  onClick={handleDeleteEvent} 
                  style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#e74c3c', border: 'none', color: '#fff' }}
                >
                  Sil
                </button>
              )}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </CalendarContainer>
  );
}

export default CalendarComponent;