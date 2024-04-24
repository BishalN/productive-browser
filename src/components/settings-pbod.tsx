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

export default function SettingsPBOD() {
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
          {/* {!loading && settingsPBOD && settingsPBOD?.pbods?.length === 0 ? (
            <p>No PBODS</p>
          ) : (
            <div>
              <p className="font-semibold">Current PBODs: </p>
              <ul>
                {settingsPBOD?.pbods?.map((pbod) => (
                  <li key={pbod.name}>{pbod.name}</li>
                ))}
              </ul>
            </div>
          )} */}
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </SettingsLayout>
  );
}
