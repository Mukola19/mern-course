import { Redirect, Route, Switch } from "react-router"
import { AuthPages } from "./AuthPage"
import { CreatePage } from "./CreatePage"
import { DetailPage } from "./DetailPage"
import { LinksPages } from "./LinksPage"



export const  useRoutes = isAuth => {
    if (isAuth) {
      return <Switch>
            <Route path='/create' render={() => <CreatePage/>} exact/>
            <Route path='/links'  render={() => <LinksPages/>} exact/>
            <Route path='/detail/:id' render={() => <DetailPage/>}/>
            <Redirect to='/create'/>
        </Switch>
    }
    return <Switch>
    <Route path='/' render={() => <AuthPages/>} exact/>
    <Redirect to='/'/>
    </Switch>
}