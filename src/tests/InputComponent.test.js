import { render, screen } from "@testing-library/react";
import CustomInput from "../components/InputComponent";

describe("CustomInput", () => {
  it("renders label and input field", () => {
    render(<CustomInput label="Name" name="name" value="" onChange={() => {}} />);
    const labelElement = screen.getByText(/Name/);
    const inputElement = screen.getByRole("textbox");
    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it("renders asterisk if required prop is true", () => {
    render(<CustomInput label="Name" name="name" value="" onChange={() => {}} required />);
    const asteriskElement = screen.getByText("*");
    expect(asteriskElement).toBeInTheDocument();
  });

  it("displays error message if error prop is truthy", () => {
    render(<CustomInput label="Name" name="name" value="" onChange={() => {}} error="Name is required" />);
    const errorElement = screen.getByText(/Name is required/);
    expect(errorElement).toBeInTheDocument();
  });
});