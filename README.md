# react-router-config learning


## path都为空，它会命中任何的路由，不能放在前面
```js
  {
    // 没有path，且还放在最前面，它会匹配中任何路由
    exact: true,
    component: Empty,
  },
```
## 嵌套路由，不要把“/”放最前面
因为当访问/test，它会去匹配第一层，而不是匹配“/”；如果要默认匹配“/”，应该把“/”放在第一层且把它放在路由最后
```js
  {
    // 这么写是有问题的，当输入/test的时候，其实匹配的是/tacos这一层，
    // 所以不能把 ‘/’作为单独的一层，要把它放在最后面
    path: "/", 
    exact: true,
    component: Test_,
    routes: [
      {
        path: "/test",
        exact: true,
        component: Test,
        routes: [
          {
            path: "/test/test1",
            exact: true,
            component: Test1
          }
        ]
      }
    ]
  },
  {
    path: "/tacos",
    component: Tacos,
  },
```
## exact
exact默认为false，如果为true时，需要和路由相同时才能匹配，但是如果有斜杠也是可以匹配上的。 如果在父路由中加了exact，是不能匹配子路由的,建议在子路由中加exact，

## strict
strict默认为false，如果为true时，路由后面有斜杠而url中没有斜杠，是不匹配的

## 总结：
**如果没有子路由的情况，建议大家配都加一个exact；<br>
如果有子路由，建议在子路由中加exact，父路由不加；<br>
而strict是针对是否有斜杠的，一般可以忽略不配置。**

## renderRoutes
```jsx
import { renderRoutes } from "react-router-config";
```
renderRoutes是`react-router-config`里的一个方法，可以帮助渲染routes的路由，它的源代码是这样，其实就是用routes.map去生成`<Route>`的列表。
[源码地址](https://github.com/remix-run/react-router/blob/v5/packages/react-router-config/modules/renderRoutes.js)
```jsx
import React from "react";
import { Switch, Route } from "react-router";

function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={props =>
            route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : (
                {/* 最主要的是这个 */}
              <route.component {...props} {...extraProps} route={route} />
            )
          }
        />
      ))}
    </Switch>
  ) : null;
}

export default renderRoutes;
```