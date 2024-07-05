"use client";

import { ChevronRight, ChevronsLeftRight, X } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, UserProfile, useUser } from "@clerk/clerk-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa";

export const UserItem = () => {
  const { user } = useUser();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <motion.div
            role="button"
            className="flex items-center text-sm p-3 w-full  hover:bg-gray-700 rounded-lg transition-all duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center gap-x-2 max-w-[150px] lg:max-w-full">
              <Avatar className="h-8 w-8 rounded-full ring-2 ring-primary">
                <AvatarImage
                  src={user?.imageUrl}
                  alt={`${user?.fullName}'s avatar`}
                />
              </Avatar>
              <span className="hidden lg:inline text-start font-medium text-gray-100 line-clamp-1">
                {user?.fullName}&apos;s Unite account
              </span>
            </div>
            <ChevronsLeftRight className="hidden lg:inline rotate-90 ml-2 text-gray-400 h-5 w-5" />
          </motion.div>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-80 p-4 bg-[#1f1f1f] rounded-lg shadow-lg transition-transform duration-200 transform origin-top-left"
          align="start"
          alignOffset={10}
          forceMount
        >
          <div className="flex flex-col space-y-4">
            <p className="text-xs font-medium text-gray-400 leading-none">
              {user?.emailAddresses[0].emailAddress}
            </p>
            <div className="flex items-center gap-x-2 p-2 bg-gray-700 rounded-md ">
              <Avatar className="h-12 w-12 rounded-full ring-2 ring-secondary">
                <AvatarImage
                  src={user?.imageUrl}
                  alt={`${user?.fullName}'s avatar`}
                />
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-gray-100 line-clamp-1">
                  {user?.fullName}&apos;s unite account
                </p>
              </div>
            </div>
          </div>
          <DropdownMenuSeparator className="my-2 border-t border-gray-700" />
          <DropdownMenuItem
            className="w-full cursor-pointer text-gray-400 hover:bg-gray-700 rounded-md p-2 transition-colors duration-200"
            asChild
          >
            <motion.div
              className="flex items-center p-3 rounded-lg cursor-pointer hover:bg-white hover:bg-opacity-10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSignOutAlt />
              <AnimatePresence>
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="ml-4"
                >
                  <SignOutButton>Log out</SignOutButton>
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
