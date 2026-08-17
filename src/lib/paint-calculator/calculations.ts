/**
 * Formulas verified against Clin Corp's 'Paint calc 1.xlsx' (MV Kwale quotation) —
 * every intermediate value below reproduces that sheet's cells exactly.
 *
 *   Theoretical m²/L = (volume solids % × 1000) / DFT(µm)
 *   Practical m²/L   = Theoretical m²/L × (1 − wastage %)
 *   Litres needed    = Area (m²) / Practical m²/L
 *   Cost             = Litres × price per litre
 */

/** Fixed wastage/loss allowance, matching the source quotation. Not user-editable. */
export const WASTAGE_PCT = 30

export function theoreticalCoverageM2PerL(volumeSolidsPct: number, dftMicrons: number): number {
  if (dftMicrons <= 0) return 0
  return (volumeSolidsPct * 10) / dftMicrons
}

export function practicalCoverageM2PerL(theoreticalM2PerL: number, wastagePct: number = WASTAGE_PCT): number {
  return theoreticalM2PerL * (1 - wastagePct / 100)
}

export function litresNeeded(areaM2: number, practicalM2PerL: number): number {
  if (practicalM2PerL <= 0 || areaM2 <= 0) return 0
  return areaM2 / practicalM2PerL
}

export function lineCost(litres: number, pricePerLitre: number): number {
  return litres * pricePerLitre
}

// ── Shape-based area helpers ──
// Common industrial/marine surfaces, so users can compute area without a tape-measure-to-m² step.

export function rectangleAreaM2(widthM: number, heightM: number): number {
  return Math.max(0, widthM) * Math.max(0, heightM)
}

/** Lateral (curved) surface only — e.g. a pipe run. */
export function cylinderLateralAreaM2(diameterM: number, lengthM: number): number {
  return Math.PI * Math.max(0, diameterM) * Math.max(0, lengthM)
}

/** Lateral surface plus both circular ends — e.g. a free-standing cylindrical tank. */
export function cylindricalTankAreaM2(diameterM: number, heightM: number, includeEnds: boolean): number {
  const lateral = cylinderLateralAreaM2(diameterM, heightM)
  if (!includeEnds) return lateral
  const radius = Math.max(0, diameterM) / 2
  return lateral + 2 * Math.PI * radius * radius
}

// ── Container / pack-size breakdown ──
// Standard pack sizes are per-product and not yet supplied — PACK_SIZES_BY_PRODUCT_CODE
// stays empty until Clin Corp provides that data. containerBreakdown degrades to null
// (rather than guessing sizes) so the UI can show "pending" instead of a wrong count.

export interface PackSize {
  label: string
  litres: number
}

export const PACK_SIZES_BY_PRODUCT_CODE: Record<string, PackSize[]> = {}

export interface ContainerLine {
  label: string
  count: number
}

export function containerBreakdown(litres: number, packSizes: PackSize[] | undefined): ContainerLine[] | null {
  if (!packSizes || packSizes.length === 0 || litres <= 0) return null
  const sorted = [...packSizes].sort((a, b) => b.litres - a.litres)
  let remaining = litres
  const breakdown: ContainerLine[] = []
  sorted.forEach((pack, i) => {
    const isLast = i === sorted.length - 1
    const count = isLast ? Math.ceil(remaining / pack.litres - 1e-9) : Math.floor(remaining / pack.litres)
    if (count > 0) {
      breakdown.push({ label: pack.label, count })
      remaining -= count * pack.litres
    }
  })
  return breakdown
}
