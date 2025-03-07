import React, { useState, useEffect } from 'react'
import { GlareCard } from './ui/glare-card'
import { useRouter } from 'next/navigation';

const Category = () => {
    const [categories, setCategories] = useState([])
    const router = useRouter();

    useEffect(() => {
        const fetchCategories = async () => {
            const res = await fetch(`/api/categories`);
            const data = await res.json();
            console.log("response", data);
            setCategories(data);
        }
        fetchCategories();
    }, [])

    return (
        <div className="flex gap-10 flex-wrap justify-center">
            {categories?.map((category) => (
                <div
                    className='cursor-pointer'
                    onClick={() => router.push(`projects/${category.id}`)}
                    key={category.id}>
                    <GlareCard
                        key={category.id}
                        className="flex flex-col items-center justify-center relative">
                        <div className="absolute inset-0">
                            <img
                                className="h-full w-full object-cover"
                                src={category.image}
                                alt={category.name}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                        </div>
                        <h1 className="absolute whitespace-nowrap z-10 bottom-10 left-4 text-2xl font-semibold text-white uppercase tracking-wider bg-gradient-to-r from-white/90 to-white/70 bg-clip-text text-transparent drop-shadow-md">
                            {category.name}
                        </h1>
                    </GlareCard>
                </div>
            ))}
        </div>
    )
}

export default Category