import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import useDarkMode from '../hooks/useDarkMode';
import moment from 'moment';

const CustomTooltip = ({ active, payload, label, isDarkMode }) => {
  if (active && payload && payload.length) {
    return (
        <div className={`p-2 border rounded ${isDarkMode ? 'bg-gray-700 text-white border-gray-500' : 'bg-white text-black border-black'}`}>
          <p className="label">{`Time: ${moment(label).format('LLL')}`}</p>
          <p className="intro">{`Value: ${payload[0].value.toFixed(1)}`}</p>
        </div>
    );
  }

  return null;
};
const SensorCard = ({ title, data, type }) => {
  const isDarkMode = useDarkMode();
  const axisStrokeColor = isDarkMode ? '#ffffff' : '#000000';

  const renderChart = () => {
    switch (type) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <XAxis
                  dataKey="time"
                  stroke={axisStrokeColor}
                  tickFormatter={(tick) => moment(tick).format('LT')} // Format the date
              />
              <YAxis stroke={axisStrokeColor} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
              <Legend />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        );
      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <XAxis
                  dataKey="time"
                  stroke={axisStrokeColor}
                  tickFormatter={(tick) => moment(tick).format('LT')} // Format the date
              />
              <YAxis stroke={axisStrokeColor} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'pie':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8" label>
                {
                  data.map((entry, index) => <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />)
                }
              </Pie>
              <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-4 bg-white dark:bg-gray-800">
      <div className="font-bold text-xl mb-2 dark:text-gray-200">{title}</div>
      {renderChart()}
    </div>
  );
};

export default SensorCard;
