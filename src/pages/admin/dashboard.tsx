import { adminDashboardTotals } from '@/services';
import { DataCard } from '../../components/admin-view/dashboard/DataCard';
import { BarChart } from '../../components/charts/BarChart';
import { PieChart } from '../../components/charts/PieChart';
import { useTypedTranslation } from '../../hooks'; // Keep useLocalStorage as it was in the original
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

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                setLoading(true);
                // Using the mock adminDashboardTotals function directly within this file
                const response = await adminDashboardTotals();
                if (response) {
                    setMetrics({
                        totalUsers: response.totalUsers || 0,
                        totalTeachers: response.totalTeachers || 0,
                        totalStudents: response.totalStudents || 0,
                        totalCourses: response.totalCourses || 0,
                        totalRevenue: response.totalRevenue || 0,
                    });
                }
            } catch (err) {
                console.error('Failed to fetch dashboard totals:', err);
                setError('Failed to load dashboard data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    const userGrowthData = [
        { name: t('admin:jan'), value: 400 }, // Translated month names
        { name: t('admin:feb'), value: 300 },
        { name: t('admin:mar'), value: 600 }, 
        { name: t('admin:apr'), value: 800 }, 
        { name: t('admin:may'), value: 500 },
        { name: t('admin:jun'), value: 900 }, 
    ];

    const courseDistributionData = [
        { name: t('admin:published'), value: 35 }, // Translated status names
        { name: t('admin:draft'), value: 12 },
        { name: t('admin:archived'), value: 9 },
    ];

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
                    <DataCard title={t('admin:insturctors')} value={metrics.totalTeachers} />
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
