# scaflo-ui

A comprehensive React component library built on Tailwind CSS, providing accessible, customizable UI primitives for your projects.

## Installation

Install via your package manager of choice:

```bash
# npm
npm install @scaflo/ui

# yarn
yarn add @scaflo/ui

# pnpm
pnpm add @scaflo/ui
```

## Global CSS Setup

In your `index.css` (or equivalent global CSS file where you import Tailwind), add the following. These imports work with both Tailwind v3 and v4:

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";

/* for tailwind V4
@import "tailwindcss";*/

/* Import scaflo‑ui styles */
@import "../node_modules/@scaflo/ui/dist/index.css";
```

Ensure your Tailwind configuration (`tailwind.config.js`) includes this CSS file in its content paths and that your build pipeline processes it.

## Available Components

---

### Accordion

An accessible accordion component with customizable headers, panels, and icons.

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
} from "@scaflo/ui";
import { BookOpen } from "lucide-react";

<Accordion defaultIndex={0} onChange={(i) => console.log("Open idx:", i)}>
  <AccordionItem index={0}>
    <AccordionHeader icon={<BookOpen />} index={0}>
      How do I reset my password?
    </AccordionHeader>
    <AccordionContent index={0}>
      To reset your password, click “Forgot password” on the login page and follow the emailed link.
    </AccordionContent>
  </AccordionItem>
  {/* Additional items... */}
</Accordion>
```

**Props:**

* `defaultIndex?: number` — Which panel is open by default.
* `onChange?: (index: number) => void` — Fired when the active panel changes.
* `AccordionHeader` accepts:
  * `icon?: React.ReactNode`
  * `index: number`
* `AccordionContent` accepts:
  * `index: number`

---

### Avatar

A simple avatar component supporting different sizes and click handlers.

```tsx
import { Avatar } from "@scaflo/ui";

<Avatar
  src="https://example.com/user.jpg"
  size="2xl"
  onClick={() => console.log("Avatar clicked")}
/>
```

**Props:**

* `src?: string` — Image URL.
* `size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl"`
* `onClick?: () => void`

---

### Button

A fully styled button with variants and sizes.

```tsx
import { Button } from "@scaflo/ui";

<Button variant="solid" size="md" onClick={() => console.log("Clicked!")}>Click Me</Button>
```

**Props:**

* `variant?: "solid" | "outline" | "ghost"`
* `size?: "sm" | "md" | "lg"`
* `disabled?: boolean`
* Standard `<button>` props apply.

---

### Modal

An accessible modal/dialog component with motion variants.

```tsx
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@scaflo/ui";
import { useState } from "react";

function ExampleModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        variant="fade"
        size="3xl"
      >
        <ModalHeader>
          <h3>Modal Title</h3>
        </ModalHeader>
        <ModalBody>
          <p>This is the modal body content.</p>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

**Props:**

* `isOpen: boolean`
* `onClose: () => void`
* `variant?: "left" | "right" | "top" | "bottom" | "pop" | "fade" | "rotate" | "bounce"`
* `size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"`

---

### OTPInput

A one-time password (OTP) input component with state‑based styling overrides.

```tsx
import { OTPInput } from "@scaflo/ui";

<OTPInput
  length={6}
  autoFocus
  normalClassName="border-gray-300"
  filledClassName="border-blue-600"
  successClassName="border-green-600"
  errorClassName="border-red-600"
  focusClassName="focus:ring-blue-500"
  onChange={(val) => console.log("Current OTP:", val)}
  onComplete={(val) => console.log("Completed OTP:", val)}
/>
```

**Props:**

* `length?: number` — Number of digits (default `6`).
* `autoFocus?: boolean`
* `disabled?: boolean`
* Styling overrides:
  * `normalClassName?: string`
  * `filledClassName?: string`
  * `successClassName?: string`
  * `errorClassName?: string`
  * `focusClassName?: string`
* `onChange?: (value: string) => void`
* `onComplete?: (value: string) => void`

---

### ToastProvider & useToast

A context‑based toast notification system.

```tsx
import { useToast } from "@scaflo/ui";

function DemoToasts() {
  const { addToast } = useToast();

  const showToast = (type: "info" | "success" | "error" | "warning") => {
    addToast({
      type,
      title: `${type.charAt(0).toUpperCase() + type.slice(1)} Toast`,
      description: `This is a ${type} message.`,
      duration: 3000,
      position: "top-right",
    });
  };

  return (
    <div className="flex space-x-2">
      <Button onClick={() => showToast("info")}>Info</Button>
      <Button onClick={() => showToast("success")}>Success</Button>
      <Button onClick={() => showToast("error")}>Error</Button>
      <Button onClick={() => showToast("warning")}>Warning</Button>
    </div>
  );
}
```

**API:**

* Wrap your app in `<ToastProvider>`.
* `useToast()` returns `{ addToast: (options) => void }`.
* `addToast` options:
  * `type: "info" | "success" | "error" | "warning"`
  * `title: string`
  * `description?: string`
  * `duration?: number` (ms)
  * `position?: "top-left" | "top-right" | "bottom-left" | "bottom-right"`

---

## License

MIT © [Your Company]
