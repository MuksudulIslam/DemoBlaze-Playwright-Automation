import { fa, faker } from "@faker-js/faker";

const randomString = faker.string.alphanumeric({length: 4}).toLowerCase();
const randomNumber = faker.string.numeric({ length: 3 });

export const testData = {
  newUser: {
    // username: faker.internet.person.fullName({length: 5}).toLowerCase() + "_" + faker.string.numeric({ length: 3 }),
    // password: faker.internet.password({ length: 10 }).toLowerCase()

    username: randomString + "_" + randomNumber,
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
    month: (faker.date.future().getMonth() + 1).toString(),
    year: faker.date.future().getFullYear().toString()
  },

  baseURL: "https://www.demoblaze.com/"
};

export function generateUniqueUsername() {
  return `user_${Date.now()}_${faker.string.alphanumeric({ length: 3 }).toLowerCase()}`;
}