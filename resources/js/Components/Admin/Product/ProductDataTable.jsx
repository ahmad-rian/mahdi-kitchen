import React, { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Search, Filter } from 'lucide-react';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net';
import { router } from '@inertiajs/react';

const ProductDataTable = () => {
    const tableRef = useRef(null);
    const dtRef = useRef(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const { toast } = useToast();

    useEffect(() => {
        if (!tableRef.current) return;

        // Apply custom styling to DataTables elements
        const applyResponsiveStyling = () => {
            // Add custom CSS for mobile improvements
            const customCSS = `
                @media (max-width: 768px) {
                    .dataTables_wrapper {
                        padding: 0 !important;
                    }
                    .dataTables_wrapper .row {
                        margin-left: 0;
                        margin-right: 0;
                    }
                    table.dataTable.dtr-inline.collapsed>tbody>tr>td.dtr-control:before, 
                    table.dataTable.dtr-inline.collapsed>tbody>tr>th.dtr-control:before {
                        background-color: #3b82f6;
                        border: 1.5px solid #60a5fa;
                    }
                    table.dataTable>tbody>tr.child ul.dtr-details>li {
                        border-bottom: 1px solid #f3f4f6;
                        padding: 0.75em 0;
                    }
                    table.dataTable>tbody>tr.child ul.dtr-details>li:last-child {
                        border-bottom: none;
                    }
                    table.dataTable>tbody>tr.child span.dtr-title {
                        font-weight: 600;
                        color: #4b5563;
                        min-width: 120px;
                        display: inline-block;
                    }
                    .dataTables_wrapper .dataTables_info,
                    .dataTables_wrapper .dataTables_paginate {
                        width: 100%;
                        text-align: center;
                        margin-top: 0.75rem;
                    }
                    .dataTables_wrapper .dataTables_length {
                        margin-bottom: 1rem;
                    }
                    .dataTables_filter {
                        margin-bottom: 0.5rem;
                    }
                    .dataTables_filter label {
                        width: 100%;
                        display: block;
                    }
                    .dataTables_filter input {
                        width: 100% !important;
                        margin-left: 0 !important;
                    }
                    table.dataTable>tbody>tr.child {
                        padding: 0;
                    }
                    table.dataTable>tbody>tr.child ul.dtr-details {
                        width: 100%;
                    }
                    .dataTables_length {
                        text-align: center;
                        width: 100%;
                    }
                    .dataTables_length label {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .dataTable thead th {
                        white-space: nowrap;
                    }
                }
            `;

            // Add the custom CSS if it doesn't exist
            if ($('#custom-datatable-css').length === 0) {
                $('head').append(`<style id="custom-datatable-css">${customCSS}</style>`);
            }

            // Search input styling
            $('.dataTables_filter input').addClass('pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 w-full');
            
            // Length select styling
            $('.dataTables_length select').addClass('ml-2 rounded-lg border-0 bg-transparent focus:ring-0 text-gray-600 font-medium');
            
            // Pagination button styling
            $('.dataTables_paginate .paginate_button').addClass('px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200');
            $('.dataTables_paginate .paginate_button.current').addClass('bg-blue-50 text-blue-600 font-medium');
            
            // Add search icon
            if ($('.search-icon-wrapper').length === 0) {
                $('.dataTables_filter').addClass('relative');
                $('.dataTables_filter').prepend('<div class="search-icon-wrapper absolute left-3 top-2.5 text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>');
            }

            // Mobile specific
            if (window.innerWidth < 768) {
                $('.dataTable').addClass('border-collapse w-full');
                $('.dataTable th').addClass('border border-gray-100 text-xs');
                $('.dataTable td').addClass('border border-gray-100 text-xs py-2');
                $('.dataTables_filter input').attr('placeholder', 'Cari produk...');
            }
        };

        // Function to adjust table columns for different screen sizes
        const setupResponsiveColumns = () => {
            const isMobile = window.innerWidth < 640;
            const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
            
            if (dtRef.current) {
                // Adjust column visibility based on screen size
                dtRef.current.column(0).visible(!isMobile); // No
                dtRef.current.column(3).visible(!isMobile); // Category
                dtRef.current.column(4).visible(!isMobile); // Price
                dtRef.current.column(5).visible(!isMobile); // Stock
                dtRef.current.column(6).visible(!isMobile && !isTablet); // Status
                
                // Redraw the table
                dtRef.current.columns.adjust().draw();
            }
        };

        // Custom mobile DOM structure - optimized for small screens
        const mobileDom = '<"px-4 py-3"<"mb-3"f><"flex items-center justify-between"<"text-sm"l><"flex gap-2"B>>><"overflow-x-auto"t><"px-4 py-3 border-t"<"flex flex-col items-center gap-3"<"text-xs text-gray-500"i><"flex justify-center"p>>>';
        const desktopDom = '<"flex flex-col gap-4 mb-4 md:mb-6"<"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"<"w-full sm:w-auto order-2 sm:order-1"l><"w-full sm:w-64 relative order-1 sm:order-2"f>>><"overflow-x-auto rounded-lg border border-gray-100"t><"flex flex-col sm:flex-row justify-between items-center gap-4 mt-4 md:mt-6"<"text-sm text-gray-500 order-2 sm:order-1"i><"w-full sm:w-auto overflow-x-auto order-1 sm:order-2"p>>';

        const isMobile = window.innerWidth < 768;
        const dom = isMobile ? mobileDom : desktopDom;

        const dt = $(tableRef.current).DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url: route('admin.products.data'),
                error: function(xhr, error, thrown) {
                    console.error('DataTables error:', error);
                    toast({
                        title: "Error",
                        description: "Failed to load products data. Please refresh the page.",
                        variant: "destructive"
                    });
                }
            },
            dom: dom,
            language: {
                search: '',
                searchPlaceholder: 'Cari produk...',
                lengthMenu: '<span class="text-gray-500 text-sm">Per page:</span> _MENU_',
                info: '<span class="text-xs">_START_ - _END_ dari _TOTAL_</span>',
                infoEmpty: '<span class="text-xs">0 data</span>',
                emptyTable: 'Tidak ada data',
                zeroRecords: 'Tidak ditemukan data',
                paginate: {
                    previous: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>',
                    next: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>'
                },
                processing: '<div class="flex justify-center items-center p-4"><div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div></div>'
            },
            columns: [
                { 
                    data: 'id', 
                    name: 'id',
                    width: '40px',
                    className: 'text-gray-600 font-medium py-3 text-center',
                    render: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { 
                    data: 'image_url',
                    name: 'image',
                    orderable: false,
                    searchable: false,
                    width: '60px',
                    className: 'py-2 text-center',
                    render: function(data, type, row) {
                        if (!data) {
                            return `<div class="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-lg flex items-center justify-center mx-auto">
                                <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>`;
                        }
                
                        const escapedUrl = data.replace(/"/g, '&quot;');
                        
                        return `<div class="flex justify-center">
                            <div class="relative group">
                                <img 
                                    src='${escapedUrl}' 
                                    alt="Product" 
                                    class="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg shadow-sm transition-all duration-200 group-hover:shadow-md"
                                    onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Crect width=\'24\' height=\'24\' fill=\'%23f3f4f6\'/%3E%3C/svg%3E'"
                                />
                            </div>
                        </div>`;
                    }
                },
                { 
                    data: 'name', 
                    name: 'name',
                    className: 'font-medium text-gray-900 py-2 px-2',
                    render: function(data, type, row) {
                        // Truncate description for mobile
                        const description = row.description 
                            ? (window.innerWidth < 768 
                                ? (row.description.length > 30 ? row.description.substring(0, 30) + '...' : row.description)
                                : row.description)
                            : '';
                            
                        return `<div class="max-w-[150px] sm:max-w-xs">
                            <div class="font-medium text-gray-900 text-sm">${data}</div>
                            ${description ? `<div class="text-xs text-gray-500 truncate mt-0.5">${description}</div>` : ''}
                        </div>`;
                    }
                },
                { 
                    data: 'kategori_name', 
                    name: 'kategori.name',
                    width: '90px',
                    className: 'py-2 text-center',
                    render: function(data) {
                        return `<span class="inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium bg-blue-500 text-white">
                            ${data}
                        </span>`;
                    }
                },
                { 
                    data: 'formatted_price',
                    name: 'price',
                    width: '90px',
                    className: 'text-right py-2',
                    render: function(data) {
                        return `<span class="font-medium text-gray-900 text-sm">${data}</span>`;
                    }
                },
                { 
                    data: 'stock',
                    name: 'stock',
                    width: '70px',
                    className: 'text-center py-2',
                    render: function(data) {
                        const colorClass = parseInt(data) <= 10 ? 'bg-red-500' : 'bg-green-500';
                        return `<span class="inline-flex items-center px-1.5 py-0.5 rounded-md text-xs font-medium ${colorClass} text-white">
                            ${data}
                        </span>`;
                    }
                },
                { 
                    data: 'is_active',
                    name: 'is_active',
                    width: '70px',
                    className: 'py-2 text-center',
                    render: function(data) {
                        const colorClass = data ? 'bg-green-500' : 'bg-red-500';
                        return `<span class="inline-flex items-center rounded-md px-1.5 py-0.5 text-xs font-medium text-white ${colorClass}">
                            ${data ? 'Active' : 'Inactive'}
                        </span>`;
                    }
                },
                {
                    data: 'actions',
                    name: 'actions',
                    orderable: false,
                    searchable: false,
                    width: '80px',
                    className: 'text-center py-2',
                    render: function(data) {
                        return `
                            <div class="flex justify-center gap-1">
                                <button class="edit-btn inline-flex items-center justify-center rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 transition-all duration-200">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                                    </svg>
                                </button>
                                <button class="delete-btn inline-flex items-center justify-center rounded-lg p-1.5 text-red-600 hover:bg-red-50 transition-all duration-200">
                                    <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                    </svg>
                                </button>
                            </div>
                        `;
                    }
                }
            ],
            pageLength: 10,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Semua"]],
            order: [[0, 'asc']],
            responsive: {
                details: {
                    type: 'column',
                    target: 'tr',
                    renderer: function (api, rowIdx, columns) {
                        const data = $.map(columns, function (col, i) {
                            return col.hidden ?
                                '<div class="flex flex-col py-2 border-b border-gray-100 last:border-0">' +
                                    '<div class="font-medium text-xs text-gray-500 mb-1">' + col.title + '</div>' +
                                    '<div class="text-sm">' + col.data + '</div>' +
                                '</div>' :
                                '';
                        }).join('');
                        
                        if (data) {
                            return '<div class="p-2 bg-gray-50/50 rounded-lg text-xs">' + data + '</div>';
                        }
                        return false;
                    }
                }
            },
            drawCallback: function() {
                applyResponsiveStyling();
                
                // Adjust table on redraw
                $('.dataTables_wrapper').addClass('w-full');
                $('.dataTables_info').addClass('text-center sm:text-left mb-2 sm:mb-0');
                $('.dataTables_paginate').addClass('flex flex-wrap justify-center sm:justify-end gap-1');
                
                // Make processing overlay more responsive
                $('.dataTables_processing').addClass('bg-white bg-opacity-80 rounded-lg shadow-sm border border-gray-100');
            },
            initComplete: function() {
                applyResponsiveStyling();
                setupResponsiveColumns();
            }
        });
        dtRef.current = dt;

        // Event handlers
        $(tableRef.current).on('click', '.edit-btn', function() {
            const data = dt.row($(this).closest('tr')).data();
            if (data?.actions?.edit_url) {
                router.visit(data.actions.edit_url);
            }
        });

        $(tableRef.current).on('click', '.delete-btn', function() {
            const data = dt.row($(this).closest('tr')).data();
            if (data) {
                setSelectedProduct(data);
                setIsDeleteDialogOpen(true);
            }
        });

        // Apply responsive styling on window resize
        window.addEventListener('resize', () => {
            applyResponsiveStyling();
            setupResponsiveColumns();
        });

        // Reapply styling after DataTables updates the DOM
        $(tableRef.current).on('draw.dt', applyResponsiveStyling);

        return () => {
            if (dtRef.current) {
                dtRef.current.destroy();
            }
            window.removeEventListener('resize', applyResponsiveStyling);
            $('#custom-datatable-css').remove();
        };
    }, []);

    const confirmDelete = () => {
        if (!selectedProduct) return;
        
        router.delete(selectedProduct.actions.delete_url, {
            onSuccess: () => {
                toast({ 
                    title: "Berhasil",
                    description: "Produk telah berhasil dihapus",
                    variant: "default",
                    className: "bg-green-500 text-white border-none"
                });
                dtRef.current?.ajax.reload();
            },
            onError: () => {
                toast({ 
                    title: "Gagal",
                    description: "Gagal menghapus produk. Silakan coba lagi.",
                    variant: "destructive"
                });
            },
        });
        setIsDeleteDialogOpen(false);
        setSelectedProduct(null);
    };

    // Custom search for mobile
    const mobileSearch = (
        <div className="relative mt-2 md:hidden px-4">
            <div className="absolute inset-y-0 left-7 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-400" />
            </div>
            <Input 
                type="search" 
                placeholder="Cari produk..." 
                className="pl-10 pr-4 py-2 text-sm w-full"
                onChange={(e) => {
                    if (dtRef.current) {
                        dtRef.current.search(e.target.value).draw();
                    }
                }}
            />
        </div>
    );

    return (
        <div className="w-full bg-white rounded-xl shadow-sm">
            <Card className="border-none shadow-none">
                <CardHeader className="flex flex-col gap-3 p-4 sm:p-6 border-b border-gray-100">
                    <div>
                        <CardTitle className="text-lg sm:text-2xl font-bold text-gray-900">Produk</CardTitle>
                        <p className="text-xs sm:text-base text-gray-500 mt-1">Kelola produk sistem Anda</p>
                    </div>
                    <div className="flex justify-start sm:justify-end w-full">
                        <Button 
                            onClick={() => router.visit(route('admin.products.create'))}
                            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-sm hover:shadow inline-flex items-center gap-2 text-xs sm:text-sm w-full sm:w-auto py-2 px-3 h-auto sm:h-10"
                        >
                            <Plus className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                            <span>Tambah Produk</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="rounded-b-xl bg-white w-full overflow-hidden">
                        <div className="overflow-x-auto">
                            <Table ref={tableRef} className="w-full text-xs sm:text-sm">
                                <TableHeader>
                                    <TableRow className="border-gray-100 bg-gray-50/50">
                                        <TableHead className="py-2 px-2 text-gray-600 font-semibold text-xs whitespace-nowrap">NO</TableHead>
                                        <TableHead className="py-2 px-2 text-center text-gray-600 font-semibold text-xs whitespace-nowrap">Gambar</TableHead>
                                        <TableHead className="py-2 px-2 text-gray-600 font-semibold text-xs whitespace-nowrap">Detail Produk</TableHead>
                                        <TableHead className="py-2 px-2 text-gray-600 font-semibold text-xs whitespace-nowrap">Kategori</TableHead>
                                        <TableHead className="py-2 px-2 text-right text-gray-600 font-semibold text-xs whitespace-nowrap">Harga</TableHead>
                                        <TableHead className="py-2 px-2 text-center text-gray-600 font-semibold text-xs whitespace-nowrap">Stok</TableHead>
                                        <TableHead className="py-2 px-2 text-center text-gray-600 font-semibold text-xs whitespace-nowrap">Status</TableHead>
                                        <TableHead className="py-2 px-2 text-center text-gray-600 font-semibold text-xs whitespace-nowrap">Aksi</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {/* DataTables will populate this */}
                                </TableBody>
                            </Table>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="rounded-xl max-w-md mx-auto p-5">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-bold text-gray-900">
                            Hapus Produk
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 mt-3">
                            Apakah Anda yakin ingin menghapus produk{selectedProduct && ` "${selectedProduct.name}"`}? 
                            <p className="text-sm text-red-500 mt-2 font-medium">
                                Tindakan ini tidak dapat dibatalkan.
                            </p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="mt-6 flex flex-col sm:flex-row gap-2">
                        <AlertDialogCancel className="rounded-lg font-medium w-full sm:w-auto mb-2 sm:mb-0">
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium w-full sm:w-auto"
                        >
                            Hapus Produk
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default ProductDataTable;