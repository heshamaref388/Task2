import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Flag from "react-world-flags"; // Import the flag component
import { HiChevronDown } from "react-icons/hi"; // Dropdown icon

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  // Change the language when the dropdown value changes
  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang); // Changes the language dynamically
    setIsOpen(false); // Close dropdown after language selection
  };

  useEffect(() => {
    // Set German as the default language when the component loads
    i18n.changeLanguage("en");
  }, [i18n]);

  const languages = [
    { code: "en", name: "English", flag: "US" },
    { code: "de", name: "German", flag: "DE" },
    { code: "ar", name: "عربي ", flag: "EG" }, // استخدام علم مصر
    { code: "fr", name: "French", flag: "FR" },
  ];

  const currentLanguage = languages.find((lang) => lang.code === i18n.language);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#f8f8f8",
            border: "1px solid #ddd",
            padding: "10px 20px",
            borderRadius: "30px",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          {/* Flag icon */}
          <Flag
            code={currentLanguage?.flag}
            alt={currentLanguage?.flag}
            style={{ width: "20px", height: "15px", marginRight: "10px" }}
          />
          {currentLanguage?.name}
          <HiChevronDown size={20} style={{ marginLeft: "10px" }} />
        </button>
        {isOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              right: "0",
              backgroundColor: "white",
              border: "1px solid #ddd",
              borderRadius: "8px",
              width: "150px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {languages.map((lang) => (
              <div
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "10px",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
              >
                <Flag
                  code={lang.flag}
                  style={{
                    width: "20px",
                    height: "15px",
                    marginRight: "10px",
                  }}
                />
                {lang.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
