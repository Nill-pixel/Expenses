import { TypeExpense } from "~/types/Types";
import { prisma } from "./database.server"

export const addExpense = async (expenseData: TypeExpense) => {
  try {
    await prisma.expenses.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date)
      }
    });
  } catch (error) {
    console.log(error)
    throw error
  }

}