import { useState } from 'react';
import { Search, Filter, Plus, Star, BookOpen, Users, BarChart2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function AdminCoursesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Mock course data - replace with API call
  const courses = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    title: `Course ${i + 1}`,
    instructor: `Instructor ${(i % 5) + 1}`,
    students: Math.floor(Math.random() * 1000) + 100,
    rating: (Math.random() * 2 + 3).toFixed(1),
    status: i % 4 === 0 ? 'Draft' : i % 4 === 1 ? 'Archived' : 'Published',
    category: ['Development', 'Design', 'Business', 'Marketing'][i % 4],
  }));

  const filteredCourses = courses.filter(course => 
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredCourses.length / itemsPerPage);
  const currentCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Course Management</h1>
          <p className="text-gray-600">Manage all platform courses</p>
        </div>
        <Button className="bg-black text-white hover:bg-gray-800">
          <Plus className="mr-2" size={16} />
          Create Course
        </Button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search courses..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-gray-300">
          <Filter className="mr-2" size={16} />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentCourses.map((course) => (
          <Card key={course.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{course.title}</CardTitle>
                <Badge 
                  variant={
                    course.status === 'Published' ? 'default' : 
                    course.status === 'Draft' ? 'secondary' : 'destructive'
                  }
                >
                  {course.status}
                </Badge>
              </div>
              <p className="text-sm text-gray-600">by {course.instructor}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <BookOpen className="mr-2" size={16} />
                <span>{course.category}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Users className="mr-2" size={16} />
                <span>{course.students.toLocaleString()} students</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="mr-2 fill-yellow-400 text-yellow-400" size={16} />
                <span>{course.rating} rating</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" className="border-gray-300">
                Edit
              </Button>
              <Button variant="outline" className="border-gray-300">
                View Analytics
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCourses.length)} of {filteredCourses.length} courses
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            className="border-gray-300"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-300"
            disabled={currentPage === pageCount}
            onClick={() => setCurrentPage(p => Math.min(pageCount, p + 1))}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}