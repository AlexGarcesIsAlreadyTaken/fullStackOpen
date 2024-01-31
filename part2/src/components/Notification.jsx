const Notification = ({message}) => {
  if (message === null) return null
  return(
  <div className="succesfulOperation">
      {message}
  </div>
  )
}

export default Notification
