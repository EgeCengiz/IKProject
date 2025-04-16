import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { TiPinOutline } from "react-icons/ti";
import UsersApi from '../Api/UsersApi';
import { FaSearch } from "react-icons/fa";
function PersonPermission({ onAction }) {
  const [data, setData] = useState([]);

  const confirmPermission = async (id, state) => {
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
      console.log(response.data);
      getStatePermission(); 
      onAction();
    } catch (error) {
      console.error("Hata:", error.response ? error.response.data : error.message);
    }
  };

  const getStatePermission = async () => {
    try {
      const response = await axios.get(UsersApi.ENDPOINTS.GET_PERMISSION_STATE, {
        headers: {
          Authorization: 'Bearer ' + UsersApi.TOKEN,
        },
      });
      setData(response.data || []);
      console.log(response.data);
    } catch (error) {
      console.error("Hata:", error.response ? error.response.data : error.message);
      setData([]);
    }
  };

  useEffect(() => {
    getStatePermission();
  }, []);

  // Veri yoksa hiçbir şey render etme
  if (!data || data.length === 0) {
    return null;
  }

  return (
    <div>
      <br />
      <h5 className="card-title mb-2 mt-2" style={{ color: "#4a5a6b" }}>İzin Talepleri</h5>
      <br></br> 
      <div className='row' >
      {data.map(permissionData => (
       
          <div className="col-sm-4 col-lg-4"key={permissionData.id}>
            <div className="card d-block ">
              <div className="card-header d-flex justify-content-between">
                <span style={{ fontSize: 18 }}>İzin Talebi</span>
                <TiPinOutline />
              </div>
              <div className="card-body">
                <blockquote className="card-blockquote mb-0" style={{ fontSize: 14 }}>
                  {permissionData.permissionName}
                  <p className="card-text text-muted">
                    {permissionData.permissionDescription}
                    <br />
                    <br />
                    Başlangıç Tarihi: {permissionData.permissionStartDateTime}
                    <br />
                    Bitiş Tarihi: {permissionData.permissionEndDateTime}
                  </p>
                  <footer className="blockquote-footer mt-0 font-size-14">
                    <div className='d-flex justify-content-between'>
                      <div>
                        {permissionData.today} <cite title="Source Title">{permissionData.username}</cite>
                      </div>
                      <div>
                        <br></br>
                      
                        <button
                          type="button"
                          className="btn btn-primary m-1"
                          style={{ fontSize: 13 }}
                          onClick={() => confirmPermission(permissionData.id, "ONAYLANDI")}
                        >
                          İzni Onayla
                        </button>
                       
                        <button
                          type="button"
                          className="btn btn-danger m-1"
                          style={{ fontSize: 13 }}
                          onClick={() => confirmPermission(permissionData.id, "REDDEDİLDİ")}
                        >
                          Reddet
                        </button>
                      </div>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
       
      ))}
 </div>


      
    </div>
  );
}

export default PersonPermission;