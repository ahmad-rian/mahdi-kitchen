import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from "@/Components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { ArrowLeft } from 'lucide-react';

const CategoryForm = ({ category = null }) => {
    const { toast } = useToast();
    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name || '',
        description: category?.description || '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (category) {
            put(route('admin.categories.update', category.id), {
                onSuccess: () => {
                    toast({
                        title: "Success!",
                        description: "Category updated successfully",
                        variant: "success",
                    });
                },
            });
        } else {
            post(route('admin.categories.store'), {
                onSuccess: () => {
                    toast({
                        title: "Success!",
                        description: "Category created successfully",
                        variant: "success",
                    });
                },
            });
        }
    };

    const handleBack = () => {
        window.history.back();
    };

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{category ? 'Edit Category' : 'Create Category'}</CardTitle>
                <Button variant="outline" onClick={handleBack}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={e => setData('name', e.target.value)}
                            placeholder="Enter category name"
                            required
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">{errors.name}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={e => setData('description', e.target.value)}
                            placeholder="Enter category description"
                            rows={4}
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">{errors.description}</p>
                        )}
                    </div>

                    <Button 
                        type="submit" 
                        className="w-full sm:w-auto"
                        disabled={processing}
                    >
                        {processing ? 'Processing...' : (category ? 'Update' : 'Create')} Category
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
};

export default CategoryForm;