"use client"

import { Snowflake, Hash, Eye, TrendingDown, ChevronRight, Menu } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const actions = [
  { label: "Freeze Card", icon: Snowflake },
  { label: "Change PIN", icon: Hash },
  { label: "View CVV", icon: Eye },
  { label: "Set Spending Limit", icon: TrendingDown },
]

function ActionButton({ action }) {
  return (
    <button className="flex h-25 items-center gap-3 rounded-xl bg-accent px-4 py-3.5 text-accent-foreground transition-all hover:brightness-95 active:scale-[0.98]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#ffffff20]">
        <action.icon className="h-5 w-5" />
      </div>
      <span className="flex-1 text-left text-sm font-semibold">{action.label}</span>
      <ChevronRight className="h-4 w-4 shrink-0 opacity-60" />
    </button>
  )
}

export function CardActions() {
  return (
    <>
      {/* Desktop: full action list in 2 columns */}
      <div className="hidden lg:block">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Card Actions
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {actions.map((action) => (
            <ActionButton key={action.label} action={action} />
          ))}
        </div>
      </div>

      {/* Mobile / Tablet: hamburger that opens a sheet drawer */}
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <button className="flex items-center gap-2 rounded-xl bg-accent py-3 text-accent-foreground transition-all hover:brightness-95 active:scale-[0.98]">
              <Menu className="h-5 w-5" />
              <span className="text-sm font-semibold">Card Actions</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 bg-background">
            <SheetHeader>
              <SheetTitle className="text-foreground">Card Actions</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2.5 pt-4">
              {actions.map((action) => (
                <ActionButton key={action.label} action={action} />
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
