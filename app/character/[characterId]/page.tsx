import React from 'react'

export default function PageCharacterId( {params}: {params:{characterId:string}} ) {
  return (
    <div>
      pagecharacterId
      <p>{params.characterId}</p>
    </div>
  )
}
