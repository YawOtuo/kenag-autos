import Link, { type LinkProps } from "next/link"
import type { AnchorHTMLAttributes } from "react"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type LinkButtonProps = LinkProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  VariantProps<typeof buttonVariants>

function LinkButton({
  className,
  variant = "default",
  size = "default",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      data-slot="link-button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { LinkButton }
