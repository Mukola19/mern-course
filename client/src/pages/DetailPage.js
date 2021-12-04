import React, { useCallback, useContext, useEffect, useState } from "react"
import { LinkCard } from '../components/LinkCard'
import { useParams } from "react-router"
import { Loader } from "../components/Loader"
import { AuthContext } from "../Context/AuthContext"
import { useHttp } from "../HOOKS/http.hook"

export const DetailPage = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [link, setLink] = useState(null)
  const paramId = useParams().id

  const getLink = useCallback(async () => {
    try {
      const data = await request(`/api/link/${paramId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      })
      setLink(data)
    } catch (e) {}
  }, [token, request, paramId])


  useEffect(()=> {
    getLink()
  }, [getLink])


  if(loading) return <Loader/>

  return <>{!loading && link && <LinkCard link={link}/>} </>

}


