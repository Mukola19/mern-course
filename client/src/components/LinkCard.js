import React from "react"

export const LinkCard = ({link}) => {
  return <>
  <h2>Посилання</h2>
  
  <p>Ваше посилання: <a href={link.to} target='_blank' rel='noppener noreferrer'> {link.to}</a></p>
  <p>Звідки: <a href={link.from} target='_blank' rel='noppener noreferrer'> {link.from}</a></p>
  <p>Кількість кліків: <strong>{link.clicks}</strong></p>
  <p>Дата створення: <strong>{new Date(link.data).toLocaleDateString()}</strong></p>
  
  
   </>
}
