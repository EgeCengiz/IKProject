import React from 'react';
import { FaRegTrashCan } from 'react-icons/fa6';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Styled components based on BirthdayPage design
const CompanyDayContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Title = styled.h5`
  color: #4a5a6b;
  font-weight: 600;
  font-size: 1.25rem;
  margin-bottom: 15px;
`;

const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  padding: 15px;
`;

const EventGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const EventCard = styled.div`
  border: 3px solid #eff1f4;
  border-radius: 10px;
  padding: 15px;
  background-color: #fff;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const EventImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 6px;
`;

const EventTitle = styled.div`
  color: #2d3748;
  font-weight: 500;
  font-size: 1rem;
  margin: 10px 0;
`;

const EventDescription = styled.p`
  color: #718096;
  font-size: 0.85rem;
  margin: 0;
`;

const EventFooter = styled.footer`
  margin-top: 10px;
  font-size: 0.75rem;
  color: #718096;
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const FooterText = styled.div`
  color: #2d3748;
`;

const TrashIcon = styled(FaRegTrashCan)`
  color: #e27171;
  width: 15px;
  height: 15px;
  cursor: pointer;
  transition: color 0.2s ease-in-out;
  &:hover {
    color: #c53030;
  }
`;

// Sample event data (replace with actual data source)
const eventData = [
  {
    id: 1,
    title: 'Eklenen Etkinlik',
    description: 'Etkinlik açıklaması buraya gelecek',
    date: '28.03.2025',
    author: 'Okan Karaçor',
    image: 'src/images/companyday.png',
  },
  {
    id: 2,
    title: 'Eklenen Etkinlik',
    description: 'Etkinlik açıklaması buraya gelecek',
    date: '28.03.2025',
    author: 'Okan Karaçor',
    image: 'src/images/companyday.png',
  },
  {
    id: 3,
    title: 'Eklenen Etkinlik',
    description: 'Etkinlik açıklaması buraya gelecek',
    date: '28.03.2025',
    author: 'Okan Karaçor',
    image: 'src/images/companyday.png',
  },
  {
    id: 4,
    title: 'Eklenen Etkinlik',
    description: 'Etkinlik açıklaması buraya gelecek',
    date: '28.03.2025',
    author: 'Okan Karaçor',
    image: 'src/images/companyday.png',
  },
];

function CompanyDay() {
  return (
    <CompanyDayContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Title>Etkinlikler</Title>
      <Card>
        <EventGrid>
          {eventData.map((event) => (
            <EventCard key={event.id}>
              <EventImage src={event.image} alt={event.title} />
              <EventTitle>{event.title}</EventTitle>
              <EventDescription>{event.description}</EventDescription>
              <EventFooter>
                <FooterContent>
                  <FooterText>
                    {event.date} <cite title="Source Title">{event.author}</cite>
                  </FooterText>
                  <TrashIcon />
                </FooterContent>
              </EventFooter>
            </EventCard>
          ))}
        </EventGrid>
      </Card>
    </CompanyDayContainer>
  );
}

export default CompanyDay;