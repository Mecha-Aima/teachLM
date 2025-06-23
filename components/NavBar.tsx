import Link from "next/link"
import Image from "next/image"
import NavItems from "./NavItems"

const NavBar = () => {
    return (
        <nav className="navbar">
            <Link href="/">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image 
                        src="/images/logo.svg" 
                        alt="teachLM" 
                        width={46} 
                        height={44} 
                    />
                    <h1 className="text-2xl font-bold">teachLM</h1>
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                <p>Sign In</p>
            </div>
        </nav>
    )
}

export default NavBar