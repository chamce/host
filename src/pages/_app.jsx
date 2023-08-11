import { useLocation } from "react-router-dom";

import "../styles/App.css";

const App = ({ routesTree, routes }) => {
  const { pathname } = useLocation();

  return (
    <>
      <h1>Wrapper</h1>
      <div className="vstack gap-3">
        <div className="p-3 border border-primary rounded">
          <h2>App</h2>
          <div className="vstack gap-2">
            <div className="accordion accordion-flush" id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    data-bs-target="#flush-collapseOne"
                    aria-controls="flush-collapseOne"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    type="button"
                  >
                    Accordion Item #1
                  </button>
                </h2>
                <div
                  data-bs-parent="#accordionFlushExample"
                  className="accordion-collapse collapse"
                  id="flush-collapseOne"
                >
                  <div className="accordion-body">
                    Placeholder content for this accordion, which is intended to demonstrate the{" "}
                    <code>.accordion-flush</code> class. This is the first item's accordion body.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    data-bs-target="#flush-collapseTwo"
                    aria-controls="flush-collapseTwo"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    type="button"
                  >
                    Accordion Item #2
                  </button>
                </h2>
                <div
                  data-bs-parent="#accordionFlushExample"
                  className="accordion-collapse collapse"
                  id="flush-collapseTwo"
                >
                  <div className="accordion-body">
                    Placeholder content for this accordion, which is intended to demonstrate the{" "}
                    <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this
                    being filled with some actual content.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    data-bs-target="#flush-collapseThree"
                    aria-controls="flush-collapseThree"
                    data-bs-toggle="collapse"
                    aria-expanded="false"
                    type="button"
                  >
                    Accordion Item #3
                  </button>
                </h2>
                <div
                  data-bs-parent="#accordionFlushExample"
                  className="accordion-collapse collapse"
                  id="flush-collapseThree"
                >
                  <div className="accordion-body">
                    Placeholder content for this accordion, which is intended to demonstrate the{" "}
                    <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting
                    happening here in terms of content, but just filling up the space to make it look, at least at first
                    glance, a bit more representative of how this would look in a real-world application.
                  </div>
                </div>
              </div>
            </div>
            <div className="p-3 border border-warning rounded">
              <h3>
                Current Page <span className="h4 text-break">({pathname})</span>
              </h3>
              {routes}
            </div>
          </div>
        </div>
        <div className="p-3 border border-primary rounded">
          <h2>Routes Tree</h2>
          {routesTree}
        </div>
      </div>
    </>
  );
};

export default App;
