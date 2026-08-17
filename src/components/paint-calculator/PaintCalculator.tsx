'use client'

import { useMemo, useRef, useState } from 'react'
import { Plus, Trash2, ChevronDown, AlertTriangle } from 'lucide-react'
import { cn } from '@/lib/utils'
import { PAINT_PRODUCTS, type PaintProduct } from '@/lib/paint-calculator/products'
import {
  WASTAGE_PCT,
  theoreticalCoverageM2PerL,
  practicalCoverageM2PerL,
  litresNeeded,
  lineCost,
  rectangleAreaM2,
  cylinderLateralAreaM2,
  cylindricalTankAreaM2,
  containerBreakdown,
  PACK_SIZES_BY_PRODUCT_CODE,
} from '@/lib/paint-calculator/calculations'

// ── Types ──

type ProductChoice = { kind: 'catalog'; code: string } | { kind: 'custom' }

interface Coat {
  id: string
  choice: ProductChoice
  customName: string
  customVolumeSolidsPct: number | ''
  dftMicrons: number | ''
  pricePerLitre: number | ''
}

type ShapeKind = 'rectangle' | 'cylinder' | 'tank'

interface ShapeState {
  kind: ShapeKind
  widthM: number | ''
  heightM: number | ''
  diameterM: number | ''
  lengthM: number | ''
  includeEnds: boolean
}

interface Section {
  id: string
  name: string
  areaMode: 'direct' | 'shape'
  areaM2: number | ''
  shape: ShapeState
  coats: Coat[]
}

interface ExtraItem {
  id: string
  name: string
  litres: number | ''
  pricePerLitre: number | ''
}

// ── Helpers ──

const toNum = (v: number | ''): number => (typeof v === 'number' && !Number.isNaN(v) ? v : 0)

const usableProducts = PAINT_PRODUCTS.filter((p) => p.volumeSolidsPct != null && p.recommendedMicrons != null)

const PRODUCT_TYPE_ORDER: string[] = []
for (const p of usableProducts) {
  if (!PRODUCT_TYPE_ORDER.includes(p.type)) PRODUCT_TYPE_ORDER.push(p.type)
}

const productByCode = new Map<string, PaintProduct>(usableProducts.map((p) => [p.code, p]))

function fmtNum(n: number, digits = 2): string {
  return n.toLocaleString('en-KE', { minimumFractionDigits: digits, maximumFractionDigits: digits })
}

function fmtKES(n: number): string {
  return `KES ${fmtNum(n, 2)}`
}

function sectionAreaM2(section: Section): number {
  if (section.areaMode === 'direct') return toNum(section.areaM2)
  const { shape } = section
  if (shape.kind === 'rectangle') return rectangleAreaM2(toNum(shape.widthM), toNum(shape.heightM))
  if (shape.kind === 'cylinder') return cylinderLateralAreaM2(toNum(shape.diameterM), toNum(shape.lengthM))
  return cylindricalTankAreaM2(toNum(shape.diameterM), toNum(shape.heightM), shape.includeEnds)
}

interface CoatResult {
  product: PaintProduct | null
  volumeSolidsPct: number
  dftMicrons: number
  theoretical: number
  practical: number
  litres: number
  cost: number
  outOfRange: boolean
}

function computeCoat(coat: Coat, areaM2: number): CoatResult {
  const product = coat.choice.kind === 'catalog' ? productByCode.get(coat.choice.code) ?? null : null
  const volumeSolidsPct = coat.choice.kind === 'catalog' ? product?.volumeSolidsPct ?? 0 : toNum(coat.customVolumeSolidsPct)
  const dftMicrons = toNum(coat.dftMicrons)
  const theoretical = theoreticalCoverageM2PerL(volumeSolidsPct, dftMicrons)
  const practical = practicalCoverageM2PerL(theoretical)
  const litres = litresNeeded(areaM2, practical)
  const price = toNum(coat.pricePerLitre)
  const cost = lineCost(litres, price)
  const outOfRange =
    !!product && product.minMicrons != null && product.maxMicrons != null && dftMicrons > 0 && (dftMicrons < product.minMicrons || dftMicrons > product.maxMicrons)
  return { product, volumeSolidsPct, dftMicrons, theoretical, practical, litres, cost, outOfRange }
}

function newCoat(id: string): Coat {
  return {
    id,
    choice: { kind: 'catalog', code: usableProducts[0]?.code ?? '' },
    customName: '',
    customVolumeSolidsPct: '',
    dftMicrons: usableProducts[0]?.recommendedMicrons ?? '',
    pricePerLitre: '',
  }
}

function newSection(id: string, coatId: string, name = ''): Section {
  return {
    id,
    name,
    areaMode: 'direct',
    areaM2: '',
    shape: { kind: 'rectangle', widthM: '', heightM: '', diameterM: '', lengthM: '', includeEnds: true },
    coats: [newCoat(coatId)],
  }
}

// ── Shared field styling ──

const inputCls =
  'w-full rounded-lg border px-3 py-2 text-sm font-medium outline-none transition-colors focus:border-[#0070C0] focus:ring-2 focus:ring-[#0070C0]/15'
const inputStyle = { borderColor: 'rgba(26,43,94,0.15)', color: '#1A2B5E' }
const labelCls = 'block text-xs font-bold uppercase tracking-wide mb-1.5'
const labelStyle = { color: '#8899AE' }

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className={labelCls} style={labelStyle}>
        {label}
      </span>
      {children}
    </label>
  )
}

// ── Main component ──

export default function PaintCalculator() {
  const counter = useRef(1)
  const nextId = (prefix: string) => `${prefix}-${counter.current++}`

  const [sections, setSections] = useState<Section[]>(() => [newSection('section-0', 'coat-0', 'Job Section 1')])
  const [extras, setExtras] = useState<ExtraItem[]>([])

  const updateSection = (id: string, patch: Partial<Section>) =>
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, ...patch } : s)))

  const updateShape = (id: string, patch: Partial<ShapeState>) =>
    setSections((prev) => prev.map((s) => (s.id === id ? { ...s, shape: { ...s.shape, ...patch } } : s)))

  const updateCoat = (sectionId: string, coatId: string, patch: Partial<Coat>) =>
    setSections((prev) =>
      prev.map((s) =>
        s.id !== sectionId ? s : { ...s, coats: s.coats.map((c) => (c.id === coatId ? { ...c, ...patch } : c)) }
      )
    )

  const addSection = () => setSections((prev) => [...prev, newSection(nextId('section'), nextId('coat'), `Job Section ${prev.length + 1}`)])
  const removeSection = (id: string) => setSections((prev) => prev.filter((s) => s.id !== id))

  const addCoat = (sectionId: string) =>
    setSections((prev) => prev.map((s) => (s.id === sectionId ? { ...s, coats: [...s.coats, newCoat(nextId('coat'))] } : s)))
  const removeCoat = (sectionId: string, coatId: string) =>
    setSections((prev) => prev.map((s) => (s.id === sectionId ? { ...s, coats: s.coats.filter((c) => c.id !== coatId) } : s)))

  const addExtra = () => setExtras((prev) => [...prev, { id: nextId('extra'), name: '', litres: '', pricePerLitre: '' }])
  const updateExtra = (id: string, patch: Partial<ExtraItem>) =>
    setExtras((prev) => prev.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  const removeExtra = (id: string) => setExtras((prev) => prev.filter((e) => e.id !== id))

  const sectionComputations = useMemo(
    () =>
      sections.map((section) => {
        const area = sectionAreaM2(section)
        const coatResults = section.coats.map((coat) => ({ coat, result: computeCoat(coat, area) }))
        const totalDft = coatResults.reduce((sum, { result }) => sum + result.dftMicrons, 0)
        const totalLitres = coatResults.reduce((sum, { result }) => sum + result.litres, 0)
        const totalCost = coatResults.reduce((sum, { result }) => sum + result.cost, 0)
        return { section, area, coatResults, totalDft, totalLitres, totalCost }
      }),
    [sections]
  )

  const extrasTotal = extras.reduce((sum, e) => sum + toNum(e.litres) * toNum(e.pricePerLitre), 0)
  const extrasLitres = extras.reduce((sum, e) => sum + toNum(e.litres), 0)

  const grandLitres = sectionComputations.reduce((sum, s) => sum + s.totalLitres, 0) + extrasLitres
  const grandCost = sectionComputations.reduce((sum, s) => sum + s.totalCost, 0) + extrasTotal

  return (
    <div className="space-y-8">
      {sectionComputations.map(({ section, area, coatResults, totalDft, totalLitres, totalCost }) => (
        <div key={section.id} className="rounded-2xl border bg-white overflow-hidden" style={{ borderColor: 'rgba(26,43,94,0.10)' }}>
          {/* Section header */}
          <div className="p-5 sm:p-6 flex flex-wrap items-start gap-4 justify-between" style={{ background: '#FAFAF8', borderBottom: '1px solid rgba(26,43,94,0.08)' }}>
            <input
              value={section.name}
              onChange={(e) => updateSection(section.id, { name: e.target.value })}
              placeholder="e.g. Flat Bottom Hull Painting"
              className="font-sans font-black text-lg bg-transparent outline-none border-b border-transparent focus:border-[#0070C0] transition-colors flex-1 min-w-[220px]"
              style={{ color: '#1A2B5E' }}
            />
            {sections.length > 1 && (
              <button
                onClick={() => removeSection(section.id)}
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide cursor-pointer transition-colors hover:text-red-600"
                style={{ color: '#8899AE' }}
              >
                <Trash2 size={14} /> Remove Section
              </button>
            )}
          </div>

          <div className="p-5 sm:p-6 space-y-6">
            {/* Area input */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <p className="font-mono text-[10px] uppercase tracking-[2px]" style={{ color: '#F5A623' }}>
                  Surface Area
                </p>
                <div className="flex gap-1 ml-2">
                  {(['direct', 'shape'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => updateSection(section.id, { areaMode: mode })}
                      className={cn(
                        'px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide cursor-pointer transition-colors',
                        section.areaMode === mode ? 'text-white' : ''
                      )}
                      style={
                        section.areaMode === mode
                          ? { background: '#0070C0' }
                          : { background: 'rgba(26,43,94,0.06)', color: '#6B7A99' }
                      }
                    >
                      {mode === 'direct' ? 'Enter m² directly' : 'Calculate from shape'}
                    </button>
                  ))}
                </div>
              </div>

              {section.areaMode === 'direct' ? (
                <div className="max-w-xs">
                  <Field label="Area (m²)">
                    <input
                      type="number"
                      min={0}
                      value={section.areaM2}
                      onChange={(e) => updateSection(section.id, { areaM2: e.target.value === '' ? '' : Number(e.target.value) })}
                      className={inputCls}
                      style={inputStyle}
                      placeholder="0.00"
                    />
                  </Field>
                </div>
              ) : (
                <div className="rounded-xl p-4 space-y-4" style={{ background: 'rgba(0,112,192,0.04)', border: '1px solid rgba(0,112,192,0.12)' }}>
                  <div className="flex gap-2">
                    {(
                      [
                        { kind: 'rectangle' as const, label: 'Wall / Deck' },
                        { kind: 'cylinder' as const, label: 'Pipe (curved surface)' },
                        { kind: 'tank' as const, label: 'Cylindrical Tank' },
                      ]
                    ).map((opt) => (
                      <button
                        key={opt.kind}
                        onClick={() => updateShape(section.id, { kind: opt.kind })}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold cursor-pointer transition-colors"
                        style={
                          section.shape.kind === opt.kind
                            ? { background: '#1A2B5E', color: 'white' }
                            : { background: 'white', color: '#6B7A99', border: '1px solid rgba(26,43,94,0.12)' }
                        }
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>

                  {section.shape.kind === 'rectangle' && (
                    <div className="grid grid-cols-2 gap-4 max-w-md">
                      <Field label="Width (m)">
                        <input type="number" min={0} value={section.shape.widthM} onChange={(e) => updateShape(section.id, { widthM: e.target.value === '' ? '' : Number(e.target.value) })} className={inputCls} style={inputStyle} />
                      </Field>
                      <Field label="Height (m)">
                        <input type="number" min={0} value={section.shape.heightM} onChange={(e) => updateShape(section.id, { heightM: e.target.value === '' ? '' : Number(e.target.value) })} className={inputCls} style={inputStyle} />
                      </Field>
                    </div>
                  )}

                  {section.shape.kind === 'cylinder' && (
                    <div className="grid grid-cols-2 gap-4 max-w-md">
                      <Field label="Diameter (m)">
                        <input type="number" min={0} value={section.shape.diameterM} onChange={(e) => updateShape(section.id, { diameterM: e.target.value === '' ? '' : Number(e.target.value) })} className={inputCls} style={inputStyle} />
                      </Field>
                      <Field label="Length (m)">
                        <input type="number" min={0} value={section.shape.lengthM} onChange={(e) => updateShape(section.id, { lengthM: e.target.value === '' ? '' : Number(e.target.value) })} className={inputCls} style={inputStyle} />
                      </Field>
                    </div>
                  )}

                  {section.shape.kind === 'tank' && (
                    <div className="space-y-3 max-w-md">
                      <div className="grid grid-cols-2 gap-4">
                        <Field label="Diameter (m)">
                          <input type="number" min={0} value={section.shape.diameterM} onChange={(e) => updateShape(section.id, { diameterM: e.target.value === '' ? '' : Number(e.target.value) })} className={inputCls} style={inputStyle} />
                        </Field>
                        <Field label="Height (m)">
                          <input type="number" min={0} value={section.shape.heightM} onChange={(e) => updateShape(section.id, { heightM: e.target.value === '' ? '' : Number(e.target.value) })} className={inputCls} style={inputStyle} />
                        </Field>
                      </div>
                      <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer" style={{ color: '#6B7A99' }}>
                        <input type="checkbox" checked={section.shape.includeEnds} onChange={(e) => updateShape(section.id, { includeEnds: e.target.checked })} />
                        Include top &amp; bottom ends
                      </label>
                    </div>
                  )}

                  <p className="text-sm font-bold" style={{ color: '#1A2B5E' }}>
                    Computed area: <span style={{ color: '#0070C0' }}>{fmtNum(area)} m²</span>
                  </p>
                </div>
              )}
            </div>

            {/* Coats */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[2px] mb-3" style={{ color: '#F5A623' }}>
                Coats / Products
              </p>
              <div className="space-y-4">
                {coatResults.map(({ coat, result }) => (
                  <div key={coat.id} className="rounded-xl p-4" style={{ border: '1px solid rgba(26,43,94,0.10)' }}>
                    <div className="flex flex-wrap gap-4">
                      <div className="flex-1 min-w-[240px]">
                        <Field label="Product">
                          <select
                            value={coat.choice.kind === 'catalog' ? coat.choice.code : '__custom__'}
                            onChange={(e) => {
                              const value = e.target.value
                              if (value === '__custom__') {
                                updateCoat(section.id, coat.id, { choice: { kind: 'custom' } })
                              } else {
                                const product = productByCode.get(value)
                                updateCoat(section.id, coat.id, {
                                  choice: { kind: 'catalog', code: value },
                                  dftMicrons: product?.recommendedMicrons ?? coat.dftMicrons,
                                })
                              }
                            }}
                            className={inputCls}
                            style={inputStyle}
                          >
                            {PRODUCT_TYPE_ORDER.map((type) => (
                              <optgroup key={type} label={type}>
                                {usableProducts
                                  .filter((p) => p.type === type)
                                  .map((p) => (
                                    <option key={p.code} value={p.code}>
                                      {p.name} ({p.code})
                                    </option>
                                  ))}
                              </optgroup>
                            ))}
                            <optgroup label="Other">
                              <option value="__custom__">Custom product…</option>
                            </optgroup>
                          </select>
                        </Field>
                        {coat.choice.kind === 'catalog' && result.product?.application && (
                          <p className="text-xs mt-1.5 leading-snug" style={{ color: '#8899AE' }}>
                            {result.product.application}
                          </p>
                        )}
                      </div>

                      {coat.choice.kind === 'custom' && (
                        <>
                          <div className="w-full sm:w-48">
                            <Field label="Product name">
                              <input value={coat.customName} onChange={(e) => updateCoat(section.id, coat.id, { customName: e.target.value })} className={inputCls} style={inputStyle} placeholder="e.g. Hempel's AntiFouling" />
                            </Field>
                          </div>
                          <div className="w-32">
                            <Field label="Volume solids %">
                              <input type="number" min={0} max={100} value={coat.customVolumeSolidsPct} onChange={(e) => updateCoat(section.id, coat.id, { customVolumeSolidsPct: e.target.value === '' ? '' : Number(e.target.value) })} className={inputCls} style={inputStyle} />
                            </Field>
                          </div>
                        </>
                      )}

                      <div className="w-32">
                        <Field label="DFT (Microns)">
                          <input type="number" min={0} value={coat.dftMicrons} onChange={(e) => updateCoat(section.id, coat.id, { dftMicrons: e.target.value === '' ? '' : Number(e.target.value) })} className={inputCls} style={inputStyle} />
                        </Field>
                        {result.outOfRange && result.product && (
                          <p className="flex items-center gap-1 text-[11px] font-semibold mt-1" style={{ color: '#B91C1C' }}>
                            <AlertTriangle size={11} /> Outside {result.product.minMicrons}–{result.product.maxMicrons}µm range
                          </p>
                        )}
                      </div>

                      <div className="w-36">
                        <Field label="Price / litre (KES)">
                          <input type="number" min={0} value={coat.pricePerLitre} onChange={(e) => updateCoat(section.id, coat.id, { pricePerLitre: e.target.value === '' ? '' : Number(e.target.value) })} className={inputCls} style={inputStyle} placeholder="0.00" />
                        </Field>
                      </div>

                      {section.coats.length > 1 && (
                        <button
                          onClick={() => removeCoat(section.id, coat.id)}
                          className="self-end mb-0.5 p-2 rounded-lg cursor-pointer transition-colors hover:bg-red-50"
                          style={{ color: '#8899AE' }}
                          aria-label="Remove coat"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>

                    {/* Computed values */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4" style={{ borderTop: '1px dashed rgba(26,43,94,0.10)' }}>
                      <Stat label="Theoretical m²/L" value={fmtNum(result.theoretical)} />
                      <Stat label={`Practical m²/L (−${WASTAGE_PCT}%)`} value={fmtNum(result.practical)} />
                      <Stat label="Litres needed" value={fmtNum(result.litres)} accent />
                      <Stat label="Cost" value={fmtKES(result.cost)} accent />
                    </div>

                    <ContainerNote
                      product={result.product}
                      litres={result.litres}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={() => addCoat(section.id)}
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide cursor-pointer transition-colors"
                style={{ color: '#0070C0' }}
              >
                <Plus size={14} /> Add another coat
              </button>
            </div>

            {/* Section subtotal */}
            <div className="grid grid-cols-3 gap-4 rounded-xl p-4" style={{ background: '#1A2B5E' }}>
              <Stat label="Total system DFT" value={`${fmtNum(totalDft, 0)} µm`} light />
              <Stat label="Section litres" value={fmtNum(totalLitres)} light />
              <Stat label="Section cost" value={fmtKES(totalCost)} light gold />
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={addSection}
        className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-black tracking-widest uppercase cursor-pointer transition-all duration-200"
        style={{ border: '1px solid rgba(26,43,94,0.20)', color: '#1A2B5E' }}
      >
        <Plus size={14} /> Add Job Section
      </button>

      {/* Extras / thinners */}
      <div className="rounded-2xl border bg-white p-5 sm:p-6" style={{ borderColor: 'rgba(26,43,94,0.10)' }}>
        <div className="flex items-center justify-between mb-4">
          <p className="font-sans font-black text-lg" style={{ color: '#1A2B5E' }}>
            Thinners &amp; Extras
          </p>
          <button onClick={addExtra} className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide cursor-pointer" style={{ color: '#0070C0' }}>
            <Plus size={14} /> Add item
          </button>
        </div>
        {extras.length === 0 ? (
          <p className="text-sm" style={{ color: '#8899AE' }}>
            Add thinners or other supporting items priced directly by litres (no area/coverage calculation).
          </p>
        ) : (
          <div className="space-y-3">
            {extras.map((extra) => (
              <div key={extra.id} className="flex flex-wrap items-end gap-4">
                <div className="flex-1 min-w-[200px]">
                  <Field label="Item name">
                    <input value={extra.name} onChange={(e) => updateExtra(extra.id, { name: e.target.value })} className={inputCls} style={inputStyle} placeholder="e.g. Hempel's Thinner 08450" />
                  </Field>
                </div>
                <div className="w-32">
                  <Field label="Litres">
                    <input type="number" min={0} value={extra.litres} onChange={(e) => updateExtra(extra.id, { litres: e.target.value === '' ? '' : Number(e.target.value) })} className={inputCls} style={inputStyle} />
                  </Field>
                </div>
                <div className="w-36">
                  <Field label="Price / litre (KES)">
                    <input type="number" min={0} value={extra.pricePerLitre} onChange={(e) => updateExtra(extra.id, { pricePerLitre: e.target.value === '' ? '' : Number(e.target.value) })} className={inputCls} style={inputStyle} />
                  </Field>
                </div>
                <p className="text-sm font-bold pb-2.5" style={{ color: '#1A2B5E' }}>
                  {fmtKES(toNum(extra.litres) * toNum(extra.pricePerLitre))}
                </p>
                <button onClick={() => removeExtra(extra.id)} className="p-2 rounded-lg cursor-pointer hover:bg-red-50 mb-0.5" style={{ color: '#8899AE' }} aria-label="Remove item">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Grand total */}
      <div className="rounded-2xl p-6 sm:p-8" style={{ background: 'linear-gradient(135deg, #040D1A 0%, #0D1B45 60%, #040D1A 100%)' }}>
        <p className="font-mono text-[11px] uppercase tracking-[3px] mb-4" style={{ color: '#F5A623' }}>
          Job Total
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#8899AE' }}>
              Total Paint &amp; Thinners
            </p>
            <p className="font-sans font-black" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: 'white' }}>
              {fmtNum(grandLitres)} L
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#8899AE' }}>
              Estimated Total Cost
            </p>
            <p className="font-sans font-black" style={{ fontSize: 'clamp(28px, 4vw, 42px)', color: '#F5A623' }}>
              {fmtKES(grandCost)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function Stat({ label, value, accent, light, gold }: { label: string; value: string; accent?: boolean; light?: boolean; gold?: boolean }) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-wide" style={{ color: light ? 'rgba(255,255,255,0.55)' : '#8899AE' }}>
        {label}
      </p>
      <p
        className="font-sans font-black text-sm sm:text-base mt-0.5"
        style={{ color: gold ? '#F5A623' : light ? 'white' : accent ? '#0070C0' : '#1A2B5E' }}
      >
        {value}
      </p>
    </div>
  )
}

function ContainerNote({ product, litres }: { product: PaintProduct | null; litres: number }) {
  if (litres <= 0) return null
  const packs = product ? PACK_SIZES_BY_PRODUCT_CODE[product.code] : undefined
  const breakdown = containerBreakdown(litres, packs)

  if (breakdown) {
    return (
      <div className="flex items-center gap-2 mt-3 text-xs font-semibold" style={{ color: '#1A2B5E' }}>
        <span style={{ color: '#8899AE' }}>Containers:</span>
        {breakdown.map((b) => (
          <span key={b.label}>
            {b.count}× {b.label}
          </span>
        ))}
      </div>
    )
  }

  return (
    <p className="flex items-center gap-1.5 mt-3 text-[11px]" style={{ color: '#8899AE' }}>
      <ChevronDown size={11} className="rotate-[-90deg]" />
      Container/pack sizes for this product aren&apos;t loaded yet — litres above is exact, container count pending pack-size data.
    </p>
  )
}
