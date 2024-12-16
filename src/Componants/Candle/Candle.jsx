import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next"; // Import the useTranslation hook
import { Helmet } from "react-helmet";
import Spinner from "../Spinner"; // Import Spinner component

const CandleDataPage = () => {
  const { t } = useTranslation(); // Initialize the translation hook
  const { symbol } = useParams();
  const [candleData, setCandleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleBackNavigation = () => {
    window.history.back(); // Custom back navigation
  };

  useEffect(() => {
    const fetchCandleData = async () => {
      try {
        const response = await axios.get("/candle.json");
        const filteredData = response.data.hits.hits.filter(
          (item) => item._source.symbol === symbol
        );
        setCandleData(filteredData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCandleData();
  }, [symbol]);

  if (loading) return <Spinner />; // Show spinner while loading

  if (error)
    return (
      <div className="text-red-500 text-center">
        {t("error")}: {error.message}
      </div>
    );

  if (candleData.length === 0) {
    return <div className="text-center">{t("noData")}</div>;
  }

  return (
    <>
      <div className="container mx-auto p-6 relative">
        {/* Back Button */}
        <button
          onClick={handleBackNavigation}
          title={t("pressBackspace")}
          className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:opacity-90"
        >
          &larr; {t("back")}
        </button>

        <h1 className="text-3xl font-bold text-center mb-10 mt-16">
          {t("candleDataFor")} {symbol}
        </h1>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {candleData.map((item) => (
            <li
              key={item._id}
              className="border border-gray-200 rounded-lg p-6 bg-white shadow-md transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-blue-50 cursor-pointer"
            >
              <Helmet>
                <title>{t(`candel data for ${item._source.symbol}`)}</title>
                <meta
                  name="description"
                  content="This page to show all data details for Financial management."
                />
                <meta name="keywords" content="data, list, information, SEO" />
                <meta name="author" content="FutTech" />
              </Helmet>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {t("candleData")}
              </h2>
              <p className="text-gray-600">
                <strong>{t("dateTime")}:</strong> {item._source.dateTime}
              </p>
              <p className="text-gray-600">
                <strong>{t("startPrice")}:</strong> {item._source.startPrice}
              </p>
              <p className="text-gray-600">
                <strong>{t("highestPrice")}:</strong>{" "}
                {item._source.highestPrice}
              </p>
              <p className="text-gray-600">
                <strong>{t("lowestPrice")}:</strong> {item._source.lowestPrice}
              </p>
              <p className="text-gray-600">
                <strong>{t("endPrice")}:</strong> {item._source.endPrice}
              </p>
              <p className="text-gray-600">
                <strong>{t("volume")}:</strong> {item._source.volume}
              </p>
              <p className="text-gray-600">
                <strong>{t("currency")}:</strong> {item._source.currency}
              </p>
              <p className="text-gray-600">
                <strong>{t("candleType")}:</strong> {item._source.candleType}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CandleDataPage;
