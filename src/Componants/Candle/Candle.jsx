import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import Spinner from "../Spinner";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
  PointElement,
  LineElement,
  BarElement,
} from "chart.js";
import zoomPlugin from "chartjs-plugin-zoom";
import { Chart } from "react-chartjs-2";
import {
  CandlestickController,
  CandlestickElement,
} from "chartjs-chart-financial";
import "chartjs-adapter-date-fns";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  TimeScale,
  TimeSeriesScale,
  CandlestickElement,
  CandlestickController,
  PointElement,
  LineElement,
  BarElement,
  zoomPlugin
);

const CandleDataPage = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
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

    // Cleanup function to destroy chart instance
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }
    };
  }, [symbol]);

  if (loading) return <Spinner />; // Show spinner while loading

  if (error)
    return (
      <div className="text-red-500 text-center">
        {t("error")}: {error.message}
      </div>
    );

  // Transform data for financial chart
  const chartData = candleData.map((item) => ({
    x: new Date(item._source.dateTime),
    o: item._source.startPrice,
    h: item._source.highestPrice,
    l: item._source.lowestPrice,
    c: item._source.endPrice,
  }));

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
          className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:opacity-90 text-sm sm:text-base"
        >
          &larr; {t("back")}
        </button>

        <Helmet>
          <title>
            {t("candleDataFor")} {symbol}
          </title>
          <meta
            name="description"
            content="Candle data visualization for financial analysis"
          />
          <meta name="keywords" content="candle, chart, financial, data" />
        </Helmet>
        <h1 className="text-3xl font-bold text-center mb-10 mt-16">
          {t("candleDataFor")} {symbol}
        </h1>
        {/* Financial Chart */}
        <div className="w-full max-w-6xl mx-auto mt-8 relative">
          {/* Explanation Box */}
          <div className="sm:absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 sm:p-3 rounded-md shadow-sm z-10 w-full sm:max-w-[200px] md:max-w-[250px] lg:max-w-[300px] mt-4 sm:mt-0 mx-2 sm:mx-0">
            <h3 className="font-medium text-xs sm:text-sm md:text-base mb-1 text-gray-800">
              Chart Explanation
            </h3>
            <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-tight">
              This chart shows price movements over time. Each candle
              represents:
              <ul className="grid grid-cols-2 gap-x-2 gap-y-1 mt-1 sm:block sm:space-y-1">
                <li className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Green: Price increase</span>
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  <span>Red: Price decrease</span>
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span>Top line: Highest price</span>
                </li>
                <li className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full"></span>
                  <span>Bottom line: Lowest price</span>
                </li>
                <li className="flex items-center gap-1 col-span-2 sm:col-span-1">
                  <span className="w-2 h-2 bg-gray-600 rounded-full"></span>
                  <span>Body: Open/Close price</span>
                </li>
              </ul>
            </p>
          </div>
          <div
            className="bg-white p-4 sm:p-6 rounded-lg shadow-md"
            style={{ height: "50vh", minHeight: "300px", maxHeight: "800px" }}
          >
            <Chart
              ref={(ref) => {
                chartRef.current = ref;
                if (ref) {
                  chartInstance.current = ref?.chartInstance;
                }
              }}
              type="candlestick"
              data={{
                datasets: [
                  {
                    type: "candlestick",
                    label: symbol,
                    data: chartData,
                    borderColor: (ctx) => {
                      const { raw } = ctx.dataset.data[ctx.dataIndex] || {};
                      return raw?.c >= raw?.o ? "#16a34a" : "#dc2626";
                    },
                    borderWidth: 1,
                    backgroundColor: (ctx) => {
                      const { raw } = ctx.dataset.data[ctx.dataIndex] || {};
                      return raw?.c >= raw?.o
                        ? "rgba(22, 163, 74, 0.3)"
                        : "rgba(220, 38, 38, 0.3)";
                    },
                    yAxisID: "y",
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                interaction: {
                  mode: "index",
                  intersect: false,
                },
                scales: {
                  x: {
                    type: "timeseries",
                    time: {
                      unit: "day",
                      tooltipFormat: "MMM dd, yyyy HH:mm",
                    },
                    grid: {
                      color: "#f3f4f6",
                    },
                  },
                  y: {
                    beginAtZero: false,
                    grid: {
                      color: "#f3f4f6",
                    },
                    ticks: {
                      callback: (value) => `$${value.toFixed(2)}`,
                    },
                    position: "left",
                  },
                  "y-volume": {
                    beginAtZero: true,
                    grid: {
                      display: false,
                    },
                    position: "right",
                    display: false,
                  },
                },
                plugins: {
                  zoom: {
                    zoom: {
                      wheel: {
                        enabled: true,
                      },
                      pinch: {
                        enabled: true,
                      },
                      mode: "x",
                    },
                    pan: {
                      enabled: true,
                      mode: "x",
                    },
                  },
                  annotation: {
                    annotations: {
                      line1: {
                        type: "line",
                        borderColor: "#16a34a",
                        borderWidth: 2,
                        borderDash: [5, 5],
                        label: {
                          enabled: true,
                          content: "Up Trend",
                          position: "end",
                          backgroundColor: "#16a34a",
                          color: "#fff",
                          font: {
                            size: 12,
                          },
                        },
                      },
                      line2: {
                        type: "line",
                        borderColor: "#dc2626",
                        borderWidth: 2,
                        borderDash: [5, 5],
                        label: {
                          enabled: true,
                          content: "Down Trend",
                          position: "end",
                          backgroundColor: "#dc2626",
                          color: "#fff",
                          font: {
                            size: 12,
                          },
                        },
                      },
                      arrowUp: {
                        type: "line",
                        borderColor: "#16a34a",
                        borderWidth: 2,
                        arrowHeads: {
                          end: {
                            enabled: true,
                            fill: true,
                            length: 10,
                            width: 6,
                          },
                        },
                      },
                      arrowDown: {
                        type: "line",
                        borderColor: "#dc2626",
                        borderWidth: 2,
                        arrowHeads: {
                          end: {
                            enabled: true,
                            fill: true,
                            length: 10,
                            width: 6,
                          },
                        },
                      },
                    },
                  },
                  tooltip: {
                    backgroundColor: "rgba(15, 23, 42, 0.95)",
                    borderColor: "#1e293b",
                    borderWidth: 1,
                    titleColor: "#f8fafc",
                    bodyColor: "#e2e8f0",
                    padding: 8,
                    cornerRadius: 6,
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    bodySpacing: 4,
                    titleSpacing: 2,
                    titleFont: {
                      size: 12,
                      weight: "bold",
                    },
                    bodyFont: {
                      size: 10,
                    },
                    animation: {
                      duration: 150,
                      easing: "easeOutQuart",
                    },
                    position: "nearest",
                    xAlign: "center",
                    yAlign: "top",
                    callbacks: {
                      label: (context) => {
                        const data = context.raw || {};
                        return [
                          `📈 Open: $${data.o?.toFixed(2) || "N/A"}`,
                          `🚀 High: $${data.h?.toFixed(2) || "N/A"}`,
                          `📉 Low: $${data.l?.toFixed(2) || "N/A"}`,
                          `📊 Close: $${data.c?.toFixed(2) || "N/A"}`,
                        ];
                      },
                      title: (context) => {
                        const date = new Date(context[0].raw.x);
                        return `📅 ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
                      },
                    },
                  },
                  legend: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>
        <div className="w-full max-w-6xl mx-auto mt-8 overflow-x-auto px-2 sm:px-0">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">{t("dateTime")}</th>
                <th className="px-4 py-2">{t("startPrice")}</th>
                <th className="px-4 py-2">{t("highestPrice")}</th>
                <th className="px-4 py-2">{t("lowestPrice")}</th>
                <th className="px-4 py-2">{t("endPrice")}</th>
                <th className="px-4 py-2">{t("volume")}</th>
                <th className="px-4 py-2">{t("currency")}</th>
                <th className="px-4 py-2">{t("candleType")}</th>
              </tr>
            </thead>
            <tbody>
              {candleData.map((item) => (
                <tr key={item._id} className="border-b hover:bg-gray-100">
                  <td className="px-4 py-2">
                    {new Date(item._source.dateTime).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">{item._source.startPrice}</td>
                  <td className="px-4 py-2">{item._source.highestPrice}</td>
                  <td className="px-4 py-2">{item._source.lowestPrice}</td>
                  <td className="px-4 py-2">{item._source.endPrice}</td>
                  <td className="px-4 py-2">{item._source.volume}</td>
                  <td className="px-4 py-2">{item._source.currency}</td>
                  <td className="px-4 py-2">{item._source.candleType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default CandleDataPage;
