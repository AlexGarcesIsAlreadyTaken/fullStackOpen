const Phonebook = ({filterName, filterHandler}) => {
  return (
    <>filter shown with <input value={filterName} onChange={filterHandler}/></>
  )
}

export default Phonebook
