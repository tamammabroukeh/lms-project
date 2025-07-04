import { useState, useEffect } from 'react';
import { Search, Filter, Plus, DollarSign, BookOpen, Users, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getAllCourses } from '@/services';
import { Skeleton } from '@/components/ui/skeleton';
import { useTypedTranslation } from '@/hooks';

type Course = {
    _id: string;
    title: string;
    description: string;
    instructorName: string;
    studentsCount: number;
    isPublished: boolean;
    category?: string;
    pricing: number;
    primaryLanguage: string;
    level: {
        en: string;
        ar: string;
    };
    createdAt: string;
    revenue: number;
};

type CoursesData = {
    courses: Course[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export default function AdminCoursesPage() {
    const { t } = useTypedTranslation();
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [coursesData, setCoursesData] = useState<CoursesData>({
        courses: [],
        total: 0,
        page: 1,
        limit: 6,
        totalPages: 1,
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const itemsPerPage = 6;

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                setError('');

                const data = await getAllCourses(currentPage, itemsPerPage, { search: searchTerm });

                setCoursesData({
                    courses: data.courses,
                    total: data.total,
                    page: data.page,
                    limit: data.limit,
                    totalPages: data.totalPages,
                });
            } catch (err) {
                console.error('Failed to fetch courses:', err);
                setError(t('admin:courseManagement.fetchError'));
            } finally {
                setLoading(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            fetchCourses();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [currentPage, searchTerm, t]);

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center text-red-500">
                    {error}
                    <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => {
                            setError('');
                            setCurrentPage(1);
                        }}
                    >
                        {t('admin:retry')}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-col sm:flex-row justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">{t('admin:courseManagement.title')}</h1>
                    <p className="text-gray-600">{t('admin:courseManagement.subtitle')}</p>
                </div>
                <Button className="bg-black text-white hover:bg-gray-800">
                    <Plus className="mr-2" size={16} />
                    {t('admin:courseManagement.createCourse')}
                </Button>
            </header>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                        type="text"
                        placeholder={t('admin:courseManagement.searchPlaceholder')}
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>
                <Button variant="outline" className="border-gray-300">
                    <Filter className="mr-2" size={16} />
                    {t('admin:filters')}
                </Button>
            </div>

            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <Card key={index}>
                            <CardHeader>
                                <Skeleton className="h-6 w-3/4" />
                                <Skeleton className="h-4 w-1/2 mt-2" />
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-full" />
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Skeleton className="h-9 w-20" />
                                <Skeleton className="h-9 w-28" />
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {coursesData.courses.map((course) => (
                            <Card key={course._id} className="hover:shadow-md transition-shadow h-full flex flex-col">
                                <CardHeader className="pb-3">
                                    <div className="flex justify-between items-start gap-2">
                                        <CardTitle className="text-base font-medium line-clamp-2 min-h-[2.5rem]">
                                            {course.title}
                                        </CardTitle>
                                        <Badge variant={course.isPublished ? 'default' : 'secondary'} className="shrink-0">
                                            {course.isPublished ? t('admin:published') : t('admin:draft')}
                                        </Badge>
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-1">
                                        {t('admin:by')} {course.instructorName}
                                    </p>
                                </CardHeader>

                                <CardContent className="flex-1 space-y-2 py-0">
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <BookOpen className="me-2 h-4 w-4" />
                                        <span className="line-clamp-1">
                                            {course.category || t('admin:courseManagement.uncategorized')}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <Users className="me-2 h-4 w-4" />
                                        <span>
                                            {course.studentsCount.toLocaleString()} {t('admin:students')}
                                        </span>
                                    </div>
                                    <div className="flex items-center text-sm text-muted-foreground">
                                        <DollarSign className="me-2 h-4 w-4 fill-yellow-400 text-yellow-400" />
                                        <span>{course.pricing.toFixed(2)}</span>
                                    </div>
                                </CardContent>

                                <CardFooter className="pt-4 pb-2">
                                    <Button variant="destructive" size="sm" className="gap-2 mb-2">
                                        <Trash2 className="h-4 w-4" />
                                        {t('admin:delete')}
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>

                    {coursesData.courses.length === 0 && !loading && (
                        <div className="text-center py-12 text-gray-500">{t('admin:noResultsFound')}</div>
                    )}

                    {coursesData.total > 0 && (
                        <div className="flex justify-between items-center">
                            <p className="text-sm text-gray-600">
                                {t('admin:pageInfo', {
                                    current: currentPage,
                                    total: coursesData.totalPages,
                                })}
                            </p>
                            <div className="flex gap-2">
                                <Button
                                    variant="outline"
                                    className="border-gray-300"
                                    disabled={currentPage === 1}
                                    onClick={() => handlePageChange(currentPage - 1)}
                                >
                                    {t('admin:previous')}
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-gray-300"
                                    disabled={currentPage === coursesData.totalPages}
                                    onClick={() => handlePageChange(currentPage + 1)}
                                >
                                    {t('admin:next')}
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
