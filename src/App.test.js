import { render, screen } from "@testing-library/react";
import App from "./App";
import { shallow } from "enzyme";

describe("MyComponent", () => {
  it('should render correctly in "debug" mode', () => {
    const component = shallow(<App debug />);

    expect(component).toMatchSnapshot();
  });
});
