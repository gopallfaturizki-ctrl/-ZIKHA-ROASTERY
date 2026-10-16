export type Product = {
  id: string
  name: string
  origin: string
  price: number
  weight: string
  beanType: 'Robusta' | 'Arabica' | 'Blend'
  roastLevel: 'Light' | 'Medium' | 'Dark'
  process: string
  tastingNotes: string[]
  description: string
  image: string
  stock: boolean
}

export type Service = {
  id: string
  name: string
  price: number
  unit: string
  description: string
  features: string[]
  icon: string
  popular: boolean
}

export type SiteConfig = {
  siteName: string
  tagline: string
  currency: string
  contact: {
    phone: string
    email: string
    address: string
    whatsapp: string
    instagram: string
    facebook: string
  }
  operationalHours: { weekdays: string; saturday: string; sunday: string }
  shipping: { available: boolean; areas: string; estimate: string; cost: string }
  seo: { title: string; description: string; keywords: string }
}

export type AboutContent = {
  title: string
  mission: string
  vision: string
  values: { title: string; description: string }[]
  story: string
}

export type Article = {
  slug: string
  title: string
  category: string
  date: string
  excerpt: string
  image: string
  body: string
}
