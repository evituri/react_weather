import React, { createContext, useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { initialState, reducer } from "./adapters/github";


export const AuthContext = createContext();

const App = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AuthContext.Provider
            value={{
                state,
                dispatch
            }}
        >
            <Router>
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/" component={Home}/>
                </Switch>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;