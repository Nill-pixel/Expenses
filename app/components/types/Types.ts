import { FormEvent, MouseEventHandler } from "react"

export interface TypeExpense {
  id: string | undefined
  date: string
  amount: number
  title: string
}

export interface TypeChartBarType {
  maxValue: number
  value: number
  label: string
}

export interface TypeExpenseListItem {
  title: string
  amount: number
}

export interface TypePrincingPlan {
  title: string
  price: number
  perks: string[]
  icon: string
}

export interface TypeError {
  title: string
  children: string
}

export interface TypeModal {
  children: React.ReactNode;
  onClose: MouseEventHandler<HTMLDivElement>
}