import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

// Our route config is just an array of logical "routes"
// with `path` and `component` props, ordered the same
// way you'd do inside a `<Switch>`.
const routes = [
  {
    path: "/sandwiches",
    component: Sandwiches
  },
  {
    path: "/tacos",
    component: Tacos,
    routes: [
      {
        path: "/tacos/bus",
        component: Bus
      },
      {
        path: "/tacos/cart",
        component: Cart
      }
    ]
  },
  // {
  //   // 这么写是有问题的，当输入/test的时候，其实匹配的是/tacos这一层，
  //   // 所以不能把 ‘/’作为单独的一层，要把它放在最后面
  //   path: "/", 
  //   exact: true,
  //   component: Test_,
  //   routes: [
  //     {
  //       path: "/test",
  //       exact: true,
  //       component: Test,
  //       routes: [
  //         {
  //           path: "/test/test1",
  //           exact: true,
  //           component: Test1
  //         }
  //       ]
  //     }
  //   ]
  // },
  {
    // 这么写是有问题的，当输入/test的时候，其实匹配的是/tacos这一层，
    // 所以不能把 ‘/’作为单独的一层，要把它放在最后面
    path: "/test_", 
    // exact: true,
    component: Test_,
    routes: [
      /**
       * 如果没有子路由的情况，建议大家配都加一个exact；
       * 如果有子路由，建议在子路由中加exact，父路由不加； 
       * 而strict是针对是否有斜杠的，一般可以忽略不配置。
       */
      {
        path: "/test_/test",
        // exact: true,
        component: Test,
        routes: [
          {
            path: "/test_/test/test1",
            exact: true,
            component: Test1
          }
        ]
      }
    ]
  },
  {
    // 这么写是有问题的，当输入/test的时候，其实匹配的是/tacos这一层，
    // 所以不能把 ‘/’作为单独的一层，要把它放在最后面
    path: "/", 
    exact: true,
    component: Root,
  },
];

export default function RouteConfigExample() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/tacos">Tacos</Link>
          </li>
          <li>
            <Link to="/sandwiches">Sandwiches</Link>
          </li>
        </ul>

        {/* 渲染第一级路由 */}
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>
      </div>
    </Router>
  );
}

// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        // route.routes 就是子路由
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

function Sandwiches() {
  return <h2>Sandwiches</h2>;
}

function Tacos({ routes }) {
  // routes是传下来的子路由，这里就是 /tacos 下面的routes
  console.log('Tacos({ routes })', routes);
  return (
    <div>
      <h2>Tacos</h2>
      <ul>
        <li>
          <Link to="/tacos/bus">Bus</Link>
        </li>
        <li>
          <Link to="/tacos/cart">Cart</Link>
        </li>
      </ul>

      <Switch>
        {routes.map((route, i) => (
          <RouteWithSubRoutes key={i} {...route} />
        ))}
      </Switch>
    </div>
  );
}

function Bus() {
  return <h3>Bus</h3>;
}

function Cart() {
  return <h3>Cart</h3>;
}

function Test_( routesss ) {
  //TODO: 注意，要解构一下
  console.log('Test_(routes)', routesss);
  
  // routes是它的子路由
 const { routes } = routesss;
 
  return (
      <div>
        <h3>Test_</h3>
        {routes && (
        <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>)}
        
      </div>)
}
function Test({routes}) {
  // 注意：要解构一下

  console.log('Test({routes})', routes);
  return (
    <div>
      <h3>Test</h3>
      {routes && <Switch>
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </Switch>}
      
    </div>
  )
}
function Test1() {
  return <h3>Test1</h3>;
}
function Root() {
  return <h3>Root</h3>;
}
