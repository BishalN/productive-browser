import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { IPBOD } from "../interfaces";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function DirectorSheet({
  name,
  timestamp,
  uuid,
  image = "https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg",
  richText,
}: IPBOD) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="h-36 w-36 rounded-md p-2 shadow-2xl cursor-pointer  transition-all ease-in  hover:rounded-xl hover:shadow-none">
          <AvatarImage className="rounded-none" src={image} alt={name} />
          <AvatarFallback>{name[0] + name[name.length - 1]}</AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent className="min-w-[500px] sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>Personal Board Of Director {name}'s Details</SheetTitle>
          <SheetDescription>{richText}</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
