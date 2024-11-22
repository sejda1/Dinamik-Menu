import React from "react";
import { useNavigate } from "react-router-dom";
import "./menu.css";

export default function MenuPage({ initialData }) {
  let navigate = useNavigate();

  const handleClick = () => {
    navigate("/mest");
  };

  return (
    <div className="menu-page">
      <div className="menu-container">
        <header className="menu-header">
          <img className="menu-logo" src="./src/assets/logo.jpeg" alt="Mest-logo" />
          <h1>MEST MENU</h1>
        </header>
        {initialData.map((category, index) => (
          <div key={index} className="category-section">
            <div className="category-header">
              <img src={category.image} alt={category.header} className="category-image" />
              <p className="category-title">{category.header}</p>
            </div>
            <div className="options-list">
              {category.Options.map((option, index) => (
                <div key={index} className="option-item">
                  <div className="option-details">
                    <h3 className="option-title">{option.title}</h3>
                    {option.desc && <p className="option-description">{option.desc}</p>}
                  </div>
                  <div className="option-price">
                    {option.halfPrice && <span className="price-half">{option.halfPrice} ₺</span>}
                    {option.price && <span className="price-full">{option.price} ₺</span>}
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