import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { 
    LayoutGrid, 
    Package, 
    MessageSquare,
    Menu,
    Users,
    LogOut,
    User,
    Settings,
    ChefHat
} from 'lucide-react';
import { Button } from '@/Components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/Components/ui/sheet";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuLabel,
} from "@/Components/ui/dropdown-menu";
import { Separator } from "@/Components/ui/separator";
import { Toaster } from "@/Components/ui/toaster";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

const AdminLayout = ({ children }) => {
    const { auth } = usePage().props;
    const { url } = usePage();

    const menuItems = [
        {
            title: 'Dasboard',
            href: route('admin.dashboard'),
            icon: LayoutGrid
        },
        {
            title: 'Kategori',
            href: route('admin.categories.index'),
            icon: Package
        },
        {
            title: 'Produk',
            href: route('admin.products.index'),
            icon: Package
        },
        {
            title: 'Ulasan',
            href: route('admin.reviews.index'),
            icon: MessageSquare
        },
        {
            title: 'Pengguna',
            href: route('admin.users.index'),
            icon: Users
        }
    ];

    const isActive = (path) => url.startsWith(path);
    const getInitials = (name) => name.split(' ').map(word => word[0]).join('').toUpperCase();

    const UserNav = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <div className="flex items-center gap-3">
                    <Button variant="ghost" className="relative h-12 w-12 lg:h-14 lg:w-14 rounded-full p-0">
                        <Avatar className="h-12 w-12 lg:h-14 lg:w-14 border-2 border-blue-500">
                            <AvatarImage 
                                src={auth.user.avatar || '/default-avatar.png'} 
                                alt={auth.user.name} 
                            />
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-base lg:text-lg font-bold">
                                {getInitials(auth.user.name)}
                            </AvatarFallback>
                        </Avatar>
                    </Button>
                    <div className="hidden lg:flex flex-col">
                        <span className="text-base font-semibold text-gray-800">{auth.user.name}</span>
                        <span className="text-sm text-gray-500">{auth.user.email}</span>
                    </div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel>
                    <div className="flex items-center space-x-3 p-3">
                        <Avatar className="h-14 w-14 border-2 border-blue-500">
                            <AvatarImage 
                                src={auth.user.avatar || '/default-avatar.png'} 
                                alt={auth.user.name} 
                            />
                            <AvatarFallback className="bg-blue-100 text-blue-600 text-lg font-bold">
                                {getInitials(auth.user.name)}
                            </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <p className="text-base font-semibold text-gray-800">
                                {auth.user.name}
                            </p>
                            <p className="text-sm text-gray-500">
                                {auth.user.email}
                            </p>
                        </div>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2">
                    <DropdownMenuItem asChild>
                        <Link 
                            href={route('profile.edit')} 
                            className="cursor-pointer hover:bg-gray-100 p-3 rounded-lg"
                        >
                            <User className="mr-3 h-6 w-6 text-blue-600" />
                            <span className="text-lg">Pengaturan Profil</span>
                        </Link>
                    </DropdownMenuItem>
                    {/* <DropdownMenuItem asChild>
                        <Link 
                            href={route('profile.edit')} 
                            className="cursor-pointer hover:bg-gray-100 p-3 rounded-lg"
                        >
                            <Settings className="mr-3 h-6 w-6 text-green-600" />
                            <span className="text-lg">Pengaturan Akun</span>
                        </Link>
                    </DropdownMenuItem> */}
                </div>
                <DropdownMenuSeparator />
                <div className="p-2">
                    <DropdownMenuItem asChild>
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="w-full cursor-pointer hover:bg-red-50 p-3 rounded-lg"
                        >
                            <LogOut className="mr-3 h-6 w-6 text-red-600" />
                            <span className="text-lg text-red-600">Keluar</span>
                        </Link>
                    </DropdownMenuItem>
                </div>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    const SidebarContent = () => (
        <div className="h-full flex flex-col">
            <div className="space-y-6 py-6">
                <div className="px-6">
                    <div className="mb-8 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <ChefHat className="h-12 w-12 text-blue-600" />
                            <h2 className="text-3xl font-bold tracking-tight text-gray-800">
                                Dasbor Admin
                            </h2>
                        </div>
                        <div className="lg:hidden">
                            <UserNav />
                        </div>
                    </div>
                    <div className="space-y-3">
                        {menuItems.map((item) => (
                            <Link key={item.href} href={item.href}>
                                <Button
                                    variant={isActive(item.href) ? "secondary" : "ghost"}
                                    className="w-full justify-start text-lg py-6"
                                >
                                    <item.icon className="mr-4 h-6 w-6" />
                                    {item.title}
                                </Button>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
            <Separator />
            <div className="mt-auto p-6">
                <div className="mb-4 hidden lg:block">
                    <UserNav />
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Mobile Header */}
            <div className="lg:hidden border-b bg-white shadow-sm">
                <div className="flex h-20 items-center justify-between px-6">
                    <div className="flex items-center">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="lg:hidden">
                                    <Menu className="h-8 w-8" />
                                    <span className="sr-only">Buka sidebar</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="w-80 p-0">
                                <SidebarContent />
                            </SheetContent>
                        </Sheet>
                        <div className="ml-4 text-2xl font-semibold text-gray-800 flex items-center">
                            <ChefHat className="mr-3 h-8 w-8 text-blue-600" />
                            Dasbor Admin
                        </div>
                    </div>
                    <UserNav />
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="flex">
                {/* Desktop Sidebar */}
                <div className="hidden lg:flex lg:w-80 lg:flex-col lg:fixed lg:inset-y-0">
                    <div className="flex flex-col h-full border-r bg-white shadow-lg">
                        <SidebarContent />
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:pl-80 flex-1">
                    <main className="py-8">
                        <div className="px-6 lg:px-10 max-w-6xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default AdminLayout;