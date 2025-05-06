import { React, useState, useEffect } from 'react'
import Menu from '../item/menu';
import "bootstrap/dist/css/bootstrap.min.css";
import Notes from '../item/notes';
import Calender from '../item/calender';
import PersonPermission from '../item/personPermission';
import BirthdayPage from './birthdayPage';
import PieAnalist from '../item/pieAnalist';
import PersonnelSearch from '../item/PersonnelSearch';
import { MdPadding } from 'react-icons/md';
function home() {
    return (
        <div>
           
            <div className="content-page">
                <div className="content">
                    <div className="container-xxl"> 
                        <br></br>
                        <PersonPermission/>
                    
                       <br></br>
                        <div className="row ps-5 pe-5" >
                    
                            <div className="col-md-8"><Notes/></div>
                            <div className="col-md-4"><BirthdayPage/></div>
                        </div> 
                         <Calender />
                       <PieAnalist/>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default home