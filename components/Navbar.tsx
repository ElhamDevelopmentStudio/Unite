import Image from "next/image";
import Link from "next/link";
import React from "react";
import MobileNav from "./MobileNav";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/unity.svg"
          alt="App Logo"
          width={42}
          height={42}
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Unite
        </p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
        <Link href="/about">
          <Button variant="outline" className="text-white">
            Developers
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
