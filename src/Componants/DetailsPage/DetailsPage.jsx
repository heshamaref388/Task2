import { useParams, useNavigate } from "react-router-dom";
import data from "../../../public/metadata.json";
import { useTranslation } from "react-i18next"; // Import useTranslation from react-i18next
import { useEffect } from "react"; // Import useEffect for key listener
import { Helmet } from "react-helmet";

const DetailsPage = () => {
  const { t } = useTranslation(); // Initialize translation hook
  const { id } = useParams();
  const navigate = useNavigate();

  const details = data.hits.hits.find((item) => item._id === id)?._source;

  // Handle Backspace key for navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Backspace") {
        navigate(-1); // Navigate back one step
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown); // Cleanup on unmount
    };
  }, [navigate]);

  if (!details) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <p className="text-red-500 text-2xl font-semibold">
            {t("itemNotFound")}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>{t(`${details.name}`)}</title>
        <meta
          name="description"
          content="This page to show all data details for Financial management."
        />
        <meta name="keywords" content="data, list, information, SEO" />
        <meta name="author" content="FutTech" />
      </Helmet>
      <div className="container mx-auto p-8 max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)} // Navigate one step back
            className="absolute top-6 left-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:opacity-90"
            title={t("pressBackspace")} // Tooltip message
          >
            &larr; {t("back")}
          </button>
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 mt-8">
            {details.name}
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-gray-700 text-lg">
            {details.symbol && (
              <p>
                <strong className="font-semibold">{t("symbol")}:</strong>{" "}
                {details.symbol}
              </p>
            )}
            {details.code && (
              <p>
                <strong className="font-semibold">{t("code")}:</strong>{" "}
                {details.code}
              </p>
            )}
            {details.exchange && (
              <p>
                <strong className="font-semibold">{t("exchange")}:</strong>{" "}
                {details.exchange}
              </p>
            )}
            {details.currency && (
              <p>
                <strong className="font-semibold">{t("currency")}:</strong>{" "}
                {details.currency}
              </p>
            )}
            {details.countryName && (
              <p>
                <strong className="font-semibold">{t("country")}:</strong>{" "}
                {details.countryName}
              </p>
            )}
            {details.type && (
              <p>
                <strong className="font-semibold">{t("type")}:</strong>{" "}
                {details.type}
              </p>
            )}
            {details.isin && (
              <p>
                <strong className="font-semibold">{t("isin")}:</strong>{" "}
                {details.isin}
              </p>
            )}
            {details.validUntil && (
              <p>
                <strong className="font-semibold">{t("validUntil")}:</strong>{" "}
                {details.validUntil}
              </p>
            )}
            {details.countryIso && (
              <p>
                <strong className="font-semibold">{t("countryIso")}:</strong>{" "}
                {details.countryIso}
              </p>
            )}
          </div>
          {details.exchangeTradedFundDetails?.companyURL && (
            <p className="mt-6">
              <a
                href={details.exchangeTradedFundDetails.companyURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-lg"
              >
                <strong>{t("companyWebsite")}:</strong>{" "}
                {details.exchangeTradedFundDetails.companyURL}
              </a>
            </p>
          )}
          {details.exchangeTradedFundDetails?.etfUrl && (
            <p className="mt-6">
              <a
                href={details.exchangeTradedFundDetails.etfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-lg"
              >
                <strong>{t("etfUrl")}:</strong>{" "}
                {details.exchangeTradedFundDetails.etfUrl}
              </a>
            </p>
          )}
          {details.exchangeTradedFundDetails?.totalAssets && (
            <p className="mt-6 text-lg">
              <strong>{t("totalAssets")}:</strong>{" "}
              {`${details.exchangeTradedFundDetails.totalAssets.toLocaleString()} EUR`}
            </p>
          )}
          {details.exchangeTradedFundDetails?.domicile && (
            <p className="mt-6 text-lg">
              <strong>{t("domicile")}:</strong>{" "}
              {details.exchangeTradedFundDetails.domicile}
            </p>
          )}
          {details.exchangeTradedFundDetails?.dateOngoingCharge && (
            <p className="mt-6 text-lg">
              <strong>{t("dateOngoingCharge")}:</strong>{" "}
              {details.exchangeTradedFundDetails.dateOngoingCharge}
            </p>
          )}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate(`/candle/${details.symbol}`)}
              className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-md shadow hover:shadow-lg transition duration-300 transform hover:scale-105"
            >
              {t("viewCandleData")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailsPage;
