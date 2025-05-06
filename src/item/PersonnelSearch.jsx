// src/components/PersonnelSearch.js
import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import UsersApi from '../Api/UsersApi';


const PersonnelSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async e => {
    e.preventDefault();
    if (!query.trim()) return;
    try {
      const response = await axios.get(
        `${UsersApi.ENDPOINTS.GET_USERS_SEARCH}/${encodeURIComponent(query)}`,
        { headers: { Authorization: `Bearer ${UsersApi.TOKEN}` } }
      );
      console.log(response.data );
      setResults(response.data || []);
      setIsOpen(true);
    } catch (err) {
      console.error('Personel arama hatası:', err);
      setResults([]);
      setIsOpen(true);
    }
  };

  return (
    <div className="personnel-search position-relative" style={{ maxWidth: 400 }}>
      {/* Arama Formu */}
      <form onSubmit={handleSearch} className="d-flex">
        <input
          type="text"
          className="form-control bg-light bg-opacity-50 border-light ps-4"
          placeholder="Personel Ara"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Ara
        </button>
      </form>

      {/* Sonuç Kartı */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="card position-absolute w-100 shadow bg-white rounded mt-1"
            style={{ zIndex: 1000 }}
          >
            <div className="card-body p-2">
              {/* Kapat Butonu */}
              <div className="d-flex justify-content-end">
                <button
                  className="btn btn-sm btn-light p-0"
                  onClick={() => setIsOpen(false)}
                  title="Kapat"
                >
                  <MdClose size={18} />
                </button>
              </div>

              {/* Liste */}
              {results.length === 0 ? (
                <p className="text-center text-muted mb-0">Personel bulunamadı</p>
              ) : (
                <ul className="list-group list-group-flush">
                  {results.map((person,index) => (
                    <li key={index} className="list-group-item">
                      <strong>{person.username}</strong><br/>
                      <small className="text-secondary">{person.email}</small>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PersonnelSearch;
