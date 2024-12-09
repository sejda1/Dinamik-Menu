import PropTypes from "prop-types";
import "./menu.css";
import { useNavigate } from "react-router-dom";

export default function MenuPage({ data}) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/login");
    };
  return (
    <div className="menu-page">
      <div className="menu-container">
        <header className="menu-header">
          <img className="menu-logo" src="/assets/logo.jpeg" alt="Mest-logo" />
          <h1 className="menu-title">MEST MENU</h1>
        </header>
        {data.map((section) => (
          <div key={section.header} className="section">
            <div className="section-header">
              <img
                className="section-image"
                src={section.image}
                alt={section.header}
              />
              <p className="section-title">{section.header}</p>
            </div>
            <div className="options-list">
              {section.Options.map((option, index) => (
                <div key={index} className="option-item">
                  <div className="option-details">
                    <h3 className="option-title">{option.title}</h3>
                    {option.desc && (
                      <p className="option-description">{option.desc}</p>
                    )}
                  </div>
                  <div className="option-price">
                    {option.halfPrice && (
                      <span className="price-half">{option.halfPrice}₺</span>
                    )}
                    {option.price && (
                      <span className="price-full">{option.price}₺</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <footer className="menu-footer">
          <p className="footer-text">Afiyet Olsun!</p>
          <button className="order-button" onClick={handleClick}>
            &#127869;
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