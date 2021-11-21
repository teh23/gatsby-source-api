const checkType = require("../utils/checkType")
describe("checkType", () => {
  it("string type", () => {
    const str = "test string"
    expect(checkType(str, "string")).toBe(true)
    expect(checkType(str, "number")).toBe(false)
    expect(checkType(str, "object")).toBe(false)
    expect(checkType(str, "array")).toBe(false)
  })

  it("number type", () => {
    const num = 123
    expect(checkType(num, "number")).toBe(true)
    expect(checkType(num, "string")).toBe(false)
    expect(checkType(num, "array")).toBe(false)
    expect(checkType(num, "object")).toBe(false)
  })

  it("object type", () => {
    const obj = { test: 1, test2: 2 }
    expect(checkType(obj, "object")).toBe(true)
    expect(checkType(obj, "array")).toBe(false)
    expect(checkType(obj, "number")).toBe(false)
    expect(checkType(obj, "string")).toBe(false)
  })

  it("array type", () => {
    const arr = [1, 2, 3]
    expect(checkType(arr, "array")).toBe(true)
    expect(checkType(arr, "object")).toBe(false)
    expect(checkType(arr, "string")).toBe(false)
    expect(checkType(arr, "number")).toBe(false)
  })
})
