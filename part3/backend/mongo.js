const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('required password')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://alexgarcesgracia:${password}@cluster0.fcd2kw1.mongodb.net/Phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const phoneSchema = mongoose.Schema({
  name: String,
  number: String,
})  
const Phone = mongoose.model("Phone", phoneSchema)

if (process.argv.length === 3) {
  console.log('phonebook:')
  Phone.find({}).then(result => {
    result.forEach(phone => console.log(`${phone.name} ${phone.number}`))
    mongoose.connection.close()
  }) 
} else {
  const name = process.argv[3]
  const number = process.argv[4]
  const phone = new Phone({name: name, number: number})
  
  phone.save().then(result => {
   console.log(`added ${result.name} number ${result.number} to phonebook`)
   mongoose.connection.close()
  })

}
