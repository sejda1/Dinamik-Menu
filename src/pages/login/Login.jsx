import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from '/assets/logo.jpeg';
import styles from "./login.module.css"; 

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    const ADMIN_USERNAME = "admin";
    const ADMIN_PASSWORD = "mest2022";

    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      navigate("/admin");
    } else {
      alert("Üzgünüm. Personel harici giremez");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.login}>
        <img className={styles.logo} src={logo} alt="logo" />
        <p className={styles.loginText}>
          Mest Cafe Personeli iseniz formu doldurunuz, <br />
          degilseniz&nbsp;
          <Link className={styles.loginLink} to="/menu">Menu Sayfasi</Link> &apos;na geciniz.
        </p>
        <div className={styles.username}>
          <label className={styles.loginLabel} htmlFor="username">Username</label>
          <input
            className={styles.loginInput}
            type="text"
            placeholder="Kullanici adi"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.password}>
          <label className={styles.loginLabel} htmlFor="password">Password</label>
          <input
            className={styles.loginInput}
            type="password"
            placeholder="Sifre"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className={styles.girisButon} onClick={handleLogin}>Giris Yap</button>
      </div>
    </div>
  );
}
