import React from "react"
import config from "../../../config"
import { useNavigationTree } from "../NavigationProvider"

import { TreeNode } from "./TreeNode"

export const Tree = ({ location }) => {
  const treeData = useNavigationTree()
  return (
    <TreeNode
      className="firstLevel"
      notCollapsedDepth={config.sidebar.notCollapsedDepth || 1}
      location={location}
      {...treeData}
    />
  )
}
