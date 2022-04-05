import {
  ListGroup,
  ListGroupItem,
  Container,
  FormInput,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
} from "shards-react";
import { useState, useEffect } from "react";
import "./ContactList.css";
import ContactDetail from "../ContactDetail/Index";
import editSvg from "../../assets/images/edit_button.svg";



function ContactList(props) {

  const [contacts, setContacts] = useState([]);
  const [hasError, setHasError] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [editMode, setEditMode] = useState(false)
  const [selectedContact, setSelectedContact] = useState(null);
  const [filteredContacts, setFilteredContacts] = useState([])
  const [query, setQuery] = useState('')

  const fetchData = async () => {
    const contactResponse = await fetch(
      "https://randomuser.me/api/?results=200"
    );
    const response = await contactResponse.json();
    const users = response.results.map((item, index) => {
        return {
            firstName: item.name.first,
            lastName: item.name.last,
            phoneNumber: item.phone,
            cell: item.cell, 
            id: index + 1
        }
    });
   return users
  
  };
  const debounce = (func, timeout = 300) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
  
  const save = (contact) => {
      let tempContacts = contacts;
    const index = tempContacts.findIndex(i => i.id === contact.id)
    tempContacts[index] = contact;
    localStorage.setItem('contacts', JSON.stringify(tempContacts))
    setContacts(tempContacts)
    setEditMode(!editMode)
  }

  const contactItems = filteredContacts.length < 1 ? contacts : filteredContacts
  const contactComponents = contactItems.map((item, index) => {
    return (
      <ListGroupItem
        action={true}
        data-testid='contact-item'
        onClick={(e) => {
          setOpenModal(true);
          setSelectedContact(item);
        }}
        key={index}
      >
        {`${item.firstName} ${item.lastName}`}{" "}
      </ListGroupItem>
    );
  })

  const searchContacts  = debounce((searchQuery)=> {
    let filtered = null
    var expr = new RegExp(query, "gi");
    if(searchQuery)
   {  filtered = contacts.filter((contact) => {
    let found = false;
    Object.values(contact).forEach(val => { 
        if(expr.test(val))
            found = true;
    })
    if(found)
        return contact
    } )
    
}
    if( filtered && filtered.length > 0)
    setFilteredContacts(filtered)
    else if(filtered && filtered.length <= 0)
    setHasError(true)
}
    )
  useEffect(() => {
    let isMounted = true;  
      if(!localStorage.getItem(contacts))
   { fetchData().then(res => {
        if(isMounted){
            localStorage.setItem('contacts', JSON.stringify(res))
            setContacts(res);
        }
    });
    }
    else
  {  
    const items = localStorage.getItem('contacts')  
    
    setContacts(JSON.parse(items))

}

    return ()=> {isMounted = false}
  }, []);


  useEffect(()=> {
      if(query)
    searchContacts( query)
    if(!query)
    setHasError(false)
  }, [query])


  return (
    <Container fluid={true}>
             <Row className="mb-4 mt-4">
      <h1 className="text-nowrap ml-auto mr-auto header-text">Address Book</h1>
      </Row>
      <Row className="mb-4 mt-4">
        <FormInput placeholder="Search Contact.." invalid={hasError} className="w-100 ml-5 mr-5" data-testid="search" onChange={(e)=> {
           setQuery(e.target.value)
        }}/>
      </Row>
      <Row fluid="true">
        <ListGroup
          data-testid="contact-list"
          className="w-100 ml-5 mr-5"
          id="contact-list"
        >
          {contactComponents}
        </ListGroup>
      </Row>
      <Modal size="lg" id="contact-modal" open={openModal} toggle={() => setOpenModal(!openModal)} data-testid="contact-modal">
        <ModalHeader>
          <Row className='w-100'>
           <Col  > <h4 className="text-nowrap mr-4">Contact Details</h4></Col>
            <Col className='ml-5 float-right justify-content-end align-items-right edit-icon '>
                <img alt="edit-icon" className="float-right" src={editSvg}  data-testid="edit-button" onClick={()=> {
                setEditMode(!editMode)
            }}/>
            </Col>
          </Row>
        </ModalHeader>
        <ModalBody>
          <ContactDetail contact={selectedContact} editMode={editMode} save={save}/>
        </ModalBody>
      </Modal>
    </Container>
  );
}

export default ContactList;
