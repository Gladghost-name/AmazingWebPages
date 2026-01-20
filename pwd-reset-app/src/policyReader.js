import React, { useState } from 'react';
import './policyReader.css'; // We will create this file below
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/icons8-pdf-100.png';

const PolicyReader = () => {

    const grid = [
        {
            "id": 1,
            "name":"test",
            "link":"test.com"
        },
        {
            "id": 2,
            "name":"test",
            "link":"test.com"
        },
        {
            "id": 3,
            "name":"test",
            "link":"test.com"
        },
        {
            "id": 4,
            "name":"test",
            "link":"test.com"
        },
        {
            "id": 5,
            "name":"test",
            "link":"test.com"
        },
    ]

return (
    <div className='container'>
        <div className='card'>
    <div className='list'>
        {grid.map((data, index) => (
            <div key={index} className='policy-list-item'>
                <div className='policy-item'>
                    {/* Header */}
                    <div className="login-header">
                        <h2 style={{ fontSize: 17, margin: 0 }}>{data.name} Policy</h2>
                        <img 
                            alt='pdf' 
                            src={logo} 
                            className='pdf-image' 
                            style={{ width: 60, objectFit: 'contain' }} 
                        />
                    </div>

                    <button className='buttonPrimary' onClick={() => console.log('View clicked')}>
                        View
                    </button>
                </div>
            </div>
        ))}
    </div>
</div>
    </div>
    );
};

export default PolicyReader;
