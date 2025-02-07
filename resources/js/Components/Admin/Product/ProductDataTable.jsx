import React, { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle 
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus } from 'lucide-react';
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
            dom: '<"flex flex-col md:flex-row items-center justify-between gap-4 mb-6"<"flex items-center space-x-4"<"flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200"l><"relative"f>><"flex items-center gap-2"B>><"overflow-x-auto rounded-xl border border-gray-100"t><"flex flex-col md:flex-row justify-between items-center gap-4 mt-6"ip>',
            language: {
                search: '',
                searchPlaceholder: 'Cari produk...',
                lengthMenu: '<span class="text-gray-500">Data per halaman:</span> _MENU_',
                info: 'Menampilkan _START_ sampai _END_ dari _TOTAL_ data',
                infoEmpty: 'Tidak ada data yang ditampilkan',
                emptyTable: 'Tidak ada data dalam tabel',
                zeroRecords: 'Tidak ditemukan data yang sesuai',
                paginate: {
                    previous: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>',
                    next: '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>'
                }
            },
            columns: [
                { 
                    data: 'id', 
                    name: 'id',
                    width: '50px',
                    className: 'text-gray-600 font-medium py-4',
                    render: function(data, type, row, meta) {
                        return meta.row + meta.settings._iDisplayStart + 1;
                    }
                },
                { 
                    data: 'image_url',
                    name: 'image',
                    orderable: false,
                    searchable: false,
                    width: '100px',
                    className: 'py-4',
                    render: function(data, type, row) {
                        if (!data) {
                            return `<div class="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center mx-auto">
                                <svg class="w-8 h-8 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                                    class="w-16 h-16 object-cover rounded-lg shadow-sm transition-all duration-200 group-hover:shadow-md"
                                    onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\'%3E%3Crect width=\'24\' height=\'24\' fill=\'%23f3f4f6\'/%3E%3C/svg%3E'"
                                />
                                <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-200"></div>
                            </div>
                        </div>`;
                    }
                },
                { 
                    data: 'name', 
                    name: 'name',
                    className: 'font-medium text-gray-900 py-4',
                    render: function(data, type, row) {
                        return `<div>
                            <div class="font-medium text-gray-900">${data}</div>
                            ${row.description ? `<div class="text-sm text-gray-500 truncate max-w-xs mt-0.5">${row.description}</div>` : ''}
                        </div>`;
                    }
                },
                { 
                    data: 'kategori_name', 
                    name: 'kategori.name',
                    width: '140px',
                    className: 'py-4',
                    render: function(data) {
                        return `<span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-blue-500 text-white">
                            ${data}
                        </span>`;
                    }
                },
                { 
                    data: 'formatted_price',
                    name: 'price',
                    width: '120px',
                    className: 'text-right py-4',
                    render: function(data) {
                        return `<span class="font-medium text-gray-900">${data}</span>`;
                    }
                },
                { 
                    data: 'stock',
                    name: 'stock',
                    width: '100px',
                    className: 'text-right py-4',
                    render: function(data) {
                        const colorClass = parseInt(data) <= 10 ? 'bg-red-500' : 'bg-green-500';
                        return `<span class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium ${colorClass} text-white">
                            ${data} units
                        </span>`;
                    }
                },
                { 
                    data: 'is_active',
                    name: 'is_active',
                    width: '100px',
                    className: 'py-4',
                    render: function(data) {
                        const colorClass = data ? 'bg-green-500' : 'bg-red-500';
                        return `<span class="inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium text-white ${colorClass}">
                            ${data ? 'Active' : 'Inactive'}
                        </span>`;
                    }
                },
                {
                    data: 'actions',
                    name: 'actions',
                    orderable: false,
                    searchable: false,
                    width: '120px',
                    className: 'text-center py-4',
                    render: function(data) {
                        return `
                            <div class="flex justify-center gap-2">
                                <button class="edit-btn inline-flex items-center justify-center rounded-lg p-2 text-blue-600 hover:bg-blue-50 transition-all duration-200">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                                    </svg>
                                </button>
                                <button class="delete-btn inline-flex items-center justify-center rounded-lg p-2 text-red-600 hover:bg-red-50 transition-all duration-200">
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
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
            responsive: true,
            initComplete: function() {
                $('.dataTables_filter input').addClass('pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200');
                $('.dataTables_length select').addClass('ml-2 rounded-lg border-0 bg-transparent focus:ring-0 text-gray-600 font-medium');
                $('.dataTables_paginate .paginate_button').addClass('px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200');
                $('.dataTables_paginate .paginate_button.current').addClass('bg-blue-50 text-blue-600 font-medium');
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

        return () => {
            if (dtRef.current) {
                dtRef.current.destroy();
            }
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

    return (
        <div className="bg-white rounded-xl shadow-sm">
            <Card className="border-none shadow-none">
                <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 p-6 border-b border-gray-100">
                    <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">Produk</CardTitle>
                        <p className="text-gray-500 mt-1">Kelola produk sistem Anda</p>
                    </div>
                    <Button 
                        onClick={() => router.visit(route('admin.products.create'))}
                        className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 shadow-sm hover:shadow inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        <span>Tambah Produk</span>
                    </Button>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="rounded-xl bg-white">
                        <Table ref={tableRef} className="w-full">
                            <TableHeader>
                                <TableRow className="border-gray-100 bg-gray-50/50">
                                    <TableHead className="w-20 py-3 text-gray-600 font-semibold">NO</TableHead>
                                    <TableHead className="w-32 py-3 text-center text-gray-600 font-semibold">Gambar</TableHead>
                                    <TableHead className="py-3 text-gray-600 font-semibold">Detail Produk</TableHead>
                                    <TableHead className="w-32 py-3 text-gray-600 font-semibold">Kategori</TableHead>
                                    <TableHead className="w-32 py-3 text-right text-gray-600 font-semibold">Harga</TableHead>
                                    <TableHead className="w-32 py-3 text-right text-gray-600 font-semibold">Stok</TableHead>
                                    <TableHead className="w-32 py-3 text-gray-600 font-semibold">Status</TableHead>
                                    <TableHead className="w-32 py-3 text-center text-gray-600 font-semibold">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {/* DataTables will populate this */}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <AlertDialogContent className="rounded-xl">
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
                    <AlertDialogFooter className="mt-6">
                        <AlertDialogCancel className="rounded-lg font-medium">
                            Batal
                        </AlertDialogCancel>
                        <AlertDialogAction 
                            onClick={confirmDelete}
                            className="bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium ml-3"
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
                                    