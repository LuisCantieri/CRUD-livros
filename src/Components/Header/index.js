import React from "react";
import '../Styles/header.css'
import logo from '../../assets/maozinha.png';

export default function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Logo do BookHub" />
            <p>BookHub</p>
        </header>
    );
}
    