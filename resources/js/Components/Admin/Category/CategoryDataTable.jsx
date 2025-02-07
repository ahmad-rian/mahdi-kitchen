import React, { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { 
    AlertDialog, 
    AlertDialogAction, 
    AlertDialogCancel, 
    AlertDialogContent, 
    AlertDialogDescription, 
    AlertDialogFooter, 
    AlertDialogHeader, 
    AlertDialogTitle 
} from "@/Components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { PlusCircle } from 'lucide-react';
import { router } from '@inertiajs/react';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net';

const CategoryDataTable = () => {
    const tableRef = useRef(null);
    const dtRef = useRef(null);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const { toast } = useToast();

    const datatableConfig = {
        processing: true,
        serverSide: true,
        ajax: {
            url: route('admin.categories.data'),
            error: function(xhr, error, thrown) {
                console.error('DataTables error:', error);
                toast({
                    title: "Error",
                    description: "Gagal memuat data kategori",
                    variant: "destructive"
                });
            }
        },
        dom: '<"flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6"<"flex items-center bg-gray-50 rounded-lg px-3 py-2"l><"flex-1 w-full md:w-auto"f>><"overflow-x-auto rounded-xl border border-gray-100"t><"flex flex-col md:flex-row justify-between items-center gap-4 mt-6"ip>',
        language: {
            search: '',
            searchPlaceholder: 'Cari kategori...',
            lengthMenu: '<span class="text-gray-500 text-sm">Data per halaman:</span> _MENU_',
            info: '<span class="text-sm">Menampilkan _START_ - _END_ dari _TOTAL_ data</span>',
            infoEmpty: '<span class="text-sm">Tidak ada data</span>',
            zeroRecords: '<span class="text-sm">Data tidak ditemukan</span>',
            paginate: {
                previous: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>',
                next: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>'
            }
        },
        columns: [
            { 
                data: 'id',
                name: 'id',
                render: (data, type, row, meta) => meta.row + meta.settings._iDisplayStart + 1,
                className: 'text-center font-medium text-gray-900'
            },
            { 
                data: 'name',
                name: 'name',
                className: 'font-medium text-gray-900'
            },
            { 
                data: 'description',
                name: 'description',
                className: 'text-gray-600'
            },
            {
                data: 'actions',
                orderable: false,
                searchable: false,
                className: 'text-center',
                render: function() {
                    return `
                        <div class="flex justify-center gap-2">
                            <button class="edit-btn inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                                <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                                </svg>
                            </button>
                            <button class="delete-btn inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all">
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
        lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Semua"]]
    };

    const handleEdit = (data) => {
        if (data?.actions?.edit_url) {
            router.visit(data.actions.edit_url);
        }
    };

    const handleDelete = (data) => {
        if (data) {
            setSelectedCategory(data);
            setIsDeleteDialogOpen(true);
        }
    };

    const confirmDelete = () => {
        if (!selectedCategory) return;
        
        router.delete(selectedCategory.actions.delete_url, {
            onSuccess: () => {
                toast({ 
                    title: "Berhasil",
                    description: "Kategori telah dihapus",
                    variant: "default",
                    className: "bg-green-500 text-white"
                });
                dtRef.current?.ajax.reload();
            },
            onError: () => {
                toast({ 
                    title: "Gagal",
                    description: "Gagal menghapus kategori",
                    variant: "destructive"
                });
            },
        });
        setIsDeleteDialogOpen(false);
        setSelectedCategory(null);
    };

    useEffect(() => {
        if (!tableRef.current) return;
        
        const dt = $(tableRef.current).DataTable({
            ...datatableConfig,
            responsive: true,
            scrollX: true,
            initComplete: function() {
                // Style search input
                $('.dataTables_filter input')
                    .addClass('w-full md:w-64 px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-colors')
                    .attr('placeholder', 'Cari kategori...');

                // Style length menu
                $('.dataTables_length')
                    .addClass('flex-shrink-0')
                    .find('select')
                    .addClass('ml-2 rounded-lg border-0 bg-transparent focus:ring-0 text-sm text-gray-600');

                // Style pagination
                $('.dataTables_paginate')
                    .addClass('flex justify-center md:justify-end gap-1 mt-4 md:mt-0')
                    .find('.paginate_button')
                    .addClass('px-3 py-1 border border-gray-200 hover:bg-gray-50 rounded-lg text-sm transition-colors');

                $('.paginate_button.current').addClass('bg-blue-50 text-blue-600 border-blue-200');
                
                // Make the table responsive
                $('.dataTable').addClass('w-full text-sm');
                $('.dataTables_wrapper').addClass('font-sans');
                
                // Adjust table for mobile
                $('.dataTable tbody td').addClass('py-3');
            }
        });
        
        
        dtRef.current = dt;

        $(tableRef.current).on('click', '.edit-btn', function() {
            const data = dt.row($(this).closest('tr')).data();
            handleEdit(data);
        });

        $(tableRef.current).on('click', '.delete-btn', function() {
            const data = dt.row($(this).closest('tr')).data();
            handleDelete(data);
        });

        return () => {
            if (dtRef.current) {
                dtRef.current.destroy();
            }
        };
    }, []);

    return (
        <Card className="bg-white shadow-sm rounded-lg">
            <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-6 border-b gap-4">
                <div>
                    <CardTitle className="text-xl font-bold">Kategori Produk</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">Kelola kategori produk Anda</p>
                </div>
                <Button 
                    onClick={() => router.visit(route('admin.categories.create'))}
                    className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white gap-2"
                >
                    <PlusCircle className="w-4 h-4" />
                    Tambah Kategori
                </Button>
            </CardHeader>

            <CardContent className="p-4 md:p-6">
                <div className="overflow-hidden">
                    <Table ref={tableRef}>
                        <TableHeader>
                            <TableRow className="bg-gray-50">
                                <TableHead className="w-16 text-center text-gray-600 font-semibold">NO</TableHead>
                                <TableHead className="text-gray-600 font-semibold">Nama</TableHead>
                                <TableHead className="hidden md:table-cell text-gray-600 font-semibold">Deskripsi</TableHead>
                                <TableHead className="w-20 md:w-24 text-center text-gray-600 font-semibold">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody />
                    </Table>
                </div>
            </CardContent>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Hapus Kategori</AlertDialogTitle>
                        <AlertDialogDescription>
                            Apakah Anda yakin ingin menghapus kategori{selectedCategory && ` "${selectedCategory.name}"`}?
                            <p className="text-sm text-red-500 mt-2">Tindakan ini tidak dapat dibatalkan.</p>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Batal</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">
                            Hapus
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </Card>
    );
};

export default CategoryDataTable;