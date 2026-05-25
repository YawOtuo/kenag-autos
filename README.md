# KENAG Spare Parts & Motors

Vehicle import business based in **Kumasi, Ghana**. Imports used vehicles from the US, Europe, and Asia — with ready stock in Kumasi and custom auction sourcing via Copart, IAAI, and dealer channels.

## Stack

| Layer | Technology |
|---|---|
| Framework | **Next.js 14+ (App Router)** |
| Styling | **Tailwind CSS + shadcn/ui** |
| Animations | **Framer Motion** |
| Content | **Sanity CMS** |
| Forms | **Server Actions → Resend** (no database) |
| Fonts | **Inter via next/font** |
| Images | **next/image + Sanity image pipeline** |
| Deployment | **Vercel** |

No separate backend. No database. Content managed through Sanity Studio at `/studio`. Form submissions email the business via Resend.

---

## Architecture pattern

Every feature component follows a strict separation of concerns:

```
hooks/       ← data fetching, state, filters, form logic (no JSX)
components/  ← presentation (consumes hooks, renders ui primitives)
  ui/        ← shadcn primitives (pure, no business logic)
```

A component never contains data logic inline — it imports a hook.

```
┌─────────────────────────────────────────────────┐
│  VehicleGrid (component)                         │
│  ├── uses useVehicles()         ← hook           │
│  ├── uses useVehicleFilter()    ← hook            │
│  └── renders <VehicleCard />    ← presentation    │
│          └── uses <Badge />     ← shadcn/ui       │
└─────────────────────────────────────────────────┘
```

---

## Sanity schemas

### `vehicle`

| Field | Type | Notes |
|---|---|---|
| `title` | string | e.g. "2022 Toyota RAV4 Hybrid" |
| `slug` | slug | unique URL-friendly identifier |
| `status` | string | `"available"` or `"sold"` |
| `category` | string | `"sedan"`, `"suv"`, or `"pickup"` |
| `year` | number | |
| `make` | string | Toyota, Honda, etc. |
| `model` | string | Camry, CR-V, etc. |
| `mileage` | string | e.g. "66,899 mi" |
| `vin` | string | VIN number |
| `source` | string | US / Europe / Asia |
| `description` | text | |
| `images` | array of image | with order |
| `featured` | boolean | show on homepage |
| `soldDate` | date | only when status is sold |

### `arrival`

| Field | Type |
|---|---|
| `title` | string |
| `slug` | slug |
| `vehicle` | reference → vehicle |
| `sourceCountry` | string |
| `estimatedArrival` | string |
| `currentStatus` | string — `"in-transit"`, `"clearing"`, `"in-kumasi"` |
| `images` | array of image |
| `acceptingInterest` | boolean |

### `testimonial`

| Field | Type |
|---|---|
| `customerName` | string |
| `text` | text |
| `rating` | number (1–5) |
| `vehiclePurchased` | reference → vehicle (optional) |

---

## Routes

| Route | Page | Data |
|---|---|---|
| `/` | Landing | Sanity — vehicles (available + sold), content blocks |
| `/arriving-soon` | Inbound vehicles | Sanity — arrivals |
| `/studio` | Sanity Studio | Sanity |
| Loading | `loading.tsx` per route — skeleton matching card dimensions + shimmer | |
| Error | `error.tsx` per segment — friendly fallback + retry button | |

---

## States (all data-driven components)

Every component that fetches from Sanity handles four states:

| State | Handling |
|---|---|
| **Loading** | Suspense + skeleton matching card dimensions; CSS shimmer animation |
| **Empty** | "No vehicles match this filter" / "No arrivals yet" — friendly message |
| **Error** | Fetch fails → `error.tsx` with retry button (no crash, no blank page) |
| **Success** | Normal render with data |

---

## Animations

Uses **Framer Motion** for all animation. No custom keyframes needed.

| Element | Animation | Trigger |
|---|---|---|
| Hero headline, subtitle, buttons | `fadeInUp` — staggered, each child +0.1s delay | Page load |
| Vehicle cards | `fadeInUp` — staggerChildren, 0.08s between each card | Scroll into view |
| Gallery modal | `scale` + `opacity` — mount/unmount via AnimatePresence | Button click |
| Process step cards | `slideInLeft` / `slideInRight` — alternating | Scroll into view |
| Parts band, contact section | `fadeInUp` — single element | Scroll into view |
| Filter transitions | layout prop + AnimatePresence — smooth card enter/exit | Filter change |
| Page transitions | Quick fade (opacity 0→1, 200ms) | Route change |

---

## Vehicle states

| Status | Card appearance | CTA |
|---|---|---|
| **Available** | Full colour, normal card | "Enquire" button → RequestForm |
| **Sold** | Dimmed/opacity, large "Sold" badge overlay | No CTA — visible as social proof |

### Filtering

- **Category filter** — All / Sedans / SUVs / Pickups
- **Status filter** — All / Available / Sold (combined with category)
- Both filters active simultaneously
- Empty state when no vehicles match combined filters

### GROQ queries

```groovy
// Available vehicles (homepage default)
*[_type == "vehicle" && status == "available"] | order(year desc)

// Sold vehicles
*[_type == "vehicle" && status == "sold"] | order(soldDate desc)

// Featured available
*[_type == "vehicle" && status == "available" && featured == true]

// Inbound arrivals
*[_type == "arrival"] | order(estimatedArrival asc)
```

---

## Server Actions

```ts
async function submitRequest(formData: FormData): Promise<{ success: boolean; errors?: Record<string, string> }>
// Fields: name, phone, vehicle, source, budget
// Client-side validation: required fields, phone regex
// Server-side validation: sanitise strings, verify required fields present
// Anti-spam: hidden honeypot field (reject if filled)
// On success → email via Resend to CONTACT_EMAIL
// On failure → return field-level error messages

async function registerInterest(formData: FormData): Promise<{ success: boolean; errors?: Record<string, string> }>
// Fields: name, phone, vehicle (arriving)
// Same validation pattern as above
```

---

## Image pipeline

- Vehicle photos stored in **Sanity** (uploaded via Studio) or in **`public/assets/`** for static images
- Sanity images served via `@sanity/image-url` + `next/image` for automatic optimisation (WebP, resizing, lazy loading)
- Existing `assets/` photos (kenag-hero.png, spare-parts.png, vehicle-*.png) → migrated to `public/assets/`
- Vehicle photo sets (RAV4, Jetta) → imported into Sanity as part of seed data

---

## Hooks (data logic separated from components)

Each hook encapsulates a single concern — fetching, filtering, form state, UI state. Components consume hooks and never contain raw data logic.

| Hook | Purpose | Returns |
|---|---|---|
| `useVehicles` | Fetch vehicles from Sanity | `{ vehicles, isLoading, error }` |
| `useVehicle` | Fetch single vehicle by slug/id | `{ vehicle, isLoading, error }` |
| `useArrivals` | Fetch arrivals from Sanity | `{ arrivals, isLoading, error }` |
| `useVehicleFilter` | Manage category + status filter state | `{ category, status, setCategory, setStatus, reset }` |
| `useFilteredVehicles` | Combines `useVehicles` + `useVehicleFilter` | `{ filteredVehicles, category, status, setCategory, setStatus, isLoading, error }` |
| `useGallery` | Gallery modal state, current image index, navigation | `{ isOpen, currentIndex, images, open, close, next, prev, setIndex }` |
| `useRequestForm` | Form state, validation, submit via Server Action | `{ fields, errors, isSubmitting, handleChange, handleSubmit }` |
| `useInterestForm` | Same pattern for arriving-soon interest form | `{ fields, errors, isSubmitting, handleChange, handleSubmit }` |

### Hook usage example

```ts
// hooks/useFilteredVehicles.ts
export function useFilteredVehicles() {
  const { vehicles, isLoading, error } = useVehicles();
  const { category, status, setCategory, setStatus } = useVehicleFilter();

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const matchCategory = category === "all" || v.category === category;
      const matchStatus = status === "all" || v.status === status;
      return matchCategory && matchStatus;
    });
  }, [vehicles, category, status]);

  return { filteredVehicles: filtered, category, status, setCategory, setStatus, isLoading, error };
}
```

```tsx
// components/home/VehicleGrid.tsx — thin, no data logic
"use client";
import { useFilteredVehicles } from "@/hooks/useFilteredVehicles";
import { VehicleCard } from "./VehicleCard";
import { VehicleCardSkeleton } from "./VehicleCardSkeleton";
import { AnimatePresence } from "framer-motion";

export function VehicleGrid() {
  const { filteredVehicles, category, status, setCategory, setStatus, isLoading, error } =
    useFilteredVehicles();

  if (error) return <ErrorMessage />;
  if (isLoading) return <VehicleGridSkeleton />;
  if (filteredVehicles.length === 0) return <EmptyState />;

  return (
    <AnimatePresence mode="popLayout">
      {filteredVehicles.map((vehicle) => (
        <VehicleCard key={vehicle._id} vehicle={vehicle} />
      ))}
    </AnimatePresence>
  );
}
```

---

## Component tree

```
components/
├── ui/                            # shadcn primitives (pure, no logic)
│   ├── button.tsx
│   ├── badge.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── select.tsx
│   ├── dialog.tsx
│   ├── sheet.tsx
│   └── label.tsx
├── layout/
│   ├── SiteHeader.tsx             # sticky nav, mobile Sheet from shadcn
│   └── SiteFooter.tsx
├── home/
│   ├── Hero.tsx
│   ├── QuickSearch.tsx
│   ├── IntroSection.tsx
│   ├── VehicleGrid.tsx            # uses useFilteredVehicles
│   ├── VehicleCard.tsx            # pure — receives vehicle as prop
│   ├── VehicleCardSkeleton.tsx
│   ├── GalleryModal.tsx           # uses useGallery, wraps shadcn Dialog
│   ├── RequestForm.tsx            # uses useRequestForm
│   ├── ProcessSteps.tsx
│   ├── PartsBand.tsx
│   └── ContactSection.tsx
├── arriving-soon/
│   ├── ArrivalGrid.tsx            # uses useArrivals
│   ├── ArrivalCard.tsx            # pure — receives arrival as prop
│   └── InterestForm.tsx           # uses useInterestForm
└── shared/
    ├── StatusBadge.tsx            # pure — receives status as prop
    ├── WhatsAppButton.tsx
    └── FadeInUp.tsx               # reusable scroll-reveal
```

---

## Implementation steps

### 1. Scaffold
- `create-next-app` with App Router + TypeScript + Tailwind
- `npx shadcn@latest init` — set up components/ui/
- Add shadcn components: button, badge, card, input, select, dialog, sheet, label
- Install: `framer-motion`, `next-sanity`, `resend`, `lucide-react`, `@sanity/image-url`
- Configure `next/font` with Inter
- Set up `tailwind.config.ts` with paper/charcoal/red colour palette

### 2. Sanity CMS
- Run `npm create sanity@latest --project rgaaywbj --dataset production --template clean --typescript --output-path studio-kenag`
- Define schemas: vehicle, arrival, testimonial
- Embed Sanity Studio in Next.js at `/studio/[[...index]]/page.tsx`
- Set up Sanity client in `lib/sanity.ts` with image URL builder
- Seed initial data matching existing inventory

### 3. Hooks
- `useVehicles`, `useVehicle`, `useArrivals` — Sanity fetch with loading/error states
- `useVehicleFilter` — category + status filter state
- `useFilteredVehicles` — combines fetch + filter
- `useGallery` — modal open/close, image index, prev/next
- `useRequestForm`, `useInterestForm` — form validation + submit

### 4. Shared foundation
- `FadeInUp` scroll-reveal wrapper
- `StatusBadge` — renders correct colour/label for each status
- `WhatsAppButton` — floating button with `wa.me` link
- `loading.tsx` per route with skeleton components
- `error.tsx` per route with retry fallback
- Form validation helpers + honeypot anti-spam

### 5. Landing page
- Convert existing HTML sections to Tailwind + shadcn components with Framer Motion animations
- Components consume hooks — no inline data logic
- All sections wrapped with `FadeInUp` for scroll-reveal

### 6. Arriving soon page
- `ArrivalGrid` uses `useArrivals`, renders `ArrivalCard`
- `InterestForm` uses `useInterestForm`

### 7. Deploy
- Push to GitHub
- Connect to Vercel
- Env vars: `NEXT_PUBLIC_SANITY_PROJECT_ID`, `SANITY_API_TOKEN`, `RESEND_API_KEY`, `CONTACT_EMAIL`
- Custom domain

---

## Project structure

```
├── app/
│   ├── layout.tsx
│   ├── loading.tsx
│   ├── error.tsx
│   ├── page.tsx
│   ├── arriving-soon/
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── page.tsx
│   └── studio/[[...index]]/page.tsx
├── components/
│   ├── ui/
│   ├── layout/
│   ├── home/
│   ├── arriving-soon/
│   └── shared/
├── hooks/
│   ├── useVehicles.ts
│   ├── useVehicle.ts
│   ├── useArrivals.ts
│   ├── useVehicleFilter.ts
│   ├── useFilteredVehicles.ts
│   ├── useGallery.ts
│   ├── useRequestForm.ts
│   └── useInterestForm.ts
├── lib/
│   ├── sanity.ts
│   ├── resend.ts
│   ├── actions.ts
│   └── validations.ts
├── sanity/
│   ├── schemas/
│   │   ├── vehicle.ts
│   │   ├── arrival.ts
│   │   └── testimonial.ts
│   ├── sanity.config.ts
│   └── sanity.cli.ts
├── public/assets/
├── tailwind.config.ts
└── next.config.js
```

---

## Getting started

```sh
npm install
npm run dev
```

### Required env vars

| Variable | Source |
|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity dashboard |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `SANITY_API_TOKEN` | Sanity API token |
| `RESEND_API_KEY` | Resend dashboard |
| `CONTACT_EMAIL` | Where form leads go |
# kenag-autos
