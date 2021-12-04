import React, { useContext, useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import { AuthContext } from "../Context/AuthContext"
import { useHttp } from "../HOOKS/http.hook"

export const CreatePage = () => {
  const history = useHistory()  
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [link, setLink] = useState("")

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async (event) => {
    if (event.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          { from: link },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        )
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }

  return (
    <div className='row'>
      <div className='col s8 offset-s2' style={{ paddingTop: '2rem' }}>
        <div className='card-content white-text'>
          <div className='input-field '>
            <input
            placeholder="link"
            id="link"
            type="text"
            name="link"
            className="validate"
            onChange={(e) => setLink(e.target.value)}
            value={link}
            onKeyPress={pressHandler}
            />

            <label htmlFor='link'>Ведіть посилання </label>
          </div>
        </div>
      </div>
    </div>

   
  )
}
