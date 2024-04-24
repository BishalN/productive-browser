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
        <CardContent>Current PBOD's</CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </SettingsLayout>
  );
}
