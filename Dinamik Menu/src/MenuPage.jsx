import { useNavigate } from "react-router-dom"

export default function MenuPage () {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate("/mest")
    } 
    return (
    <>
    <p>"Burada Menu Gosterilecek"</p>
    <button onClick={handleClick} style={{fontSize:"3rem", borderRadius:"100px"}}>&#127869;</button>
    </>
)
}