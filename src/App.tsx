import { FC } from 'react'
import { Redirect, Route, Switch } from "wouter"
import LayoutWebsite from 'layouts/Website';

// Pages
import Home from 'pages/Home'
import SignIn from 'pages/SignIn';
import Register from 'pages/Register';
import NotFound from 'pages/NotFound';

const App: FC = () => {

    /**
     * Router
     */
    return (
        <LayoutWebsite>
        <Switch>
            <Route path="/">
                <Home />
            </Route>
            <Route path="/sign-in">
                <SignIn />
            </Route>
            <Route path="/register">
                <Register />
            </Route>
            <Route path="/404">
                <NotFound />
            </Route>
            <Route>
                <Redirect to="/404" />
            </Route>
        </Switch>
        <Home />
        </LayoutWebsite>
    )
}

export default App
