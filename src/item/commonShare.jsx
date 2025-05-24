import React, { useState } from 'react';
import { FaRegBookmark } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
function commonShare({ personnelList }) {


  return (
    <>
      <div className='row'>

        <div className='col-md-12 m-3 '>
          <div className="card p-3 border-0 shadow-sm position-relative overflow-hidden" style={{ transition: 'transform 0.2s' }}>
            <form className="form-inline my-2 my-lg-0 d-flex ">
              <input className="form-control mr-sm-2" type="search" placeholder="Personel Ara" aria-label="Search" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Ara</button>
            </form>
          </div>
        </div>


        <div className="col-md-3">
          <div className="card  border-0 shadow-sm position-relative overflow-hidden" style={{ transition: 'transform 0.2s' }}>
            {/* Badge */}
            <span
              className="position-absolute top-0 end-0 m-2 py-1 px-3 rounded-pill text-white"
              style={{ backgroundColor: '#6300ff', fontSize: 10 }}
            >
             <FaRegBookmark  className='m-1' /> Yönetici
            </span>

            {/* Card Body */}
            <div className="card-body text-center p-4">
              <img
                className="rounded-circle border border-3 border-white shadow"
                src="../src/images/okan.jpg"

                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <h5 className="mt-3 mb-1 fw-bold text-dark">Okan Karaçor</h5>
              <p className="text-secondary mb-3" style={{ fontSize: '0.9rem' }}>
                İnsan Kaynakları
              </p>
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-sm rounded-pill py-2 fw-medium">
                <MdOutlineSecurity className='mb-1'/>  Yetkilendir
                </button>
              </div>
            </div>

            {/* Hover Effect */}

          </div>
          <style>{`
                .card:hover { transform: scale(1.02); }
              `}</style>

        </div>

          <div className="col-md-3">
          <div className="card  border-0 shadow-sm position-relative overflow-hidden" style={{ transition: 'transform 0.2s' }}>
            {/* Badge */}
            <span
              className="position-absolute top-0 end-0 m-2 py-1 px-3 rounded-pill text-white"
              style={{ backgroundColor: '#6300ff', fontSize: 10 }}
            >
             <FaRegBookmark  className='m-1' /> Yönetici
            </span>

            {/* Card Body */}
            <div className="card-body text-center p-4">
              <img
                className="rounded-circle border border-3 border-white shadow"
                src="../src/images/okan.jpg"

                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <h5 className="mt-3 mb-1 fw-bold text-dark">Okan Karaçor</h5>
              <p className="text-secondary mb-3" style={{ fontSize: '0.9rem' }}>
                İnsan Kaynakları
              </p>
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-sm rounded-pill py-2 fw-medium">
                  <MdOutlineSecurity className='mb-1'/>  Yetkilendir
                </button>
              </div>
            </div>

            {/* Hover Effect */}

          </div>
          <style>{`
                .card:hover { transform: scale(1.02); }
              `}</style>

        </div>
        <div className="col-md-3">
          <div className="card  border-0 shadow-sm position-relative overflow-hidden" style={{ transition: 'transform 0.2s' }}>
            {/* Badge */}
            <span
              className="position-absolute top-0 end-0 m-2 py-1 px-3 rounded-pill text-white"
              style={{ backgroundColor: '#6300ff', fontSize: 10 }}
            >
             <FaRegBookmark  className='m-1' /> Yönetici
            </span>

            {/* Card Body */}
            <div className="card-body text-center p-4">
              <img
                className="rounded-circle border border-3 border-white shadow"
                src="../src/images/okan.jpg"

                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
              <h5 className="mt-3 mb-1 fw-bold text-dark">Okan Karaçor</h5>
              <p className="text-secondary mb-3" style={{ fontSize: '0.9rem' }}>
                İnsan Kaynakları
              </p>
              <div className="d-grid">
                <button className="btn btn-outline-primary btn-sm rounded-pill py-2 fw-medium">
                  <MdOutlineSecurity className='mb-1'/>  Yetkilendir
                </button>
              </div>
            </div>

            {/* Hover Effect */}

          </div>
          <style>{`
                .card:hover { transform: scale(1.02); }
              `}</style>

        </div>


      </div>


    </>

  );
};


export default commonShare