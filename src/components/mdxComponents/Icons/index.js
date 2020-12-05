import React  from  'react'

import { Smile } from './Smile'
import { Story } from './Story'
import { YinAndYang } from './YinAndYang'

const icons = {
  Smile,
  Story,
  YinAndYang
}

export const Icon = ({name}) => {
  const TargetIcon = icons[name]

  if (TargetIcon) {
    return <TargetIcon />
  }

  return ' Icon '
}