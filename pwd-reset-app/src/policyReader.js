import {useEffect, useState} from "react";
import './policyReader.css'; // We will create this file below
import { Link, useNavigate } from 'react-router-dom';
import logo from './assets/icons8-pdf-100.png';

const PolicyReader = () => {

    let key = ""

    const [data, setData] = useState(null);



    const [readStatus, setReadStatus] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [defaultText, setDefaultText] = useState("View");
    const [shown, setShown] = useState(false);

    const [iframedata, setiframedata] = useState({name: null, link: null,id: null});


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:3000/api/policy/');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result = await response.json();

                for (let i = 0; i < result["Policies"].length; i++) {
                    result["Policies"][i]["status"] = false
                }

                setData(result);
                setError(null);
            } catch (error) {
                setError(error.message);
                setData(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, []); // The empty array ensures this effect runs only once, on mount

    if (isLoading) {
        return <p>Loading data...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }



    const checkIfRead = async (prop) => {
        try {
            const response = await fetch('http://localhost:3000/api/policy/response',{
                method: 'POST',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({id: prop.id, user: prop.user})
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }


            const result = await response.json();
            console.log(result);
            data["Policies"][prop.index].status = result['status']


            const new_data = data
            new_data["Policies"][prop.index]["status"] = result["status"]
            setData(new_data);

        } catch (error) {
            setReadStatus(false);
        }

    }

    const showFileContents = (data, index) => {
        console.log(data);
        setiframedata({
            link: data.link,
            name: data.name,
            id: data.id,
            index: index
        })
        // const new_data = data
        // console.log(new_data["Policies"])
        // setData(new_data);

        console.log(iframedata)
        setShown(!shown)
    }

return (
    <div className='container'>
        {shown && <div style={{
            justifyItems:"center",
            alignItems:"center",
            alignSelf:"center",
            height:"100%",
            zIndex: 1000,
            width:"100%",
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "rgba(0,0,0,0.5)"
        }} onClick={() => setShown(!shown)}>
            <iframe
                title={iframedata.name}
                src={iframedata.link}

                height="80%"
                width="80%"
                style={{
                    justifySelf: "center",
                    backgroundColor: "grey",
                    alignItems: "center",
                    alignSelf: "center",
                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",

                }}

            />
            <h2 style={{color:"white"}} >Click here to acknowledge you've read the policy. </h2>
            <button className='button-secondary' onClick={() => checkIfRead({id:iframedata.id,user:"admin", index: iframedata.index})}>Acknowledge</button>
        </div>}
        <div className='card'>

    <div className='list'>
        {data["Policies"].map((data, index) => (
            <div key={data.id} className='policy-list-item'>
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

                    <button className='buttonPrimary' onClick={() => showFileContents(data, index)} disabled={data.status} >
                        {data.status ?  "Acknowledged" : defaultText}
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
