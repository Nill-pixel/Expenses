import { TypeExpense } from "~/types/Types";

const isValidTitle = (value: string) => {
  return value && value.trim().length > 0 && value.trim().length <= 30;
}

const isValidAmount = (value: string) => {
  const amount = parseFloat(value);
  return !isNaN(amount) && amount > 0;
}

const isValidDate = (value: string) => {
  return value && new Date(value).getTime() < new Date().getTime();
}

export const validateExpenseInput = (input: TypeExpense) => {
  let validationErrors = {} as TypeExpense;

  if (!isValidTitle(input.title)) {
    validationErrors.title = 'Invalid expense title. Must be at most 30 characters long.'
  }

  if (!isValidAmount(input.amount)) {
    validationErrors.amount = 'Invalid amount. Must be a number greater than zero.'
  }

  if (!isValidDate(input.date)) {
    validationErrors.date = 'Invalid date. Must be a date before today.'
  }

  if (Object.keys(validationErrors).length > 0) {
    throw validationErrors;
  }
}