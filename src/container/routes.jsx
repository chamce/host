// src/routes.jsx

import { Routes, Route, Link } from "react-router-dom";
import React, { Fragment } from "react";
import { useState } from "react";

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

const createRouteTree = (routes) => {
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

  return tree;
};

const routeTree = createRouteTree(routes);

const renderRoute = (tree, previousSubPath) => {
  const { component: Component, children } = tree;

  const nodes = Object.keys(children);

  return Component ? (
    <Route
      element={
        <div className="p-3 border border-dark rounded">
          <Component></Component>
        </div>
      }
      path={previousSubPath.substring(1)}
    >
      {nodes.length > 0 ? (
        nodes.map((nextSubPath) => (
          <Fragment key={nextSubPath}>{renderRoute(children[nextSubPath], nextSubPath)}</Fragment>
        ))
      ) : (
        <></>
      )}
    </Route>
  ) : (
    <>
      {nodes.length > 0 &&
        nodes.map((nextSubPath) => (
          <Fragment key={nextSubPath}>{renderRoute(children[nextSubPath], previousSubPath + nextSubPath)}</Fragment>
        ))}
    </>
  );
};

const NestedRoutes = ({ fallbackElement, tree }) => {
  const nodes = Object.keys(tree);

  return (
    <Routes>
      {nodes.map((subPath) => (
        <Fragment key={subPath}>{renderRoute(tree[subPath], subPath)}</Fragment>
      ))}
      <Route element={fallbackElement} path="*"></Route>
    </Routes>
  );
};

const RoutesSubList = ({ branch, root, link }) => {
  const [value, setValue] = useState("");

  const onChange = (event) => setValue(event.target.value);

  const { component, children } = branch;

  const nodes = Object.keys(children);

  const isDynamicSegment = root[1] === ":" || root[1] === "*";

  const newLink = isDynamicSegment ? link.substring(0, link.length - root.length + 1) + value : link;

  return (
    <li>
      <div className="d-flex align-items-center">
        {component ? <Link to={newLink}>{root}</Link> : root}{" "}
        {isDynamicSegment && (
          <input
            className="form-control form-control-sm m-1"
            aria-label="default input example"
            placeholder="Default input"
            onChange={onChange}
            value={value}
            type="text"
          />
        )}
      </div>
      {nodes.length > 0 && (
        <ul>
          {nodes.map((branchRoot) => (
            <RoutesSubList
              branch={children[branchRoot]}
              link={newLink + branchRoot}
              root={branchRoot}
              key={branchRoot}
            ></RoutesSubList>
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
      {nodes.map((branchRoot) => (
        <RoutesSubList branch={tree[branchRoot]} link={branchRoot} root={branchRoot} key={branchRoot}></RoutesSubList>
      ))}
    </ul>
  );
};

export const Pages = () => {
  const App = preserved?.["_app"] || Fragment;

  const NotFound = preserved?.["404"] || Fragment;

  return (
    <App
      routes={
        <NestedRoutes
          fallbackElement={
            <div className="p-3 border border-dark rounded">
              <NotFound></NotFound>
            </div>
          }
          tree={routeTree}
        ></NestedRoutes>
      }
      routesTree={<RoutesList tree={routeTree}></RoutesList>}
    ></App>
  );
};

// TODO need to make sure dynamic input routes are accurate and navigable
// TODO finish remote wrapper
// TODO make routes tree navigable?
// TODO add dynamic go back option?
// TODO do you need to create browser router instead (react router dom api)?

// src/routes.jsx

// import { createRoutesFromElements, createBrowserRouter, RouterProvider, Routes, Route } from "react-router-dom";
// import React, { Fragment } from "react";

// const PRESERVED = import.meta.globEager("/src/pages/(_app|404).jsx");

// const ROUTES = import.meta.globEager("/src/pages/**/[a-z[]*.jsx");

// const preserved = Object.keys(PRESERVED).reduce((preserved, file) => {
//   const key = file.replace(/\/src\/pages\/|\.jsx$/g, "");
//   return { ...preserved, [key]: PRESERVED[file].default };
// }, {});

// const routes = Object.keys(ROUTES).map((route) => {
//   const path = route
//     .replace(/\/src\/pages|index|\.jsx$/g, "")
//     .replace(/\[\.{3}.+\]/, "*")
//     .replace(/\[(.+)\]/, ":$1");

//   return { component: ROUTES[route].default, path };
// });

// const nestRoutes = (routes) => {
//   const sortedPaths = Array.from(routes).sort((a, b) => a.path.split("/").length - b.path.split("/").length);

//   const tree = {};

//   sortedPaths.forEach((route) => {
//     const { component, path } = route;

//     let branch = tree;

//     let array = path.split("/").filter((string) => string.length > 0);

//     if (array.length < 1) array.push("");

//     array = array.map((string) => `/${string}`);

//     const lastIndex = array.length - 1;

//     array.forEach((string, index) => {
//       if (!(string in branch)) branch[string] = { children: {} };

//       if (index === lastIndex) branch[string].component = component;

//       branch = branch[string].children;
//     });
//   });

//   return tree;
// };

// const nestedRoutes = nestRoutes(routes);

// const renderRoute = (tree, previousSubPath) => {
//   const { component: Component, children } = tree;
//   const nodes = Object.keys(children);

//   return Component ? (
//     <Route
//       element={
//         <div className="p-3 border border-dark rounded">
//           <Component></Component>
//         </div>
//       }
//       path={previousSubPath.substring(1)}
//     >
//       {nodes.length > 0 ? (
//         nodes.map((nextSubPath) => (
//           <Fragment key={nextSubPath}>{renderRoute(children[nextSubPath], nextSubPath)}</Fragment>
//         ))
//       ) : (
//         <></>
//       )}
//     </Route>
//   ) : (
//     <>
//       {nodes.length > 0 &&
//         nodes.map((nextSubPath) => (
//           <Fragment key={nextSubPath}>{renderRoute(children[nextSubPath], previousSubPath + nextSubPath)}</Fragment>
//         ))}
//     </>
//   );
// };

// const createRouter = (fallbackElement, tree) => {
//   const nodes = Object.keys(tree);

//   return createBrowserRouter(
//     createRoutesFromElements(
//       <>
//         {nodes.map((subPath) => (
//           <Fragment key={subPath}>{renderRoute(tree[subPath], subPath)}</Fragment>
//         ))}
//         <Route element={fallbackElement} path="*"></Route>
//       </>,
//     ),
//   );
// };

// const App = preserved?.["_app"] || Fragment;

// const NotFound = preserved?.["404"] || Fragment;

// const router = createRouter(
//   <div className="p-3 border border-dark rounded">
//     <NotFound></NotFound>
//   </div>,
//   nestedRoutes,
// );

// export const Router = () => {
//   return (
//     <RouterProvider router={router}>
//       <App></App>
//     </RouterProvider>
//   );
// };
