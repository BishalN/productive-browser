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
import { UnsplashGridGallery } from "./unsplash-grid-gallery";

// Background should be limited and it should have an overlay so that
// the text is readable.

// TODO: Maintain the used background image in selection and show it in the component
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
          <UnsplashGridGallery />
        </CardContent>
      </Card>
    </SettingsLayout>
  );
}
