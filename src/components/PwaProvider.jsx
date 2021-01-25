import React, {useContext, useEffect, useState} from "react"

import {graphql, useStaticQuery} from "gatsby";

const PwaContext = React.createContext({
  installApp: null,
  buildDate: '',
  installable: false
})

let deferredPrompt;

export const PwaProvider = (props) => {
  const data = useStaticQuery(graphql`
    query SidebarQuery {
      site {
        buildTime
      }
    }
  `)
  const [buildDate,] = useState(formatDate(data.site.buildTime));
  const [installable, setInstallable] = useState(false);

  useEffect(() => {
    function beforeinstallprompt(e) {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later.
      deferredPrompt = e;
      setInstallable(true);
      console.log('deferredPrompt saved', e)
    }

    window.addEventListener('beforeinstallprompt', beforeinstallprompt);

    return () => window.removeEventListener( 'beforeinstallprompt', beforeinstallprompt);
  }, [])

  const installApp = () => {
    setInstallable(false);
    // Show the install prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    });
  }

  return (
    <PwaContext.Provider
      value={{ buildDate, installApp, installable }}
    >
      {props.children}
    </PwaContext.Provider>
  )
}

export const usePwaContext = () => {
  const { installable, buildDate, installApp } = useContext(PwaContext)

  return {installable, buildDate, installApp}
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const utcDate = new Date(date.toLocaleString("en-EU", {timeZone: 'UTC'}))
  const day = utcDate.getDate();
  const month = utcDate.getMonth() + 1;
  const year = utcDate.getFullYear();
  let hours = utcDate.getHours()
  let minutes = utcDate.getMinutes();
  let seconds = utcDate.getSeconds()
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  if (seconds < 10) seconds = `0${seconds}`;
  return `${day}:${month < 10 ? "0"+month : month}:${year} ${hours}:${minutes}:${seconds}`
}