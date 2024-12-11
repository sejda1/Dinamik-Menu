import { Link } from "react-router-dom";
import { differenceInDays } from "date-fns";
import logo from '/assets/logo.jpeg'; 
import gokyuzu from '/assets/gokyuzu.mp4'

export default function HomePage() {
  // Doğru tarihlerle fark hesaplanıyor
  const serviceDays = differenceInDays(new Date(), new Date(2023, 5, 10));

  return (
    <>
    <img src={logo} alt="logo"/>
    <h1>Mest Cafe</h1>
    <p>{serviceDays} gündür sizlere hizmet vermekteyiz.</p>
    <Link to="/menu">Menu Sayfası</Link>
    <a href="https://www.instagram.com/mestigneada/" target="_blank" rel="noopener noreferrer">
        <i className="fa fa-instagram" style={{fontSize: "24px"}}></i>
      </a>
      <video autoPlay loop muted style={{width: "100%", height:"100vh",}}>
        <source src={gokyuzu} type="video/mp4" />
      </video>      
    </>
  );
}
