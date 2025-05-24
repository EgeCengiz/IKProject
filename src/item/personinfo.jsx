import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Menu from './menu'
import { TbListDetails } from "react-icons/tb";
import axios from 'axios';
import UsersApi from '../Api/UsersApi';
import { FaSearch } from "react-icons/fa";
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { IoMdPerson } from "react-icons/io";


const PermissionPageContainer = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;



const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
 
`;




function personinfo() {
  const navigate = useNavigate();


  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const defaultImageUrl = '../src/images/profile.png';

  useEffect(() => {
    const fetchBirthdays = async () => {
      try {
        const response = await axios.get(UsersApi.ENDPOINTS.GET_USERS_ALL, {
          headers: { Authorization: `Bearer ${UsersApi.TOKEN}` },
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
                birthDate: user.birthDate,
                position: user.position,
                email: user.email,
                username: user.username,
                phone: user.phone,
                role: user.role,
                image: imageUrl,
              };
            } catch (imgError) {
              console.error(`Error fetching image for ${user.username}:`, imgError);
              return {
                birthDate: user.birthDate,
                username: user.username,
                email: user.email,
                phone: user.phone,
                position: user.position,
                image: defaultImageUrl,
              };
            }
          })
        );

        usersWithImages.sort((a, b) => a.days - b.days);
        setUserData(usersWithImages);

      } catch (err) {
        console.error('Error fetching birthdays:', err);
        setError(err.message || 'Error loading birthdays');
      }
    };

    fetchBirthdays();
  }, []);

  const getUser = async () => {
    try {
      const response = await axios.get(UsersApi.ENDPOINTS.GET_USERS_ALL, {
        headers: {
          Authorization: 'Bearer ' + UsersApi.TOKEN
        }
      });

      setUserData(response.data);

    } catch (error) {
      console.error("Hata:", error);
    }
  }



  useEffect(() => {

    getUser();
  }, []);


  return (
    <div>
      <PermissionPageContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h6 className=" mt-2 mb-2" style={{ color: "#4a5a6b" }}><IoMdPerson /> Personel Listesi </h6>
        <ContentWrapper>

          <div className='row'>
            {userData.map((response, index) => (
              <div key={index} className="col-md-3">
                <div className="card  border-0 shadow-sm position-relative overflow-hidden" style={{ transition: 'transform 0.2s' }}>
                  {/* Badge */}


                  {/* Card Body */}
                  <div className="card-body text-center p-4">
                    <img
                      className="rounded-circle border border-3 border-white shadow"
                      src={response.image}

                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <h5 className="mt-3 mb-1 fw-bold text-dark">  {response.username}</h5>
                    <p className="text-secondary mb-3" style={{ fontSize: '0.9rem' }}>
                      <i>{response.position}</i><br></br>
                      <i>{response.email}</i><br></br>
                      <i>{response.phone}</i>
                    </p>
                    <div className="d-grid">
                      <button onClick={() => navigate(`/personDetails/${response.username}/0`)} className="btn btn-outline-primary btn-sm rounded-pill py-2 fw-medium">
                        <TbListDetails style={{ fontSize: 18 }} /> Personel Bilgisi
                      </button>
                    </div>
                  </div>

                  {/* Hover Effect */}

                </div>
                <style>{`
                                    .card:hover { transform: scale(1.02); }
                                `}</style>

              </div>
            ))}</div>


        </ContentWrapper>
      </PermissionPageContainer>
    </div>
  )
}

export default personinfo