import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Profile from "../components/Profile";
import ProfilePassword from "../components/ProfilePassword";

export default function MyPage() {
  return (
    <div id="myPage-box" className="myPage-box">
      <aside id="myPage-aside">
        <Sidebar />
      </aside>
      <section id="myPage-section" className="myPage-section">
        <Router>
          <Switch>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/profile/password">
              <ProfilePassword />
            </Route>
          </Switch>
        </Router>
      </section>
    </div>
  );
}
