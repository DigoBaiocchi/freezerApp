"use client"

import * as React from "react"

import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { IndividualTableData } from "./IndividualTables/Table";
import { IndividualTables } from "@/api/api";
import { FieldApi } from "@tanstack/react-form";

type Data = {
  id: number
  name: string
}

type ComboboxResponsiveProps = {
    tableName: IndividualTables;
    field: FieldApi<any, any, any, any, any>;
    data: IndividualTableData;
};

export function ComboBoxResponsive({ data, tableName, field }: ComboboxResponsiveProps) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const [selectedStatus, setSelectedStatus] = React.useState<Data | null>(null)

    React.useEffect(() => {
        if (field.state.value === '') {
            setSelectedStatus(null);
        }
    }, [field.state.value])

    if (isDesktop) {
        return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
            <Button variant="outline" className="w-[280px] justify-start">
                {selectedStatus ? <>{selectedStatus.name}</> : <>+ Select {tableName}</>}
            </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[280px] p-0" align="start">
            <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} data={data} field={field} />
            </PopoverContent>
        </Popover>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
            <Button variant="outline" className="w-[280px] justify-start">
            {selectedStatus ? <>{selectedStatus.name}</> : <>+ Select {tableName}</>}
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <div className="mt-4 border-t">
            <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} data={data} field={field} />
            </div>
        </DrawerContent>
        </Drawer>
    )
}

function StatusList({
    setOpen,
    setSelectedStatus,
    data,
    field
}: {
    setOpen: (open: boolean) => void
    setSelectedStatus: (status: Data | null) => void
    data: IndividualTableData
    field: FieldApi<any, any, any, any, any>;
}) {
    return (
        <Command>
        <CommandInput placeholder="Filter status..." />
        <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
            {data.map((status) => (
                <CommandItem
                key={status.id}
                value={status.name}
                onSelect={(value) => {
                    setSelectedStatus(
                        data.find((priority) => priority.name === value) || null
                    )
                    setOpen(false)
                    field.handleChange(status.id)
                }}
                >
                {status.name}
                </CommandItem>
            ))}
            </CommandGroup>
        </CommandList>
        </Command>
    )
}
