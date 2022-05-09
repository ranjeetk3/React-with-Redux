import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import configureStore from "./store";
import "./App.css";
import Loader from "./components/Loader";
const Routes = lazy(() => import("./Routes"));

class App extends React.Component {
  componentDidMount() {
    this.loadCssFile();
  }
  loadCssFile = async () => {
    let nightMode = localStorage.getItem("nightMode") || "false";
    nightMode !== "false" && (await import(`./night.css`));
  };
  render() {
    return (
      <Provider store={configureStore()}>
        <Suspense fallback={<Loader active={true} text="Please wait..." />}>
          <Routes />
        </Suspense>
      </Provider>
    );
  }
}

export default App;
