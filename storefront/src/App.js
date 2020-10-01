import React, { useState, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./Landing";
import "./App.css";
import { Hero } from "./Hero";

const Contact = React.lazy(() => import("./Contact"));
const About = React.lazy(() => import("./About"));
const Values = React.lazy(() => import("./Values"));
const Privacy = React.lazy(() => import("./Privacy"));
const Terms = React.lazy(() => import("./Terms"));
const Contribute = React.lazy(() => import("./Contribute"));
const Partner = React.lazy(() => import("./Partner"));
const Roadmap = React.lazy(() => import("./Roadmap"));
const Sponsors = React.lazy(() => import("./Sponors"));
const PrivateTutoring = React.lazy(() => import("./PrivateTutoring"));
const Help = React.lazy(() => import("./Help"));
const Team = React.lazy(() => import("./Team"));
const Recreate = React.lazy(() =>
  import("./lessons/deployment-strategies/Recreate")
);
const Lessons = React.lazy(() => import("./Lessons"));

function App() {
  const [isDarkTheme, setTheme] = useState(false);
  const toggleDarkTheme = () => setTheme(!isDarkTheme);
  return (
    <Suspense fallback={() => <Hero />}>
      <Router>
        <Switch>
          <div
            className={`app bg-base ${
              isDarkTheme ? " dark-mode" : ""
            } text-base-700`}
          >
            <Route exact path="/">
              <Landing setTheme={toggleDarkTheme} />
            </Route>
            <Route exact path="/lessons">
              <Lessons setTheme={toggleDarkTheme} />
            </Route>
            <Route
              path="/about"
              render={() => <About setTheme={toggleDarkTheme} />}
            ></Route>
            <Route
              path="/values"
              render={() => <Values setTheme={toggleDarkTheme} />}
            ></Route>
            <Route
              path="/privacy-policy"
              render={() => <Privacy setTheme={toggleDarkTheme} />}
            ></Route>
            <Route
              path="/terms-and-conditions"
              render={() => <Terms setTheme={toggleDarkTheme} />}
            ></Route>
            <Route
              path="/team"
              render={() => <Team setTheme={toggleDarkTheme} />}
            ></Route>
            <Route
              path="/contribute"
              render={() => <Contribute setTheme={toggleDarkTheme} />}
            ></Route>
            <Route
              path="/partner"
              render={() => <Partner setTheme={toggleDarkTheme} />}
            ></Route>
            <Route
              path="/sponsors"
              render={() => <Sponsors setTheme={toggleDarkTheme} />}
            ></Route>
            <Route
              path="/roadmap"
              render={() => <Roadmap setTheme={toggleDarkTheme} />}
            ></Route>
            <Route
              path="/private-tutoring"
              render={() => <PrivateTutoring setTheme={toggleDarkTheme} />}
            ></Route>
            <Route
              path="/help"
              render={() => <Help setTheme={toggleDarkTheme} />}
            ></Route>
            <Route
              path="/contact"
              render={() => <Contact setTheme={toggleDarkTheme} />}
            ></Route>
            <Route
              path="/lessons/deployment-strategies/recreate"
              render={() => <Recreate setTheme={toggleDarkTheme} />}
            ></Route>
          </div>
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
