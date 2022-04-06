import React, { useState } from "react";
import { Row, Container, Col, Form, FormInput, Button } from "shards-react";

const ContactDetail = ({ contact, editMode, save }) => {
  const [firstName, setFirstName] = useState(contact.firstName);
  const [lastName, setLastName] = useState(contact.lastName);
  const [phoneNumber, setPhoneNumber] = useState(contact.phoneNumber);

  function saveContact(contact) {
    save(contact);
  }
  return (
    <Form>
      <Container>
        <Row className="mb-2">
          <Col className="justify-content-start">
            <label htmlFor="#username" className="text-left float-left">
              First Name
            </label>
          </Col>
          <Col sm="6">
            {!editMode ? (
              <p className="text-left">{firstName}</p>
            ) : (
              <FormInput
                data-testid="contact-details-input"
                size="md"
                id="#first-name"
                placeholder={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
            )}
          </Col>
        </Row>
        <Row className="mb-2">
          <Col className="justify-content-start">
            <label htmlFor="#username" className="text-left float-left">
              Last Name
            </label>
          </Col>
          <Col sm="6">
            {!editMode ? (
              <p className="text-left">{lastName}</p>
            ) : (
              <FormInput
                data-testid="contact-details-input"
                size="md"
                id="#last-name"
                placeholder={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
            )}
          </Col>
        </Row>
        <Row>
          <Col className="justify-content-start">
            <label htmlFor="#phone" className="text-left float-left">
              Phone Number
            </label>
          </Col>
          <Col sm="6">
            <div>
              {!editMode ? (
                <p className="text-left">{phoneNumber}</p>
              ) : (
                <FormInput
                  data-testid="contact-details-input"
                  disabled={!editMode}
                  size="md"
                  id="#phone"
                  placeholder={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
              )}
            </div>
          </Col>
        </Row>
        {editMode && (
          <Row className="mt-4">
            <Col>
              <Button
                theme="info"
                data-testid="save-button"
                onClick={() => {
                  saveContact({
                    firstName,
                    lastName,
                    phoneNumber,
                    id: contact.id,
                  });
                }}
              >
                Save
              </Button>
            </Col>
          </Row>
        )}
      </Container>
    </Form>
  );
};

export default ContactDetail;
