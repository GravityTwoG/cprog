import React from "react"

import { Smile } from "./Smile"
import { Story } from "./Story"
import { YinAndYang } from "./YinAndYang"
import { Science } from "./Science"

const icons = {
  Smile,
  Story,
  YinAndYang,
  Science,
}

export const Icon = ({ name }) => {
  const TargetIcon = icons[name]

  if (TargetIcon) {
    return <TargetIcon />
  }

  return " Icon "
}
