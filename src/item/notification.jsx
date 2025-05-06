import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IoClose, IoMailOpenOutline } from 'react-icons/io5';
import { motion, AnimatePresence } from 'framer-motion';
import UsersApi from '../Api/UsersApi';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [visibleIds, setVisibleIds] = useState(new Set());

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const usernameEncoded = encodeURIComponent(UsersApi.username);
        const response = await axios.get(
          `${UsersApi.ENDPOINTS.GET_NOTIFICATION}/${usernameEncoded}/0`,
          { headers: { Authorization: `Bearer ${UsersApi.TOKEN}` } }
        );
        const data = response.data || [];
        setNotifications(data);
        setVisibleIds(new Set(data.map(n => n.id)));
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleClose = (id, event) => {
    event.stopPropagation(); // Olayın yayılmasını durdur
    console.log(`Closing notification with id: ${id}`); // Hata ayıklamak için
    setVisibleIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      console.log('Updated visibleIds:', Array.from(next)); // Güncellenmiş visibleIds'yi göster
      return next;
    });
  };

  const visibleNotifications = notifications.filter(n => visibleIds.has(n.id));

  return (
    <div className="container py-3">
      {visibleNotifications.length === 0 ? (
        <div className="d-flex flex-column align-items-center text-muted py-4">
          <IoMailOpenOutline size={32} className="mb-2" />
          <p className="mb-0">Bildirim yok</p>
        </div>
      ) : (
        <AnimatePresence>
          {visibleNotifications.map(n => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.25 }}
              className="bg-white p-3 mb-3 position-relative border-bottom border-light"
            >
              
              <small className="text-secondary d-block mb-1">
                {new Date(n.date).toLocaleDateString('tr-TR')}
              </small>
              <p className="mb-0">{n.message}</p>
           
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Notification;