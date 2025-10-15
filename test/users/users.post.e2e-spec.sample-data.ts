import { faker as F } from '@faker-js/faker';

// Support both APIs: v8+ => person.*, v7 => name.*
const firstName = () => (F as any).person?.firstName?.() ?? F.name.firstName();
const lastName = () => (F as any).person?.lastName?.() ?? F.name.lastName();
const email = () => F.internet.email();

export const completeUser = {
  firstName: firstName(),
  lastName: lastName(),
  email: email(),
  password: 'Password123#',
};

export const missingFirstName = {
  lastName: lastName(),
  email: email(),
  password: 'Password123#',
};

export const missingEmail = {
  firstName: firstName(),
  lastName: lastName(),
  password: 'Password123#',
};

export const missingPassword = {
  firstName: firstName(),
  lastName: lastName(),
  email: email(),
};
