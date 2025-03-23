import React, { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net';
import { router } from '@inertiajs/react';

const UserDataTable = () => {
    const tableRef = useRef(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const { toast } = useToast();
    const dtRef = useRef(null);

    // Function to apply responsive styling to DataTables elements
    const applyResponsiveStyling = () => {
        // Search input styling
        $('.dataTables_filter input').addClass('pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200 w-full');
        
        // Add search icon if not already present
        if ($('.search-icon-wrapper').length === 0) {
            $('.dataTables_filter').addClass('relative w-full');
            $('.dataTables_filter').prepend('<div class="search-icon-wrapper absolute left-3 top-2.5 text-gray-400"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg></div>');
        }
        
        // Length select styling
        $('.dataTables_length select').addClass('ml-2 rounded-lg border-0 bg-transparent focus:ring-0 text-gray-600 font-medium');
        
        // Pagination button styling
        $('.dataTables_paginate .paginate_button').addClass('px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200');
        $('.dataTables_paginate .paginate_button.current').addClass('bg-blue-50 text-blue-600 font-medium');
        
        // Table styles for mobile
        if (window.innerWidth < 768) {
            $('.dataTable').addClass('border-collapse');
            $('.dataTable th, .dataTable td').addClass('border border-gray-100');
        }

        // Wrapper styles
        $('.dataTables_wrapper').addClass('w-full');
        $('.dataTables_info').addClass('text-center sm:text-left mb-2 sm:mb-0');
        $('.dataTables_paginate').addClass('flex flex-wrap justify-center sm:justify-end gap-1');
    };

    // Function to adjust column visibility based on screen size
    const setupResponsiveColumns = () => {
        const isMobile = window.innerWidth < 640;
        const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
        
        if (dtRef.current) {
            // Adjust column visibility based on screen size
            dtRef.current.column(2).visible(!isMobile); // Email
            dtRef.current.column(3).visible(!isMobile); // Role
            
            // Redraw the table
            dtRef.current.columns.adjust().draw();
        }
    };

    useEffect(() => {
        if (!tableRef.current) return;
        
        const dt = $(tableRef.current).DataTable({
            processing: true,
            serverSide: true,
            ajax: '/admin/users/data',
            dom: '<"flex flex-col gap-4 mb-6"<"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"<"w-full sm:w-auto order-2 sm:order-1"l><"w-full sm:w-64 relative order-1 sm:order-2"f>>><"overflow-x-auto rounded-lg border border-gray-100"t><"flex flex-col sm:flex-row justify-between items-center gap-4 mt-6"<"text-sm text-gray-500 order-2 sm:order-1"i><"w-full sm:w-auto overflow-x-auto order-1 sm:order-2"p>>',
            language: {
                search: '',
                searchPlaceholder: 'Cari pengguna...',
                lengthMenu: '<span class="text-gray-500">Data per halaman:</span> _MENU_',
                info: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ data',
                infoEmpty: 'Tidak ada data yang ditampilkan',
                emptyTable: 'Tidak ada data dalam tabel',
                zeroRecords: 'Tidak ditemukan data yang sesuai',
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
                    className: 'text-gray-600 font-medium py-4',
                    responsivePriority: 1
                },
                { 
                    data: 'name', 
                    name: 'name',
                    className: 'font-medium text-gray-900 py-4',
                    responsivePriority: 1
                },
                { 
                    data: 'email', 
                    name: 'email',
                    className: 'text-gray-600 py-4',
                    responsivePriority: 3
                },
                { 
                    data: 'role',
                    name: 'role',
                    className: 'py-4',
                    responsivePriority: 2,
                    render: function(data) {
                        const color = data === 'admin' ? 'bg-blue-500' : 'bg-gray-500';
                        return `<span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ${color}">${data}</span>`;
                    }
                },
                { 
                    data: 'status',
                    name: 'is_active',
                    className: 'py-4',
                    responsivePriority: 2,
                    render: function(data) {
                        const color = data === 'Active' ? 'bg-green-500' : 'bg-red-500';
                        return `<span class="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-white ${color}">${data}</span>`;
                    }
                },
                {
                    data: 'actions',
                    name: 'actions',
                    orderable: false,
                    searchable: false,
                    className: 'text-center py-4',
                    responsivePriority: 1,
                    render: function(data, type, row) {
                        return `
                            <div class="flex justify-center gap-1 sm:gap-2">
                                <button class="edit-btn inline-flex items-center justify-center rounded-lg p-1.5 sm:p-2 text-blue-600 hover:bg-blue-50 transition-all duration-200">
                                    <svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                                    </svg>
                                </button>
                                <button class="delete-btn inline-flex items-center justify-center rounded-lg p-1.5 sm:p-2 text-red-600 hover:bg-red-50 transition-all duration-200">
                                    <svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
                                '<div class="flex flex-col sm:flex-row py-2 border-b border-gray-100 last:border-0">' +
                                    '<div class="font-medium text-gray-500 w-full sm:w-28 mb-1 sm:mb-0">' + col.title + '</div>' +
                                    '<div class="flex-1 sm:ml-4">' + col.data + '</div>' +
                                '</div>' :
                                '';
                        }).join('');
                        
                        if (data) {
                            return '<div class="p-3 bg-gray-50/50 rounded-lg mt-2 text-sm">' + data + '</div>';
                        }
                        return false;
                    }
                }
            },
            drawCallback: function() {
                applyResponsiveStyling();
                
                // Make processing overlay more responsive
                $('.dataTables_processing').addClass('bg-white bg-opacity-80 rounded-lg shadow-sm border border-gray-100');
            },
            initComplete: function() {
                applyResponsiveStyling();
                setupResponsiveColumns();

                // Add custom CSS for mobile improvements
                if ($('#custom-datatable-css').length === 0) {
                    const customCSS = `
                        @media (max-width: 768px) {
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
                        }
                    `;
                    $('head').append(`<style id="custom-datatable-css">${customCSS}</style>`);
                }
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
                setSelectedUser(data);
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
        if (!selectedUser) return;
        
        router.delete(selectedUser.actions.delete_url, {
            onSuccess: () => {
                toast({ 
                    title: "Berhasil",
                    description: "Pengguna telah berhasil dihapus",
                    variant: "default",
                    className: "bg-green-500 text-white border-none"
                });
                dtRef.current?.ajax.reload();
            },
            onError: () => {
                toast({ 
                    title: "Gagal",
                    description: "Gagal menghapus pengguna. Silakan coba lagi.",
                    variant: "destructive"
                });
            },
        });
        setIsDeleteDialogOpen(false);
        setSelectedUser(null);
    };

    return (
        <div className="w-full bg-white rounded-xl shadow-sm">
            <Card className="border-none shadow-none">
                <CardHeader className="flex flex-col gap-4 p-4 sm:p-6 border-b border-gray-100">
                    <div>
                        <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">Pengguna</CardTitle>
                        <p className="text-sm sm:text-base text-gray-500 mt-1">Kelola pengguna sistem Anda</p>
                    </div>
                    <div className="flex justify-start sm:justify-end w-full">
                        <Button 
                            onClick={() => router.visit(route('admin.users.create'))}
                            className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-sm hover:shadow inline-flex items-center gap-2 w-full sm:w-auto"
                        >
                            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                            <span>Tambah Pengguna</span>
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="rounded-b-xl bg-white w-full overflow-hidden">
                        <div className="overflow-x-auto px-4 sm:px-6 py-4">
                            <Table ref={tableRef} className="w-full text-sm">
                                <TableHeader>
                                    <TableRow className="border-gray-100 bg-gray-50/50">
                                        <TableHead className="w-16 py-3 text-gray-600 font-semibold text-sm">ID</TableHead>
                                        <TableHead className="py-3 text-gray-600 font-semibold text-sm">Nama</TableHead>
                                        <TableHead className="py-3 text-gray-600 font-semibold text-sm hidden md:table-cell">Email</TableHead>
                                        <TableHead className="w-24 py-3 text-gray-600 font-semibold text-sm hidden sm:table-cell">Role</TableHead>
                                        <TableHead className="w-24 py-3 text-gray-600 font-semibold text-sm">Status</TableHead>
                                        <TableHead className="w-24 py-3 text-center text-gray-600 font-semibold text-sm">Aksi</TableHead>
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
                            Hapus Pengguna
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 mt-3">
                            Apakah Anda yakin ingin menghapus pengguna{selectedUser && ` "${selectedUser.name}"`}? 
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
                            Hapus Pengguna
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default UserDataTable;