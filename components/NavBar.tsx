import Link from "next/link"
import Image from "next/image"
import NavItems from "./NavItems"
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

const NavBar = () => {
    return (
        <nav className="navbar sticky top-0 z-50">
            <Link href="/">
                <div className="flex items-center gap-3 cursor-pointer group">
                    <Image 
                        src="/images/logo.svg" 
                        alt="teachLM" 
                        width={46} 
                        height={44}
                        className="transition-transform group-hover:scale-105"
                    />
                    <h1 className="text-3xl font-bold text-gradient">teachLM</h1>
                </div>
            </Link>
            <div className="flex items-center gap-8">
                <NavItems />
                <SignedOut>
                    <SignInButton>
                        <button className="btn-signin">Sign In</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}

export default NavBar