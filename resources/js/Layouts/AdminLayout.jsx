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
    Home,
    ChevronDown,
    ChefHat
} from 'lucide-react';

// Import Shadcn UI components
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
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/Components/ui/collapsible";
import { ScrollArea } from "@/Components/ui/scroll-area";

const AdminLayout = ({ children }) => {
    const { auth } = usePage().props;
    const { url } = usePage();

    // Get user initials for avatar fallback
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    // Check if the current route is active
    const isActive = (path) => url.startsWith(path);

    // Sidebar navigation items
    const navItems = [
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

    // Navigation Item Component
    const NavItem = ({ item }) => (
        <Link href={item.href} className="w-full">
            <Button
                variant={isActive(item.href) ? "secondary" : "ghost"}
                className={`w-full justify-start gap-2 p-2 ${isActive(item.href) ? 'font-medium' : ''}`}
            >
                <item.icon size={18} />
                <span>{item.title}</span>
            </Button>
        </Link>
    );

    // User Dropdown Component
    const UserNav = () => (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-9 w-9 rounded-full p-0">
                    <Avatar>
                        <AvatarImage 
                            src={auth.user.avatar || '/default-avatar.png'} 
                            alt={auth.user.name} 
                        />
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                            {getInitials(auth.user.name)}
                        </AvatarFallback>
                    </Avatar>
                    <span className="sr-only">User menu</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{auth.user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{auth.user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href={route('profile.edit')} className="flex w-full items-center">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link
                        href={route('logout')}
                        method="post"
                        as="button"
                        className="flex w-full items-center"
                    >
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Keluar</span>
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );

    // Sidebar Content Component
    const SidebarContent = () => (
        <div className="flex h-full flex-col">
            {/* Logo and brand */}
            <div className="flex h-16 items-center border-b px-4">
                <Link href={route('admin.dashboard')} className="flex items-center gap-2 font-semibold">
                    <ChefHat className="h-6 w-6 text-primary" />
                    <span>Binggo Kitchen</span>
                </Link>
            </div>
            
            {/* Navigation items */}
            <ScrollArea className="flex-1 px-3 py-2">
                <div className="space-y-1">
                    {navItems.map((item) => (
                        <NavItem key={item.href} item={item} />
                    ))}
                </div>
            </ScrollArea>
            
            {/* Footer area without profile info */}
            <div className="border-t p-4">
                <div className="flex items-center justify-center">
                    <div className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} Binggo Kitchen
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr] md:grid-cols-[240px_1fr]">
            {/* Desktop sidebar - hidden on mobile */}
            <div className="hidden border-r bg-background md:block">
                <SidebarContent />
            </div>
            
            {/* Main content area */}
            <div className="flex flex-col">
                {/* Mobile header - hidden on desktop - rearranged for right-positioned avatar */}
                <header className="sticky top-0 z-30 flex h-16 items-center border-b bg-background px-4 md:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="outline" size="icon" className="h-9 w-9">
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="p-0 w-64">
                            <SidebarContent />
                        </SheetContent>
                    </Sheet>
                    
                    <div className="flex items-center gap-2 ml-4">
                        <ChefHat className="h-6 w-6 text-primary" />
                        <span className="font-semibold">Binggo Admin</span>
                    </div>
                    
                    <div className="ml-auto">
                        <UserNav />
                    </div>
                </header>
                
                {/* Desktop header - enhanced and always visible on desktop */}
                <header className="sticky top-0 z-30 hidden md:flex h-16 items-center justify-between border-b bg-background px-8">
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">Binggo Admin</span>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="text-sm text-muted-foreground hidden lg:block">
                            {auth.user.name}
                        </div>
                        <UserNav />
                    </div>
                </header>
                
                {/* Content area with responsive padding */}
                <main className="flex-1">
                    <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
            
            <Toaster />
        </div>
    );
};

export default AdminLayout;