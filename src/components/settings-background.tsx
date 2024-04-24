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
import { Checkbox } from "./ui/checkbox";
import { SettingsLayout } from "./layout/settings";
import { UnsplashGridGallery } from "./unsplash-grid-gallery";

// Background should be limited and it should have an overlay so that
// the text is readable.
export default function SettingsBackground() {
  return (
    <SettingsLayout>
      <Card>
        <CardHeader>
          <CardTitle>Background</CardTitle>
          <CardDescription>
            Use the background that you want to see every time you open your
            browser.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-2">
            <UnsplashGridGallery />
            <div className="flex items-center space-x-2">
              <Checkbox id="include" />
              <label
                htmlFor="include"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Use default gradiet background
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
