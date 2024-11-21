import {useState } from 'react';

export default function AdminPage ({data}) {
    /*  1. Dropdown Select Box olustur. Burada datanin headerlari gosterilsin.
        2. Dropdownda secilen headera gore, o sectiondaki optionslari acan bir excel tablosu olustur.
        3. Dropdown ve Excel tablosu ortak state kullansin. (header secimine gore)
        4. Excel tablosuna veri ekleme, veri silme ve veri degistirme ozellikleri ekle.
     */
    console.log(data.header);
    const [selectedHeader, setSelectedHeader] = useState([data.header]);
    const handleChange = (e) => {
        setSelectedHeader(e.target.value)
    }

    return (
        <>
        <p>Sadece Admin Gorebilir</p>
        {/* Dropdown Select Box */}
        <div>
            <label>
                Seciniz : {''}
                <select value={selectedHeader} onChange={handleChange}>
                  {data.map((section)=> (
                    <option key={section.header} value={section.header}>
                        {section.header}
                    </option>
                  ))}

                </select>
            </label>
        </div>
        </>
    )
}