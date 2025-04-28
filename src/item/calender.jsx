import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { TbListDetails } from 'react-icons/tb';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { SlCalender } from 'react-icons/sl';

moment.locale('tr');
const localizer = momentLocalizer(moment);

// Styled Components
const CalendarContainer = styled(motion.div)`
  padding: 0 5%;
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

// Mobile-only horizontal scroll wrapper
const CalendarWrapper = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
  }
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

// EventCard styled components omitted for brevity...

function CustomToolbarComponent({ label, onNavigate }) {
  return (
    <CustomToolbar>
      <ToolbarButton onClick={() => onNavigate('PREV')}>← Geri</ToolbarButton>
      <ToolbarLabel>{label}</ToolbarLabel>
      <ToolbarButton onClick={() => onNavigate('NEXT')}>İleri →</ToolbarButton>
    </CustomToolbar>
  );
}

// Replace with your EventCardComponent definition
const EventCardComponent = ({ event, onSelect }) => {
  /* ... */
  return null;
};

function CalendarComponent() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalData, setModalData] = useState({ title: '', color: '#5a9bd4' });
  const [currentDate, setCurrentDate] = useState(new Date());

  const getCalender = async (year, month) => {
    try {
      const response = await axios.get(
        `${UsersApi.ENDPOINTS.GET_CALENDER_ALL}?year=${year}&month=${month}`,
        { headers: { Authorization: `Bearer ${UsersApi.TOKEN}` } }
      );
      const parsedEvents = response.data.map(ev => ({
        id: ev.id,
        title: ev.title,
        start: new Date(ev.startDate),
        end: new Date(ev.endDate),
        color: ev.color,
      }));
      setEvents(parsedEvents);
    } catch (error) {
      console.error('Takvim verisi çekme hatası:', error);
    }
  };

  useEffect(() => {
    const date = new Date();
    getCalender(date.getFullYear(), date.getMonth() + 1);
  }, []);

  const handleNavigate = date => {
    setCurrentDate(date);
    getCalender(moment(date).year(), moment(date).month() + 1);
  };

  const handleSelectSlot = slotInfo => {
    setSelectedSlot(slotInfo);
    setSelectedEvent(null);
    setModalData({ title: '', color: '#5a9bd4' });
    setShowModal(true);
  };

  const handleSelectEvent = event => {
    setSelectedEvent(event);
    setModalData({ title: event.title, color: event.color });
    setShowModal(true);
  };

  const eventStyleGetter = event => ({
    style: {
      backgroundColor: event.color,
      borderRadius: '4px',
      opacity: 0.9,
      color: 'white',
      border: 'none',
      padding: '2px 4px',
      fontSize: '0.85rem',
    }
  });

  return (
    <CalendarContainer>
      <h5 className="card-title mb-2 mt-2" style={{ color: '#4a5a6b', marginLeft: '30px' }}>
        <SlCalender /> Takvim
      </h5>
      <ContentWrapper>
        <Card className="p-3">
          <CalendarWrapper>
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
              views={[ 'month' ]}
              defaultView="month"
              eventPropGetter={eventStyleGetter}
              components={{ toolbar: CustomToolbarComponent }}
              popup
            />
          </CalendarWrapper>
        </Card>
        {/* Today Events Card etc... */}
      </ContentWrapper>
      {/* Modal code... */}

   

    </CalendarContainer>
  );
}

export default CalendarComponent;
