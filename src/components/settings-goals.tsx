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
import { Textarea } from "./ui/textarea";
import { Checkbox } from "./ui/checkbox";
import { SettingsLayout } from "./layout/settings";

export default function SettingsGoals() {
  return (
    <SettingsLayout>
      <Card>
        <CardHeader>
          <CardTitle>Goal Or Quote</CardTitle>
          <CardDescription>
            The goal or quote that you want to see every time you open your
            browser.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-2">
            <Textarea placeholder="Enter a Goal or a Quote" />
            <div className="flex items-center space-x-2">
              <Checkbox id="include" />
              <label
                htmlFor="include"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Use random quote from personal board of directors.
              </label>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save</Button>
        </CardFooter>
      </Card>
    </SettingsLayout>
  );
}
