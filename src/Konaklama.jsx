import "./konaklama.css";
import {Link} from "react-router-dom";
export default function Konaklama() {
    return (
        <div className="konaklama">
            <div className="navbar">
        <Link to="/">Anasayfa</Link>
        <Link to="/menu">Menü</Link>
        <Link to="/konaklama">Konaklama</Link>
      </div>
            <h1>Konaklama</h1>
            <p className="aciklama">
                Kafemizin üst katında, tatil ya da kısa süreli konaklama için ideal apart dairelerimiz bulunmaktadır.<br />
                Hem rahat bir konaklama imkanı sunuyoruz, hem de zengin menümüzle lezzetli yemekler eşliğinde keyifli bir zaman geçirmenize olanak tanıyoruz.<br />
                Hem tatilinizi hem de günlük ihtiyaçlarınızı karşılamak için, konforlu apartlarımızda dinlenebilir, yemek yemek için ise ferah ve huzurlu kafemizi tercih edebilirsiniz.<br />
            </p>
        </div>
    )
}