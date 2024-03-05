import { TypeExpense } from "~/types/Types";
import { prisma } from "./database.server"

export const addExpense = async (expenseData: TypeExpense) => {
  try {
    await prisma.expense.create({
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date)
      }
    });
  } catch (error) {
    throw new Error('Failed to add expense.')
  }

}

export const getExpenses = async () => {
  try {
    const expenses = await prisma.expense.findMany({
      orderBy: {
        date: 'desc'
      }
    })
    return expenses
  } catch (error) {
    throw new Error('Failed to get expenses.')
  }

}

export const getExpense = async (id: string) => {
  try {
    const expense = await prisma.expense.findFirst({ where: { id: id } })
    return expense
  } catch (error) {
    throw new Error('Failed to get expense.')
  }

}


export const updateExpense = async (id: string, expenseData: TypeExpense) => {
  try {
    await prisma.expense.update({
      where: { id },
      data: {
        title: expenseData.title,
        amount: +expenseData.amount,
        date: new Date(expenseData.date)
      }
    })
  } catch (error) {
    throw new Error('Failed to update expense.')
  }

}

export const deleteExpense = async (id: string) => {
  try {
    await prisma.expense.delete({
      where: { id }
    })
  } catch (error) {
    throw new Error('Failed to delete expense.')
  }
}