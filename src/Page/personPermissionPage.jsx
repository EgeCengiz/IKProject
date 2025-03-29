import React from 'react'
import PersonPermission from '../item/personPermission';
import Menu from '../item/menu';
import PermissonList from '../item/permissonList';
function personPermissionPage() {
    return (
        <div>
            <Menu />

            <div class="content-page">

                <div class="content">
                    <div class="container-xxl">
                           <PersonPermission />
                           <PermissonList/>
                    </div>
                </div>
            </div>


         
        </div>
    )
}

export default personPermissionPage