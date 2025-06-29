export function DataCard({ 
    title, 
    value,
    change
  }: { 
    title: string; 
    value: string | number;
    change?: number; // Optional percentage change
  }) {
    return (
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-sm font-medium text-gray-500 mb-2">{title}</h3>
        <div className="flex items-baseline">
          <p className="text-2xl font-bold">{value}</p>
          {change !== undefined && (
            <span className={`ml-2 text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
            </span>
          )}
        </div>
      </div>
    );
  }