import { AppContext, AppContextType } from '@/contexts/app.context';
import React, { ChangeEvent, useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
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
  // import { ArrowUpDown, ChevronDown, MoreHorizontal } from 'lucide-react';
} from '@tanstack/react-table';
import {  ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
// import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import LocationAdminModal from './components/LocationAdminModal';
import { deleleLocation } from '@/apis/location';

export type Location = {
  id: string;
  image:string;
  country:string;
  price: number;
  location:string;
  usersID:string;
};

export const columns: ColumnDef<Location>[] = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => (
      <div className="capitalize">
        <img
          src={row.getValue("image")}
          alt="Tour"
          className="object-cover w-16 h-16"
        />
      </div>
    ),
  },

  {
    accessorKey: "country",
    header: "Country",
    cell: ({ row }) => <div className="capitalize">{row.getValue("country")}</div>,
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => <div className="capitalize">{row.getValue("location")}</div>,
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <div className="capitalize">{row.getValue("price")}</div>,
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => <div className="capitalize">{row.getValue("action")}</div>,
  },


];



export default function LocationAdmin() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" >("create");

  const handleOpenModal = (type: "create" ) => {
    setIsModalOpen(true);
    setModalType(type);
  };


  const handleCloseModal = () => {
    setIsModalOpen(false);
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

  //location
  const [location,setLocation] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  const [currentPage,setCurrentPage] = useState(1);
  const [totalPage ,setTotalPage ] = useState(0);


  const [reload, setReload] = useState(false);

  const handleDeleteLocation = (locationId: { id: string }) => {
  
    const deleteLocation = async () => {
      try {
        const res = await deleleLocation(locationId.id);
        console.log(res);
        if (res.status === 200) {
          toast.success('Xoa thanh cong');
          setReload(true)
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    deleteLocation();
  };

  useEffect(() => {
    if (reload) {
      // Tải lại trang
      window.location.reload();
      // Đặt lại trạng thái reload về false sau khi tải lại trang
      setReload(false);
    }
  }, [reload]);

  


  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/location?page=${currentPage}`
        );
        setLocation(response.data.data);
        setTotalPage(response.data.totalPage || 0);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tours:", error);
        setLoading(false);
      }
    };

    fetchLocation();
  }, [currentPage]);
//currentPage page=${currentPage}
  const table = useReactTable({
    data: location,
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

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPage));
  };

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
      <h1>Location Admin</h1>
      <div className='flex items-center py-4'>
        <Input
          placeholder='Filter country...'
          value={(table.getColumn('country')?.getFilterValue() as string) ?? ''}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            table.getColumn('country')?.setFilterValue(event.target.value)
          }
          className='max-w-sm'
        />
        <Button 
        onClick={() => handleOpenModal("create")}
        variant='outline'
        className='ml-[48rem] mr-8 bg-blue-600'>               
        Add
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
          {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : location.length > 0 ? (
              location.map((item) =>  (
                
                
                <TableRow key={item.id}>
                  
                  <TableCell>{item.id} </TableCell>
                  <TableCell className="w-[150px] h-25">                  
                    
                    <img
                      src={item.image}
                      alt="Location"
                      className="object-cover w-full h-full transition duration-300 transform border border-gray-500 hover:scale-110"
                      style={{ objectFit: "cover" }}
                    />
                  </TableCell>
                  <TableCell >{item.country}</TableCell>       
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.price}$</TableCell>
                  <TableCell>
                    <div className="flex gap-4 ">
                      <Link to={`/admin/loaction/edit/${item.id}`}>
                      <Button className='bg-yellow-400 hover:bg-yellow-500 hover:shadow-md'>
                        Edit
                      </Button>
                      </Link>
                    
                      <Button
                        className='bg-red-400 hover:bg-red-500 hover:shadow-md'
                        onClick={() => {
                          if (item.id) {
                            handleDeleteLocation({ id: item.id });
                          }
                        }}
                      >
                        DELETE
                      </Button>                     
                      
                      <Link to={`/admin/loaction/detail/${item.id}`}>
                        
                      <Button className='bg-yellow-400 hover:bg-yellow-500 hover:shadow-md'>
                        Detail
                      </Button>
                      </Link>
                      
                    </div>
                  </TableCell>
                  <TableCell>
                    {/* <LocationAction locationId={item.id} /> */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
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
          Page {currentPage} of {totalPage}
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
            disabled={currentPage === totalPage}
          >
            Next
          </Button>
        </div>
      </div>
      <LocationAdminModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        type={modalType}
        onOpenModal={handleOpenModal}
      />
    </div>
  );
}
