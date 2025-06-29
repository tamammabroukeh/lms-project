import {
    LineChart as RechartsLineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
  } from 'recharts';
  
  interface LineChartProps {
    data: { name: string; value: number }[];
    lineColor?: string;
    strokeWidth?: number;
  }
  
  export function LineChart({ 
    data, 
    lineColor = '#000', 
    strokeWidth = 2 
  }: LineChartProps) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart data={data}>
          <CartesianGrid 
            vertical={false} 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
          />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#6b7280', fontSize: 12 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: '14px'
            }}
            itemStyle={{ color: '#000' }}
            labelStyle={{ fontWeight: 600, color: '#000' }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke={lineColor}
            strokeWidth={strokeWidth}
            dot={{
              fill: lineColor,
              stroke: '#fff',
              strokeWidth: 2,
              r: 4
            }}
            activeDot={{
              r: 6,
              fill: '#fff',
              stroke: lineColor,
              strokeWidth: 2
            }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    );
  }