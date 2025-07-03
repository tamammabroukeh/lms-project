import { useState } from 'react';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { LineChart } from '@/components/charts/LineChart';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { CartesianGrid, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, LineChart as RechartsLineChart} from 'recharts';

export default function AdminAnalyticsPage() {
    const [timeRange, setTimeRange] = useState('last_month');

    // Mock data - replace with API calls
    const userData = [
        { name: 'Jan', value: 400 },
        { name: 'Feb', value: 300 },
        { name: 'Mar', value: 600 },
        { name: 'Apr', value: 800 },
        { name: 'May', value: 500 },
        { name: 'Jun', value: 900 },
    ];

    const revenueData = [
        { name: 'Jan', value: 3200 },
        { name: 'Feb', value: 4200 },
        { name: 'Mar', value: 5100 },
        { name: 'Apr', value: 6800 },
        { name: 'May', value: 5500 },
        { name: 'Jun', value: 9200 },
    ];

    const courseDistribution = [
        { name: 'Published', value: 35 },
        { name: 'Draft', value: 12 },
        { name: 'Archived', value: 9 },
    ];

    const userDistribution = [
        { name: 'Students', value: 65 },
        { name: 'Instructors', value: 20 },
        { name: 'Admins', value: 5 },
        { name: 'Others', value: 10 },
    ];

    return (
        <div className="space-y-6">
            <header className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Platform Analytics</h1>
                    <p className="text-gray-600">Detailed insights and metrics</p>
                </div>

                <div className="w-48">
                    <Select value={timeRange} onValueChange={setTimeRange}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select time range" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="last_week">Last Week</SelectItem>
                            <SelectItem value="last_month">Last Month</SelectItem>
                            <SelectItem value="last_quarter">Last Quarter</SelectItem>
                            <SelectItem value="last_year">Last Year</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-4">User Growth</h3>
                    <div className="h-72">
                        <BarChart data={userData} barColor="#000" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-4">Revenue Trends</h3>
                    <div className="h-72">
                        <LineChart data={revenueData} lineColor="#000" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-4">Course Distribution</h3>
                    <div className="h-72">
                        <PieChart data={courseDistribution} />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-4">User Distribution</h3>
                    <div className="h-72">
                        <PieChart data={userDistribution} />
                    </div>
                </div>
            </div>

            <div className="bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-4">Engagement Metrics</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-gray-600">Avg. Session Duration</p>
                        <p className="text-2xl font-bold">12m 34s</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-gray-600">Completion Rate</p>
                        <p className="text-2xl font-bold">78%</p>
                    </div>
                    <div className="p-4 border border-gray-200 rounded-lg">
                        <p className="text-gray-600">New Signups</p>
                        <p className="text-2xl font-bold">342</p>
                    </div>
                </div>
            </div>
        </div>
    );
}


