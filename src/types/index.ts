export interface TeamMember {
  initials: string
  name: string
  role: string
  bio: string
  gradientFrom: string
  gradientTo: string
}

export interface Stat {
  value: number
  suffix: string
  label: string
  sublabel: string
}

export interface Credential {
  icon: string
  title: string
  body: string
}

export interface ContactFormData {
  fullName: string
  email: string
  company: string
  message: string
}
