import { useEffect, useState } from "react";
import { Body } from "./components";
import { Route, Routes, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Bookmarks, Notes, Profile } from "./components/Sidebar";
import Loginpage from "./components/Loginpage";
import Signup from "./components/Signup";
function App() {
  const navigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem("userInfo")) {
      navigate('/');
      return;
    }
    setTimeout(() => {
      navigate('/login');
    }, [10000]);
  }, []);
  return (
    <div className="relative">
          <Routes>
            <Route exact path="/login" element={<Loginpage />}/>
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/bookmarks" element={<Bookmarks />} />
            <Route exact path="/notes" element={<Notes />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route
              exact
              path="/"
              element={<Body key="general" pageSize={6} category="general" />}
            />
            <Route
              exact
              path="/business"
              element={<Body key="business" pageSize={6} category="business" />}
            />
            <Route
              exact
              path="/entertainment"
              element={
                <Body
                  key="entertainment"
                  pageSize={6}
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={<Body key="health" pageSize={6} category="health" />}
            />
            <Route
              exact
              path="/science"
              element={<Body key="science" pageSize={6} category="science" />}
            />
            <Route
              exact
              path="/sports"
              element={<Body key="sports" pageSize={6} category="sports" />}
            />
            <Route
              exact
              path="/technology"
              element={
                <Body key="technology" pageSize={6} category="technology" />
              }
            />
          </Routes>

    </div>
  );
}
App.defaultProps = {
  pageSize: 6,
  category: "general",
};
App.propTypes = {
  pageSize: PropTypes.number,
  category: PropTypes.string,
};

export default App;
