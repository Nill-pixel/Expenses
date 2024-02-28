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

export const getExpenses = async () => {
  try {
    const expenses = await prisma.expenses.findMany({
      orderBy: {
        date: 'desc'
      }
    })
    return expenses
  } catch (error) {
    throw error
  }

}

export const getExpense = async (id: string) => {
  try {
    const expense = await prisma.expenses.findFirst({ where: { id: id } })
    return expense
  } catch (error) {
    throw error
  }

}