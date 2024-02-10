const Number = ({number}) => (<li>{number.name} {number.number}</li>)

const Persons = ({persons}) => <ul>
  {persons.map(person => <Number key={person.id} number={person} />)}
</ul>

export default Persons
