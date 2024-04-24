import React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { SettingsLayout } from "./layout/settings";
import { Input } from "./ui/input";
import { IPBOD } from "../interfaces";
import { contextData, simplePrepend } from "../utils/shared-utils";
import { StorageKey } from "../consts";
import { toast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";

export default function NewPBOD() {
  const navigate = useNavigate();

  const [PBOD, setPBOD] = React.useState<IPBOD>({
    name: "",
    image: "",
    richText: "",
    timestamp: new Date().toISOString(),
    uuid: contextData().uuid,
  });

  async function addPBOD() {
    if (!PBOD.name || !PBOD.image || !PBOD.richText) {
      toast({
        title: "Error",
        description: "Please fill in all the fields",
        variant: "destructive",
      });
      return;
    }

    await simplePrepend<IPBOD>(StorageKey.SETTINGS_PBODS, {
      ...PBOD,
    });
    toast({
      title: "PBOD Added",
      description: "PBOD has been added successfully",
    });

    navigate("/");
  }

  return (
    <SettingsLayout>
      <Card>
        <CardHeader>
          <CardTitle>Add a new Personal Board Of Director</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
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
        </CardContent>

        <CardFooter className="border-t px-6 py-4">
          <Button onClick={addPBOD}>Save</Button>
        </CardFooter>
      </Card>
    </SettingsLayout>
  );
}
