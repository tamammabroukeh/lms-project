import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { sortOptions } from "@/config";
import { useGetCourseCategories, useGetCourseLevels } from "@/hooks";
import useGetAllCoursesNoRole from "@/hooks/course/useGetAllCoursesNoRole";
import { ArrowUpDownIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCurrentLangIsEnglish } from '@/hooks';
import { ICategory, ICourse, ILevel } from "@/interfaces/course";
import { useEffect, useState } from "react"; // <--- Import useState
import ReusablePagination from "@/components/Reusable-Components/Reusable-Pagination"; // <--- Assuming this is the correct path to your pagination component

function StudentViewCoursesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // 1. Manage the 'page' state
  // Ensure page is always at least 1 when initialized from URL or defaults to 1.
  const initialPage = Math.max(1, Number(searchParams.get('page') || '1'));
  const [page, setPage] = useState<number>(initialPage);

  // Get filter values from URL params
  const sort = searchParams.get('sortBy') || 'price-lowtohigh';
  const categoriesParam = searchParams.get('category') || '';
  const levelsParam = searchParams.get('level') || '';

  // Convert URL params to arrays
  const selectedCategories = categoriesParam.split(',').filter(Boolean);
  const selectedLevels = levelsParam.split(',').filter(Boolean);

  // 2. Pass the 'page' state to your data fetching hook
  const { data } = useGetAllCoursesNoRole();

  // Handle filter changes
  const handleFilterChange = (type: 'category' | 'level', id: string) => {
    const currentParams = new URLSearchParams(searchParams);
    const key = type === 'category' ? 'category' : 'level';

    const currentValues = currentParams.get(key)?.split(',') || [];
    const newValues = currentValues.includes(id)
      ? currentValues.filter(v => v !== id)
      : [...currentValues, id];

    if (newValues.length > 0) {
      currentParams.set(key, newValues.join(','));
    } else {
      currentParams.delete(key);
    }
    
    // Reset to first page when filters change
    currentParams.set('page', '1'); // <--- Ensure page is reset to 1
    setPage(1); // <--- Also update local state
    setSearchParams(currentParams);
  };

  // Handle sort changes
  const handleSortChange = (value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('sortBy', value);
    newParams.set('page', '1'); // <--- Reset to first page on sort change
    setPage(1); // <--- Also update local state
    setSearchParams(newParams);
  };

  function handleCourseNavigate(getCurrentCourseId: string) {
    navigate(`/course/details/${getCurrentCourseId}`);
  }

  const { data: categories, isFetching: isFetchingCategories, isLoading: isLoadingCategories } = useGetCourseCategories()
  const { data: levels, isFetching: isFetchingLevels, isLoading: isLoadingLevels } = useGetCourseLevels()

  const isEnglish = useCurrentLangIsEnglish()

  // 3. Update the page state when URL changes from browser navigation (back/forward)
  useEffect(() => {
    const pageParam = searchParams.get("page");
    const newPage = Math.max(1, Number(pageParam || '1'));
    if (newPage !== page) { // Only update if different to avoid infinite loops
      setPage(newPage);
    }
  }, [searchParams, page]); // Dependency on `searchParams` and `page`

  // Initial page setup, if needed (though `useState` initializer handles most cases)
  // Removed the previous useEffect that forced page to 1, as it interferes with URL state.

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">All Courses</h1>
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="w-full md:w-64 space-y-4">
          <div>
            <div className="p-4 border-b">
              <h3 className="font-bold mb-3">{"categories".toUpperCase()}</h3>
              <div className="grid gap-2 mt-2">
                {!isFetchingCategories || !isLoadingCategories ?
                  categories?.map((category: ICategory) => (
                    <Label className="flex text-base font-medium items-center gap-3" key={category._id}>
                      <Checkbox
                        checked={selectedCategories.includes(category._id)}
                        onCheckedChange={() =>
                          handleFilterChange('category', category._id)
                        }
                      />
                      {isEnglish ? category.title?.en : category.title?.ar}
                    </Label>
                  )) :
                  [0, 1, 2, 3, 4, 5, 6, 7].map(num =>
                    <Skeleton className="w-full h-10" key={num} />
                  )}
              </div>
            </div>
            <div className="p-4 border-b">
              <h3 className="font-bold mb-3">{"level".toUpperCase()}</h3>
              <div className="grid gap-2 mt-2">
                {!isFetchingLevels || !isLoadingLevels ?
                  levels?.map((level: ILevel) => (
                    <Label className="flex text-base font-medium items-center gap-3" key={level._id}>
                      <Checkbox
                        checked={selectedLevels.includes(level._id)}
                        onCheckedChange={() =>
                          handleFilterChange('level', level._id)
                        }
                      />
                      {isEnglish ? level.title?.en : level.title?.ar}
                    </Label>
                  )) :
                  [0, 1, 2].map(num =>
                    <Skeleton className="w-full h-10" key={num} />
                  )}
              </div>
            </div>
          </div>
        </aside>
        <main className="flex-1">
          <div className="flex justify-end items-center mb-4 gap-5">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 p-5"
                >
                  <ArrowUpDownIcon className="h-4 w-4" />
                  <span className="text-[16px] font-medium">Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[180px]">
                <DropdownMenuRadioGroup
                  value={sort}
                  onValueChange={handleSortChange}
                >
                  {sortOptions.map((sortItem) => (
                    <DropdownMenuRadioItem
                      value={sortItem.id}
                      key={sortItem.id}
                    >
                      {sortItem.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
            <span className="text-sm text-black font-bold">
              {data?.data?.totalCourses || 0} Results {/* Use totalCourses for total count */}
            </span>
          </div>
          <div className="space-y-4">
            {data?.data?.courses && data?.data?.courses?.length > 0 ? (
              data?.data?.courses?.map((courseItem: ICourse) => (
                <Card
                  onClick={() => handleCourseNavigate(courseItem?._id)}
                  className="cursor-pointer"
                  key={courseItem?._id}
                >
                  <CardContent className="flex gap-4 p-4">
                    <div className="w-48 h-32 flex-shrink-0">
                      <img
                        src={courseItem?.image}
                        className="w-ful h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-xl mb-2">
                        {courseItem?.title}
                      </CardTitle>
                      <p className="text-sm text-gray-600 mb-1">
                        Created By{" "}
                        <span className="font-bold">
                          {courseItem?.instructorName}
                        </span>
                      </p>
                      <p className="text-[16px] text-gray-600 mt-3 mb-2">
                        {`${courseItem?.curriculum?.length} ${courseItem?.curriculum?.length <= 1
                          ? "Lecture"
                          : "Lectures"
                          } - ${((courseItem?.level as any)).toUpperCase()} Level`}
                      </p>
                      <p className="font-bold text-lg">
                        ${courseItem?.pricing}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Display a message or empty state if no courses found after loading
              !data?.data?.courses && (isFetchingCategories || isLoadingCategories) ? (
                 [0, 1, 2, 3].map(num =>
                    <Skeleton className="w-full h-48" key={num} />
                 )
              ) : (
                <div className="text-center text-gray-600 py-8">No courses found matching your criteria.</div>
              )
            )}
          </div>

          {/* 4. Add the ReusablePagination component */}
          {data?.data && data.data.totalPages > 1 && (
            <div className="mt-8">
              <ReusablePagination
                currentPage={page}
                totalPages={data.data.totalPages}
                setPage={setPage}
                searchParams={searchParams}
                setSearchParams={setSearchParams}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default StudentViewCoursesPage;