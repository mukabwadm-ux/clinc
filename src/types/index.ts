export interface TeamMember {
  name: string
  role: string
  bio: string
  /** Headshot path under /public. Falls back to initials while unset. */
  image?: string
  initials: string
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
