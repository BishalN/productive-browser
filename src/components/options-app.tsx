import { ArrowRight, CogIcon, PencilIcon, TrashIcon } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { DeleteTodoAlertDialog } from "./delete-todo-alert-dialog";
import { EditTodoDialog } from "./edit-todo-dialog";
import { DirectorSheet } from "./director-sheet";
import { Link } from "react-router-dom";

export default function OptionsApp() {
  return (
    <main className="bg-gradient-to-tr from-gray-900 via-white to-gray-50 h-screen">
      <div className="flex flex-col justify-center items-center my-10">
        <h1 className="bg-gray-300 px-1 rounded-md font-bold">
          Productive Browser
        </h1>
        <blockquote className="text-center">
          <p className="text-3xl font-bold ">
            You're the master of your fate and captain of your soul
          </p>
          <footer className="flex space-x-2 items-center justify-center font-bold text-lg underline">
            <ArrowRight />
            <span>Ernest Henley</span>
          </footer>
        </blockquote>
        <InputWithButton />
        <TodosItem />
        <POBD />
      </div>
      <Button className="absolute bottom-0 left-0">
        <Link to="/settings/goal" className="space-x-2 flex items-center">
          <CogIcon className="h-4 w-4" />
          <span>Settings</span>
        </Link>
      </Button>
    </main>
  );
}

export function InputWithButton() {
  return (
    <div className="mt-10 mb-3 flex w-full max-w-lg items-center space-x-2">
      <Input type="text" placeholder="Add your todos for the day" />
      <Button type="submit">Add</Button>
    </div>
  );
}

export function TodosItem() {
  return (
    <Card className="mb-3 w-full max-w-lg">
      <CardHeader className="flex flex-row justify-between items-baseline">
        <div>
          <CardTitle>Go to grocery</CardTitle>
          <CardDescription>4 minutes ago</CardDescription>
        </div>
        <div className="space-x-2">
          <EditTodoDialog />
          <DeleteTodoAlertDialog />
        </div>
      </CardHeader>
    </Card>
  );
}

export function TodosList() {
  return <div>List of todos here</div>;
}

export function POBD() {
  return (
    <div className="my-10">
      <h1 className="text-2xl font-bold">Your personal board of directors</h1>
      <DirectorItem />
    </div>
  );
}

export function DirectorItem() {
  return <DirectorSheet />;
}