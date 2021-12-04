import React from "react"
import "materialize-css"
import { BrowserRouter } from "react-router-dom"
import { useRoutes } from "./pages/routes"
import { useAuth } from "./HOOKS/auth.hook"
import { AuthContext } from "./Context/AuthContext"
import { Navbar } from "./components/Navbar"
import { Loader } from "./components/Loader"



const App = () => {
  const { login, logout, userId, token, ready } = useAuth()
  const isAuth = !!token

  const routes = useRoutes(isAuth)

  // if(!ready) return <Loader/>

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        userId,
        token,
        isAuth,
      }}
    >
      {isAuth? <Navbar/> : null}
      <div className="container">{routes}</div>
    </AuthContext.Provider>
  )
}

export const ProgectApp = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

