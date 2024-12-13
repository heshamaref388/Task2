import { useEffect, useMemo, useState, Suspense } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import { FaSun, FaMoon } from "react-icons/fa";
import { Helmet } from "react-helmet";

// DataDisplay Component
const DataDisplay = () => {
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("en");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Fetching data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("exchange.json", {
          cache: "force-cache",
        });
        setData(response.data.hits.hits || []);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Memoize filtered data based on search query and selected category
  const filteredData = useMemo(() => {
    return data.filter((item) => {
      const matchesCategory = selectedCategory
        ? item._source.type === selectedCategory
        : true;
      const matchesSearch = item._source.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [data, selectedCategory, searchQuery]);

  // Toggle dark mode
  const toggleDarkMode = () => setDarkMode(!darkMode);

  // Toggle language
  const toggleLanguage = (newLanguage) => setLanguage(newLanguage);

  if (loading) return <div className="skeleton-loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <>
      <Helmet>
        <title>{t("dataList")}</title>
        <meta
          name="description"
          content="This page to show all data for Financial management."
        />
        <meta name="keywords" content="data, list, information, SEO" />
        <meta name="author" content="FutTech" />
      </Helmet>

      <div
        className={`flex flex-wrap ${
          darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
        }`}
      >
        {/* Lazy loading the Sidebar using Suspense */}
        <Suspense
          fallback={<div style={{ height: "100vh" }}>Loading Sidebar...</div>}
        >
          <Sidebar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            onToggleDarkMode={toggleDarkMode}
            isDarkMode={darkMode}
            onToggleLanguage={toggleLanguage}
            language={language}
          />
        </Suspense>

        <div className="flex-1 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-2xl sm:text-4xl font-semibold tracking-wide text-gradient">
              {t("dataList")}
            </h1>
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-full px-4 py-2 text-sm w-full sm:w-1/5 shadow focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <div className="flex justify-between mb-4">
              <button
                onClick={toggleDarkMode}
                className="p-2 border rounded-full me-1 transition duration-200 hover:bg-gray-200 flex items-center"
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                title={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
              <LanguageSwitcher />
            </div>
          </div>

          {/* Display filtered data */}
          <ul
            className={`grid gap-6 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            }}
          >
            {filteredData.map((item) => (
              <li
                key={item._id}
                onClick={() => navigate(`/details/${item._id}`)}
                className={`border rounded-xl shadow-lg transition-transform duration-200 hover:scale-105 cursor-pointer ${
                  darkMode ? "bg-gray-800" : "bg-white"
                }`}
              >
                <div className="p-4">
                  <h3 className="text-lg font-bold mb-2">
                    {item._source.name}
                  </h3>
                  <p>
                    <strong>{t("type")}:</strong> {item._source.type}
                  </p>
                  <p>
                    <strong>{t("country")}:</strong> {item._source.country}
                  </p>
                  <p>
                    <strong>{t("currency")}:</strong> {item._source.currency}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DataDisplay;
