import React, { useCallback, useContext, useEffect, useState } from "react"
import { graphql, useStaticQuery } from "gatsby"

const PwaContext = React.createContext({
  installApp: null,
  buildDate: "",
  installable: false,
})

export const PwaProvider = props => {
  const data = useStaticQuery(graphql`
    query SidebarQuery {
      site {
        buildTime
      }
    }
  `)
  const [installable, setInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState(null)
  const buildDate = formatDate(data.site.buildTime)

  useEffect(() => {
    function beforeInstallPrompt(e) {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault()
      // Stash the event so it can be triggered later.
      setDeferredPrompt(e)
      setInstallable(true)
      console.log("deferredPrompt saved", e)
    }
    window.addEventListener("beforeinstallprompt", beforeInstallPrompt)

    return () =>
      window.removeEventListener("beforeinstallprompt", beforeInstallPrompt)
  }, [])

  const installApp = useCallback(async () => {
    if (!deferredPrompt) return

    try {
      setInstallable(false)
      // Show the install prompt
      deferredPrompt.prompt()
      // Wait for the user to respond to the prompt
      const choiceResult = await deferredPrompt.userChoice
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt")
      } else {
        console.log("User dismissed the install prompt")
      }
    } catch (e) {
      console.error(e)
    }
  }, [deferredPrompt])

  return (
    <PwaContext.Provider value={{ buildDate, installable, installApp }}>
      {props.children}
    </PwaContext.Provider>
  )
}

export const usePwaContext = () => {
  const { installable, buildDate, installApp } = useContext(PwaContext)

  return { installable, buildDate, installApp }
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const utcDate = new Date(date.toLocaleString("en-EU", { timeZone: "UTC" }))
  const day = utcDate.getDate()
  const month = utcDate.getMonth() + 1
  const year = utcDate.getFullYear()
  let hours = utcDate.getHours()
  let minutes = utcDate.getMinutes()
  if (hours < 10) hours = `0${hours}`
  if (minutes < 10) minutes = `0${minutes}`
  return `${day}.${
    month < 10 ? "0" + month : month
  }.${year} ${hours}:${minutes}`
}
