"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export default function PredictionChart({ history }: any) {

  const data = history.map((price:number, index:number) => ({
    name: `Estimate ${index+1}`,
    price: price
  }));

  return (

    <div className="mt-10">

      <h2 className="text-xl mb-4">
        Prediction History
      </h2>

      <LineChart width={600} height={300} data={data}>
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name"/>
        <YAxis/>
        <Tooltip/>
        <Line type="monotone" dataKey="price"/>
      </LineChart>

    </div>
  );
}