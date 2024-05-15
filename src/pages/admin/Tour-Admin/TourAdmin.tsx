import { AppContext, AppContextType } from '@/contexts/app.context';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import TourActions from './components/TourAction';
import TourAdminModals from './components/TourAdminModals';
import { toast } from 'sonner';
import { debounce } from 'lodash';
import warningImage from '../../../assets/images/Tour/warning.png';

export type Tour = {
  id: string;
  name: string;
  image: string;
  description: string;
  location: string;
  price: number;
  remainingCount: string;
  cuisine: string;
  suitable_subject: string;
  vchouer: string;
  time_out: string;
  ideal_time: string;
  image2: string;
  image3: string;
  image4: string;
  transport: string;
  hotel: string;
  starting_gate: string;
  sight_seeing: string;
};

export const columns: ColumnDef<Tour>[] = [
  {
    accessorKey: 'id',
    header: 'Id',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className='capitalize'>{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'image',
    header: 'Image',
    cell: ({ row }) => (
      <div className='capitalize'>
        <img
          src={row.getValue('image')}
          alt='Tour'
          className='object-cover w-16 h-16'
        />
      </div>
    ),
  },

  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('description')}</div>
    ),
  },
  {
    accessorKey: 'location',
    header: 'Location',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('location')}</div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('price')}</div>
    ),
  },
  {
    accessorKey: 'remainingCount',
    header: 'RemainingCount',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('remainingCount')}</div>
    ),
  },
  {
    accessorKey: 'action',
    header: 'Action',
    cell: ({ row }) => (
      <div className='capitalize'>{row.getValue('action')}</div>
    ),
  },

  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => {
      const tour = row.original;

      const handleCopyId = () => {
        navigator.clipboard
          .writeText(tour.id)
          .then(() => {
            console.log('Payment ID copied to clipboard:', tour.id);
          })
          .catch((error) => {
            console.error('Error copying payment ID to clipboard:', error);
          });
      };

      const handleViewCustomer = () => {
        // Xử lý hiển thị thông tin của khách hàng
      };

      const handleViewPaymentDetails = () => {
        // Xử lý hiển thị chi tiết thanh toán
      };

      return (
        <div className='flex items-center space-x-2'>
          <Button variant='outline' onClick={handleCopyId}>
            Copy ID
          </Button>
          <Button variant='outline' onClick={handleViewCustomer}>
            View Customer
          </Button>
          <Button variant='outline' onClick={handleViewPaymentDetails}>
            View Payment Details
          </Button>
        </div>
      );
    },
  },
];

const initialTour: Tour = {
  id: '',
  name: '',
  image: '',
  description: '',
  location: '',
  price: 0,
  remainingCount: '',
  cuisine: '',
  suitable_subject: '',
  vchouer: '',
  time_out: '',
  ideal_time: '',
  image2: '',
  image3: '',
  image4: '',
  transport: '',
  hotel: '',
  starting_gate: '',
  sight_seeing: '',
};
export default function TourAdmin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'create' | 'edit'>('create');
  //edit
  const [editingTour, setEditingTour] = useState<Tour>(initialTour);
  //search
  // const [searchKeyword, setSearchKeyword] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Tour[]>([]);

  const debouncedSearchFunction = debounce(async (query: string) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tour?search=${query}`
      );
      setSearchResults(response.data.data);
    } catch (error) {
      console.error('Error fetching search results:', error);
      setSearchResults([]);
    }
  }, 1000);

  useEffect(() => {
    if (searchQuery !== '') {
      debouncedSearchFunction(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleOpenModal = (type: 'create' | 'edit') => {
    setIsModalOpen(true);
    setModalType(type);
  };
  const handleOpenModalDelete = () => {
    setIsDeleteModalOpen(true);
  };
  const handleCloseModalDelete = () => {
    setIsDeleteModalOpen(false);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTour(initialTour);
  };
  const handleEditTour = (tourId: string) => {
    setModalType('edit');
    const tourToEdit = tours.find((tour) => tour.id === tourId);
    if (tourToEdit) {
      setEditingTour(tourToEdit);
      console.log('Editing tour:', tourToEdit);
      setIsModalOpen(true);
    }
  };
  //tour
  const [tours, setTours] = useState<Tour[]>([]);

  const [loading, setLoading] = useState(true);
  //pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  //delete
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/tour?page=${currentPage}`
        );
        setTours(response.data.data);
        setTotalPages(response.data.totalPage || 0);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tours:', error);
        setLoading(false);
      }
    };

    fetchData(); // Gọi API để lấy dữ liệu ban đầu
  }, [currentPage]);
  const fetchTours = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/tour?page=${currentPage}`
      );
      setTours(response.data.data);
      setTotalPages(response.data.totalPage || 0);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tours:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTours();
  }, [currentPage]);

  const handleDeleteTour = async (tourId: string) => {
    try {
      setIsDeleteModalOpen(true);
      await axios.delete(`${import.meta.env.VITE_API_URL}/tour/${tourId}`);

      setTours((prevTours) => prevTours.filter((tour) => tour.id !== tourId));
      toast.success('Delete Tour Successful');
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error('Error deleting tour:', error);
      toast.error('Delete Tour Faild');
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const { isAuthenticated } = useContext<AppContextType>(AppContext);
  const navigate = useNavigate();

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: tours,
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

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  if (!isAuthenticated) {
    return null;
  }
  //lọc filter để search
  // const filteredTours = tours.filter((tour) =>
  //   tour.name.toLowerCase().includes(searchKeyword.toLowerCase())
  // );
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setSearchQuery(value);
  };

  return (
    <div className='w-full px-4 py-6 bg-white rounded-md'>
      <div className='flex items-center gap-4 py-4'>
        <Input
          placeholder='Filter name...'
          value={searchQuery}
          onChange={handleSearch}
          className='max-w-sm'
        />

        <Button
          className='bg-blue-600 ml-[48rem]'
          onClick={() => handleOpenModal('create')}
        >
          ADD
        </Button>

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
      <div className='border rounded-md '>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className='text-lg font-bold text-center'
                    >
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
            {loading ? (
              // Hiển thị thông báo loading khi đang tải dữ liệu
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className='h-24 text-center'
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : searchQuery !== '' && searchResults.length > 0 ? (
              // Hiển thị kết quả tìm kiếm nếu có
              searchResults.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell>{tour.id}</TableCell>
                  <TableCell>{tour.name}</TableCell>
                  <TableCell className='w-[150px] h-25'>
                    <img
                      src={tour.image}
                      alt='Tour'
                      className='object-cover w-full transition duration-300 transform border border-gray-500 max-h-[70px] hover:scale-110'
                      style={{ objectFit: 'cover' }}
                    />
                  </TableCell>
                  <TableCell className='max-w-[150px] truncate'>
                    {tour.description}
                  </TableCell>
                  <TableCell>{tour.location}</TableCell>
                  <TableCell>{tour.price}$</TableCell>
                  <TableCell className='text-center'>
                    {tour.remainingCount}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center gap-4'>
                      <Button
                        className='w-[85px] bg-yellow-400'
                        onClick={() => handleEditTour(tour.id)}
                      >
                        EDIT
                      </Button>
                      <Button
                        className='bg-red-600 w-42'
                        onClick={handleOpenModalDelete}
                      >
                        DELETE
                      </Button>
                      {/* Modal for delete action */}
                      {isDeleteModalOpen && (
                        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                          <div className='p-6 bg-white rounded-lg'>
                            <h2 className='mb-4 text-lg font-semibold'>
                              Are you sure you want to delete this tour?
                            </h2>

                            <div className='flex justify-end'>
                              <button
                                className='px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600'
                                onClick={() => handleDeleteTour(tour.id)}
                              >
                                Confirm
                              </button>
                              <button
                                className='px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400'
                                onClick={handleCloseModalDelete}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <TourActions tourId={tour.id} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              // Hiển thị dữ liệu ban đầu khi không có kết quả tìm kiếm
              tours?.map((tour) => (
                <TableRow key={tour.id}>
                  <TableCell>{tour.id}</TableCell>
                  <TableCell className='w-[250px]'>{tour.name}</TableCell>
                  <TableCell className='w-[150px] h-25'>
                    <img
                      src={tour.image}
                      alt='Tour'
                      className='object-cover w-full transition duration-300 transform border border-gray-500 max-h-[70px] hover:scale-110'
                      style={{ objectFit: 'cover' }}
                    />
                  </TableCell>
                  <TableCell className='max-w-[150px] truncate'>
                    {tour.description}
                  </TableCell>
                  <TableCell>{tour.location}</TableCell>
                  <TableCell>{tour.price}$</TableCell>
                  <TableCell className='text-center'>
                    {tour.remainingCount}
                  </TableCell>
                  <TableCell>
                    <div className='flex items-center justify-center gap-4'>
                      <Button
                        className='w-[85px] bg-yellow-400'
                        onClick={() => handleEditTour(tour.id)}
                      >
                        EDIT
                      </Button>
                      <Button
                        className='bg-red-600 w-42'
                        onClick={handleOpenModalDelete}
                      >
                        DELETE
                      </Button>
                      {/* Modal for delete action */}
                      {isDeleteModalOpen && (
                        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
                          <div className='p-6 bg-white rounded-lg'>
                            <h2 className='mb-4 text-lg font-semibold'>
                              Are you sure you want to delete this tour?
                            </h2>
                            <div className='flex items-center justify-center w-full h-full mb-7'>
                              <img
                                className='h-20 w-50 '
                                src={warningImage}
                                alt='warning'
                              />
                            </div>
                            <div className='flex justify-end'>
                              <button
                                className='px-4 py-2 mr-2 text-white bg-red-500 rounded hover:bg-red-600'
                                onClick={() => handleDeleteTour(tour.id)}
                              >
                                Confirm
                              </button>
                              <button
                                className='px-4 py-2 text-gray-700 bg-gray-300 rounded hover:bg-gray-400'
                                onClick={handleCloseModalDelete}
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <TourActions tourId={tour.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className='flex items-center justify-end py-4 space-x-2'>
        <div className='flex-1 text-sm text-muted-foreground'>
          Page {currentPage} of {totalPages}
        </div>
        <div className='space-x-2'>
          <Button
            variant='outline'
            size='sm'
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant='outline'
            size='sm'
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
      <TourAdminModals
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        type={modalType}
        onOpenModal={handleOpenModal}
        editingTour={editingTour}
        fetchTours={fetchTours}
      />
    </div>
  );
}
