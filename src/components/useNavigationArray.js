import {graphql, useStaticQuery} from "gatsby";

export const useNavigationArray = () => {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        navigation
      }
    }
  `)
  return site.navigation.array
}