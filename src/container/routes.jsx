import { Routes, Route } from "react-router-dom";
import React, { Fragment } from "react";

const PRESERVED = import.meta.globEager("/src/pages/(_app|404).jsx");

const ROUTES = import.meta.globEager("/src/pages/**/[a-z[]*.jsx");

const preserved = Object.keys(PRESERVED).reduce((preserved, file) => {
  const key = file.replace(/\/src\/pages\/|\.jsx$/g, "");
  return { ...preserved, [key]: PRESERVED[file].default };
}, {});

const routes = Object.keys(ROUTES).map((route) => {
  const path = route
    .replace(/\/src\/pages|index|\.jsx$/g, "")
    .replace(/\[\.{3}.+\]/, "*")
    .replace(/\[(.+)\]/, ":$1");

  return { component: ROUTES[route].default, path };
});

export const PagesRoutes = () => {
  const App = preserved?.["_app"] || Fragment;
  const NotFound = preserved?.["404"] || Fragment;

  return (
    <App
      routes={
        <Routes>
          {routes.map(({ component: Component = Fragment, path }) => (
            <Route element={<Component></Component>} path={path} key={path} />
          ))}
          <Route element={<NotFound></NotFound>} path="*" />
        </Routes>
      }
    ></App>
  );
};

function nestRoutes(routes) {
  const sortedPaths = Array.from(routes).sort((a, b) => a.path.split("/").length - b.path.split("/").length);

  const tree = {};

  sortedPaths.forEach((route) => {
    const { component, path } = route;

    let branch = tree;

    let array = path.split("/").filter((string) => string.length > 0);

    if (array.length < 1) array.push("");

    array = array.map((string) => `/${string}`);

    const lastIndex = array.length - 1;

    array.forEach((string, index) => {
      if (!(string in branch)) {
        if (index === lastIndex) {
          branch[string] = {};
        } else {
          branch[string] = { children: {} };
        }
      }

      if (index === lastIndex) branch[string].component = component;

      branch = branch[string].children;
    });
  });

  // ! remember to check out the react page about handling nested state
  return tree;
}

const nestedRoutes = nestRoutes(routes);

function RouteTree({ tree, top }) {
  const { component, children } = tree;
  const childKeys = typeof children === "object" ? Object.keys(children) : [];

  return (
    <li>
      {top} {component ? "(component @ route)" : ""}
      {childKeys.length > 0 && (
        <ol>
          {childKeys.map((top, index) => (
            <RouteTree tree={children[top]} key={index} top={top} />
          ))}
        </ol>
      )}
    </li>
  );
}

export function RoutesVisualization() {
  const childKeys = Object.keys(nestedRoutes);

  return (
    <ul>
      {childKeys.map((top, index) => (
        <RouteTree tree={nestedRoutes[top]} key={index} top={top} />
      ))}
    </ul>
  );
}
