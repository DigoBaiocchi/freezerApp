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

type dropdrownData = {
    id: number
    name: string
}

type ComboBoxSimpleProps = {
    data: IndividualTableData;
    setSelectedCategory: (data: dropdrownData | null) => void;
    selectedCategory: dropdrownData | null| undefined;
};

export function ComboboxSimple({ data, setSelectedCategory, selectedCategory }: ComboBoxSimpleProps) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
//   const [selectedStatus, setSelectedStatus] = React.useState<Data | null>(
//     null
//   )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedCategory ? <> {selectedCategory.name}</> : <>+ Set status</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedCategory} data={data} />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedCategory ? <>{selectedCategory.name}</> : <>+ Set status</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedCategory} data={data} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function StatusList({
  setOpen,
  setSelectedStatus,
  data,
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: dropdrownData | null) => void
  data: IndividualTableData
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
                    data.find((data) => data.name === value) || null
                    )
                    setOpen(false)
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
