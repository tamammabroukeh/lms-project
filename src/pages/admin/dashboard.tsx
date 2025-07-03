import { adminDashboardTotals, userGrowth, coursePublishStats } from '@/services';
import { DataCard } from '@/components/admin-view/dashboard/DataCard';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { useTypedTranslation } from '@/hooks'; // Keep useLocalStorage as it was in the original
import { useEffect, useState } from 'react';


export default function AdminDashboardPage() {
    const { t } = useTypedTranslation(); // Initialize the translation hook
    const [metrics, setMetrics] = useState({
        totalUsers: 0,
        totalTeachers: 0,
        totalStudents: 0,
        totalCourses: 0,
        totalRevenue: 0,
    });
    const [userGrowthData, setUserGrowthData] = useState<{ name: string; value: number }[]>([]);
    const [courseDistributionData, setCourseDistributionData] = useState<{ name: string; value: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                setError('');

                const [totalsResponse, growthResponse, courseStatsResponse] = await Promise.all([
                    adminDashboardTotals(),
                    userGrowth(),
                    coursePublishStats(),
                ]);

                if (totalsResponse) {
                    setMetrics({
                        totalUsers: totalsResponse.totalUsers || 0,
                        totalTeachers: totalsResponse.totalTeachers || 0,
                        totalStudents: totalsResponse.totalStudents || 0,
                        totalCourses: totalsResponse.totalCourses || 0,
                        totalRevenue: totalsResponse.totalRevenue || 0,
                    });
                }

                if (growthResponse) {
                    const formattedGrowthData = growthResponse.map(item => ({
                        name: `${item.month.toLowerCase().slice(0, 3)}`,
                        value: item.count,
                    }));
                    setUserGrowthData(formattedGrowthData);
                }

                if (courseStatsResponse) {
                    const formattedCourseData = courseStatsResponse.map(item => ({
                        name: `admin:${item.status.toLowerCase()}`,
                        value: item.count,
                    }));
                    setCourseDistributionData(formattedCourseData);
                }
            } catch (err: any) {
                console.error('Failed to fetch dashboard data:', err);
                setError('Failed to load dashboard data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, [t]);

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                <header className="border-b border-gray-200 pb-4">
                    <div className="h-8 bg-gray-300 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 mt-2"></div>
                </header>

                <section>
                    <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="h-24 bg-gray-300 rounded-lg"></div>
                        ))}
                    </div>
                </section>

                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="bg-gray-300 p-4 rounded-lg h-80"></div>
                    <div className="bg-gray-300 p-4 rounded-lg h-80"></div>
                </section>

                <section>
                    <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
                    <div className="bg-gray-300 rounded-lg h-48"></div>
                </section>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64 bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <header className="border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold">{t('admin:dashboardOverview')}</h1>
                <p className="text-gray-600">{t('admin:welcomeAdmin')}</p>
            </header>

            {/* Metrics Cards */}
            <section>
                <h2 className="text-lg font-semibold mb-4">{t('admin:keyMetrics')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <DataCard title={t('admin:totalUsers')} value={metrics.totalUsers} />
                    <DataCard title={t('admin:instructors')} value={metrics.totalTeachers} />
                    <DataCard title={t('admin:enrollments')} value={metrics.totalStudents} />
                    <DataCard title={t('admin:courses')} value={metrics.totalCourses} />
                    <DataCard title={t('admin:revenue')} value={metrics.totalRevenue} />
                </div>
            </section>

            {/* Charts Section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-4">{t('admin:userGrowth')}</h3>
                    <div className="h-64">
                        <BarChart data={userGrowthData} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-4">{t('admin:courseDistribution')}</h3>
                    <div className="h-64">
                        <PieChart data={courseDistributionData} />
                    </div>
                </div>
            </section>

            {/* Recent Activity */}
            <section>
                <h2 className="text-lg font-semibold mb-4">{t('admin:recentActivity')}</h2>
                <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('admin:event')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('admin:user')}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {t('admin:time')}
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">{t('admin:newCourseCreated')}</td>
                                <td className="px-6 py-4 whitespace-nowrap">John Doe</td> {/* Mock data, not translated */}
                                <td className="px-6 py-4 whitespace-nowrap">2 hours ago</td> {/* Mock data, not translated */}
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">{t('admin:userRegistered')}</td>
                                <td className="px-6 py-4 whitespace-nowrap">Jane Smith</td> {/* Mock data, not translated */}
                                <td className="px-6 py-4 whitespace-nowrap">5 hours ago</td> {/* Mock data, not translated */}
                            </tr>
                            <tr>
                                <td className="px-6 py-4 whitespace-nowrap">{t('admin:courseEnrollment')}</td>
                                <td className="px-6 py-4 whitespace-nowrap">Mike Johnson</td> {/* Mock data, not translated */}
                                <td className="px-6 py-4 whitespace-nowrap">1 day ago</td> {/* Mock data, not translated */}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}
