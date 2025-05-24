import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TiPinOutline } from "react-icons/ti";
import { IoDocument } from "react-icons/io5";
import UsersApi from '../Api/UsersApi';
import { FaSearch } from "react-icons/fa";
function PersonPermission({ onAction }) {
  const [data, setData] = useState([]);


 const fetchBirthdays = async () => {
      try {
        const response = await axios.get(UsersApi.ENDPOINTS.GET_PERMISSION_STATE, {
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
                id: user.id,
                permissionName: user.permissionName,
                permissionDescription: user.permissionDescription,
                position: user.position,
                permissionStartDateTime: user.permissionStartDateTime,
                username: user.username,
                permissionEndDateTime: user.permissionEndDateTime,
                today: user.today,
                image: imageUrl,
              };
            } catch (imgError) {
              console.error(`Error fetching image for ${user.username}:`, imgError);
              return {
                id: user.id,
                permissionName: user.permissionName,
                permissionDescription: user.permissionDescription,
                position: user.position,
                permissionStartDateTime: user.permissionStartDateTime,
                username: user.username,
                permissionEndDateTime: user.permissionEndDateTime,
                today: user.today,
                image: imageUrl,
              };
            }
          })
        );

        usersWithImages.sort((a, b) => a.days - b.days);
        setData(usersWithImages);

      } catch (err) {

      }
    };
  useEffect(() => {
   
    console.log("çalıştı")
    fetchBirthdays();
  }, [onAction]);

  const confirmPermission = async (username, id, state, start, end) => {
    const newEvent = {
      title: "İzinli Personel : " + username,
      startDate: start.split('T')[0],
      endDate: end.split('T')[0],
      color: "#ff0a0a",
    };
    try {
      const response = await axios.put(
        `${UsersApi.ENDPOINTS.PUT_PERMISSON_RESULT}/${id}`,
        { state },
        {
          headers: {
            Authorization: 'Bearer ' + UsersApi.TOKEN,
          },
        }
      );
     
       fetchBirthdays();
      onAction();
    } catch (error) {
      console.error("Hata:", error.response ? error.response.data : error.message);
    }
  };




  // Veri yoksa hiçbir şey render etme
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div className='ps-5'>

      <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}><IoDocument /> İzin Talepleri</h5>
      <br></br>
      <div className='row' >     
        {data.map(item => {
           const start = new Date(item.permissionStartDateTime);
              const end   = new Date(item.permissionEndDateTime);
              const days  = Math.ceil((end - start) / (1000*60*60*24));
          return(
          <div  className="col-md-4 mb-3" key={item.id}>
            <div className="card h-100 shadow-sm">
              <div className="card-header d-flex justify-content-between align-items-center bg-white">
                <span className="fw-semibold">İzin Talebi</span>
                <TiPinOutline />
              </div>
              <div className="card-body text-center">
                <img
                  src={item.image}
                  alt={item.username}
                  className="rounded-circle mb-3"
                  style={{ width: '70px', height: '70px', objectFit: 'cover' }}
                />
                <h6 className="card-title mb-1">{item.permissionName}</h6>
                <p className="text-muted small mb-3">{item.permissionDescription}</p>
                <p className="mb-3 small text-secondary">
                  <span>Başlangıç: {new Date(item.permissionStartDateTime).toLocaleDateString('tr-TR')}</span><br />
                  <span>Bitiş: {new Date(item.permissionEndDateTime).toLocaleDateString('tr-TR')}</span><br/>
                  <span>İstenen İzin Süresi: <b>{days}</b></span>
                </p>
              </div>
              <div className="card-footer bg-white d-flex justify-content-between align-items-center">
                <small className="text-muted">
                  {item.today} <cite>{item.username}</cite>
                </small>
                <div>
                  <button
                    type="button"
                    className="btn btn-success btn-sm me-1"
                    onClick={() => confirmPermission(item.username, item.id, 'ONAYLANDI', item.permissionStartDateTime, item.permissionEndDateTime)}
                  >
                    Onayla
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => confirmPermission(item.username, item.id, 'REDDEDİLDİ', item.permissionStartDateTime, item.permissionEndDateTime)}
                  >
                    Reddet
                  </button>
                </div>
              </div>
            </div>
          </div>
        )})}
   
      </div>



    </div>
  );
}

export default PersonPermission;