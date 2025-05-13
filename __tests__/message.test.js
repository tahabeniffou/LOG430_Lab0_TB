const { getMessage } = require("../index");

test("renvoie le message complet", () => {
  expect(getMessage()).toBe("Hello World depuis ma VM !");
});

test("renvoie une chaîne non vide", () => {
  const msg = getMessage();
  expect(typeof msg).toBe("string")
  expect(msg.length).toBeGreaterThan(0);
});
