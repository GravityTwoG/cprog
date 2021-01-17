import {graphql, useStaticQuery} from "gatsby";

export const useNavigationTree = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        navigation
      }
    }
  `)
  return site.navigation.tree
}