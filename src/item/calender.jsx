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
moment.locale('tr');
const localizer = momentLocalizer(moment);

// Styled Components
const CalendarContainer = styled(motion.div)`
  padding: 10px;
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
  margin: 5px 30px 0 30px ;
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
    <EventCard color={event.color} style={{backgroundColor:'rgb(90 154 63 / 10%)'}}>
      <EventCardContent >
        <ProfileImage src="../src/images/okan.jpg" alt="Kullanıcı" />
        <div>
          <div style={{ fontSize: '0.8rem' }}>
            Okan Karaçor <Badge color={event.color}>IK</Badge>
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

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalData, setModalData] = useState({ title: '', color: '#5a9bd4' });
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
    setModalData({ title: '', color: '#5a9bd4' });
    setShowModal(true);
  };

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalData({ title: event.title, color: event.color });
    setShowModal(true);
  };

  const handleSaveModalEvent = async () => {
    if (!modalData.title || !selectedSlot) return;
    const isSingleDay = moment(selectedSlot.start).isSame(selectedSlot.end, 'day');
    const newEvent = {
      title: modalData.title,
      startDate: moment(selectedSlot.start).format('YYYY-MM-DD'),
      endDate: isSingleDay
        ? moment(selectedSlot.start).format('YYYY-MM-DD')
        : moment(selectedSlot.end).subtract(1, 'days').format('YYYY-MM-DD'),
      color: modalData.color,
    };
    try {
      const response = await axios.post(UsersApi.ENDPOINTS.POST_CALENDER_DATA, newEvent, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });
      const savedEvent = {
        id: response.data.id,
        title: response.data.title,
        start: new Date(response.data.startDate),
        end: new Date(response.data.endDate),
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
      const response = await axios.get(`${UsersApi.ENDPOINTS.GET_CALENDER_ALL}?year=${year}&month=${month}`, {
        headers: { Authorization: 'Bearer ' + UsersApi.TOKEN }
      });
      const parsedEvents = response.data.map(ev => ({
        id: ev.id,
        title: ev.title,
        start: new Date(ev.startDate),
        end: new Date(ev.endDate),
        color: ev.color,
      }));
      setEvents(parsedEvents);
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

<h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b", marginLeft:'30px' }}><SlCalender/> Takvim</h5>
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
            popup={true} // Bu satır eklendi
          />
        </Card>
        <Card>
          <h6 style={{ fontSize: '0.85rem', color: '#2d3748', marginBottom: '12px' }}>
            Bugün
          </h6>
          <div style={{  display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {todayEvents.length > 0 ? (
              todayEvents.map((data) => (
                <EventCardComponent key={data.id} event={data} onSelect={handleSelectEvent} />
              ))
            ) : (
              <div style={{ textAlign: 'center', color: '#a0aec0', padding: '15px', fontSize: '0.8rem' }}>
                Bugün için etkinlik bulunamadı
              </div>
            )}
          </div>
        </Card>
      </ContentWrapper>

      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{selectedEvent ? 'Etkinlik Detayları' : 'Yeni Etkinlik'}</ModalTitle>
              <ModalCloseButton onClick={() => setShowModal(false)}>×</ModalCloseButton>
            </ModalHeader>
            <ModalBody>
              <div className="mb-3">
                <label className="form-label small">Başlık</label>
                <FormInput
                  type="text"
                  placeholder="Etkinlik başlığı"
                  value={modalData.title}
                  onChange={(e) => setModalData(prev => ({ ...prev, title: e.target.value }))}
                  readOnly={!!selectedEvent}
                />
              </div>
              <div className="mb-3">
                <label className="form-label small">Renk</label>
                <input
                  className="border-0"
                  type="color"
                  id="renk"
                  value={modalData.color}
                  onChange={(e) => setModalData(prev => ({ ...prev, color: e.target.value }))}
                  disabled={!!selectedEvent}
                />
              </div>
              {selectedEvent ? (
                <div className="mb-3">
                  <label className="form-label small">Tarih Aralığı</label>
                  <div className="small">
                    <div><strong>Başlangıç:</strong> {moment(selectedEvent.start).format('DD.MM.YYYY')}</div>
                    <div><strong>Bitiş:</strong> {moment(selectedEvent.end).format('DD.MM.YYYY')}</div>
                  </div>
                </div>
              ) : (
                selectedSlot && (
                  <div className="mb-3">
                    <label className="form-label small">Tarih Aralığı</label>
                    <div className="small">
                      <div><strong>Başlangıç:</strong> {moment(selectedSlot.start).format('DD.MM.YYYY')}</div>
                      <div><strong>Bitiş:</strong> {moment(selectedSlot.end).subtract(1, 'days').format('DD.MM.YYYY')}</div>
                    </div>
                  </div>
                )
              )}
            </ModalBody>
            <ModalFooter>
              <ModalButton className="close" onClick={() => setShowModal(false)}>Kapat</ModalButton>
              {!selectedEvent && (
                <ModalButton className="save" color={modalData.color} onClick={handleSaveModalEvent}>Kaydet</ModalButton>
              )}
              {selectedEvent && (
                <ModalButton className="delete" color={modalData.color} onClick={handleDeleteEvent}>Sil</ModalButton>
              )}
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </CalendarContainer>
  );
}

export default CalendarComponent;