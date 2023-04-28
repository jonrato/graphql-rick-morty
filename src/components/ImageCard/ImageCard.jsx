import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import ReactPaginate from "react-paginate";
const ImageCard = ({ character }) => {
    const { name, image, status, species, gender, location, episode } = character;
    const [styleStatus, setStyleStatus] = useState('dotOn')
    const verifyStatus = () => {
        if (status === 'Alive'){
            setStyleStatus('dotOn')
        }
        else if (status === 'Dead') {
            setStyleStatus('dotOff')
        }
        else {
            setStyleStatus('dotUnknown')
        }
    }
    useEffect(() => {
        verifyStatus();
    },[])
    return (
        <>
        <Card className="col-12 bg-dark card text-white mb-4" style={{ width: '38rem' }}>
            <Row>
                <div className="col-6">
                    <Card.Img variant="top" className="" src={image} />
                </div>
                <div className="col-6">
                    <h2>{name}</h2>
                    <p>
                        <span class={styleStatus}></span>
                        {' '}
                        {status} - {species}
                    </p>
                    
                    <h5 className="text-black">Last known location:</h5>
                    <p>{location.name}</p>

                    <h5 className="text-black">First seen in:</h5>
                    <p>{episode[0].air_date}</p>
                </div>
            </Row>
        </Card>
        </>
    )
}

export default ImageCard;