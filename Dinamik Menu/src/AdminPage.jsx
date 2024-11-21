import { useState } from "react";

export default function AdminPage({ data }) {
  /*  1. Dropdown Select Box olustur. Burada datanin headerlari gosterilsin.
        2. Dropdownda secilen headera gore, o sectiondaki optionslari acan bir excel tablosu olustur.
        3. Dropdown ve Excel tablosu ortak state kullansin. (header secimine gore)
        4. Excel tablosuna veri ekleme, veri silme ve veri degistirme ozellikleri ekle.
     */

  const [selectedHeader, setSelectedHeader] = useState(data[0].header);
  const handleChange = (e) => {
    setSelectedHeader(e.target.value);
  };

  // Secilen headera gore Optionslari alma
  const selectedOptions =
    data.find((section) => section.header === selectedHeader)?.Options || [];

  // Excel
  const exportToExcel = () => {
    if (!selectedOptions) return;
    const worksheet = XLSX.utils.json_to_sheet(selectedOptions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, selectedHeader);
    XLSX.writeFile(workbook, `${selectedHeader}.xlsx`);
  };

  return (
    <>
      <p>Sadece Admin Gorebilir</p>
      {/* Dropdown Select Box */}
      <div>
        <label>
          Seciniz : {""}
          <select value={selectedHeader} onChange={handleChange}>
            {data.map((section) => (
              <option key={section.header} value={section.header}>
                {section.header}
              </option>
            ))}
          </select>
        </label>
      </div>
      {/* Excel Tablosu */}
      <table style={{ marginTop: "10px", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ border: "1px solid orange" }}>
            <th>Başlık</th>
            <th>Açıklama</th>
            <th>Fiyat</th>
            <th>Yarim Fiyat</th>
          </tr>
        </thead>
        <tbody>
          {selectedOptions.map((option, index) => (
            <tr style={{ border: "1px solid green" }} key={index}>
              <td>{option.title}</td>
              <td>{option.desc || "N/A"}</td>
              <td>{option.price}</td>
              <td>{option.halfPrice || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        style={{ marginTop: "1rem", padding: "1rem 2rem", cursor: "pointer" }}
        onClick={exportToExcel}
      >
        Excel'e Aktar
      </button>
    </>
  );
}
