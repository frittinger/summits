import { getNextID } from "../logic/generateValues";
describe("Tests the if the generated ID is correct ", () => {
  it("empty Array", () => {
    let data: Array<{ id: number }> = [];
    let id = getNextID(data, "id");

    expect(id).toEqual(1);
  });

  it("normal Array with ID's without missing one", () => {
    let data: Array<{ id: number }> = [
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
    ];
    let id = getNextID(data, "id");

    expect(id).toEqual(data.length + 1);
  });

  it("Array with one ID missing: 1,2,4,5,6", () => {
    let data: Array<{ id: number }> = [
      { id: 1 },
      { id: 2 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ];
    let id = getNextID(data, "id");

    expect(id).toEqual(3);
  });

  it("Array with one ID missing: 1,2,4,5,6", () => {
    let data: Array<{ id: number }> = [
      { id: 1 },
      { id: 2 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ];
    let id = getNextID(data, "id");

    expect(id).toEqual(3);
  });

  it("Array with one ID missing: 2,3,4,5,6", () => {
    let data: Array<{ id: number }> = [
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
    ];
    let id = getNextID(data, "id");

    expect(id).toEqual(1);
  });

  it("Array with two ID missing: 1,2,5,6", () => {
    let data: Array<{ id: number }> = [
      { id: 1 },
      { id: 2 },
      { id: 5 },
      { id: 6 },
    ];
    let id = getNextID(data, "id");

    expect(id).toEqual(3);
  });

  it("Array with the wrong ID Identifier", () => {
    let data: Array<{ id: number }> = [
      { id: 1 },
      { id: 2 },
      { id: 5 },
      { id: 6 },
    ];

    let idIdentifier = "_id";

    expect(() => {
      getNextID(data, idIdentifier);
    }).toThrowError("No value found for the Key " + idIdentifier);
  });
});
