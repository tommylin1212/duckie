'use client'
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import { useEffect } from "react";

export default function NavbarUser() {
    const { user, isSignedIn, isLoaded } = useUser();

    if (!isLoaded || !isSignedIn) {
        return (
            <div className="flex flex-row dropdown dropdown-end items-center">
                <div className="w-16 btn btn-ghost btn-circle avatar">
                    <a href="/sign-in">Sign In</a>
                </div>
            </div>
        )
    }


    return (
        <div className="flex flex-row dropdown dropdown-end items-center">
            <div>
                {user.username?.toUpperCase()}
            </div>
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-8 rounded-full">
                    <UserButton />
                </div>
            </label>

        </div>
    )
}