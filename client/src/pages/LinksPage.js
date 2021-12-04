import React, { useCallback, useContext, useEffect, useState } from "react"
import { LinkCard } from "../components/LinkCard"
import { useParams } from "react-router"
import { Loader } from "../components/Loader"
import { AuthContext } from "../Context/AuthContext"
import { useHttp } from "../HOOKS/http.hook"
import { LinksList } from "../components/LinksList"

export const LinksPages = () => {
  const { token } = useContext(AuthContext)
  const { request, loading } = useHttp()
  const [links, setLinks] = useState([])

  const fetchLinks = useCallback(async () => {
    const data = await request("/api/link", "GET", null, {
      Authorization: `Bearer ${token}`,
    })
    setLinks(data)
  }, [request, token])


  useEffect(() => {
      fetchLinks()
  }, [fetchLinks])


  if(loading) return <Loader/>


  return <>{!loading && <LinksList links={links}/>}  </>
}
