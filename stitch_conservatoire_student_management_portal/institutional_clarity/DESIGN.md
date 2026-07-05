---
name: Institutional Clarity
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#43474f'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#737780'
  outline-variant: '#c3c6d1'
  surface-tint: '#3a5f94'
  primary: '#001e40'
  on-primary: '#ffffff'
  primary-container: '#003366'
  on-primary-container: '#799dd6'
  inverse-primary: '#a7c8ff'
  secondary: '#005db6'
  on-secondary: '#ffffff'
  secondary-container: '#63a1ff'
  on-secondary-container: '#00376f'
  tertiary: '#181f25'
  on-tertiary: '#ffffff'
  tertiary-container: '#2d343a'
  on-tertiary-container: '#959ca4'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d5e3ff'
  primary-fixed-dim: '#a7c8ff'
  on-primary-fixed: '#001b3c'
  on-primary-fixed-variant: '#1f477b'
  secondary-fixed: '#d6e3ff'
  secondary-fixed-dim: '#a9c7ff'
  on-secondary-fixed: '#001b3d'
  on-secondary-fixed-variant: '#00468c'
  tertiary-fixed: '#dce3eb'
  tertiary-fixed-dim: '#c0c7cf'
  on-tertiary-fixed: '#151c22'
  on-tertiary-fixed-variant: '#40484e'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-lg:
    fontFamily: Public Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Public Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Public Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  headline-sm:
    fontFamily: Public Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Public Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Public Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Public Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Public Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 40px
  xl: 64px
  container-max: 1200px
  gutter: 24px
---

## Brand & Style

The brand personality is authoritative yet approachable, designed to instill a sense of security and civic duty in students and parents. This design system employs a **Corporate / Modern** aesthetic that prioritizes clarity, efficiency, and trust. 

The visual language avoids unnecessary decoration, focusing instead on a structured hierarchy that guides the user through the registration process without friction. It balances the formality of a government institution with the sleekness of modern SaaS, ensuring that administrative tasks feel progressive rather than bureaucratic. The emotional goal is to evoke confidence, stability, and ease of use.

## Colors

The palette is anchored in a deep **Midnight Blue** (Primary) to signify authority and tradition. A more vibrant **Registry Blue** (Secondary) is used for interactive elements like primary buttons and active states to provide visual momentum. 

Backgrounds utilize **Crisp White** and **Subtle Grey** surfaces to maintain a clean, high-contrast environment essential for accessibility. Semantic colors (Success, Warning, Error) are desaturated slightly to align with the professional tone, ensuring they provide clear feedback without appearing overly aggressive.

## Typography

The design system utilizes **Public Sans** across all levels. Originally designed for government use, it offers exceptional legibility and a neutral, institutional tone. 

- **Headlines** use a bolder weight and tighter letter-spacing to command attention and establish structure.
- **Body text** is set with generous line heights to ensure readability during long form-filling sessions.
- **Labels** are semi-bold to distinguish them clearly from input data, emphasizing the "question and answer" flow of student registration.

## Layout & Spacing

This design system follows a **Fixed Grid** philosophy for desktop to maintain a professional, centered "document" feel, while transitioning to a fluid model for mobile devices. 

- **Desktop:** A 12-column grid with a 1200px max-width. Large 40px margins create a "form-center" focus.
- **Tablet:** 8-column grid with 24px gutters.
- **Mobile:** 4-column grid with 16px gutters and margins.

Spacing is based on a **4px baseline rhythm**. For form layouts, use vertical stacks with 24px (md) spacing between form groups and 8px (xs) spacing between labels and their respective inputs.

## Elevation & Depth

To maintain a sense of stability, the system uses **Tonal Layers** rather than heavy shadows. 

- **Level 0 (Base):** Subtle Grey (#F5F7F9) for the main application background.
- **Level 1 (Cards/Containers):** Pure White surfaces with a fine 1px border (#D1D5DB). This is the primary container for forms and registration data.
- **Level 2 (Dropdowns/Modals):** Use a soft, low-opacity ambient shadow (Blur: 12px, Y: 4px, Color: rgba(0, 51, 102, 0.08)) to indicate temporary overlays.

This "Flat-Plus" approach ensures the interface feels modern and digital-native without sacrificing the grounded feel of a government service.

## Shapes

The design system uses a **Soft** shape language. A 0.25rem (4px) base radius is applied to buttons and input fields to provide a modern touch while maintaining a serious, rectilinear structure. 

Larger containers like registration cards or progress panels may use the **rounded-lg** (8px) token to subtly soften the overall composition of the page. This balance prevents the UI from feeling too sharp/aggressive or too "bubbly"/casual.

## Components

### Buttons
- **Primary:** Solid Secondary Blue (#005EB8) with white text. High contrast, sharp but slightly rounded corners.
- **Secondary:** Outlined with a 1px Midnight Blue border. Used for "Back" or "Cancel" actions.

### Input Fields
- **Default:** White background, 1px grey border. On focus, the border thickens and changes to Secondary Blue with a subtle 2px outer glow.
- **Validation:** Clear red (#D32F2F) error messages positioned 4px below the input, with the input border matching the error color.

### Progress Steppers
- A horizontal or vertical indicator showing registration steps (e.g., Personal Info > Course Selection > Payment). Completed steps feature a checkmark icon to provide a sense of accomplishment.

### Data Privacy Banners
- Subtle, full-width "Level 0" grey banners at the top of forms to remind users that their data is encrypted and secure, using a small padlock icon.

### Cards
- Used to group related registration information. They should have a 1px border and no shadow to keep the layout feeling clean and organized.