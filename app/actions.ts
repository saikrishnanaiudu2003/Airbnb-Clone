"use server";

import { redirect } from "next/navigation";
import prisma from "./lib/db";
import supabase from "./lib/superbase";
import { revalidatePath } from "next/cache";

export async function AirbnbHome({ userId }: { userId: string }) {
  const data = await prisma.home.findFirst({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAT: "desc",
    },
  });

  if (data === null) {
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  } else if (!data.addCategory && !data.addDescription && !data.addLocation) {
    return redirect(`/create/${data.id}/structure`);
  } else if (data.addCategory && !data.addDescription) {
    return redirect(`/create/${data.id}/description`);
  } else if (data.addCategory && data.addDescription && !data.addLocation) {
    return redirect(`/create/${data.id}/adress`);
  } else if(data.addCategory && data.addDescription && data.addLocation){
    const data = await prisma.home.create({
      data: {
        userId: userId,
      },
    });

    return redirect(`/create/${data.id}/structure`);
  }
}

export async function createCategoryPage(formData: FormData) {
  const categoryName = formData.get("categoryName") as string;
  const homeId = formData.get("homeId") as string;

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      categoryName: categoryName,
      addCategory: true,
    },
  });

  return redirect(`/create/${homeId}/description`);
}

export async function createDescrption(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = formData.get("price");
  const imageFile = formData.get("image") as File;

  const guestNumber = formData.get("guest") as string;
  const roomNumber = formData.get("room") as string;
  const bathroomNumber = formData.get("bathroom") as string;
  const homeId = formData.get("homeId") as string;

  const { data: imageData } = await supabase.storage
    .from("images")
    .upload(`${imageFile.name}-${new Date()}`, imageFile, {
      cacheControl: "2592000",
      contentType: "image/PNG",
    });

  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      title: title,
      description: description,
      price: Number(price),
      bedrooms: roomNumber,
      bathrooms: bathroomNumber,
      guests: guestNumber,
      addDescription: true,
        photo:imageData?.path
    },
  });
  return redirect(`/create/${homeId}/adress`);
}

export async function createLocation(formData: FormData) {
  const homeId = formData.get("homeId") as string;
  const countryValue = formData.get("countryValue") as string;
  const data = await prisma.home.update({
    where: {
      id: homeId,
    },
    data: {
      addLocation: true,
      country: countryValue,
    },
  });

  return redirect("/");
}

export async function addtoFavouriteItems (formData:FormData){
  const homeId=formData.get("homeId") as string
  const userId=formData.get("userId") as string
  const pathName = formData.get("pathName") as string

  const data = await prisma.favourite.create({
    data:{
      homeId:homeId,
      userId:userId
    }
  })

  revalidatePath(pathName);
}

export async function DeleteFromFavorite(formData: FormData) {
  const favoriteId = formData.get("favoriteId") as string;
  const pathName = formData.get("pathName") as string;
  const userId = formData.get("userId") as string;

  const data = await prisma.favourite.delete({
    where: {
      id: favoriteId,
      userId: userId,
    },
  });

  revalidatePath(pathName);
}

export async function selectReservation (formData:FormData){
  const userId = formData.get("userId") as string
  const homeId = formData.get("homeId") as string
  const startDate = formData.get("startDate") as string
  const endDate = formData.get("endDate") as string

  const data = await prisma.reservation.create({
    data:{
      userId:userId,
      endDate:endDate,
      startDate:startDate,
      homeId:homeId
    }
  });
  return redirect("/")
}