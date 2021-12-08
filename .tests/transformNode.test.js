const transformNode = require("../src/transformNode")

it("returns object", () => {
  const data = {
    id: 1,
    title: "New",
    productCat: "Computer",
  }
  const transformAdd = {
    name: "subtitle",
    func: ({ title }) => `sub ${title}`,
  }
  expect(transformNode(transformAdd, data)).toBeInstanceOf(Object)
})

describe("transform node tests", () => {
  it("edit node", () => {
    const data = {
      id: 1,
      title: "New",
      productCat: "Computer",
    }
    const transform = {
      name: "title",
      func: ({ title }) => title + 1,
    }
    expect(transformNode(transform, data)).toEqual({
      id: 1,
      title: "New1",
      productCat: "Computer",
    })
  })
  it("add new node", () => {
    const data = {
      id: 1,
      title: "New",
      productCat: "Computer",
    }
    const transformAdd = {
      name: "subtitle",
      func: ({ title }) => `sub ${title}`,
    }
    expect(transformNode(transformAdd, data)).toEqual({
      id: 1,
      title: "New",
      productCat: "Computer",
      subtitle: "sub New",
    })
  })
  it("add multiple nested node", () => {
    const data = {
      id: 1,
      title: "New",
      productCat: "Computer",
    }
    const transformAdd = [
      {
        name: "address.phone.country",
        func: () => `PL`,
      },
      {
        name: "address.phone.number",
        func: () => "12332123",
      },
    ]

    expect(transformNode(transformAdd, data)).toEqual({
      id: 1,
      title: "New",
      productCat: "Computer",
      address: {
        phone: {
          country: "PL",
          number: "12332123",
        },
      },
    })
  })
  it("edit multiple nested node", () => {
    const transformAdd = [
      {
        name: "address.phone.country",
        func: () => `DE`,
      },
      {
        name: "address.phone.number",
        func: () => "82332123",
      },
    ]
    const data = {
      id: 1,
      title: "New",
      productCat: "Computer",
      address: {
        phone: {
          country: "PL",
          number: "12332123",
        },
      },
    }
    expect(transformNode(transformAdd, data)).toEqual({
      id: 1,
      title: "New",
      productCat: "Computer",
      address: {
        phone: {
          country: "DE",
          number: "82332123",
        },
      },
    })
  })
})
