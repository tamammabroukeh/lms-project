import { DataCard } from '@/components/admin-view/dashboard/DataCard';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { useLocalStorage, useTypedTranslation } from "@/hooks";

export default function AdminDashboardPage() {
  
  // Mock data - replace with real API calls
  const metrics = {
    totalUsers: 1240,
    activeUsers: 893,
    courses: 56,
    enrollments: 3420,
    revenue: '$28,540',
  };

  const userGrowthData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
  ];

  const courseDistributionData = [
    { name: 'Published', value: 35 },
    { name: 'Draft', value: 12 },
    { name: 'Archived', value: 9 },
  ];

  return (
    <div className="space-y-8">
      <header className="border-b border-gray-200 pb-4">
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-gray-600">Welcome back, Admin</p>
      </header>

      {/* Metrics Cards */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Key Metrics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <DataCard title="Total Users" value={metrics.totalUsers} />
          <DataCard title="Active Users" value={metrics.activeUsers} />
          <DataCard title="Courses" value={metrics.courses} />
          <DataCard title="Enrollments" value={metrics.enrollments} />
          <DataCard title="Revenue" value={metrics.revenue} />
        </div>
      </section>

      {/* Charts Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium mb-4">User Growth (Last 6 Months)</h3>
          <div className="h-64">
            <BarChart data={userGrowthData} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <h3 className="font-medium mb-4">Course Distribution</h3>
          <div className="h-64">
            <PieChart data={courseDistributionData} />
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section>
        <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">New course created</td>
                <td className="px-6 py-4 whitespace-nowrap">John Doe</td>
                <td className="px-6 py-4 whitespace-nowrap">2 hours ago</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">User registered</td>
                <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td>
                <td className="px-6 py-4 whitespace-nowrap">5 hours ago</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap">Course enrollment</td>
                <td className="px-6 py-4 whitespace-nowrap">Mike Johnson</td>
                <td className="px-6 py-4 whitespace-nowrap">1 day ago</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}