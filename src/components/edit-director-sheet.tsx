import React from "react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { IPBOD } from "../interfaces";
import { PencilIcon } from "lucide-react";
import { watch } from "../utils/shared-utils";
import { toast } from "./ui/use-toast";
import { StorageKey } from "../consts";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export function EditDirectorSheet({
  name,
  timestamp,
  uuid,
  image = "https://pbs.twimg.com/profile_images/1780044485541699584/p78MCn3B_400x400.jpg",
  richText,
}: IPBOD) {
  const [PBOD, setPBOD] = React.useState<IPBOD>({
    name,
    image,
    richText,
    timestamp,
    uuid,
  });

  const [settingsPBOD, setSettingsPBOD] = React.useState<IPBOD[]>([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    watch(StorageKey.SETTINGS_PBODS, ({ newValue = [] }) => {
      setSettingsPBOD(newValue);
    });
  }, []);

  async function updatePBOD() {
    if (!PBOD.name || !PBOD.image || !PBOD.richText) {
      toast({
        title: "Error",
        description: "Please fill in all the fields",
        variant: "destructive",
      });
      return;
    }

    const updatedPBODs = settingsPBOD.map((pbod) => {
      if (pbod.uuid === PBOD.uuid) {
        return PBOD;
      }
      return pbod;
    });

    await chrome.storage.local.set({
      [StorageKey.SETTINGS_PBODS]: updatedPBODs,
    });

    toast({
      title: "PBOD updated",
      description: "PBOD has been updated successfully",
    });

    setOpen(false);
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="space-x-2">
          <PencilIcon className="h-4 w-4" />
          <span>Edit</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="min-w-[500px] sm:w-[600px]">
        <SheetHeader>
          <SheetTitle>Edit PBOD {name}'s Details</SheetTitle>
          <div className="space-y-3">
            <Input
              value={PBOD.name}
              onChange={(e) => setPBOD({ ...PBOD, name: e.target.value })}
              placeholder="Name"
            />
            <Input
              value={PBOD.image}
              onChange={(e) => setPBOD({ ...PBOD, image: e.target.value })}
              placeholder="URL of the profile picture"
            />
            <Textarea
              value={PBOD.richText}
              onChange={(e) => setPBOD({ ...PBOD, richText: e.target.value })}
              placeholder="Rich text"
            />

            <Button onClick={updatePBOD}>Update</Button>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
