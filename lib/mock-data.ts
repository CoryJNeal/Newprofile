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

export type Eligibility = {
  eligible: boolean
  subsidyAmount: number
  subsidyLabel: string
  nextEligibleDate: string
  remaining?: string
}

export type OrderItem = {
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

export const categories: {
  id: CategoryId
  label: string
  shortLabel: string
  catalogHref: string
  moduleHref: string
  scanHref?: string
  scanType?: ScanType
  description: string
}[] = [
  {
    id: "eyewear",
    label: "Eyewear",
    shortLabel: "Eyewear",
    catalogHref: "/catalog/eyewear",
    moduleHref: "/eyewear",
    scanHref: "/scan/face",
    scanType: "face",
    description: "Safety frames and Rx inserts assigned to your role.",
  },
  {
    id: "footwear",
    label: "Footwear",
    shortLabel: "Footwear",
    catalogHref: "/catalog/footwear",
    moduleHref: "/footwear",
    scanHref: "/scan/foot",
    scanType: "foot",
    description: "Safety boots matched to your scan, last, and site hazards.",
  },
  {
    id: "apparel",
    label: "Apparel",
    shortLabel: "Apparel",
    catalogHref: "/catalog/apparel",
    moduleHref: "/apparel",
    scanHref: "/scan/body",
    scanType: "body",
    description: "FR and hi-vis workwear sized from your body scan.",
  },
  {
    id: "uniforms",
    label: "Uniforms",
    shortLabel: "Uniforms",
    catalogHref: "/catalog/uniforms",
    moduleHref: "/uniforms",
    description: "Approved Plant 4 program styles with Northline decoration.",
  },
]

export const eligibility: Record<CategoryId, Eligibility> = {
  eyewear: {
    eligible: true,
    subsidyAmount: 150,
    subsidyLabel: "$150 subsidy",
    nextEligibleDate: "March 12, 2027",
  },
  footwear: {
    eligible: true,
    subsidyAmount: 175,
    subsidyLabel: "$175 subsidy",
    nextEligibleDate: "January 8, 2027",
  },
  apparel: {
    eligible: false,
    subsidyAmount: 200,
    subsidyLabel: "$200 subsidy",
    nextEligibleDate: "December 15, 2026",
  },
  uniforms: {
    eligible: true,
    subsidyAmount: 0,
    subsidyLabel: "3 pieces remaining",
    nextEligibleDate: "July 1, 2027",
    remaining: "3 of 6 pieces this cycle",
  },
}

export const faceScan = {
  scannedOn: "August 3, 2026",
  pd: "63.5 mm",
  faceWidth: "138 mm",
  templeLength: "145 mm",
  bridge: "18 mm",
  notes: "Fits standard safety frames. Rx insert compatible.",
}

export const footScan = {
  scannedOn: "June 18, 2026",
  left: { length: "278 mm", width: "EE", arch: "Low" },
  right: { length: "276 mm", width: "E", arch: "Low" },
  recommendedLast: "Wide industrial last",
  recommendedSize: "10.5 EE",
  hotspots: "Elevated heel and forefoot pressure on the left; medial arch underloaded.",
}

export const bodyScan = {
  scannedOn: "May 2, 2026",
  chest: "44 in",
  waist: "38 in",
  inseam: "32 in",
  sleeve: "35 in",
  recommendedShirt: "XL regular",
  recommendedPant: "38 x 32",
  notes: "Allow extra ease in FR layers over base knit.",
}

export const eyewearRecommendations = [
  {
    name: "Pyramex Venture 3 Rx",
    styleNumber: "SB1810RX",
    why: "Matches PD and temple length; Z87.1 Rx-capable.",
  },
  {
    name: "Wiley X Gravity",
    styleNumber: "CHGRA01",
    why: "Wider face fit with removable Rx insert.",
  },
  {
    name: "3M SecureFit 400",
    styleNumber: "SF401AF",
    why: "Anti-fog daily pair for yard work.",
  },
]

export const footwearRecommendations = [
  {
    name: "Timberland PRO Boondock 6\"",
    styleNumber: "A1212",
    why: "Wide last, composite toe, EH — matches 10.5 EE scan.",
  },
  {
    name: "KEEN Utility Detroit XT",
    styleNumber: "1022096",
    why: "Soft toe-box volume for the left forefoot hotspot.",
  },
]

export const apparelRecommendations = [
  {
    name: "Bulwark FR Work Shirt",
    styleNumber: "SLU6",
    why: "XL regular from chest/sleeve scan; HRC 2.",
  },
  {
    name: "Workrite FR Cargo Pant",
    styleNumber: "FP14KH",
    why: "38 x 32 inseam; CAT 2 for Plant 4.",
  },
  {
    name: "NSA Class 2 Hi-Vis Vest",
    styleNumber: "VNSC2OR",
    why: "Required for West Yard vehicle traffic.",
  },
]

export const uniforms: UniformStyle[] = [
  {
    name: "Plant 4 FR Crew Shirt",
    styleNumber: "FR-2140",
    pidCode: "PID-48291",
    printJobSizes: ["4x4"],
    decoration: "Left chest 4x4 Northline mark",
  },
  {
    name: "West Yard Hi-Vis Parka",
    styleNumber: "HV-8801",
    pidCode: "PID-48292",
    printJobSizes: ["4x4", "12x8"],
    decoration: "Left chest 4x4, full back 12x8",
  },
  {
    name: "Northline Polo",
    styleNumber: "UN-1102",
    pidCode: "PID-48290",
    printJobSizes: ["4x4"],
    decoration: "Left chest 4x4 embroidered logo",
  },
  {
    name: "FR Coverall — Plant 4",
    styleNumber: "FR-9010",
    pidCode: "PID-48293",
    printJobSizes: ["4x4", "3x15"],
    decoration: "Chest 4x4, rear name banner 3x15",
  },
]

export const products: Product[] = [
  {
    id: "ew-1",
    category: "eyewear",
    name: "Pyramex Venture 3 Rx",
    styleNumber: "SB1810RX",
    price: 128,
    requirements: ["Z87.1", "Rx-capable"],
    recommended: true,
  },
  {
    id: "ew-2",
    category: "eyewear",
    name: "Wiley X Gravity",
    styleNumber: "CHGRA01",
    price: 149,
    requirements: ["Z87.1", "Rx-capable"],
    recommended: true,
  },
  {
    id: "ew-3",
    category: "eyewear",
    name: "3M SecureFit 400",
    styleNumber: "SF401AF",
    price: 42,
    requirements: ["Z87.1", "Anti-fog"],
    recommended: true,
  },
  {
    id: "ew-4",
    category: "eyewear",
    name: "Uvex Stealth Goggle",
    styleNumber: "S3960C",
    price: 38,
    requirements: ["Z87.1", "Anti-fog"],
  },
  {
    id: "ew-5",
    category: "eyewear",
    name: "Bolle Silium+",
    styleNumber: "PSIESPSI",
    price: 54,
    requirements: ["Z87.1", "Anti-fog"],
  },
  {
    id: "ew-6",
    category: "eyewear",
    name: "Elvex Go-Specs II",
    styleNumber: "SG-31C",
    price: 29,
    requirements: ["Z87.1"],
  },
  {
    id: "ew-7",
    category: "eyewear",
    name: "3M Virtua CCS",
    styleNumber: "11872-00000",
    price: 18,
    requirements: ["Z87.1"],
  },
  {
    id: "ew-8",
    category: "eyewear",
    name: "Pyramex I-Force",
    styleNumber: "GB4010ST",
    price: 36,
    requirements: ["Z87.1", "Anti-fog"],
  },
  {
    id: "fw-1",
    category: "footwear",
    name: "Timberland PRO Boondock 6\"",
    styleNumber: "A1212",
    price: 189,
    requirements: ["ASTM F2413", "Composite toe", "EH"],
    recommended: true,
  },
  {
    id: "fw-2",
    category: "footwear",
    name: "KEEN Utility Detroit XT",
    styleNumber: "1022096",
    price: 175,
    requirements: ["ASTM F2413", "Composite toe", "EH"],
    recommended: true,
  },
  {
    id: "fw-3",
    category: "footwear",
    name: "Red Wing King Toe",
    styleNumber: "2408",
    price: 245,
    requirements: ["ASTM F2413", "Composite toe", "EH"],
  },
  {
    id: "fw-4",
    category: "footwear",
    name: "Caterpillar Second Shift",
    styleNumber: "P90815",
    price: 132,
    requirements: ["ASTM F2413", "Steel toe"],
  },
  {
    id: "fw-5",
    category: "footwear",
    name: "Wolverine Ramparts 6\"",
    styleNumber: "W211129",
    price: 168,
    requirements: ["ASTM F2413", "Composite toe", "EH"],
  },
  {
    id: "fw-6",
    category: "footwear",
    name: "Hytest FootRests",
    styleNumber: "11091",
    price: 154,
    requirements: ["ASTM F2413", "EH"],
  },
  {
    id: "fw-7",
    category: "footwear",
    name: "Avenger A7126",
    styleNumber: "A7126",
    price: 119,
    requirements: ["ASTM F2413", "Composite toe"],
  },
  {
    id: "fw-8",
    category: "footwear",
    name: "Thorogood American Heritage",
    styleNumber: "804-4200",
    price: 229,
    requirements: ["ASTM F2413", "Steel toe", "EH"],
  },
  {
    id: "ap-1",
    category: "apparel",
    name: "Bulwark FR Work Shirt",
    styleNumber: "SLU6",
    price: 92,
    requirements: ["FR HRC 2", "NFPA 2112"],
    recommended: true,
  },
  {
    id: "ap-2",
    category: "apparel",
    name: "Workrite FR Cargo Pant",
    styleNumber: "FP14KH",
    price: 108,
    requirements: ["FR HRC 2", "NFPA 2112"],
    recommended: true,
  },
  {
    id: "ap-3",
    category: "apparel",
    name: "NSA Class 2 Hi-Vis Vest",
    styleNumber: "VNSC2OR",
    price: 36,
    requirements: ["ANSI 107 Class 2"],
    recommended: true,
  },
  {
    id: "ap-4",
    category: "apparel",
    name: "Carhartt FR Duck Coat",
    styleNumber: "101626",
    price: 214,
    requirements: ["FR HRC 2", "NFPA 2112"],
  },
  {
    id: "ap-5",
    category: "apparel",
    name: "Ariat FR Crew Knit",
    styleNumber: "10012250",
    price: 78,
    requirements: ["FR HRC 2"],
  },
  {
    id: "ap-6",
    category: "apparel",
    name: "NASCO ArcLite Rain Jacket",
    styleNumber: "2000J",
    price: 164,
    requirements: ["FR HRC 2", "ANSI 107 Class 2"],
  },
  {
    id: "ap-7",
    category: "apparel",
    name: "PIP Class 2 Tee",
    styleNumber: "311-0120",
    price: 22,
    requirements: ["ANSI 107 Class 2"],
  },
  {
    id: "ap-8",
    category: "apparel",
    name: "OccuNomix Cooling Vest",
    styleNumber: "CV100",
    price: 48,
    requirements: ["Plant 4 heat stress"],
  },
  {
    id: "un-1",
    category: "uniforms",
    name: "Plant 4 FR Crew Shirt",
    styleNumber: "FR-2140",
    price: 74,
    requirements: ["Program style", "PiD PID-48291"],
    notes: "Chest 4x4",
    recommended: true,
  },
  {
    id: "un-2",
    category: "uniforms",
    name: "West Yard Hi-Vis Parka",
    styleNumber: "HV-8801",
    price: 186,
    requirements: ["Program style", "PiD PID-48292"],
    notes: "Chest 4x4 · Back 12x8",
    recommended: true,
  },
  {
    id: "un-3",
    category: "uniforms",
    name: "Northline Polo",
    styleNumber: "UN-1102",
    price: 42,
    requirements: ["Program style", "PiD PID-48290"],
    notes: "Chest 4x4",
  },
  {
    id: "un-4",
    category: "uniforms",
    name: "FR Coverall — Plant 4",
    styleNumber: "FR-9010",
    price: 158,
    requirements: ["Program style", "PiD PID-48293"],
    notes: "Chest 4x4 · Banner 3x15",
  },
  {
    id: "un-5",
    category: "uniforms",
    name: "Shop Coat",
    styleNumber: "UN-3308",
    price: 68,
    requirements: ["Program style", "PiD PID-48294"],
    notes: "Chest 4x4",
  },
  {
    id: "un-6",
    category: "uniforms",
    name: "Knit Watch Cap",
    styleNumber: "UN-0401",
    price: 18,
    requirements: ["Program style", "PiD PID-48295"],
    notes: "Front 4x4",
  },
]

export const orders: Order[] = [
  {
    id: "ORD-88421",
    category: "eyewear",
    placedOn: "August 11, 2026",
    status: "delivered",
    items: [
      {
        name: "Pyramex Venture 3 Rx",
        styleNumber: "SB1810RX",
        size: "Rx insert",
        qty: 1,
        price: 128,
      },
    ],
  },
  {
    id: "ORD-79104",
    category: "eyewear",
    placedOn: "March 4, 2025",
    status: "delivered",
    items: [
      {
        name: "3M SecureFit 400",
        styleNumber: "SF401AF",
        size: "Clear",
        qty: 2,
        price: 42,
      },
    ],
  },
  {
    id: "ORD-76033",
    category: "eyewear",
    placedOn: "September 18, 2024",
    status: "delivered",
    items: [
      {
        name: "Uvex Stealth Goggle",
        styleNumber: "S3960C",
        size: "One size",
        qty: 1,
        price: 38,
      },
    ],
  },
  {
    id: "ORD-85102",
    category: "footwear",
    placedOn: "June 22, 2026",
    status: "delivered",
    items: [
      {
        name: "Timberland PRO Boondock 6\"",
        styleNumber: "A1212",
        size: "10.5 EE",
        qty: 1,
        price: 189,
      },
    ],
  },
  {
    id: "ORD-70218",
    category: "footwear",
    placedOn: "January 9, 2025",
    status: "delivered",
    items: [
      {
        name: "KEEN Utility Detroit XT",
        styleNumber: "1022096",
        size: "10.5 W",
        qty: 1,
        price: 175,
      },
    ],
  },
  {
    id: "ORD-64091",
    category: "footwear",
    placedOn: "July 2, 2024",
    status: "delivered",
    items: [
      {
        name: "Hytest FootRests",
        styleNumber: "11091",
        size: "11 D",
        qty: 1,
        price: 154,
      },
    ],
  },
  {
    id: "ORD-82155",
    category: "apparel",
    placedOn: "December 16, 2025",
    status: "delivered",
    items: [
      {
        name: "Bulwark FR Work Shirt",
        styleNumber: "SLU6",
        size: "XL",
        qty: 2,
        price: 92,
      },
      {
        name: "Workrite FR Cargo Pant",
        styleNumber: "FP14KH",
        size: "38x32",
        qty: 2,
        price: 108,
      },
    ],
  },
  {
    id: "ORD-71940",
    category: "apparel",
    placedOn: "June 3, 2025",
    status: "delivered",
    items: [
      {
        name: "NSA Class 2 Hi-Vis Vest",
        styleNumber: "VNSC2OR",
        size: "L/XL",
        qty: 1,
        price: 36,
      },
    ],
  },
  {
    id: "ORD-61207",
    category: "apparel",
    placedOn: "December 20, 2024",
    status: "delivered",
    items: [
      {
        name: "Carhartt FR Duck Coat",
        styleNumber: "101626",
        size: "XL",
        qty: 1,
        price: 214,
      },
    ],
  },
  {
    id: "ORD-87002",
    category: "uniforms",
    placedOn: "September 2, 2026",
    status: "in_transit",
    items: [
      {
        name: "West Yard Hi-Vis Parka",
        styleNumber: "HV-8801",
        size: "XL",
        qty: 1,
        price: 186,
      },
    ],
  },
  {
    id: "ORD-80144",
    category: "uniforms",
    placedOn: "April 14, 2026",
    status: "delivered",
    items: [
      {
        name: "Plant 4 FR Crew Shirt",
        styleNumber: "FR-2140",
        size: "XL",
        qty: 3,
        price: 74,
      },
    ],
  },
  {
    id: "ORD-73301",
    category: "uniforms",
    placedOn: "November 11, 2025",
    status: "delivered",
    items: [
      {
        name: "Northline Polo",
        styleNumber: "UN-1102",
        size: "XL",
        qty: 2,
        price: 42,
      },
    ],
  },
]

export const catalogFilters: Record<CategoryId, string[]> = {
  eyewear: ["Z87.1", "Rx-capable", "Anti-fog"],
  footwear: ["ASTM F2413", "EH", "Composite toe", "Steel toe"],
  apparel: ["FR HRC 2", "ANSI 107 Class 2", "NFPA 2112"],
  uniforms: ["Program style", "PiD PID-48291", "PiD PID-48292"],
}

export function getCategory(id: string) {
  return categories.find((c) => c.id === id)
}

export function productsFor(id: CategoryId) {
  return products.filter((p) => p.category === id)
}

export function ordersFor(id: CategoryId) {
  return orders.filter((o) => o.category === id)
}

export function lastOrderFor(id: CategoryId) {
  return ordersFor(id)[0]
}

export function orderTotal(order: Order) {
  return order.items.reduce((sum, item) => sum + item.price * item.qty, 0)
}

export function money(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value)
}

export function isDemoEmployee(user: string, id: string) {
  return (
    user.trim().toLowerCase() === DEMO_USER.toLowerCase() &&
    id.trim() === DEMO_ID
  )
}
