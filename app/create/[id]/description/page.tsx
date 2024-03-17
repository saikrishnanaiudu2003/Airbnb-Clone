import { createDescrption } from "@/app/actions";
import Counter from "@/app/component/Counter";
import CreationBottomBar from "@/app/component/CreationBottomBar";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Description = ({params}:{params:{id:string}}) => {
  return (
    <>
      <div className="w-3/5 mx-auto">
        <h1 className="text-3xl font-semibold tracking-tight transition-colors">
          Please describe your home as good as you can.
        </h1>
      </div>

      <form action={createDescrption}>
        <input type="hidden" name="homeId" value={params.id} />
        <div className="mx-auto w-3/5 mt-10 flex flex-col gap-y-5 mb-36">
          <div className="flex flex-col gap-y-2">
            <Label>Title</Label>
            <Input name="title" type="text" placeholder="Short and simple ..."/>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Description</Label>
            <Textarea name="description" placeholder="Describe your home..."/>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Price</Label>
            <Input type="number" name="price" placeholder="price per night" min={10} required/>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Image</Label>
            <Input name="image" type="file" required />
          </div>

          <Card>
            <CardHeader className="flex flex-col gap-y-5">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="underline font-medium">Guests</h1>
                        <p className="text-muted-foreground text-sm">How many guests do you want</p>
                    </div>
                    <Counter name="guest"/>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="underline font-medium">Rooms</h1>
                        <p className="text-muted-foreground text-sm">How many rooms do you have?</p>
                    </div>
                    <Counter name="room"/>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h1 className="underline font-medium">Bathrooms</h1>
                        <p className="text-muted-foreground text-sm">How many bathrooms do you have?</p>
                    </div>
                    <Counter name="bathroom"/>
                </div>
            </CardHeader>
          </Card>
        </div>
        <CreationBottomBar/>
      </form>
    </>
  );
};

export default Description;
