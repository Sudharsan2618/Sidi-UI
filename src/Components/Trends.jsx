import React from "react";

const Trends = ({data}) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">India Population Growth Trends</h1>
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2">Year</th>
            <th className="border px-4 py-2">Global Rank</th>
            <th className="border px-4 py-2">Yearly % Change</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border">
              <td className="border px-4 py-2">{item.year}</td>
              <td className="border px-4 py-2">{item.country_global_rank}</td>
              <td className="border px-4 py-2">{item.yearly_percentage_change}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trends;
