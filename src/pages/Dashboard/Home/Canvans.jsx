import CanvasJSReact from "@canvasjs/react-charts";
import React from "react";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const ChartComponent = ({ bookingData }) => {
  const dataPoints = bookingData?.map((booking) => ({
    x: new Date(booking.createdAt),
    y: parseFloat(booking.originalPrice) || 0,
  }));

  const options = {
    animationEnabled: true,
    theme: "light2",
    title: {
      text: "Booking Prices Over Time",
    },
    axisX: {
      valueFormatString: "DD MMM",
      crosshair: {
        enabled: true,
        snapToDataPoint: true,
      },
    },
    axisY: {
      title: "Booking Price",
      includeZero: true,
      crosshair: {
        enabled: true,
      },
    },
    data: [
      {
        type: "line",
        dataPoints: dataPoints,
      },
    ],
  };

  return <CanvasJSChart options={options} />;
};

export default ChartComponent;
