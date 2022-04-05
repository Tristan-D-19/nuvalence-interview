
import axios from 'axios'
async function getContacts(){

   const res = await axios.get('https://randomuser.me/api/?results=200')
   const contacts = res.data.results;

   return contacts
}

export  {
    getContacts
}