'use client'
import Link from "next/link";
import NavbarUser from "./navbarUser";
export default function Navbar() {
    
    return (
        <div className="navbar z-50 sticky top-0 bg-base-100">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
            <div className="flex-1">
                <Link href='/' className="btn btn-ghost normal-case text-xl">Duckie</Link>
            </div>
            <div className="flex-1">
                <Link href='/conversations-ai' className="btn btn-ghost normal-case text-xl">Chat</Link>
            </div>
            <div className="flex-none">
                <NavbarUser/>
            </div>
        </div>
    )
}