import { AppContext, AppContextType } from '@/contexts/app.context';
import React, { ChangeEvent, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { ArrowUpDown, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { IUser } from '@/types/users.type';
import { useQuery } from '@tanstack/react-query';
import { deleleUserMe, getUserTotal } from '@/apis/me';
import { toast } from 'sonner';

const handleDeleteUser = (IUser: { id: string }) => {
  const deleteUser = async () => {
    try {
      const res = await deleleUserMe(IUser.id);
      console.log(res);
      if (res.status === 200) {
        toast.success('Xoa thanh cong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteUser();
};

const columns: ColumnDef<IUser>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className='text-lg font-bold'
        >
          Email
          <ArrowUpDown className='w-4 h-4 ml-2' />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className='w-20 lowercase'>{row.getValue('email')}</div>
    ),
  },
  {
    accessorKey: 'fullName',
    header: () => <div className='text-lg font-bold'>FullName</div>,
  },
  {
    accessorKey: 'role',
    header: () => <div className='text-lg font-bold'>Role</div>,
    // cell: ({ row }) => <div className=''></div>,
  },
  {
    id: 'actions',
    enableHiding: false,
    header: () => <div className='text-lg font-bold'>Actions</div>,
    cell: ({ row }) => {
      return (
        <div className='flex items-center gap-4'>
          <Link to={`/admin/user/${row.original.id}`}>
            <Button className='bg-yellow-400 hover:bg-yellow-500 hover:shadow-md'>
              VIEW
            </Button>
          </Link>
          <Button
            className='bg-red-400 hover:bg-red-500 hover:shadow-md'
            onClick={() => {
              if (row.original.id) {
                handleDeleteUser({ id: row.original.id });
              }
            }}
          >
            DELETE
          </Button>
        </div>
      );
    },
  },
];

export default function UserAdmin() {
  const { isAuthenticated } = useContext<AppContextType>(AppContext);
  const navigate = useNavigate();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const { data: queryGetUser } = useQuery({
    queryKey: ['getUserTotal'],
    queryFn: () => getUserTotal(),
  });

  const data: IUser[] = queryGetUser?.data?.data;

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  // const handleDeleteUser = (IUser: { id: string }) => {
  //   const deleteUser = async () => {
  //     try {
  //       const res = await deleleUserMe(IUser.id);
  //       console.log(res);
  //       if (res.status === 200) {
  //         toast.success('Xoa thanh cong');
  //         navigate('/admin/user');
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   deleteUser();
  // };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) {
    return null;
  }
  return (
    <div className='w-full px-4 py-6 bg-white rounded-md'>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter emails...'
          value={(table.getColumn('email')?.getFilterValue() as string) ?? ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            table.getColumn('email')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='ml-auto'>
              Columns <ChevronDown className='w-4 h-4 ml-2' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className='capitalize'
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className='border rounded-md'>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  style={{
                    backgroundColor:
                      row.original.role === 'ADMIN' ? '#0bed69' : 'inherit',
                    color: row.original.role === 'ADMIN' ? 'white' : 'black',
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end py-4 space-x-2'>
        <div className='flex-1 text-sm text-muted-foreground'>
          {table.getFilteredSelectedRowModel().rows.length} of{' '}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
