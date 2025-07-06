import type { ButtonProps } from "@mui/material"

export type SidebarAction = {
    variant: ButtonProps["variant"],
    label: string,
    execute: () => void,
    disabled?: boolean
}

export type SidebarActions = SidebarAction[]

