import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import { TrashIcon } from "lucide-react";
import { IPBOD } from "../interfaces";
import { watch } from "../utils/shared-utils";
import { StorageKey } from "../consts";

export function DeleteDirectorAlertDialog({ uuid }: { uuid: string }) {
  const [directors, setDirectors] = React.useState<IPBOD[]>([]);
  React.useEffect(() => {
    watch(StorageKey.SETTINGS_PBODS, ({ newValue = [] }) => {
      setDirectors(newValue);
    });
  }, []);

  async function deleteDirector() {
    const updatedDirectors = directors.filter((t) => t.uuid !== uuid);
    await chrome.storage.local.set({
      [StorageKey.SETTINGS_PBODS]: updatedDirectors,
    });
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" className="space-x-2">
          <TrashIcon className="h-4 w-4" />
          <span>Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteDirector}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
