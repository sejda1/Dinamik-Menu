import { useNavigate } from "react-router-dom"

export default function MenuPage ({data}) {
    let navigate = useNavigate();
    const handleClick = () => {
        navigate("/mest")
    } 
    return (
    <>
    <h1>"Burada Menu Gosterilecek"</h1>
    <button onClick={handleClick} style={{fontSize:"3rem"}}>&#127869;</button>
    </>
)
}