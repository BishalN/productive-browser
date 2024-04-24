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
import { Input } from "./ui/input";
import { ISettingsGoals } from "../interfaces";
import { simpleSet, watch } from "../utils/shared-utils";
import { StorageKey } from "../consts";
import { toast } from "./ui/use-toast";

export default function SettingsGoals() {
  const [settingGoals, setSettingGoals] = React.useState<ISettingsGoals>({
    goalOrQuote: "",
    authorName: "",
    useRandomQuote: false,
  });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    watch(StorageKey.SETTINGS_GOALS_QUOTES, ({ newValue = [] }) => {
      setSettingGoals(newValue);
    });
  }, []);

  async function updateSettingsGoals() {
    if (!settingGoals.useRandomQuote) {
      if (!settingGoals.goalOrQuote) {
        return toast({
          title: "Goal or Quote Required",
          description: "Please enter a goal or a quote.",
          variant: "destructive",
        });
      }

      if (settingGoals.goalOrQuote && !settingGoals.authorName) {
        return toast({
          title: "Author Name Required",
          description: "Please enter the author name.",
          variant: "destructive",
        });
      }

      if (settingGoals.goalOrQuote.length < 10) {
        return toast({
          title: "Goal or Quote Too Short",
          description:
            "Please enter a goal or a quote with at least 10 characters.",
          variant: "destructive",
        });
      }

      if (settingGoals.authorName.length < 3) {
        return toast({
          title: "Author Name Too Short",
          description:
            "Please enter an author name with at least 3 characters.",
          variant: "destructive",
        });
      }
    }

    try {
      setLoading(true);
      await simpleSet(StorageKey.SETTINGS_GOALS_QUOTES, settingGoals);
      setLoading(false);
      // show a toast
      toast({
        title: "Settings Updated",
        description: "Your settings have been updated successfully.",
      });
    } catch (err) {
      setLoading(false);
      toast({
        title: "Error Updating Settings",
        description: "An error occurred while updating your settings.",
        variant: "destructive",
      });
    }
  }

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
          <form className="space-y-2" onSubmit={updateSettingsGoals}>
            <Textarea
              disabled={settingGoals.useRandomQuote || loading}
              value={settingGoals.goalOrQuote}
              placeholder="Enter a Goal or a Quote"
              onChange={(e) =>
                setSettingGoals({
                  ...settingGoals,
                  goalOrQuote: e.target.value,
                })
              }
            />
            <Input
              disabled={settingGoals.useRandomQuote || loading}
              value={settingGoals.authorName}
              onChange={(e) =>
                setSettingGoals({
                  ...settingGoals,
                  authorName: e.target.value,
                })
              }
              placeholder="Author Name"
            />
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={settingGoals.useRandomQuote}
                onCheckedChange={(e) =>
                  setSettingGoals({
                    ...settingGoals,
                    useRandomQuote: !!e.valueOf(),
                  })
                }
                id="include"
              />
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
          <Button disabled={loading} onClick={updateSettingsGoals}>
            Save
          </Button>
        </CardFooter>
      </Card>
    </SettingsLayout>
  );
}
