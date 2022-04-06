import { rest } from "msw";
import { setupServer } from "msw/node";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import contactsFixture from "./fixture.json";
import { API_BASE_URL } from "../../constants";
import ContactList from "./Index";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
afterEach(cleanup);

const contactsResponse = rest.get(API_BASE_URL, (req, res, ctx) => {
  return res(ctx.json(contactsFixture));
});
const handlers = [contactsResponse];

const server = new setupServer(...handlers);
describe("Contact List", () => {
  test("it should display correct contact", async () => {
    render(<ContactList />);
    const contactItem = await screen.findByText("Lloyd Jensen");
    expect(contactItem).toBeVisible();
  });

  test("it should display 10 contacts", async () => {
    render(<ContactList />);
    const contactItems = await screen.findAllByTestId("contact-item");
    expect(contactItems.length).toBe(10);
  });

  test("Should show contact details", async () => {
    render(<ContactList />);

    const contactItems = await screen.findAllByTestId("contact-item");

    fireEvent(
      contactItems[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    const modal = await screen.getByText("Contact Details");
    expect(modal).toBeVisible();
  });

  test("Should allow editing of the contact details", async () => {
    render(<ContactList />);
    const contactItems = await screen.findAllByTestId("contact-item");
    fireEvent(
      contactItems[0],
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    const editButton = await screen.getByTestId("edit-button");
    expect(editButton).toBeVisible();
    fireEvent(
      editButton,
      new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
      })
    );
    const modal = await screen.getByText("Contact Details");
    expect(modal).toBeVisible();
  });

  test("Should update search field with input value", async () => {
    render(<ContactList />);

    const search = await screen.findByTestId("search");
    expect(search).toBeVisible();
    fireEvent.change(search, { target: { value: "Lloyd" } });
    expect(search.value).toBe("Lloyd");
  });
});
