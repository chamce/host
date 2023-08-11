import { Routes, Route } from "react-router-dom";
import React, { Fragment } from "react";

const nestRoutes = (routes) => {
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
      if (!(string in branch)) branch[string] = { children: {} };

      if (index === lastIndex) branch[string].component = component;

      branch = branch[string].children;
    });
  });

  // ! remember to check out the react page about handling nested state
  return tree;
};

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

const nestedRoutes = nestRoutes(routes);

const NestedRoutes = ({ fallbackElement, tree }) => {
  const nodes = Object.keys(tree);

  return (
    <Routes>
      {nodes.map((nextPath) => (
        <Fragment key={nextPath}>{renderRoutesNode(tree[nextPath], nextPath)}</Fragment>
      ))}
      <Route element={fallbackElement} path="*"></Route>
    </Routes>
  );
};

const renderRoutesNode = (tree, currentPath) => {
  const { component: Component, children } = tree;
  const nodes = Object.keys(children);

  return Component ? (
    <Route element={<Component></Component>} path={currentPath.substring(1)} key={currentPath}>
      {nodes.length > 0 ? (
        nodes.map((nextPath) => <Fragment key={nextPath}>{renderRoutesNode(children[nextPath], nextPath)}</Fragment>)
      ) : (
        <></>
      )}
    </Route>
  ) : (
    <>
      {nodes.length > 0 &&
        nodes.map((nextPath) => (
          <Fragment key={nextPath}>{renderRoutesNode(children[nextPath], currentPath + nextPath)}</Fragment>
        ))}
    </>
  );
};

const RoutesSubList = ({ branch, root }) => {
  const { component, children } = branch;
  const nodes = Object.keys(children);

  return (
    <li>
      {root} {component ? "(contains page)" : ""}
      {nodes.length > 0 && (
        <ul>
          {nodes.map((branchRoot, index) => (
            <RoutesSubList branch={children[branchRoot]} root={branchRoot} key={index} />
          ))}
        </ul>
      )}
    </li>
  );
};

const RoutesList = ({ tree }) => {
  const nodes = Object.keys(tree);

  return (
    <ul className="m-0">
      {nodes.map((branchRoot, index) => (
        <RoutesSubList branch={tree[branchRoot]} root={branchRoot} key={index} />
      ))}
    </ul>
  );
};

const AppRoutes = ({ fallbackElement, routes }) => {
  return (
    <Routes>
      {routes.map(({ component: Component = Fragment, path }) => (
        <Route element={<Component></Component>} path={path} key={path}></Route>
      ))}
      <Route element={fallbackElement} path="*"></Route>
    </Routes>
  );
};

export const Pages = () => {
  const App = preserved?.["_app"] || Fragment;
  const NotFound = preserved?.["404"] || Fragment;

  return (
    <App
      routes={<NestedRoutes fallbackElement={<NotFound></NotFound>} tree={nestedRoutes} />}
      routesList={<RoutesList tree={nestedRoutes} />}
    ></App>
  );
};

/*
TODO clean up routes code
TODO routes tree/list could instead be a dynamic nav list 
TODO - dynamic routes should have text boxes (with limited character options) allowing the user to specify where to navigate
TODO - also think about dynamic navigation between nested paths using relative paths and react router dom's "navigate"
*/
