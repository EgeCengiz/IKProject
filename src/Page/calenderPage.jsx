import React from 'react'
import Menu from '../item/menu'
import Calender from '../item/calender'
function calenderPage() {
    return (
        <div>
            
            <div className="content-page">
                <div className="content">
                    <div className="container-xxl">
                      
                        <div className='ms-5 me-5'>
                            <br></br>
                        <Calender control={1} />
                        </div>
                           
                    </div>
                </div>
            </div>
        

        </div>
    )
}

export default calenderPage