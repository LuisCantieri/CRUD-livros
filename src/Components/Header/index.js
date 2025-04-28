import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import logo from '../../assets/maozinha.png';

export default function Header() {
    return (
        <header 
            style={{
                backgroundColor: '#008fb3',
                border: '2px solid black',
                height: '135px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
            className="d-flex align-items-center justify-content-center"
        >
                        <Image 
                            src={logo} 
                            alt="Logo do BookHub" 
                            style={{ width: '120px', height: '114px', }}
                            fluid
                        />
                        <h1 
                            style={{
                                fontSize: '3.25rem',
                                fontWeight: '200',
                                marginLeft: '-25px',
                               
                            }}
                            className="m-0"
                        >
                            BookHub
                        </h1>
        </header>
    );
}