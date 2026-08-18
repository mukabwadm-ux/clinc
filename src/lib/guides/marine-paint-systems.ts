export interface CoatSystem {
  label: string
  spec: string
  products: string[]
}

export interface ShipArea {
  id: string
  title: string
  priorities: string
  systems: CoatSystem[]
  followUp?: string
}

export const SHIP_AREAS: ShipArea[] = [
  {
    id: 'topside',
    title: 'Topside',
    priorities: 'Balance gloss and durability against price and ease of maintenance.',
    systems: [
      {
        label: 'Anticorrosive system',
        spec: '2 coats epoxy, 125µm',
        products: ['Hempadur Quattro 17634', 'Hempadur Easy 47700', 'Hempadur Quattro XO 17820'],
      },
      {
        label: 'Topcoat',
        spec: '1 coat, 50µm',
        products: ['Hempathane Topcoat 55210', 'Hempatex Enamel 56360', 'Hempalin Enamel 52140'],
      },
    ],
  },
  {
    id: 'decks',
    title: 'Decks',
    priorities: 'Weigh mechanical resistance, antislip performance, ease of maintenance, and corporate colour matching.',
    systems: [
      {
        label: 'Anticorrosive system',
        spec: '2 coats epoxy, 125–150µm',
        products: [
          'Hempadur Quattro 17634',
          'Hempadur Easy 47700',
          'Hempadur Quattro XO 17820',
          'Hempadur Mastic 45880',
          "Hempel's Sprayguard 35490",
          "Hempel's Epoxy Filler 35250",
        ],
      },
      {
        label: 'Topcoat',
        spec: '1 coat, 50µm',
        products: ['Hempathane Topcoat 55210', 'Hempatex Enamel 56360 (needs a tie-coat)', 'Hempalin Enamel 52140 (needs a tie-coat)'],
      },
    ],
  },
  {
    id: 'underwater-area',
    title: 'Underwater Area',
    priorities: 'Choose between an antifouling system and a silicone fouling-release system.',
    systems: [
      {
        label: 'Anticorrosive system',
        spec: 'Anticorrosive: 2 coats epoxy, 150µm each · Tiecoat: 1 coat, 75µm',
        products: ['Hempadur Quattro 17634', 'Hempadur Easy 47700', 'Hempadur Quattro XO 17820', 'Hempadur Tie Coat 49183'],
      },
      {
        label: 'Antifouling',
        spec: 'Thickness and product depend on navigation parameters — activity, speed, waters',
        products: ['Oceanic range', 'Globic range', 'Olympic range'],
      },
    ],
  },
  {
    id: 'boottop',
    title: 'Boottop',
    priorities: 'Decide between antifouling-style or topside-style protection, and how much extra mechanical resistance is needed.',
    systems: [
      {
        label: 'Anticorrosive system',
        spec: '1 coat, 200–300µm · Tiecoat: 1 coat, 75µm (if recoating with a monocomponent topcoat)',
        products: ['Hempadur', 'Hempadur Multi-Strength 45751 (200–300µm)', 'or Hempadur Multi-Strength GF 35870'],
      },
    ],
    followUp: 'Topcoated by whichever Antifouling or Topside system the vessel uses.',
  },
  {
    id: 'superstructure',
    title: 'Superstructure',
    priorities: 'Prioritise ease of maintenance and long-term durability.',
    systems: [
      {
        label: 'Anticorrosive system',
        spec: '1 or 2 coats, 75–100µm each · Tiecoat: 1 coat, 75µm',
        products: ['Hempadur Quattro 17634', 'Hempadur Easy 47700', 'Hempadur Quattro XO 17820', 'Hempadur Tie Coat 49183'],
      },
    ],
    followUp: 'Topcoated with Hempalin, Hempatex, or Hempathane.',
  },
  {
    id: 'mast-powerblock-winch',
    title: 'Mast, Powerblock & Winch',
    priorities: 'Built for durability on exposed, high-wear fittings.',
    systems: [
      {
        label: 'Anticorrosive system',
        spec: '2 coats, 100µm each · Topcoated with 1 coat polyurethane, 50µm',
        products: ['Hempadur Quattro 17634', 'Hempadur Easy 47700', 'Hempadur Quattro XO 17820'],
      },
    ],
  },
]

export interface TankSpec {
  name: string
  products: string[]
  spec?: string
}

export const TANKS: TankSpec[] = [
  { name: 'Fresh Water Tanks', products: ['Hempadur 35560'], spec: '1 or 2 coats, 300µm total' },
  { name: 'Ballast Tanks', products: ['Hempadur Quattro 17634', 'Hempadur Easy 47700'], spec: '2 coats, 160µm each' },
  { name: 'Grey Water Tanks', products: ['Hempadur 85671'] },
  { name: 'Engines & Engine Room', products: ['Hempalin Enamel 52140'] },
  { name: 'Fish Tanks', products: ['Hempadur 35560'], spec: '1 or 2 coats, 300µm total' },
]

export interface CargoHoldSpec {
  vesselType: string
  driver: string
  products: string[]
  note?: string
}

export const CARGO_HOLDS: CargoHoldSpec[] = [
  {
    vesselType: 'Chemical Tankers',
    driver: 'Resistance to chemical substances',
    products: ['Hempadur 15500', 'Hempadur 15400', 'Galvosil 15700', 'Hempadur 85671'],
  },
  {
    vesselType: 'Bulk Carriers',
    driver: 'Abrasion resistance',
    products: ['Hempadur Ultra Strength 47500', 'Hempadur Impact 47800'],
  },
  {
    vesselType: 'Tankers',
    driver: 'Corrosion on tank top and floor',
    products: ['Hempadur Quattro 17634', 'Hempadur Easy 47700', 'Hempadur 4514'],
  },
  {
    vesselType: 'LNG Carriers',
    driver: 'Stainless-steel construction, high condensation and low temperatures',
    products: ['Hempadur 85671'],
    note: 'Double tank walls typically use a zinc silicate system.',
  },
]

export const BIOCIDE_TABLE = [
  { type: 'Hard Fouling', high: ['Cuprous oxide', 'Selektope', 'Econea'], medium: ['Copper Pyrithione', 'Sea Nine'] },
  { type: 'Algae', high: ['Copper Pyrithione', 'Sea Nine', 'Zineb'], medium: ['Cuprous oxide'] },
  { type: 'Slime', high: ['Antiadherent surface (FR)', 'Polishing surface (AF)'], medium: ['All biocides (concentrated Copper Pyrithione)'] },
]

export interface AntifoulingTier {
  months: string
  products: { name: string; tech: string; featured?: boolean }[]
}

export const ANTIFOULING_LADDER: AntifoulingTier[] = [
  {
    months: 'Flagship — no fixed interval',
    products: [{ name: 'Hempaguard', tech: 'Silicone fouling-release' }],
  },
  {
    months: 'Up to 90 months',
    products: [
      { name: 'Globic 9500', tech: 'NAT' },
      { name: 'Globic 9000', tech: 'NAT', featured: true },
      { name: 'Dynamic 9000', tech: 'Silyl Acrylate' },
      { name: 'Globic 8000', tech: 'NAT/Rosin' },
    ],
  },
  {
    months: 'Up to 60 months',
    products: [
      { name: 'Globic 7000', tech: 'NAT/Rosin' },
      { name: 'Globic 6000 (EU)', tech: 'NAT/Rosin' },
      { name: 'Oceanic+', tech: 'Rosin' },
      { name: 'Atlantic+', tech: 'Rosin' },
    ],
  },
  {
    months: 'Up to 36 months',
    products: [
      { name: 'Olympic+', tech: 'Rosin' },
      { name: 'Basic', tech: 'Rosin' },
    ],
  },
]
