"use client"

import * as React from "react"
import { useEffect,useState } from "react"
import { Check, ChevronsUpDown, PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import axios from "axios"

export default function Commbox({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState([])

  const API_URL = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    fetchAllCategory()
  }, [])

  const fetchAllCategory = async () => {
  try {
    const res = await axios.get(`${API_URL}/api/all-category`);
    if (res.data && res.data.allCategories) {
      const formatted = res.data.allCategories.map((cat) => ({
        value: cat.name.toLowerCase(),
        label: cat.name,
      }));
      setCategories(formatted);
    }
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }
};

  const handleSelect = (currentValue) => {
    const newValue = currentValue === value ? "" : currentValue
    onChange(newValue)
    setOpen(false)
  }

  const handleAddCustom = () => {
    if (!searchTerm.trim()) return
    const newCategory = { value: searchTerm.toLowerCase(), label: searchTerm }
    setCategories((prev) => [...prev, newCategory])
    onChange(newCategory.value)
    setOpen(false)
  }

  const filtered = categories.filter((cat) =>
    cat.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between"
        >
          {value
            ? categories.find((cat) => cat.value === value)?.label
            : "Select or add category..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput
            placeholder="Search or type category..."
            className="h-9"
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandList>
            <CommandEmpty>No category found.</CommandEmpty>
            <CommandGroup>
              {filtered.map((cat) => (
                <CommandItem
                  key={cat.value}
                  value={cat.value}
                  onSelect={handleSelect}
                >
                  {cat.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === cat.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>

            {/* Custom Add Option */}
            {searchTerm &&
              !categories.some(
                (cat) => cat.label.toLowerCase() === searchTerm.toLowerCase()
              ) && (
                <CommandGroup>
                  <CommandItem onSelect={handleAddCustom}>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add “{searchTerm}”
                  </CommandItem>
                </CommandGroup>
              )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
