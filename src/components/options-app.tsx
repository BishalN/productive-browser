import { ArrowRight, CogIcon } from "lucide-react";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { DeleteTodoAlertDialog } from "./delete-todo-alert-dialog";
import { EditTodoDialog } from "./edit-todo-dialog";
import { DirectorSheet } from "./director-sheet";
import { Link, redirect } from "react-router-dom";
import { IPBOD, ISettingsGoals, ITodo } from "../interfaces";
import { contextData, simplePrepend, watch } from "../utils/shared-utils";
import { StorageKey } from "../consts";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export default function OptionsApp() {
  const [settingsGoal, setSettingsGoal] = React.useState<ISettingsGoals>({
    authorName: "",
    goalOrQuote: "",
    useRandomQuote: false,
  });

  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const [todo, setTodo] = React.useState<ITodo>({
    completed: false,
    text: "",
    updatedAt: "",
    timestamp: "",
    uuid: "",
  });

  React.useEffect(() => {
    watch(StorageKey.SETTINGS_GOALS_QUOTES, ({ newValue = [] }) => {
      setSettingsGoal(newValue);
    });

    watch(StorageKey.TODOS, ({ newValue = [] }) => {
      setTodos(newValue);
    });
  }, []);

  async function addTodo() {
    await simplePrepend<ITodo>(StorageKey.TODOS, {
      text: todo.text,
      completed: false,
      updatedAt: "",
      ...contextData(),
    });

    setTodo({
      text: "",
      completed: false,
      timestamp: "",
      updatedAt: "",
      uuid: "",
    });
  }

  const handleLogin = () => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (token) {
        chrome.identity.getProfileUserInfo(
          { accountStatus: chrome.identity.AccountStatus.ANY },
          (info) => {
            console.log(info);
            // may be add this info to local storage even though its not important since\
            // its cached already i.e idempotent
          }
        );
      }
    });
  };

  //TODO: we usually handle all the login redirection to the backend server though
  const handleWebAuthFlow = () => {
    const clientId =
      "987445278418-81himrp5822cib1vtgbn9bk7eqqt93js.apps.googleusercontent.com";
    const extensionRedirectUri = chrome.identity.getRedirectURL();
    const nonce = Math.random().toString(36).substring(2, 15);
    const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    // Define fields for OpenID
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("response_type", "id_token");
    authUrl.searchParams.set("redirect_uri", extensionRedirectUri);

    authUrl.searchParams.set("scope", "openid profile email");
    authUrl.searchParams.set("nonce", nonce);
    authUrl.searchParams.set("prompt", "consent");

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl.href,
        interactive: true,
      },
      (redirectUrl) => {
        if (redirectUrl) {
          // The ID token is in the URL hash
          const urlHash = redirectUrl.split("#")[1];
          const params = new URLSearchParams(urlHash);
          const jwt = params.get("id_token");
          // Parse the JSON Web Token
          const base64Url = jwt.split(".")[1];
          const base64 = base64Url.replace("-", "+").replace("_", "/");
          const token = JSON.parse(atob(base64));
          console.log(token);
        }
      }
    );
  };

  const handleGithubAuthFlow = () => {
    const clientId = "Iv1.c939a2b5fd4967ad";
    const extensionRedirectUri = chrome.identity.getRedirectURL();
    const authUrl = new URL("https://github.com/login/oauth/authorize");
    authUrl.searchParams.set("client_id", clientId);
    authUrl.searchParams.set("redirect_uri", extensionRedirectUri);

    chrome.identity.launchWebAuthFlow(
      {
        url: authUrl.href,
        interactive: true,
      },
      async (redirectUrl) => {
        if (redirectUrl) {
          const queryString = new URL(redirectUrl).search;
          const params = new URLSearchParams(queryString);
          const code = params.get("code");
          const authUrl = new URL(
            "https://github.com/login/oauth/access_token"
          );
          authUrl.searchParams.append("client_id", clientId);
          authUrl.searchParams.append("redirect_uri", extensionRedirectUri);
          authUrl.searchParams.append(
            "client_secret",
            "your_client_secret_here"
          );
          authUrl.searchParams.append("code", code);
          const response = await fetch(authUrl, {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
          });
          const accessTokenData = await response.json();
          const r = await fetch("https://api.github.com/user", {
            headers: {
              Authorization: "Bearer " + accessTokenData.access_token,
            },
          });
          console.log(await r.json());
        }
      }
    );
  };
  return (
    <main className="bg-gradient-to-tr from-gray-900 via-white to-gray-50 h-screen">
      <div className="flex flex-col justify-center items-center my-10">
        <Button onClick={handleWebAuthFlow} className="my-3">
          Login with google
        </Button>
        <Button onClick={handleGithubAuthFlow} className="my-3">
          Login with github
        </Button>
        <h1 className="bg-gray-300 px-1 rounded-md font-bold">
          Productive Browser
        </h1>
        <blockquote className="text-center">
          <p className="text-3xl font-bold ">{settingsGoal.goalOrQuote}</p>
          <footer className="flex space-x-2 items-center justify-center font-bold text-lg underline">
            <ArrowRight />
            <span>{settingsGoal.authorName}</span>
          </footer>
        </blockquote>
        <div className="mt-10 mb-3 flex w-full max-w-lg items-center space-x-2">
          <Input
            value={todo.text}
            onChange={(e) => setTodo({ ...todo, text: e.target.value })}
            type="text"
            placeholder="Add your todos for the day"
          />
          <Button onClick={addTodo} type="submit">
            Add
          </Button>
        </div>
        {todos &&
          todos.length > 0 &&
          todos.map((todo) => <TodosItem key={todo.uuid} {...todo} />)}
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

export function TodosItem({
  completed,
  text,
  timestamp,
  updatedAt,
  uuid,
}: ITodo) {
  return (
    <Card className="mb-3 w-full max-w-lg">
      <CardHeader className="flex flex-row justify-between items-baseline">
        <div>
          <CardTitle>{text}</CardTitle>
          <CardDescription>
            created {dayjs(timestamp).fromNow()}
          </CardDescription>
          <p
            className={`${
              completed ? "bg-green-300" : "bg-red-300"
            } inline px-1 rounded-md font-bold`}
          >
            {completed ? "complete" : "not complete"}
          </p>
        </div>
        <div className="space-x-2">
          <EditTodoDialog
            completed={completed}
            text={text}
            timestamp={timestamp}
            updatedAt={updatedAt}
            uuid={uuid}
          />
          <DeleteTodoAlertDialog uuid={uuid} />
        </div>
      </CardHeader>
    </Card>
  );
}

export function TodosList() {
  return <div>List of todos here</div>;
}

export function POBD() {
  const [settingsPBOD, setSettingsPBOD] = React.useState<IPBOD[]>([]);
  React.useEffect(() => {
    watch(StorageKey.SETTINGS_PBODS, ({ newValue = [] }) => {
      setSettingsPBOD(newValue);
    });
  }, []);
  return (
    <div className="my-10 space-y-3">
      <h1 className="text-2xl font-bold">Your personal board of directors</h1>
      <div className="grid grid-cols-3 gap-4">
        {settingsPBOD &&
          settingsPBOD.length > 0 &&
          settingsPBOD.map((pbod) => (
            <DirectorSheet key={pbod.uuid} {...pbod} />
          ))}
      </div>
    </div>
  );
}
