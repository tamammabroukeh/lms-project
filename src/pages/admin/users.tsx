import { useState, useEffect } from 'react';
import { Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { usersDashboardData } from '@/services';
import { Skeleton } from '@/components/ui/skeleton';
import { useTypedTranslation } from '@/hooks';

export default function AdminUsersPage() {
  const {t} = useTypedTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersData, setUsersData] = useState({
    users: [],
    total: 0,
    page: 1,
    limit: 8,
    totalPages: 1
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const itemsPerPage = 8;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await usersDashboardData();
        setUsersData({
          users: data.users,
          total: data.total,
          page: data.page,
          limit: data.limit,
          totalPages: data.totalPages
        });
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    // Add debounce for search to prevent too many API calls
    const debounceTimer = setTimeout(() => {
      fetchUsers();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, currentPage]);

  const filteredUsers = usersData.users.filter(user => 
    user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <header className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">User Management</h1>
          <p className="text-gray-600">Manage all platform users</p>
        </div>
        <Button className="bg-black text-white hover:bg-gray-800">
          Add New User
        </Button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search users..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
          />
        </div>
        <Button variant="outline" className="border-gray-300">
          <Filter className="mr-2" size={16} />
          Filters
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              // Loading skeleton
              Array.from({ length: itemsPerPage }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-4 w-[40px]" />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.userName}</TableCell>
                  <TableCell>{user.userEmail}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                      user.role === 'teacher' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {user.role}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      user.isAccountverified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.isAccountverified ? 'Verified' : 'Not Verified'}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="cursor-pointer">
                          <Edit className="mr-2" size={14} />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer text-red-600">
                          <Trash2 className="mr-2" size={14} />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1 || loading}
            />
          </PaginationItem>
          
          <PaginationItem>
            <span className="text-sm">
              Page {currentPage} of {usersData.totalPages}
            </span>
          </PaginationItem>
          
          <PaginationItem>
            <PaginationNext 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === usersData.totalPages || loading}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}