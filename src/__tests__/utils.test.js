import { describe, expect, it } from "vitest";
import {
  filterItemsByTerm,
  getLastName,
  merge2ArraysIntoAnArrayOfObjects,
} from "../utils";

describe("getLastName", () => {
  it("returns the last name from a full name", () => {
    // Arrange
    const fullName = "John Doe";
    const expected = "Doe";

    // Act
    const result = getLastName(fullName);

    // Assert
    expect(result).toBe(expected);
  });

  it("returns the last name from a full name with extra spaces", () => {
    // Arrange
    const fullName = "John    Doe";
    const expected = "Doe";

    // Act
    const result = getLastName(fullName);

    // Assert
    expect(result).toBe(expected);
  });

  it("returns the last name from a full name with extra spaces at the beginning", () => {
    // Arrange
    const fullName = "   John Doe";
    const expected = "Doe";

    // Act
    const result = getLastName(fullName);

    // Assert
    expect(result).toBe(expected);
  });

  it("returns the last name from a full name with extra spaces at the end", () => {
    // Arrange
    const fullName = "John Doe   ";
    const expected = "Doe";

    // Act
    const result = getLastName(fullName);

    // Assert
    expect(result).toBe(expected);
  });

  it("returns the last name from a multi-word full name", () => {
    // Arrange
    const fullName = "John Michael Doe";
    const expected = "Doe";

    // Act
    const result = getLastName(fullName);

    // Assert
    expect(result).toBe(expected);
  });

  it("returns the last name from a full name with special characters", () => {
    // Arrange
    const fullName = "Starsky & Hutch";
    const expected = "Hutch";

    // Act
    const result = getLastName(fullName);

    // Assert
    expect(result).toBe(expected);
  });
});

it("merges 2️⃣ arrays into a an array of objects", () => {
  // Arrange
  const a1 = ["title1", "title2", "title3"];
  const a2 = ["champion1", "champion2", "champion3"];
  const key1 = "title";
  const key2 = "champion";

  const expected = [
    { title: "title1", champion: "champion1" },
    { title: "title2", champion: "champion2" },
    { title: "title3", champion: "champion3" },
  ];

  // Act
  const result = merge2ArraysIntoAnArrayOfObjects({ a1, a2, key1, key2 });

  // Assert - Check if the function correctly merges the two arrays
  expect(result).toEqual(expected);
});

describe("filterItemsByTerm", () => {
  it("should remove the terms that include the 'action term' when `is2Keep` is false", () => {
    // Arrange
    const terms1 = ["term1", "term2", "term3"];
    const terms2 = ["corresponding1", "corresponding2", "corresponding3"];
    const actionTerm = "term2";
    const is2Keep = false;

    const expected = {
      terms1: ["term1", "term3"],
      terms2: ["corresponding1", "corresponding3"],
    };

    // Act
    const result = filterItemsByTerm({
      terms1,
      terms2,
      actionTerm,
      is2Keep,
    });

    // Assert
    expect(result.terms1).toEqual(expected.terms1);
    expect(result.terms2).toEqual(expected.terms2);
  });

  it("should keep the terms that include the 'action term' when `is2Keep` is true", () => {
    // Arrange
    const terms1 = ["term1", "term2", "term3"];
    const terms2 = ["corresponding1", "corresponding2", "corresponding3"];
    const actionTerm = "term2";
    const is2Keep = true;

    const expected = {
      terms1: ["term2"],
      terms2: ["corresponding2"],
    };

    // Act
    const result = filterItemsByTerm({
      terms1,
      terms2,
      actionTerm,
      is2Keep,
    });

    // Assert
    expect(result.terms1).toEqual(expected.terms1);
    expect(result.terms2).toEqual(expected.terms2);
  });

  it("should remove the terms that include a 'partial action term' when `is2Keep` is false", () => {
    // Arrange
    const terms1 = ["something", "term2", "term3"];
    const terms2 = ["wicked", "corresponding2", "corresponding3"];
    const actionTerm = "so";
    const is2Keep = false;

    // `"so"` removes 🔥 `"something"` and `"wicked"`
    const expected = {
      terms1: ["term2", "term3"],
      terms2: ["corresponding2", "corresponding3"],
    };

    // Act
    const result = filterItemsByTerm({
      terms1,
      terms2,
      actionTerm,
      is2Keep,
    });

    // Assert
    expect(result.terms1).toEqual(expected.terms1);
    expect(result.terms2).toEqual(expected.terms2);
  });

  it("should keep with a partial filter term", () => {
    // Arrange
    const terms1 = ["term1", "term2", "term3"];
    const terms2 = ["corresponding1", "corresponding2", "corresponding3"];
    const partialFilterTerm = "term";
    const is2Keep = true;
    const expected = {
      terms1: ["term1", "term2", "term3"],
      terms2: ["corresponding1", "corresponding2", "corresponding3"],
    };
    // Act
    const result = filterItemsByTerm({
      terms1,
      terms2,
      partialFilterTerm,
      is2Keep,
    });
    // Assert
    expect(result).toEqual(expected);
  });

  it("should remove in a case-insensitive manner", () => {
    // Arrange
    const terms1 = ["ALL-CAPS", "MIXED-CAPS", "term3"];
    const terms2 = ["corresponding1", "Corresponding2", "corresponding3"];
    const actionTerm = "caps";
    const is2Keep = false;
    const expected = {
      terms1: ["term3"],
      terms2: ["corresponding3"],
    };
    // Act
    const result = filterItemsByTerm({
      terms1,
      terms2,
      actionTerm,
      is2Keep,
    });
    // Assert
    expect(result.terms1).toEqual(expected.terms1);
    expect(result.terms2).toEqual(expected.terms2);
  });
});
