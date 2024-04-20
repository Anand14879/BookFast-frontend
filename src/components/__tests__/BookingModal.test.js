import React from "react";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import BookingModal from "../BookingModal";

// Mock fetch global
global.fetch = jest.fn();

const mockSlotsData = [{ id: "102", date: "2023-05-01" }];

// Helper function to provide required props and render component
const renderModal = (props) => {
  const defaultProps = {
    isOpen: true,
    onClose: jest.fn(),
    facilityId: "1",
    userId: "1",
    userName: "John Doe",
    facilities: [
      {
        id: "1",
        Name: "Facility 1",
        Description: "A great facility",
        Facility_Image: "general.jpg",
      },
    ],
  };
  return render(<BookingModal {...defaultProps} {...props} />, {
    wrapper: BrowserRouter,
  });
};

describe("BookingModal", () => {
  beforeEach(() => {
    fetch.mockClear();
    fetch.mockImplementation((url) => {
      if (url.endsWith("/api/slots/1")) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockSlotsData),
        });
      }
      return Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: "Failed to fetch slots" }),
      });
    });
  });

  it("renders nothing when isOpen is false", async () => {
    const { container } = renderModal({ isOpen: false });
    expect(container).toBeEmptyDOMElement();
  });

  it("fetches slots and displays them when modal is opened", async () => {
    renderModal();
    await screen.findByText("Available Dates");
    expect(screen.getByText("2023-05-01 (Slot ID: 102)")).toBeInTheDocument();
  });

  it("displays an error message if the slots fetch fails", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Failed to fetch slots"))
    );
    renderModal();
    await screen.findByText("No available slots.");
  });

  it("handles slot selection and button clicks for booking operations", async () => {
    renderModal();
    await waitFor(() =>
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "102" },
      })
    );
    expect(screen.getByRole("combobox").value).toBe("102");
    fireEvent.click(screen.getByText("Complete Booking"));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
  });

  it("closes the modal when close button is clicked", async () => {
    const onClose = jest.fn();
    renderModal({ onClose });
    fireEvent.click(screen.getByText("Close"));
    expect(onClose).toHaveBeenCalled();
  });
});
