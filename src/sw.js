self.addEventListener("installed",(event) => {
  if (event.isUpdate) {
    if (confirm(`New content is available!. Click OK to refresh`)) {
      window.location.reload();
    }
  }
})
