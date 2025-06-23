'use client';
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
    {label:'Home', href:'/'},
    {label:'Teachers', href:'/teachers'},
    {label:'My Journey', href:'/my-journey'},
]

const NavItems = () => {
    const pathname = usePathname();
    
    return (
        <nav className="flex items-center gap-4">
            {navItems.map(({ label, href }) => (
                <Link 
                    href={href} 
                    key={label} 
                    className={cn(
                        pathname === href && 'text-primary font-semibold'
                    )}
                >
                    <p>{label}</p>
                </Link>
            ))}
        </nav>
    )
}

export default NavItems