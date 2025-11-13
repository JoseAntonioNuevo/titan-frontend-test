# TitanOS Frontend Test

A Connected TV (CTV) horizontal carousel implementation featuring static-focus navigation where the focused item remains in position while the list moves underneath.

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript 5**
- **Tailwind CSS 4**
- **Zustand 5** (State Management)
- **Vitest** (Unit Testing)
- **next/image** (Optimized Image Loading)

## Features

- Static-focus carousel navigation (focused item stays in first position)
- Keyboard-driven navigation (Arrow Left/Right)
- Smooth CSS transitions with hardware acceleration
- Server-side data fetching from TitanOS API
- Responsive image optimization with automatic format selection (WebP/AVIF)
- Comprehensive unit tests for state management logic

## Setup & Installation

Ensure you have **Node.js 18+** and **pnpm** installed.

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
# Development
pnpm dev

# Production build
pnpm build
pnpm start

# Testing
pnpm test          # Run tests once
pnpm test:watch    # Run tests in watch mode

# Linting
pnpm lint
```

## Testing

Unit tests are implemented using Vitest and cover the core navigation logic in `useCarouselStore`. Run tests with:

```bash
pnpm test
```

Test coverage includes:
- Initial state validation
- Navigation bounds (clamping at min/max indices)
- Edge cases (empty lists, boundary conditions)
- Full navigation sequences

## Project Structure

```
├── app/
│   ├── page.tsx          # Main page with SSR data fetching
│   ├── loading.tsx       # Loading state UI
│   └── layout.tsx        # Root layout
├── components/
│   └── Carousel.tsx      # Client-side carousel component
├── store/
│   └── useCarouselStore.ts  # Zustand state management
├── types.ts              # TypeScript type definitions
└── __tests__/
    └── store.test.ts     # Unit tests
```

## Navigation

Use **Arrow Left** and **Arrow Right** keys to navigate through the carousel. The focused item (highlighted with white border and increased scale) remains statically positioned while the list translates horizontally.


## Discussion Question

**Question:** Frontend Architecture & State Management - Describe how you would architect the frontend to handle complex state (user preferences, content data, navigation focus) across multiple screen types and input methods. How would you structure your components and manage data flow as users navigate with remote controls?

**Answer:**  I’d structure the frontend around a layered architecture that keeps presentation, state, and navigation logic clearly separated.

At the component level, I’d follow an atomic approach — small, reusable components that focus purely on rendering and receive all data via props. This helps maintain consistency and makes it easier to adapt layouts across screen types.

For state management, I’d combine a lightweight global store (like Zustand) for user preferences and session data, with TanStack Query for server state — handling caching, background updates, and syncing content efficiently. Transient UI state like focus or temporary selections would stay local to components.

Navigation and input would run through a custom controller that unifies remote, keyboard, and touch inputs. That way, focus management remains device-agnostic and predictable, regardless of how users interact.

To support evolving needs, I’d integrate feature flags for conditional UI and behavior toggles across devices — allowing smooth rollouts or A/B testing without code fragmentation.

Finally, I’d ensure scalability with route-based code splitting, virtualized lists, and clear error boundaries — so performance and resilience stay high even as the app grows.