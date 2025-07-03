import { 
    BarChart as RechartsBarChart, 
    Bar, 
    XAxis, 
    YAxis, 
    CartesianGrid, 
    Tooltip, 
    ResponsiveContainer 
  } from 'recharts';
  
  export function BarChart({ 
    data,
    barColor = '#000'
  }: { 
    data: { name: string; value: number }[];
    barColor?: string;
  }) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data}>
          <CartesianGrid 
            vertical={false} 
            strokeDasharray="3 3" 
            stroke="#e5e7eb" 
          />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280' }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#6b7280' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem'
            }}
          />
          <Bar 
            dataKey="value" 
            fill={barColor} 
            radius={[4, 4, 0, 0]} 
            barSize={30}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    );
  }