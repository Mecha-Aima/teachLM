'use client';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                  });
                  
                  router.push(newUrl, {scroll: false});
            }
            else {
                if (pathname === '/teachers') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                      });
                      
                      router.push(newUrl, { scroll: false });
                }
            }
        }, 500);
    }, [searchQuery, router, searchParams, pathname]);

    return (
        <div className="relative border border-gray-200 bg-white rounded-xl items-center flex gap-3 px-4 py-3 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 h-12 w-64">
            <Image
                src="/icons/search.svg"
                alt="search"
                width={18}
                height={18}
                className="opacity-60"
            />
            <input 
                type="text"
                placeholder="Search tutors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-base"
                style={{ width: '300px' }}
            />
        </div>
    )
}

export default SearchInput;