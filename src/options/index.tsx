import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter, Route, Routes } from "react-router-dom";

import OptionsApp from "../components/options-app";
import SettingsBackground from "../components/settings-background";
import SettingsPBOD from "../components/settings-pbod";
import SettingsGoals from "../components/settings-goals";
import { Toaster } from "../components/ui/toaster";

ReactDOM.createRoot(document.getElementById("app")!).render(
  <HashRouter basename="/">
    <Routes>
      <Route path="/" element={<OptionsApp />} />
      <Route path="/settings/goal" element={<SettingsGoals />} />
      <Route path="/settings/background" element={<SettingsBackground />} />
      <Route path="/settings/pbod" element={<SettingsPBOD />} />
    </Routes>
    <Toaster />
  </HashRouter>
);
