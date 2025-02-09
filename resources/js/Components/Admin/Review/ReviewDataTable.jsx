import React, { useEffect, useRef, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, VerifiedIcon, XCircleIcon, Trash2, Star, StarHalf } from 'lucide-react';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import 'datatables.net';
import { router } from '@inertiajs/react';

const ReviewDataTable = () => {
    const tableRef = useRef(null);
    const dtRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!tableRef.current) return;

        const dt = $(tableRef.current).DataTable({
            processing: true,
            serverSide: true,
            responsive: true,
            ajax: {
                url: route('admin.reviews.data'),
                beforeSend: function() {
                    setIsLoading(true);
                },
                complete: function() {
                    setIsLoading(false);
                },
                error: function(xhr, error, thrown) {
                    console.error('DataTables error:', error);
                    alert('Error loading data. Please refresh the page.');
                }
            },
            dom: '<"flex flex-col md:flex-row items-center justify-between gap-4 mb-6"<"flex items-center space-x-4"<"flex items-center bg-white px-3 py-2 rounded-lg border border-gray-200"l><"relative"f>><"flex items-center gap-2"B>><"overflow-x-auto rounded-xl border border-gray-100"t><"flex flex-col md:flex-row justify-between items-center gap-4 mt-6 bg-white p-4 rounded-lg border border-gray-100"<"text-sm text-gray-700"i><"pagination-container"p>>',
            language: {
                search: '',
                searchPlaceholder: 'Cari ulasan...',
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
                    className: 'text-center font-medium text-gray-900',
                    width: '60px',
                    render: (data, type, row, meta) => meta.row + meta.settings._iDisplayStart + 1
                },
                { 
                    data: 'user_name', 
                    name: 'user.name',
                    className: 'font-medium text-gray-900',
                    render: function(data) {
                        return `<span class="font-medium">${data}</span>`;
                    }
                },
                { 
                    data: 'product_name', 
                    name: 'product.name',
                    className: 'hidden md:table-cell font-medium text-gray-900',
                    render: function(data) {
                        return `<span class="font-medium">${data}</span>`;
                    }
                },
                { 
                    data: 'rating_stars',
                    name: 'rating',
                    className: 'hidden md:table-cell',
                    render: function(data) {
                        return `<span class="text-yellow-400">${data}</span>`;
                    }
                },
                { 
                    data: 'comment',
                    name: 'comment',
                    className: 'hidden md:table-cell',
                    render: function(data) {
                        return `<div class="max-w-md truncate text-gray-600">${data}</div>`;
                    }
                },
                { 
                    data: 'created_at_formatted',
                    name: 'created_at',
                    className: 'hidden md:table-cell',
                    render: function(data) {
                        return `<span class="text-gray-500 text-sm">${data}</span>`;
                    }
                },
                { 
                    data: 'is_verified',
                    name: 'is_verified',
                    className: 'text-center',
                    render: function(data) {
                        return data ? 
                            '<span class="inline-flex items-center rounded-md bg-green-500 px-2.5 py-1 text-xs font-medium text-white">Verified</span>' : 
                            '<span class="inline-flex items-center rounded-md bg-yellow-500 px-2.5 py-1 text-xs font-medium text-white">Pending</span>';
                    }
                },
                {
                    data: 'actions',
                    orderable: false,
                    searchable: false,
                    className: 'text-center',
                    width: '150px',
                    render: function(data, type, row) {
                        return `
                            <div class="flex justify-center gap-2">
                                <button 
                                    class="verify-btn inline-flex items-center justify-center rounded-lg p-2 ${row.is_verified ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'} transition-all duration-200"
                                >
                                    ${row.is_verified ? 
                                        `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>`
                                        : 
                                        `<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                                        </svg>`
                                    }
                                </button>
                                <button 
                                    class="delete-btn inline-flex items-center justify-center rounded-lg p-2 text-red-600 hover:bg-red-50 transition-all duration-200"
                                >
                                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        `;
                    }
                }
            ],
            pageLength: 10,
            lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "Semua"]],
            order: [[0, 'desc']],
            initComplete: function() {
                $('.dataTables_filter input').addClass('pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-200');
                $('.dataTables_length select').addClass('ml-2 rounded-lg border-0 bg-transparent focus:ring-0 text-gray-600 font-medium');
                $('.dataTables_paginate .paginate_button').addClass('px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200');
                $('.dataTables_paginate .paginate_button.current').addClass('bg-blue-50 text-blue-600 font-medium');
            }
        });

        dtRef.current = dt;

        $(tableRef.current).on('click', '.verify-btn', async function(e) {
            e.preventDefault();
            const data = dt.row($(this).closest('tr')).data();
            try {
                await router.post(data.actions.verify_url);
                dt.ajax.reload();
            } catch (error) {
                console.error('Error verifying review:', error);
                alert('Failed to verify review. Please try again.');
            }
        });

        $(tableRef.current).on('click', '.delete-btn', async function(e) {
            e.preventDefault();
            const data = dt.row($(this).closest('tr')).data();
            
            if (confirm('Are you sure you want to delete this review? This action cannot be undone.')) {
                try {
                    await router.delete(data.actions.delete_url);
                    dt.ajax.reload();
                } catch (error) {
                    console.error('Error deleting review:', error);
                    alert('Failed to delete review. Please try again.');
                }
            }
        });

        return () => {
            if (dtRef.current) {
                dtRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="bg-white rounded-xl shadow-sm">
            <Card className="border-none shadow-none">
                <CardHeader className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 p-4 md:p-6 border-b border-gray-100">
                    <div>
                        <CardTitle className="text-2xl font-bold text-gray-900">Ulasan</CardTitle>
                        <p className="text-gray-500 mt-1">Kelola ulasan produk Anda</p>
                    </div>
                </CardHeader>
                <CardContent className="p-4 md:p-6">
                    <div className="rounded-xl bg-white">
                        <Table ref={tableRef} className="w-full">
                            <TableHeader>
                                <TableRow className="border-gray-100 bg-gray-50/50">
                                    <TableHead className="w-20 py-3 text-gray-600 font-semibold">NO</TableHead>
                                    <TableHead className="py-3 text-gray-600 font-semibold">Pengguna</TableHead>
                                    <TableHead className="hidden md:table-cell py-3 text-gray-600 font-semibold">Produk</TableHead>
                                    <TableHead className="hidden md:table-cell py-3 text-gray-600 font-semibold">Rating</TableHead>
                                    <TableHead className="hidden md:table-cell py-3 text-gray-600 font-semibold">Komentar</TableHead>
                                    <TableHead className="hidden md:table-cell py-3 text-gray-600 font-semibold">Tanggal</TableHead>
                                    <TableHead className="py-3 text-center text-gray-600 font-semibold">Status</TableHead>
                                    <TableHead className="w-32 py-3 text-center text-gray-600 font-semibold">Aksi</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody />
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReviewDataTable;