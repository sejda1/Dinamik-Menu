import { Link } from "react-router-dom";
import { differenceInDays } from "date-fns";
import logo from '/assets/logo.jpeg';
import "./homePage.css";

export default function HomePage() {
  const serviceDays = differenceInDays(new Date(), new Date(2023, 5, 25));
  const currentDay = new Date().toLocaleString('tr-TR', { weekday: 'long' });

  return ( 
    <>
      <div className="header">
        <img className="logo" src={logo} alt="Mest Cafe Logo" />
        <h1>Cafe & Restaurant</h1>
      </div>
      <div className="navbar">
        <Link to="/">Anasayfa</Link>
        <Link to="/menu">Menü</Link>
        <Link to="/konaklama">Konaklama</Link>
      </div>
      <h1>Sizi güler yüzle karşılayan, lezzetle ağırlayan adres!</h1>
      <p className="serviceDays">{serviceDays} gündür sizlere hizmet vermekteyiz.</p>
      <p className="serviceDays">Bugün {currentDay} restoranımız açık.</p>
      <div className="aciklama">
        <p>
          🌸 <span>Hoş Geldiniz!</span><br />
          Lezzet, konfor ve mutluluğun bir araya geldiği adresimize hoş geldiniz!<br />

          🌟 <span>Güler Yüzlü Hizmet:</span><br />
          Ekibimiz, her ziyaretinizde sizi sıcak bir tebessümle karşılıyor. Misafirlerimizin memnuniyeti, bizim önceliğimizdir.<br />

          🍴 <span>Efsane Lezzetler:</span><br />
          Usta şeflerimiz ve gıda mühendislerimizle hazırlanan, özenle seçilmiş menümüz her damak tadına hitap eden benzersiz tatlar sunuyor.<br />

          🪑 <span>Ferah ve Nezih Bir Atmosfer:</span><br />
          Geniş, aydınlık ve konforlu iç mekanımızda sevdiklerinizle keyifli anlar yaşayın. Rahat ortamımız, hem iş yemekleri hem de keyifli buluşmalar için ideal.<br />

          👨‍👩‍👧‍👦 <span>Aile Dostu:</span><br />
          Çocuklu ailelerimiz için geniş oturma düzenlemeleriyle, miniklerin hareket etmeleri için bolca alan bulunuyor.<br/> 
          Rahatça yemek yiyebilir ve çocuklar da keyifli zaman geçirebilir.<br/>
        </p>
      </div>
      <div className="card">
        <h3>"Göz Alıcı Tatlar, Unutulmaz Anlar!"</h3>
        <p>Bir fotoğraf karesinde lezzetin davetini hissedin. Seçkin tatlarımız ve özenli sunumlarımızla size ilham olmaya hazırız!</p>
        <div className="images">
          {['beyti', 'burger', 'cikolatali', 'durum', 'limonata', 'mantarli', 'mest-lotus', 'mest-tiramisu', 'reyhan', 'sansebastian', 'serpmekahvalti', 'tavuklu'].map(image => (
            <img 
              key={image} 
              src={`./assets/mest-foto/${image}.jpeg`} 
              alt={image} 
              onClick={() => window.open(`./assets/mest-foto/${image}.jpeg`, '_blank')} 
            />
          ))}
        </div>
      </div>
      <div className="footer">
        <div className="social">
          <a href="https://www.instagram.com/mestigneada/" target="_blank" rel="noopener noreferrer">
            <i className="fa fa-instagram" style={{ fontSize: "24px" }}>/mestigneada</i>
          </a>
          <a
            href="https://www.google.com/maps/dir/Yeni+Mahalle,+Mest+Cafe+%26+Restaurant+%C4%B0%C4%9Fneada,+Demirk%C3%B6y+Caddesi,+%C4%B0%C4%9Fneada%2FDemirk%C3%B6y%2FK%C4%B1rklareli/41.8770432,27.9857389/@41.8768906,27.9854756,19.76z/data=!4m10!4m9!1m5!1m1!1s0x40a0e96576ebcbb1:0xb3b374b4df520fe2!2m2!1d27.9857227!2d41.8770792!1m1!4e1!3e2?entry=ttu&g_ep=EgoyMDI0MTIwOS4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className='fas fa-map-marker-alt' style={{ fontSize: '24px'}}><span style={{fontWeight: "normal"}}>Yeni Mahalle, Demirköy Caddesi No:8A <br />İğneada/Demirköy/Kırklareli</span></i>
          </a>
          <i className="fa fa-phone" style={{ fontSize: '24px' }}>0555 555 55 55</i>
        </div>
        <div className="calismatakvimi">
          <ul>
            <li>Çalışma Günleri</li>
            {['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'].map(day => (
              <li key={day}>{day} 09.00-00.00</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bosluk"></div>
    </>
  );
}
