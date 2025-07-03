import { 
    PieChart as RechartsPieChart, 
    Pie, 
    Cell, 
    Tooltip, 
    ResponsiveContainer,
    Legend
  } from 'recharts';
  
  const COLORS = ['#000', '#4b5563', '#9ca3af', '#d1d5db'];
  
  export function PieChart({ 
    data 
  }: { 
    data: { name: string; value: number }[] 
  }) {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            labelLine={false}
            label={({ name, percent }) => 
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [value, 'Count']}
            contentStyle={{ 
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: '0.375rem'
            }}
          />
          <Legend 
            layout="vertical" 
            verticalAlign="middle" 
            align="right"
            formatter={(value) => <span className="text-gray-600">{value}</span>}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    );
  }