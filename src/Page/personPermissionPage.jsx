import {React,useState} from 'react'
import PersonPermission from '../item/personPermission';
import Menu from '../item/menu';
import PermissonList from '../item/permissonList';
function personPermissionPage() {
    const [refreshSignal, setRefreshSignal] = useState(0);

    const triggerRefresh = () => {
        setRefreshSignal(prev => prev + 1); // PermissonList'i yenilemek için sinyali artır
    };

    return (
        <div>


            <div className="content-page">

                <div className="content">
                    <div className="container-xxl">
                        <PersonPermission onAction={triggerRefresh} />
                        <PermissonList refreshSignal={refreshSignal} />
                    </div>
                </div>
            </div>



        </div>
    )
}

export default personPermissionPage