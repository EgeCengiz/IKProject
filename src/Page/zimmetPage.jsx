import React, { useState } from 'react';
import Zimmet from '../item/zimmet';
import Menu from '../item/menu';
import { TbListDetails } from "react-icons/tb";
function ZimmetPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Örnek personel listesi
    const personnelList = [
        { id: 'p1', name: 'Ahmet Yılmaz' },
        { id: 'p2', name: 'Mehmet Demir' },
        { id: 'p3', name: 'Ayşe Kara' },
    ];

    return (
        <div className="zimmet-page">

            <div className="content-page">
                <div className="content">
                    <div className="container-xxl">
                        <br></br>
                        <Zimmet />
                       




                    </div>
                </div>
            </div>
        </div>
    );
}

export default ZimmetPage;