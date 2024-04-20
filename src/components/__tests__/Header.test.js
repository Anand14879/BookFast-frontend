import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Header from "../Header";

// Mock the useNavigate function from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

// Helper function to wrap Header with BrowserRouter
const renderWithRouter = (ui, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(ui, { wrapper: BrowserRouter });
};

describe("Header Component", () => {
  // Set up localStorage mock
  beforeEach(() => {
    jest.spyOn(Storage.prototype, "getItem");
    jest.spyOn(Storage.prototype, "clear");
  });

  afterEach(() => {
    localStorage.clear();
    jest.restoreAllMocks();
  });

  it("renders Header and displays public links when user is not logged in", () => {
    localStorage.getItem.mockReturnValue(null);
    renderWithRouter(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.queryByText("Venues")).not.toBeInTheDocument();
    expect(screen.queryByText("Bookings")).not.toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("renders Header and displays user-specific links when user is logged in", () => {
    const userInfo = { name: "John Doe" };
    localStorage.getItem.mockReturnValue(JSON.stringify(userInfo));
    renderWithRouter(<Header />);
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Venues")).toBeInTheDocument();
    expect(screen.getByText("Bookings")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("About Us")).toBeInTheDocument();
    expect(screen.queryByText("Login")).not.toBeInTheDocument();
    expect(screen.queryByText("Register")).not.toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("logs out the user correctly", () => {
    const userInfo = { name: "John Doe" };
    localStorage.getItem.mockReturnValue(JSON.stringify(userInfo));
    renderWithRouter(<Header />);
    // First, open the dropdown to reveal the logout option
    const dropdownToggle = screen.getByRole("button", { name: /john doe/i });
    fireEvent.click(dropdownToggle);
    // Now that the dropdown is open, we can click the logout link
    const logoutLink = screen.getByText("Logout");
    fireEvent.click(logoutLink);
    // Check if localStorage.clear was called as expected
    expect(localStorage.clear).toHaveBeenCalled();
  });
});
