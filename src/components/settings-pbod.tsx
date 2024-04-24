import React from "react";

import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./ui/card";
import { SettingsLayout } from "./layout/settings";
import { StorageKey } from "../consts";
import { watch } from "../utils/shared-utils";
import { Link } from "react-router-dom";
import { UserIcon } from "lucide-react";
import { IPBOD } from "../interfaces";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { EditDirectorSheet } from "./edit-director-sheet";
import { DeleteDirectorAlertDialog } from "./delete-director-alert-dialog";

dayjs.extend(relativeTime);

export default function SettingsPBOD() {
  const [settingsPBOD, setSettingsPBOD] = React.useState<IPBOD[]>([]);

  React.useEffect(() => {
    watch(StorageKey.SETTINGS_PBODS, ({ newValue = [] }) => {
      setSettingsPBOD(newValue);
    });
  }, []);

  return (
    <SettingsLayout>
      <Card>
        <CardHeader>
          <CardTitle>Personal Board Of Directors</CardTitle>
          <CardDescription>
            Manage your Personal Board Of Directors
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            <Link to="/settings/pbod/new" className="flex items-center">
              <UserIcon className="w-4 h-4 mr-2" />
              <span>Add a PBOD</span>
            </Link>
          </Button>
          {settingsPBOD && settingsPBOD.length === 0 ? (
            <p className="my-3">No PBODS</p>
          ) : (
            <div className="my-3">
              <p className="font-semibold ">Current PBODs: </p>
              <ul>
                {settingsPBOD?.map((pbod) => (
                  <PBODItem key={pbod.uuid} {...pbod} />
                ))}
              </ul>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </SettingsLayout>
  );
}

export function PBODItem({ name, timestamp, image, richText, uuid }: IPBOD) {
  return (
    <Card className="mb-3 w-full max-w-lg">
      <CardHeader className="flex flex-row justify-between items-baseline">
        <div>
          <CardTitle className="text-lg">{name}</CardTitle>
          <CardDescription>
            created {dayjs(timestamp).fromNow()}
          </CardDescription>
        </div>
        <div className="space-x-2">
          <EditDirectorSheet
            name={name}
            timestamp={timestamp}
            uuid={uuid}
            image={image}
            richText={richText}
          />
          <DeleteDirectorAlertDialog uuid={uuid} />
        </div>
      </CardHeader>
    </Card>
  );
}
