import { useState, useEffect } from "react";
import * as XLSX from "xlsx";

export default function AdminPage({initialData}) {
  /*  1. Dropdown Select Box olustur. Burada datanin headerlari gosterilsin.
        2. Dropdownda secilen headera gore, o sectiondaki optionslari acan bir excel tablosu olustur.
        3. Dropdown ve Excel tablosu ortak state kullansin. (header secimine gore)
        4. Excel tablosuna veri ekleme, veri silme ve veri degistirme ozellikleri ekle.
        5. Veri degisikliklerini kaydetmek icin localStorage kullan.
     */
const[data, setData] = useState(() => {
    const savedData = localStorage.getItem("data");
    return savedData? JSON.parse(savedData) : initialData;
})

useEffect (()=>{
    localStorage.setItem("data", JSON.stringify(data));
},[data]);

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

  // Bir ogeyi silme
  const handleDelete = (index) => {
    setData((prevData) => {
      return prevData.map((section) => {
        if (section.header === selectedHeader) {
          const updatedOptions = [...section.Options];
          updatedOptions.splice(index, 1); // silmek icin
          return { ...section, Options: updatedOptions }; // guncellenmis Options ile doner
        }
        return section; // selectedHeaderla eslesmediyse sectionlar degistirilmez
      });
    });
  };
   
const [newOption, setNewOption] = useState({title:'', price:'', halfPrice:'', desc:'',})
  //Yeni veri ekleme 
  const handleAddOption = () => {
    setData((prevData) =>
      prevData.map((section) => {
        
        if (section.header === selectedHeader) {
          return {
            ...section,
            Options: [
              ...section.Options, // onceki optionslari koru
              {
                ...newOption,
                price: Number(newOption.price),
                halfPrice: Number(newOption.halfPrice),
              },
            ],
          };
        }
        // Diger section'ları aynen döndür
        return section;
      })
    );
  
    // Formu sıfırla
    setNewOption({ title: "", desc: "", price: "", halfPrice: "" });
  };

 const handleInputChange = (e) => {
    const {name, value} = e.target;
    setNewOption((prev)=>({
        ...prev,
        [name]:value,
    }))
}; 
const handleEditOption = (index, field, value) => {
    setData((prevData) =>
      prevData.map((section) =>
        section.header === selectedHeader
          ? {
              ...section,
              Options: section.Options.map((option, idx) =>
                idx === index ? { ...option, [field]: value } : option
              ),
            }
          : section
      )
    );
  };


  return (
    <>
      {/* Dropdown Select Box */}
      <div style={{ border: "1px solid 	#880E4F" }}>
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
          <tr style={{ border: "1px solid #AD1457" }}>
            <th>Başlık</th>
            <th>Açıklama</th>
            <th>Fiyat</th>
            <th>Yarım Fiyat</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {selectedOptions.map((option, index) => (
            <tr key={index} style={{ border: "1px solid #D81B60" }}>
              <td>
                <input
                  type="text"
                  value={option.title}
                  onChange={(e) =>
                    handleEditOption(index, "title", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={option.desc}
                  onChange={(e) =>
                    handleEditOption(index, "desc", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={option.price}
                  onChange={(e) =>
                    handleEditOption(index, "price", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={option.halfPrice}
                  onChange={(e) =>
                    handleEditOption(index, "halfPrice", e.target.value)
                  }
                />
              </td>
              <td style={{ border: "1px solid #F06292"}}>
                <button onClick={() => handleDelete(index)}>Sil</button>
              </td>
            </tr>
          ))}
          {/* Yeni satir girisi*/}
          <tr style={{ border: "1px solid #F48FB1"}}>
            <td>
                <input
                type='text'
                name='title'
                placeholder=''
                value= {newOption.title}
                onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                type='text'
                name='desc'
                placeholder=''
                value= {newOption.desc}
                onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                type='text'
                name='price'
                placeholder=''
                value= {newOption.price}
                onChange={handleInputChange}
                />
            </td>
            <td>
                <input
                type='text'
                name='halfPrice'
                placeholder=''
                value= {newOption.halfPrice}
                onChange={handleInputChange}
                />
            </td>
            <td style={{ border:'1px solid #F8BBD0'}}><button onClick={handleAddOption}>Ekle</button></td>
          </tr>
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
