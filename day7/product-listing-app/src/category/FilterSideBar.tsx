import React, { useEffect, useState } from 'react'

const url = 'https://api.escuelajs.co/api/v1/categories'

interface ICategory {
    id: number;
    name: string;
    slug: string;
    image: string;
}

interface FilterSideBarProps {
    selectedCategories: number[];
    onCategoryChange: (categoryId: number, checked: boolean) => void;
}

export default function FilterSideBar({ selectedCategories, onCategoryChange }: FilterSideBarProps) {
    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(url);
                if (!res.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCategories();
    }, []);

    return (
        <aside className="w-56 mr-8">
            <h3 className="font-bold text-lg mb-2">Bộ lọc</h3>
            <div className="flex flex-col gap-2">
                {categories?.map((cat) => (
                    <label key={cat.id} className="flex items-center gap-2 cursor-pointer text-gray-700">
                        <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat.id)}
                            onChange={e => onCategoryChange(cat.id, e.target.checked)}
                        />
                        {cat.name}
                    </label>
                ))}
            </div>
        </aside>
    );
}