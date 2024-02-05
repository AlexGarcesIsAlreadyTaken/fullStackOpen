const Number = ({number, deleteHandle}) => (
  <li>
    {number.name} {number.number} 
    <button onClick={deleteHandle}>delete</button>
  </li>
)

const Persons = ({persons, deleteHandle}) => <ul>
  {persons.map(person => <Number key={person.id} number={person} deleteHandle={() => deleteHandle(person.id)} />)}
</ul>

export default Persons
