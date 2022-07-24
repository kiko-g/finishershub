import React from 'react'
import { RegistryEntry } from '../../@types'

type Props = {
  member: RegistryEntry
}

const MemberCard = ({ member }: Props) => {
  return (
    <div>
      <div>{member.name}</div>
      <div>{member.finishers}</div>
    </div>
  )
}

export default MemberCard
