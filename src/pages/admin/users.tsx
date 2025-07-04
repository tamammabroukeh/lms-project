import { useState, useEffect } from 'react';
// import { Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableHead, TableBody, TableRow, TableCell } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious, PaginationNext } from '@/components/ui/pagination';
import { usersDashboardData } from '@/services';
import { Skeleton } from '@/components/ui/skeleton';
import { useTypedTranslation } from '@/hooks';
import { TranslationKeys } from '@/hooks/language/useTypedTranslation';

type User = {
  _id: string;
  userName: string;
  userEmail: string;
  role: 'admin' | 'instructor' | 'student';
  isAccountverified: boolean;
  createdAt?: string;
};


export default function AdminUsersPage() {
  const { t } = useTypedTranslation();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const itemsPerPage = 8;

  // Calculate pagination values
  const totalUsers = filteredUsers.length;
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await usersDashboardData();
        setAllUsers(data.users);
        setFilteredUsers(data.users);
      } catch (err) {
        setError(t('admin:userManagement.fetchError'));
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [t]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredUsers(allUsers);
    } else {
      const filtered = allUsers.filter(user =>
        user.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
    setCurrentPage(1);
  }, [searchTerm, allUsers]);

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
          <h1 className="text-2xl font-bold">{t('admin:userManagement.title')}</h1>
          <p className="text-gray-600">{t('admin:userManagement.subtitle')}</p>
        </div>
        <Button className="bg-black text-white hover:bg-gray-800">
          {t('admin:userManagement.addUser')}
        </Button>
      </header>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder={t('admin:userManagement.searchPlaceholder')}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button variant="outline" className="border-gray-300">
          <Filter className="mr-2" size={16} />
          {t('admin:filters')}
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead>{t('admin:userManagement.columns.user')}</TableHead>
              <TableHead>{t('admin:userManagement.columns.email')}</TableHead>
              <TableHead>{t('admin:userManagement.columns.role')}</TableHead>
              <TableHead>{t('admin:userManagement.columns.verified')}</TableHead>
              <TableHead className="text-right">{t('admin:userManagement.columns.actions')}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell><Skeleton className="h-4 w-32" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-48" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-24" /></TableCell>
                  <TableCell><Skeleton className="h-4 w-20" /></TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="h-8 w-8 rounded-full" />
                  </TableCell>
                </TableRow>
              ))
            ) : paginatedUsers.length > 0 ? (
              paginatedUsers.map((user: User) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">{user.userName}</TableCell>
                  <TableCell>{user.userEmail}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${user.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                        user.role === 'instructor' ? 'bg-purple-100 text-purple-800' :
                          'bg-green-100 text-green-800'
                      }`}>
                      {t(`admin:roles.${user.role}` as TranslationKeys)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${user.isAccountverified ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                      {user.isAccountverified ? t('admin:verified') : t('admin:notVerified')}
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
                        <DropdownMenuItem className="cursor-pointer text-gray-400">
                          {t('admin:actionsDisabled')}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  {t('admin:noResultsFound')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!loading && filteredUsers.length > 0 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              />
            </PaginationItem>

            <PaginationItem>
              <span className="text-sm">
                {t(`admin:pageInfo`, {
                  current: currentPage,
                  total: totalPages
                })}
              </span>
            </PaginationItem>

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}