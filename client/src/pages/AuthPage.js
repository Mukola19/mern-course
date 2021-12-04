import React, {useContext, useEffect, useState} from "react"
import { AuthContext } from "../Context/AuthContext"
import {useHttp} from '../HOOKS/http.hook'
import { useMessage } from '../HOOKS/messades.hook'

export const AuthPages = () => {
  const auth = useContext(AuthContext)
  const message  = useMessage()
  const { request, loading, error, clearError } = useHttp()
  const [form, setForm] = useState({})
  

useEffect(() => {
  message(error)
  clearError()
},[error, message, clearError ] )


  
useEffect(() => {
  window.M.updateTextFields()
}, [])



  const onchange = event => {
      setForm({...form, [event.target.name]:event.target.value})
  }

  const redisterHandler = async () => {
    try {
    const data = await request('/api/auth/reqister', 'POST', {...form})
    message(data.messages)
    } catch (e) {}
  }

  const loginHandler = async () => {
    try {
    const data = await request('/api/auth/login', 'POST', {...form})
    auth.login(data.token, data.userId)
    message(data.messages)
    } catch (e) {}
  }


  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Hello</h1>

        <div className="card blue darken-1">
          <div className="card-content white-text">
            <span className="card-title">Авторизація</span>
            <div>
              <div className="input-field ">
                <input
                  placeholder="Email"
                  id="email"
                  type="email"
                  name="email"
                  className="validate"
                  onChange={e =>onchange(e)}
                  value={form.email}
                />

                <label htmlFor="email">Ведіть email </label>
              </div>

              <div className="input-field ">
                <input
                  placeholder="Password"
                  id="password"
                  type="password"
                  name="password"
                  className="validate"
                  onChange={e => onchange(e)}
                  value={form.password}
                />
                <label htmlFor="password">Ведіть пароль</label>
              </div>
            </div>
          </div>
          <div className="card-action">
            <button className="btn yellow darken-1" style={{ marginRight: "10px" }} onClick={loginHandler} disabled={loading}> Війти </button>
            <button className="btn grey lighten-1 black-text" onClick={e =>redisterHandler(e)} disabled={loading}> Реєстрація
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
