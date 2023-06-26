"use client";
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import { useEffect } from "react";
import { upsertUser } from "@/Utils/DB/operations";

export default function NavbarUser() {
  const { user, isSignedIn, isLoaded } = useUser();

  useEffect(() => {
    if (isSignedIn) {
      upsertUser(user.id, {
        clerkId: user.id,
        name: user.username,
        email: user.emailAddresses[0].emailAddress,
      });
    }
  }, [isSignedIn, user]);

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="dropdown-end dropdown flex flex-row items-center">
        <div className="btn-ghost btn-circle avatar btn w-16">
          <a href="/sign-in">Sign In</a>
        </div>
      </div>
    );
  }

  return (
    <div className="dropdown-end dropdown flex flex-row items-center">
      <div>{user.username?.toUpperCase()}</div>
      <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
        <div className="w-8 rounded-full">
          <UserButton />
        </div>
      </label>
    </div>
  );
}
