import { useState } from "react";
import * as XLSX from "xlsx";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import "./admin.css";

export default function AdminPage({ data, setData }) {
    AdminPage.propTypes = {
        data: PropTypes.arrayOf(
            PropTypes.shape({
                header: PropTypes.string.isRequired, // header bir string olmalı
                Options: PropTypes.arrayOf(
                    PropTypes.shape({
                        title: PropTypes.string,
                        desc: PropTypes.string,
                        price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                        halfPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
                    })
                ),
            })
        ).isRequired, // data bir array olmalı ve zorunlu
        setData: PropTypes.func.isRequired, // setData bir fonksiyon olmalı ve zorunlu
    };

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

    const [newOption, setNewOption] = useState({
        title: "",
        price: "",
        halfPrice: "",
        desc: "",
    });

    // Yeni veri ekleme
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
                                price: newOption.price,
                                halfPrice: newOption.halfPrice,
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
        const { name, value } = e.target;

        let updatedValue = value;

        // Eğer 'price' ya da 'halfPrice' alanlarından biri sayısal bir değer olacaksa,
        // geçerli bir sayı olup olmadığını kontrol et
        if ((name === "price" || name === "halfPrice") && (isNaN(value) || value.trim() === "")) {
            updatedValue = ""; // Geçerli sayı değilse, boş bir string ile değiştir
        }

        setNewOption((prev) => ({
            ...prev,
            [name]: updatedValue,
        }));
    };

    const handleEditOption = (index, field, value) => {
        // Sayısal olmayan değerleri kontrol et
        const numericValue =
            field === "price" || field === "halfPrice" ? (isNaN(value) ? "" : value) : value;

        setData((prevData) =>
            prevData.map((section) =>
                section.header === selectedHeader
                    ? {
                          ...section,
                          Options: section.Options.map((option, idx) =>
                              idx === index ? { ...option, [field]: numericValue } : option
                          ),
                      }
                    : section
            )
        );
    };

    const navigate = useNavigate();
    const backtoMenu = () => {
        navigate("/");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        localStorage.setItem("data", JSON.stringify(data));
    };

    return (
        <>
            {/* Dropdown Select Box */}
            <div className="select">
                <label className="adminlabeli">
                    Seçiniz : {""}
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
            <table className="table">
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
                                    value={option.title || ""} // Boş bir string ile başlat
                                    onChange={(e) =>
                                        handleEditOption(index, "title", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={option.desc || ""} // Boş bir string ile başlat
                                    onChange={(e) =>
                                        handleEditOption(index, "desc", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text" // type'ı text yapıyoruz
                                    value={option.price || ""} // Boş bir string ile başlat
                                    onChange={(e) =>
                                        handleEditOption(index, "price", e.target.value)
                                    }
                                />
                            </td>
                            <td>
                                <input
                                    type="text" // type'ı text yapıyoruz
                                    value={option.halfPrice || ""} // Boş bir string ile başlat
                                    onChange={(e) =>
                                        handleEditOption(index, "halfPrice", e.target.value)
                                    }
                                />
                            </td>
                            <td style={{ border: "1px solid #F06292" }}>
                                <button onClick={() => handleDelete(index)}>Sil</button>
                            </td>
                        </tr>
                    ))}

                    {/* Yeni satir girisi */}
                    <tr style={{ border: "1px solid #F48FB1" }}>
                        <td>
                            <input
                                type="text"
                                name="title"
                                placeholder=""
                                value={newOption.title}
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                name="desc"
                                placeholder=""
                                value={newOption.desc}
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                type="text" // type'ı text yapıyoruz
                                name="price"
                                placeholder=""
                                value={newOption.price}
                                onChange={handleInputChange}
                            />
                        </td>
                        <td>
                            <input
                                type="text" // type'ı text yapıyoruz
                                name="halfPrice"
                                placeholder=""
                                value={newOption.halfPrice}
                                onChange={handleInputChange}
                            />
                        </td>
                        <td style={{ border: "1px solid #F8BBD0" }}>
                            <button onClick={handleAddOption}>Ekle</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button className="adminbutton" onClick={exportToExcel}>Excele Aktar</button>
            <button className="adminbutton" onClick={handleSubmit}>Kaydet</button>
            <button className="adminbutton" onClick={backtoMenu}>Menuye Don</button>
        </>
    );
}
