const normalizeKeys = require("../utils/normalizeKeys")

it("test normalize keys", () => {
  const data = {
    id: 1,
    children: "Tommy",
    parent: "Tom",
    fields: "field",
    internal: "internals",
    notNormalized: "yes",
  }
  expect(normalizeKeys(data)).toBeInstanceOf(Object)
  expect(normalizeKeys(data)).toEqual({
    id__normalized: 1,
    children__normalized: "Tommy",
    parent__normalized: "Tom",
    fields__normalized: "field",
    internal__normalized: "internals",
    notNormalized: "yes",
  })
})
