import { useState, useEffect } from 'react';
import { BarChart } from '@/components/charts/BarChart';
import { PieChart } from '@/components/charts/PieChart';
import { LineChart } from '@/components/charts/LineChart';
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { usersRoleCount, userGrowthAnalytics, revenueAnalytics, coursePublishStats, adminDashboardTotals } from '@/services';
import { useTypedTranslation } from '@/hooks';
import { TranslationKeys } from '@/hooks/language/useTypedTranslation';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { DataCard } from '@/components/admin-view/dashboard/DataCard';

export default function AdminAnalyticsPage() {
    const { t } = useTypedTranslation();
    const [timeRange, setTimeRange] = useState('last_month');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // State for API data
    const [userGrowthData, setUserGrowthData] = useState<{ name: string; value: number }[]>([]);
    const [revenueData, setRevenueData] = useState<{ name: string; value: number }[]>([]);
    const [courseDistribution, setCourseDistribution] = useState<{ name: string; value: number }[]>([]);
    const [userDistribution, setUserDistribution] = useState<{ name: string; value: number }[]>([]);
    const [metrics, setMetrics] = useState({
        totalUsers: 0,
        totalTeachers: 0,
        totalStudents: 0,
        totalCourses: 0,
        totalRevenue: 0,
    });

    useEffect(() => {
        const fetchAnalyticsData = async () => {
            try {
                setLoading(true);
                setError('');

                // Fetch all data in parallel
                const [roleCountResponse, userGrowthResponse, revenueResponse, courseDistResponse, totalsResponse] =
                    await Promise.all([
                        usersRoleCount(),
                        userGrowthAnalytics(),
                        revenueAnalytics(),
                        coursePublishStats(),
                        adminDashboardTotals(),
                    ]);

                // Transform role count data for pie chart
                if (roleCountResponse) {
                    setUserDistribution([
                        { name: t('admin:students'), value: roleCountResponse.student },
                        { name: t('admin:instructors'), value: roleCountResponse.teacher },
                        { name: t('admin:admins'), value: roleCountResponse.admin },
                    ]);
                }

                // Set other data
                if (userGrowthResponse) {
                    setUserGrowthData(
                        userGrowthResponse.map((item) => ({
                            name: t(`admin:${item.month.toLowerCase()}` as TranslationKeys),
                            value: item.count,
                        }))
                    );
                }

                if (revenueResponse) {
                    setRevenueData(
                        revenueResponse.map((item: { month: string; revenue: any }) => ({
                            name: t(`admin:${item.month.toLowerCase()}` as TranslationKeys),
                            value: item.revenue,
                        }))
                    );
                }

                if (courseDistResponse) {
                    setCourseDistribution(
                        courseDistResponse.map((item) => ({
                            name: t(`admin:${item.status.toLowerCase()}` as TranslationKeys),
                            value: item.count,
                        }))
                    );
                }
                if (totalsResponse) {
                    setMetrics({
                        totalUsers: totalsResponse.totalUsers || 0,
                        totalTeachers: totalsResponse.totalTeachers || 0,
                        totalStudents: totalsResponse.totalStudents || 0,
                        totalCourses: totalsResponse.totalCourses || 0,
                        totalRevenue: totalsResponse.totalRevenue || 0,
                    });
                }
            } catch (err) {
                console.error('Failed to fetch analytics data:', err);
                setError('Failed to load analytics data. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchAnalyticsData();
    }, [timeRange, t]);

    if (loading) {
        return (
            <div className="space-y-6 animate-pulse">
                <header className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                        <Skeleton className="h-8 w-64" />
                        <Skeleton className="h-4 w-48 mt-2" />
                    </div>
                    <Skeleton className="h-10 w-48" />
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-lg border border-gray-200 h-80">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <Skeleton className="h-full w-full" />
                    </div>
                    <div className="bg-white p-5 rounded-lg border border-gray-200 h-80">
                        <Skeleton className="h-6 w-32 mb-4" />
                        <Skeleton className="h-full w-full" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-5 rounded-lg border border-gray-200 h-80">
                        <Skeleton className="h-6 w-40 mb-4" />
                        <Skeleton className="h-full w-full" />
                    </div>
                    <div className="bg-white p-5 rounded-lg border border-gray-200 h-80">
                        <Skeleton className="h-6 w-40 mb-4" />
                        <Skeleton className="h-full w-full" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <Skeleton className="h-6 w-40 mb-4" />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <div key={i} className="p-4 border border-gray-200 rounded-lg">
                                <Skeleton className="h-5 w-32" />
                                <Skeleton className="h-8 w-16 mt-2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64 bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
                <p>{error}</p>
                <Button
                    className="mt-4 ml-4"
                    onClick={() => {
                        setError('');
                        setLoading(true);
                    }}
                >
                    Retry
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">{t('admin:platformAnalytics')}</h1>
                    <p className="text-gray-600">{t('admin:detailedInsights')}</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-4">{t('admin:userGrowth')}</h3>
                    <div className="h-72">
                        <BarChart data={userGrowthData} barColor="#000" />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-4">{t('admin:revenueTrends')}</h3>
                    <div className="h-72">
                        <LineChart data={revenueData} lineColor="#000" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-4">{t('admin:courseDistribution')}</h3>
                    <div className="h-72">
                        <PieChart data={courseDistribution} />
                    </div>
                </div>

                <div className="bg-white p-5 rounded-lg border border-gray-200">
                    <h3 className="font-medium mb-4">{t('admin:userDistribution')}</h3>
                    <div className="h-72">
                        <PieChart data={userDistribution} />
                    </div>
                </div>
            </div>
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
        </div>
    );
}
