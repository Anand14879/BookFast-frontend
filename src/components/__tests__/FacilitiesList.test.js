import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import FacilitiesList from "../FacilitiesList";

// Extending mock data for facilities to ensure pagination
const mockFacilities = [
  {
    id: 1,
    Name: "Facility 1",
    Institution_Name: "Institution 1",
    Description: "Description 1",
    Capacity: "50",
    Category: "Category 1",
    Daily_Cost: "100",
    Facility_Image: "image1.jpg",
  },
  {
    id: 2,
    Name: "Facility 2",
    Institution_Name: "Institution 2",
    Description: "Description 2",
    Capacity: "100",
    Category: "Category 2",
    Daily_Cost: "200",
    Facility_Image: "image2.jpg",
  },
  {
    id: 3,
    Name: "Facility 3",
    Institution_Name: "Institution 3",
    Description: "Description 3",
    Capacity: "150",
    Category: "Category 3",
    Daily_Cost: "300",
    Facility_Image: "image3.jpg",
  },
  {
    id: 4,
    Name: "Facility 4",
    Institution_Name: "Institution 4",
    Description: "Description 4",
    Capacity: "200",
    Category: "Category 4",
    Daily_Cost: "400",
    Facility_Image: "image4.jpg",
  },
];

const handleBookNowClick = jest.fn();

describe("FacilitiesList", () => {
  beforeEach(() => {
    render(
      <FacilitiesList
        facilities={mockFacilities}
        handleBookNowClick={handleBookNowClick}
        HeaderName="Available Facilities"
      />
    );
  });

  it("should handle next and previous page navigation", () => {
    const nextPageButton = screen.getByText("➡");
    const prevPageButton = screen.getByText("⬅");

    // Assuming 3 facilities per page as set in FacilitiesList
    fireEvent.click(nextPageButton);
    expect(screen.queryByText("Facility 1")).not.toBeInTheDocument();
    expect(screen.getByText("Facility 4")).toBeInTheDocument(); // Verify that the next set of facilities are shown

    fireEvent.click(prevPageButton);
    expect(screen.getByText("Facility 1")).toBeInTheDocument(); // Verify returning to the first page shows the first facility
  });

  it("should disable previous button on the first page", () => {
    const prevPageButton = screen.getByText("⬅");
    expect(prevPageButton).toBeDisabled();
  });

  it("should disable next button on the last page", () => {
    // Click next page until you reach the end
    const nextPageButton = screen.getByText("➡");
    while (!nextPageButton.disabled) {
      fireEvent.click(nextPageButton);
    }
    expect(nextPageButton).toBeDisabled();
  });
});
