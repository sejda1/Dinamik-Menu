import { Link } from "react-router-dom";
import { differenceInDays } from "date-fns";
import logo from '/assets/logo.jpeg';
import styles from "./homePage.module.css";

export default function HomePage() {
  const serviceDays = differenceInDays(new Date(), new Date(2023, 5, 25));
  const currentDay = new Date().toLocaleString('tr-TR', { weekday: 'long' });

  return ( 
    <>
      <div className={styles.header}>
        <img className={styles.logo} src={logo} alt="Mest Cafe Logo" />
        <h1 className={styles.headerTitle}>Cafe & Restaurant</h1>
      </div>
      
      <div className={styles.navbar}>
        <Link className={styles.navLink} to="/">Anasayfa</Link>
        <Link className={styles.navLink} to="/menu">Menü</Link>
        <Link className={styles.navLink} to="/konaklama">Konaklama</Link>
      </div>
      
      <h1 className={styles.mainTitle}>Sizi güler yüzle karşılayan, lezzetle ağırlayan adres!</h1>
      
      <p className={styles.serviceDays}>{serviceDays} gündür sizlere hizmet vermekteyiz.</p>
      <p className={styles.serviceDays}>Bugün {currentDay} restoranımız açık.</p>
      
      <div className={styles.description}>
        <p>
          🌸 <span className={styles.highlight}>Hoş Geldiniz!</span><br />
          Lezzet, konfor ve mutluluğun bir araya geldiği adresimize hoş geldiniz!<br />

          🌟 <span className={styles.highlight}>Güler Yüzlü Hizmet:</span><br />
          Ekibimiz, her ziyaretinizde sizi sıcak bir tebessümle karşılıyor. Misafirlerimizin memnuniyeti, bizim önceliğimizdir.<br />

          🍽️ <span className={styles.highlight}>Efsane Lezzetler:</span><br />
          Usta şeflerimiz ve gıda mühendislerimizle hazırlanan, özenle seçilmiş menümüz her damak tadına hitap eden benzersiz tatlar sunuyor.<br />

          🏦 <span className={styles.highlight}>Ferah ve Nezih Bir Atmosfer:</span><br />
          Geniş, aydınlık ve konforlu iç mekanımızda sevdiklerinizle keyifli anlar yaşayın. Rahat ortamımız, hem iş yemekleri hem de keyifli buluşmalar için ideal.<br />

          👨‍👩‍👦 <span className={styles.highlight}>Aile Dostu:</span><br />
          Çocuklu ailelerimiz için geniş oturma düzenlemeleriyle, miniklerin hareket etmeleri için bolca alan bulunuyor.<br/>
          Rahatça yemek yiyebilir ve çocuklar da keyifli zaman geçirebilir.<br/>
        </p>
      </div>
      
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>&quot;Göz Alıcı Tatlar, Unutulmaz Anlar!&quot;</h3>
        <p className={styles.cardText}>Bir fotoğraf karesinde lezzetin davetini hissedin. Seçkin tatlarımız ve özenli sunumlarımızla size ilham olmaya hazırız!</p>
        
        <div className={styles.images}>
          {["beyti", "burger", "cikolatali", "durum", "limonata", "mantarli", "mest-lotus", "mest-tiramisu", "reyhan", "sansebastian", "serpmekahvalti", "tavuklu"].map(image => (
            <img 
              key={image} 
              className={styles.image} 
              src={`./assets/mest-foto/${image}.jpeg`} 
              alt={image} 
              onClick={() => window.open(`./assets/mest-foto/${image}.jpeg`, '_blank')} 
            />
          ))}
        </div>
      </div>
      
      <div className={styles.footer}>
  <div className={styles.social}>
    <a
      href="https://www.instagram.com/mestigneada/"
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialLink}  // className düzeltildi
    >
      <i className={`fa fa-instagram ${styles.socialIcon}`} /> /mestigneada
    </a>
    <a
      href="https://www.google.com/maps/dir/..."
      target="_blank"
      rel="noopener noreferrer"
      className={styles.socialLink}  // className düzeltildi
    >
      <i className={`fas fa-map-marker-alt ${styles.socialIcon}`} /> Yeni Mahalle, Demirköy Caddesi No:8A <br />İğneada/Demirköy/Kırklareli
    </a>
    <i className={`fa fa-phone ${styles.socialIcon}`}>0555 555 55 55</i>
  </div>

  <div className={styles.workSchedule}>
    <ul className={styles.workScheduleList}>
      <li className={styles.scheduleHeader}>Çalışma Günleri</li>
      {["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"].map((day) => (
        <li key={day} className={styles.scheduleDay}>{day} 09.00-00.00</li>
      ))}
    </ul>
  </div>
</div>
      <div className={styles.space}></div>
    </>
  );
}
