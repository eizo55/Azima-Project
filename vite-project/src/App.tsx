import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cloudinary } from "@cloudinary/url-gen";

import HomePage from "./pages/HomePage";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import GroupPage from "./pages/GroupPage";
import CreateGroup from "./pages/CreateGroup";
import AuthProvider from "./components/AuthProvider";
import CreateEvent from "./pages/CreateEvent";
import Settings from "./pages/Settings";
import EventPage from "./pages/EventPage";
import GroupSettings from "./pages/GroupSettings";
import GroupMembers from "./pages/GroupMembers";
import UserProfile from "./pages/UserProfile";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/CreateGroup" element={<CreateGroup />} />
          <Route path="/GroupPage/:id" element={<GroupPage />} />
          <Route path="/CreateEvent/:id" element={<CreateEvent />} />
          <Route path="/EventPage/:id" element={<EventPage />} />
          <Route path="/Settings" element={<Settings />} />
          <Route path="/GroupSettings/:id" element={<GroupSettings />} />
          <Route path="/GroupMembers/:id" element={<GroupMembers />} />
          <Route path="/UserProfile/:id" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
