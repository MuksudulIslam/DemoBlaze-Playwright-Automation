import { faker } from "@faker-js/faker";

export const testData = {
  newUser: {
    username: faker.internet.username().toLowerCase() + Date.now(),
    password: faker.internet.password({ length: 10 }).toLowerCase()
  },

  invalidUser: {
    username: faker.internet.username().toLowerCase(),
    password: "wrongPass123"
  },

  orderData: {
    name: faker.person.fullName(),
    country: faker.location.country(),
    city: faker.location.city(),
    creditCard: faker.finance.creditCardNumber(),
    month: faker.date.future().getMonth() + 1,
    year: faker.date.future().getFullYear()
  },

  baseURL: "https://www.demoblaze.com/"

};
