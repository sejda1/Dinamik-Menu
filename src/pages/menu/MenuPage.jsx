import PropTypes from "prop-types";
import styles from "./menu.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function MenuPage({ data }) {
  const navigate = useNavigate();

  // Sayfayı başa kaydırma işlevi
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Yumuşak kaydırma
    });
  };

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <div className={styles.menuPage}>
      <div className={styles.menuContainer}>
        <div className={styles.navbar}>
          <Link to="/" className={styles.navLink}>Anasayfa</Link>
          <Link to="/menu" className={styles.navLink}>Menü</Link>
          <Link to="/konaklama" className={styles.navLink}>Konaklama</Link>
        </div>
        <header className={styles.menuHeader}>
          <img className={styles.menuLogo} src="/assets/logo.jpeg" alt="Mest-logo" />
          <h1 className={styles.menuTitle}>MEST MENU</h1>
        </header>

        {data.map((section) => (
          <div key={section.header} className={styles.section}>
            <div className={styles.sectionHeader}>
              <img
                className={styles.sectionImage}
                src={section.image}
                alt={section.header}
              />
              <p className={styles.sectionTitle}>{section.header}</p>
            </div>
            <div className={styles.optionsList}>
              {section.Options.map((option, index) => (
                <div key={index} className={styles.optionItem}>
                  <div className={styles.optionDetails}>
                    <h3 className={styles.optionTitle}>{option.title}</h3>
                    {option.desc && (
                      <p className={styles.optionDescription}>{option.desc}</p>
                    )}
                  </div>
                  <div className={styles.optionPrice}>
                    {option.halfPrice && (
                      <span className={styles.priceHalf}>{option.halfPrice}₺</span>
                    )}
                    {option.price && (
                      <span className={styles.priceFull}>{option.price}₺</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <footer className={styles.menuFooter}>
          <p className={styles.footerText}>Afiyet Olsun!</p>
          <button 
            className={styles.orderButton} 
            onClick={handleClick}
          >
            &#127869;
          </button>
          <button 
            className={styles.scrollToTopButton} 
            onClick={handleScrollToTop}
          >
            ↑ 
          </button>
        </footer>
      </div>
    </div>
  );
}

// PropTypes kullanımı ile gelen veri tiplerini kontrol ediyoruz.
MenuPage.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      header: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      Options: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          desc: PropTypes.string,
          price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          halfPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
        })
      ),
    })
  ).isRequired,
};
