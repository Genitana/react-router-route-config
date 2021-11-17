# react-router-config learning



#TODO: 替换成 `import { renderRoutes } from "react-router-config";`

## path都为空，它会命中任何的路由，不能放在前面

## exact
exact默认为false，如果为true时，需要和路由相同时才能匹配，但是如果有斜杠也是可以匹配上的。 如果在父路由中加了exact，是不能匹配子路由的,建议在子路由中加exact，

## strict
strict默认为false，如果为true时，路由后面有斜杠而url中没有斜杠，是不匹配的

## 总结：
### 如果没有子路由的情况，建议大家配都加一个exact；如果有子路由，建议在子路由中加exact，父路由不加； 而strict是针对是否有斜杠的，一般可以忽略不配置。
