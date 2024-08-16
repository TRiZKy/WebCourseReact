import React from 'react';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Label
} from 'recharts';
import useDarkMode from '../hooks/useDarkMode';
import moment from 'moment';

/**
 * Custom tooltip component for displaying additional information when hovering over the chart.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.active - Whether the tooltip is active (visible).
 * @param {Array} props.payload - The data payload associated with the tooltip.
 * @param {string} props.label - The label for the data point (usually the x-axis value).
 * @param {boolean} props.isDarkMode - Whether the dark mode is enabled.
 * @returns {JSX.Element|null} A React component that renders the tooltip or null if inactive.
 */
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

/**
 * A component that renders a sensor data card with a chart.
 * The type of chart (line, bar, pie) is determined by the `type` prop.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {string} props.title - The title of the sensor card.
 * @param {Array<Object>} props.data - The data to be displayed in the chart.
 * @param {string} props.type - The type of chart to display ('line', 'bar', 'pie').
 * @param {string} [props.xLabel] - The label for the x-axis.
 * @param {string} [props.yLabel] - The label for the y-axis.
 * @returns {JSX.Element} A React component that renders a sensor card with the specified chart.
 */
const SensorCard = ({ title, data, type, xLabel, yLabel }) => {
    const isDarkMode = useDarkMode();
    const axisStrokeColor = isDarkMode ? '#ffffff' : '#000000';

    /**
     * Renders the appropriate chart based on the `type` prop.
     *
     * @function
     * @returns {JSX.Element|null} A React component that renders the chart or null if the type is invalid.
     */
    const renderChart = () => {
        switch (type) {
            case 'line':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 25 }}>
                            <XAxis
                                dataKey="time"
                                stroke={axisStrokeColor}
                                tickFormatter={(tick) => moment(tick).format('LT')}
                            >
                                {xLabel && <Label value={xLabel} offset={-10} position="insideBottom" fill={axisStrokeColor} />}
                            </XAxis>
                            <YAxis stroke={axisStrokeColor}>
                                {yLabel && <Label value={yLabel} angle={-90} position="insideLeft" fill={axisStrokeColor} />}
                            </YAxis>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
                            <Line type="monotone" dataKey="value" stroke="#8884d8" />
                        </LineChart>
                    </ResponsiveContainer>
                );
            case 'bar':
                return (
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={data} margin={{ top: 5, right: 20, left: 10, bottom: 25 }}>
                            <XAxis
                                dataKey="time"
                                stroke={axisStrokeColor}
                                tickFormatter={(tick) => moment(tick).format('LT')}
                            >
                                {xLabel && <Label value={xLabel} offset={-10} position="insideBottom" fill={axisStrokeColor} />}
                            </XAxis>
                            <YAxis stroke={axisStrokeColor}>
                                {yLabel && <Label value={yLabel} angle={-90} position="insideLeft" fill={axisStrokeColor} />}
                            </YAxis>
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip content={<CustomTooltip isDarkMode={isDarkMode} />} />
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
                        </PieChart>
                    </ResponsiveContainer>
                );
            default:
                return null;
        }
    };

    return (
        <div className="rounded overflow-hidden shadow-lg p-4 m-4 bg-white dark:bg-gray-800">
            <div className="font-bold text-xl mb-2 dark:text-gray-200">{title}</div>
            {renderChart()}
        </div>
    );
};

export default SensorCard;
