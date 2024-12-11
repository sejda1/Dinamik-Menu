import {useState} from "react";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom";
import logo from '/assets/logo.jpeg';
import "./login.css";

export default function Login () {
    const[username, setUsername]= useState("");
    const[password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME;
        const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;
        
    
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
            navigate("/admin");
        } else {
            alert("Üzgünüm. Personel harici giremez");
        }
    };
    return (
        <div className="login-page">
        <div className="login">
            <img className="logo" src={logo} alt="logo"/>
            <p className="login-text">Mest Cafe Personeli iseniz formu doldurunuz, <br/> degilseniz&nbsp;
              <Link className="login-link" to="/menu">Menu Sayfasi</Link> &apos;na geciniz.
            </p>
            <div className="username">
            <label className="login-label" htmlFor="username">Username</label>
            <input className="login-input"
            type="text"
            placeholder="Kullanici adi"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}} />
            </div>
            <div className="password">
            <label className="login-label" htmlFor="password">Password</label>
              <input className="login-input"
            type="password"
            placeholder="Sifre"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}} />
            </div>
            <button className="girisbuton" onClick={handleLogin}>Giris Yap</button>
        </div>
        </div>
    )
}