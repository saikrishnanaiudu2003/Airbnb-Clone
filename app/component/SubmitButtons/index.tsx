/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Loader2, Heart } from "lucide-react";
import { Peddana } from "next/font/google";
import Link from "next/link";

export function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button disabled size="lg">
          <Loader2 className="mr-2 w-4 h-4 animate-spin" />
          Please wait
        </Button>
      ) : (
        <Button type="submit" size="lg">
          Next
        </Button>
      )}
    </>
  );
}

export function FavoutiteButton() {
  const { pending } = useFormStatus();
  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          type="submit"
          size="icon"
          className="bg-primary-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          type="submit"
          size="icon"
          className="bg-primary-foreground"
        >
          <Heart />
        </Button>
      )}
    </>
  );
}

export function DeleteFavoutiteButton() {
  const { pending } = useFormStatus();

  return (
    <>
      {pending ? (
        <Button
          variant="outline"
          type="submit"
          size="icon"
          className="bg-primary-foreground"
        >
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
        </Button>
      ) : (
        <Button
          variant="outline"
          type="submit"
          size="icon"
          className="bg-primary-foreground"
        >
          <Heart className="w-4 h-4 text-primary" fill="#E21C49" />
        </Button>
      )}
    </>
  );
}

export function CreateReservation() {
  const { pending } = useFormStatus();

  return(
    <>
    
    {pending ? (
        <Button className="w-full" disabled>
          <Loader2 className="w-4 h-4 animate-spin mr-2"/> Please wait ...
        </Button>
      ) : (
        <Button className="w-full">
          Make a Reservation!
        </Button>
      )}
    </>
  )
}
