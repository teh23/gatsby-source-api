const validateUrl = require("../utils/isValidHttpUrl")

describe("validate url", () => {
  it("test good urls", () => {
    expect(validateUrl("http://google.pl")).toBe(true)
    expect(validateUrl("https://google.pl")).toBe(true)
    expect(validateUrl("google.pl")).toBe(false)
    expect(validateUrl("http://")).toBe(false)
    //TODO: expect(validateUrl("http://1")).toBe(false)
  })
})
