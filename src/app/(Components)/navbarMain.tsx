"use client";
import Link from "next/link";
import NavbarUser from "./navbarUser";

interface NavbarProps {
  setShowSidebar?: (show: boolean) => void;
  showSidebar?: boolean;
}

export default function Navbar(props: NavbarProps) {
  let { setShowSidebar, showSidebar } = props;

  return (
    <div className="navbar fixed top-0 flex bg-base-100">
      <div className="flex-none">
        <button
          className="btn-ghost btn-square btn"
          onClick={() => setShowSidebar && setShowSidebar(!showSidebar)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-5 w-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
      <div className="flex-1">
        <Link href="/" className="btn-ghost btn text-xl normal-case">
          Duckie
        </Link>
      </div>
      <div className="flex-1">
        <Link
          href="/conversations-ai"
          className="btn-ghost btn text-xl normal-case"
        >
          Chat
        </Link>
      </div>
      <div className="flex-none">
        <NavbarUser />
      </div>
    </div>
  );
}
