export const DEMO_USER = "Jordan Hale"
export const DEMO_ID = "104829"

export type CategoryId = "eyewear" | "footwear" | "apparel" | "uniforms"
export type ScanType = "face" | "foot" | "body"
export type OrderStatus = "delivered" | "in_transit" | "processing"

export type Employee = {
  name: string
  id: string
  jobTitle: string
  department: string
  site: string
  employer: string
  customerNumber: string
  locationNumber: string
  roleRequirements: string[]
}

export type AllotmentLine = {
  label: string
  allowed: number
  remaining: number
}

export type Eligibility = {
  eligible: boolean
  kind: "subsidy" | "allotment"
  subsidyAmount: number
  subsidyLabel: string
  nextEligibleDate: string
  remaining?: string
  allotment?: AllotmentLine[]
}

export type OrderItem = {
  name: string
  styleNumber: string
  size: string
  qty: number
  price: number
}

export type CartLine = {
  key: string
  name: string
  styleNumber: string
  size: string
  qty: number
  price: number
}

export type Order = {
  id: string
  category: CategoryId
  placedOn: string
  status: OrderStatus
  items: OrderItem[]
}

export type Product = {
  id: string
  category: CategoryId
  name: string
  styleNumber: string
  price: number
  requirements: string[]
  recommended?: boolean
  notes?: string
}

export type UniformStyle = {
  name: string
  styleNumber: string
  pidCode: string
  printJobSizes: string[]
  decoration: string
}

export const employee: Employee = {
  name: DEMO_USER,
  id: DEMO_ID,
  jobTitle: "Field Technician",
  department: "Operations",
  site: "Plant 4 — West Yard",
  employer: "Northline Energy",
  customerNumber: "482910",
  locationNumber: "01427",
  roleRequirements: [
    "ANSI Z87.1 eye protection",
    "ASTM F2413 composite toe, EH-rated",
    "NFPA 70E FR HRC 2",
    "ANSI 107 Class 2 hi-vis for yard work",
  ],
}
