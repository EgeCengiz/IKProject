import { React, useState, useEffect } from 'react'
import Menu from '../item/menu';
import "bootstrap/dist/css/bootstrap.min.css";
import Notes from '../item/notes';
import Calender from '../item/calender';
import PersonPermission from '../item/personPermission';
import Personinfo from '../item/personinfo';
import BirthdayPage from './birthdayPage';
function home() {
    return (
        <div>
            <Menu></Menu>
            <div class="content-page">
                <div class="content">
                    <div class="container-xxl"> 
                        <PersonPermission/>
                        <div class="row">
                            <div class="col-md-8"><Notes/></div>
                            <div class="col-md-4"><BirthdayPage/></div>
                        </div>
                         
                         <Calender />
                       
                      
                    </div>
                </div>
            </div>

        </div>
    )
}

export default home