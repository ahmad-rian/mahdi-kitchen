import React, { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Upload } from 'lucide-react';

const ProductForm = ({ product = null, categories = [] }) => {
    const [preview, setPreview] = useState(product?.image_url || '');
    
    const { data, setData, post, put, processing, errors } = useForm({
        kategori_id: product?.kategori_id || '', 
        name: product?.name || '',
        description: product?.description || '',
        price: product?.price || '',
        stock: product?.stock || '',
        image: null,
        is_active: product?.is_active ?? true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (product) {
            put(route('admin.products.update', product.id));
        } else {
            post(route('admin.products.store'));
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData('image', file);
        
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{product ? 'Edit Product' : 'Create Product'}</CardTitle>
                <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
    <Label htmlFor="kategori_id">Category</Label>
    <Select 
        value={data.kategori_id ? data.kategori_id.toString() : ''} 
        onValueChange={value => setData('kategori_id', value)}
    >
        <SelectTrigger>
            <SelectValue placeholder="Select category" />
        </SelectTrigger>
        <SelectContent>
            {categories.map(category => (
                <SelectItem 
                    key={category.id} 
                    value={category.id.toString()}
                >
                    {category.name}
                </SelectItem>
            ))}
        </SelectContent>
    </Select>
    {errors.kategori_id && (
        <p className="text-sm text-red-500">{errors.kategori_id}</p>
    )}
</div>

                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={e => setData('name', e.target.value)}
                                required
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name}</p>
                            )}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={e => setData('description', e.target.value)}
                                rows={4}
                                required
                            />
                            {errors.description && (
                                <p className="text-sm text-red-500">{errors.description}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="price">Price</Label>
                            <Input
                                id="price"
                                type="number"
                                value={data.price}
                                onChange={e => setData('price', e.target.value)}
                                min="0"
                                step="0.01"
                                required
                            />
                            {errors.price && (
                                <p className="text-sm text-red-500">{errors.price}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="stock">Stock</Label>
                            <Input
                                id="stock"
                                type="number"
                                value={data.stock}
                                onChange={e => setData('stock', e.target.value)}
                                min="0"
                                required
                            />
                            {errors.stock && (
                                <p className="text-sm text-red-500">{errors.stock}</p>
                            )}
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="image">Product Image</Label>
                            <div className="flex items-center gap-4">
                                {preview && (
                                    <img 
                                        src={preview} 
                                        alt="Preview" 
                                        className="w-32 h-32 object-cover rounded-lg"
                                    />
                                )}
                                <div className="flex-1">
                                    <label className="cursor-pointer">
                                        <div className="flex items-center justify-center w-full h-32 border-2 border-dashed rounded-lg hover:border-gray-400 transition-colors">
                                            <div className="space-y-1 text-center">
                                                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                                                <div className="text-sm text-gray-600">
                                                    <span className="font-medium text-primary">
                                                        Click to upload
                                                    </span>
                                                    {' '}or drag and drop
                                                </div>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG, GIF up to 2MB
                                                </p>
                                            </div>
                                            <input
                                                type="file"
                                                id="image"
                                                className="hidden"
                                                onChange={handleImageChange}
                                                accept="image/*"
                                            />
                                        </div>
                                    </label>
                                </div>
                            </div>
                            {errors.image && (
                                <p className="text-sm text-red-500">{errors.image}</p>
                            )}
                        </div>

                        <div className="flex items-center space-x-2">
                            <Switch
                                id="is_active"
                                checked={data.is_active}
                                onCheckedChange={checked => setData('is_active', checked)}
                            />
                            <Label htmlFor="is_active">Active</Label>
                            {errors.is_active && (
                                <p className="text-sm text-red-500">{errors.is_active}</p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button type="submit" disabled={processing}>
                            {product ? 'Update' : 'Create'} Product
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default ProductForm;