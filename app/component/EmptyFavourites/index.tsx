import { File } from "lucide-react";

const EmptyFavourites = () => {
  return (
    <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50 mt-10 h-[400px]">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <File className="h-10 w-10 text-primary" />
      </div>
      <h1 className="mt-6 text-xl font-semibold">
        Sorry no favourites founded...
      </h1>
      <p className="text-sm mt-2 text-center leading-6 text-muted-foreground">
        Please add your favorite....
      </p>
    </div>
  );
};

export default EmptyFavourites;
