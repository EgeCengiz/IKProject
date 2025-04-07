import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { Modal, Button, Form } from 'react-bootstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Moment'i localizer olarak kullanıyoruz.
const localizer = momentLocalizer(moment);

// Özel Toolbar: Sadece ay etiketini, önceki ve sonraki ay butonlarını gösterir.
const CustomToolbar = (toolbar) => {
  const goToBack = () => {
    toolbar.onNavigate('prev');
  };

  const goToNext = () => {
    toolbar.onNavigate('next');
  };

  return (
    <div className="rbc-toolbar d-flex justify-content-between align-items-center mb-2">
      <Button variant="outline-secondary" size="sm" onClick={goToBack}>
        ←
      </Button>
      <span style={{ fontWeight: '500', fontSize: '1rem', color: '#90caf9' }}>
        {toolbar.label}
      </span>
      <Button variant="outline-secondary" size="sm" onClick={goToNext}>
        →
      </Button>
    </div>
  );
};

function CalendarComponent() {
  // Eklenen etkinlikleri tutan state
  const [events, setEvents] = useState([]);
  
  // Form verileri
  const [formData, setFormData] = useState({
    title: '',
    start: '',
    end: '',
    color: '#5a9bd4', // Yumuşak mavi tonu
  });

  // Takvimden seçim yapıldığında açılacak modal için state
  const [showModal, setShowModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [modalData, setModalData] = useState({
    title: '',
    color: '#5a9bd4',
  });

  // Formdaki değişiklikler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Form aracılığıyla etkinlik ekleme
  const handleAddEvent = (e) => {
    e.preventDefault();
    const { title, start, end, color } = formData;
    if (!title || !start || !end) return;
    const newEvent = {
      title,
      start: new Date(start),
      end: new Date(end),
      color,
    };
    setEvents([...events, newEvent]);
    // Formu sıfırla
    setFormData({
      title: '',
      start: '',
      end: '',
      color: '#5a9bd4',
    });
  };

  // Takvimden tarih aralığı seçildiğinde modalı aç
  const handleSelectSlot = ({ start, end }) => {
    setSelectedSlot({ start, end });
    setModalData({ title: '', color: '#5a9bd4' });
    setShowModal(true);
  };

  // Modal üzerinden etkinlik ekleme
  const handleSaveModalEvent = () => {
    if (!modalData.title) return;
    const newEvent = {
      title: modalData.title,
      start: selectedSlot.start,
      end: selectedSlot.end,
      color: modalData.color,
    };
    setEvents([...events, newEvent]);
    setShowModal(false);
    setSelectedSlot(null);
  };

  // Takvimdeki etkinliklerin stilini belirleyelim (minimal tasarım)
  const eventStyleGetter = (event) => {
    const style = {
      backgroundColor: event.color,
      borderRadius: '4px',
      opacity: 0.9,
      color: 'white',
      border: 'none',
      padding: '2px 4px',
      fontSize: '0.85rem',
    };
    return { style };
  };

  return (
    <div className=' p-3'>  
     <h5 style={{ color: "#4a5a6b" }}>Takvim</h5>
   
  <div className='card'>
      
      <div className='card-body'>
         <div className="container mt-4">
      {/* Stil ayarlarını global olarak ekliyoruz */}
      <style type="text/css">
        {`
          /* Takvimdeki header ve toolbar yazılarını soluk mavi yapıyoruz */
          .rbc-header, .rbc-toolbar-label {
            color: #90caf9 !important;
          }
          /* Diğer ay (mevcut ay dışı) günlerin arka planını hafif mavi yapıyoruz */
          .rbc-day-bg.rbc-off-range-bg {
            background-color: #e3f2fd !important;
          }
        `}
      </style>

     

      {/* Takvim */}
      <div className="row">
        <div className="col-12 mb-3">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            selectable
            onSelectSlot={handleSelectSlot}
            views={['month']}
            defaultView="month"
            toolbar
            components={{ toolbar: CustomToolbar }}
            eventPropGetter={eventStyleGetter}
          />
        </div>
      </div>

      {/* Etkinlik Ekleme Formu */}
      <div className="row">
        <div className="col-12">
          <div className=" shadow-sm p-2">
            <Form onSubmit={handleAddEvent} className="d-flex flex-wrap align-items-center">
              <div className="col-md-3 mb-2 px-1">
                <Form.Control
                  type="text"
                  placeholder="Başlık"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  size="sm"
                />
              </div>
              <div className="col-md-3 mb-2 px-1">
                <Form.Control
                  type="date"
                  name="start"
                  value={formData.start}
                  onChange={handleChange}
                  size="sm"
                />
              </div>
              <div className="col-md-3 mb-2 px-1">
                <Form.Control
                  type="date"
                  name="end"
                  value={formData.end}
                  onChange={handleChange}
                  size="sm"
                />
              </div>
              <div className="col-md-2 mb-2 px-1">
                <Form.Control
                  type="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  size="sm"
                  title="Renk Seç"
                />
              </div>
              <div className="col-md-1 mb-2 px-1">
                <Button variant="secondary" type="submit" size="sm" block="true">
                  Ekle
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>

      {/* Takvimden slot seçildiğinde açılan Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Yeni Etkinlik</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="modalTitle" className="mb-2">
              <Form.Label className="small">Başlık</Form.Label>
              <Form.Control
                type="text"
                placeholder="Etkinlik başlığı"
                value={modalData.title}
                onChange={(e) => setModalData(prev => ({ ...prev, title: e.target.value }))}
                size="sm"
              />
            </Form.Group>
            <Form.Group controlId="modalColor" className="mb-2">
              <Form.Label className="small">Renk</Form.Label>
              <Form.Control
                type="color"
                value={modalData.color}
                onChange={(e) => setModalData(prev => ({ ...prev, color: e.target.value }))}
                size="sm"
              />
            </Form.Group>
            <Form.Group controlId="modalRange" className="mb-2">
              <Form.Label className="small">Tarih Aralığı</Form.Label>
              <div className="small">
                {selectedSlot && (
                  <>
                    <div>
                      <strong>Başlangıç:</strong> {selectedSlot.start.toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Bitiş:</strong> {selectedSlot.end.toLocaleDateString()}
                    </div>
                  </>
                )}
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="p-2">
          <Button variant="outline-secondary" size="sm" onClick={() => setShowModal(false)}>
            İptal
          </Button>
          <Button variant="secondary" size="sm" onClick={handleSaveModalEvent}>
            Kaydet
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
      </div>
    </div>
    </div>
  
   
  );
};

export default CalendarComponent;
