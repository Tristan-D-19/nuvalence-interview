import ContactDetail from './Index.jsx'
import { render, screen,  fireEvent, cleanup } from '@testing-library/react';

const contact = {firstName: 'Lloyd', lastName: 'Jensen', phoneNumber: '041-650-0931', cell: '081-168-3137'}

describe('Contact Detail', () => {
it('Should render Contact Details correctly', async () => {
 render(<ContactDetail contact={contact}/>);
 const firstName = await screen.findByText("Lloyd")
 const lastName = await screen.findByText("Jensen")
 const phone = await screen.findByText("041-650-0931")
 expect(firstName).toBeVisible();
 expect(lastName).toBeVisible();
 expect(phone).toBeVisible();
 })



it('Should Change field value in the input',async ()=> {
    render(<ContactDetail contact={contact} editMode={true}/>);
    const inputFields = await screen.findAllByTestId('contact-details-input')
    fireEvent.change(inputFields[0], {target: {value: 'Sam'}})
    fireEvent.change(inputFields[1], {target: {value: 'Smith'}})
    fireEvent.change(inputFields[2], {target: {value: '18884556000'}})
    expect(inputFields[0].value).toBe('Sam')
    expect(inputFields[1].value).toBe('Smith')
    expect(inputFields[2].value).toBe('18884556000')
  })


  test('Should save an edited contact', async ()=> {

    const {rerender} = render(<ContactDetail contact={contact} editMode={true} save={jest.fn()}/>);
    const inputFields = await screen.findAllByTestId('contact-details-input')
    fireEvent.change(inputFields[0], {target: {value: 'Sam'}})
    fireEvent.change(inputFields[1], {target: {value: 'Smith'}})
    fireEvent.change(inputFields[2], {target: {value: '18884556000'}})
    expect(inputFields[0].value).toBe('Sam')
    expect(inputFields[1].value).toBe('Smith')
    expect(inputFields[2].value).toBe('18884556000')
    const saveButton = await screen.findByTestId('save-button',)
    fireEvent(saveButton,  new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }))

      rerender(<ContactDetail contact={contact} editMode={false} save={jest.fn()}/>);
      const firstName = await screen.findByText("Sam")
      const lastName = await screen.findByText("Smith")
      const phone = await screen.findByText("18884556000")
      expect(firstName).toBeVisible();
      expect(lastName).toBeVisible();
      expect(phone).toBeVisible();

})
});
  afterEach(cleanup)