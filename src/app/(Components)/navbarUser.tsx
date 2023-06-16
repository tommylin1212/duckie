'use client'
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import { useEffect } from "react";

export default function NavbarUser() {
    const { user, isSignedIn, isLoaded } = useUser();
    useEffect(() => {
    }, [isLoaded]);
    return (
        <>
            {isSignedIn ? <UserButton /> : <SignInButton/>}
        </>
    )
}