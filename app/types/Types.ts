import { FormEvent, MouseEventHandler } from "react"
import { IconType } from "react-icons"

export interface TypeExpense {
  id: string
  date: string
  amount: string
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
  price: string
  perks: string[]
  icon: IconType
}

export interface TypeError {
  title: string
  children: React.ReactNode
}

export interface TypeModal {
  children: React.ReactNode;
  onClose: MouseEventHandler<HTMLDivElement>
}

export interface ValidationError {
  field: string;
  message: string;
};

export interface TypeUser {
  email: string
  password: string
}