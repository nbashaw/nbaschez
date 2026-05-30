"use client";

import { useEffect, useState } from "react";
import { Menu } from "@base-ui/react";
import { Check, Monitor, Moon, Settings, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme, type Theme } from "./theme-context";

export function SettingsMenu() {
  const { theme, setTheme, baseballMode, setBaseballMode } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch and menu internals on server
  if (!mounted) {
    return (
      <div
        className="fixed top-4 right-4 z-[70] h-9 w-9"
        aria-hidden="true"
      />
    );
  }

  const handleThemeChange = (value: string) => {
    setTheme(value as Theme);
  };

  return (
    <Menu.Root>
      <Menu.Trigger
        className={cn(
          "fixed top-4 right-4 z-[70] flex h-9 w-9 items-center justify-center",
          "rounded-full border border-border bg-background/80 backdrop-blur-md",
          "hover:bg-muted transition-all active:scale-[0.96]",
          "data-[popup-open]:bg-muted"
        )}
        aria-label="Settings"
      >
        <Settings className="h-4 w-4" />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner
          className="z-[80]"
          sideOffset={6}
          align="end"
          collisionPadding={8}
        >
          <Menu.Popup
            className={cn(
              "min-w-[168px] rounded-xl border border-border bg-popover/95 p-1 shadow-lg backdrop-blur-xl",
              "text-popover-foreground outline-none",
              "data-[open]:opacity-100 data-[closed]:opacity-0",
              "data-[open]:scale-100 data-[closed]:scale-[0.96]",
              "origin-top-right transition-all duration-100 ease-out"
            )}
          >
            {/* Appearance section */}
            <div className="px-2 pb-1 pt-2">
              <div className="text-[10px] font-medium uppercase tracking-[0.5px] text-muted-foreground">
                Appearance
              </div>
            </div>

            <Menu.RadioGroup value={theme} onValueChange={handleThemeChange}>
              <Menu.RadioItem
                value="light"
                closeOnClick={false}
                className={cn(
                  "group flex w-full cursor-default select-none items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm",
                  "outline-none hover:bg-accent hover:text-accent-foreground",
                  "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
                  "data-[checked]:text-foreground"
                )}
              >
                <Sun className="h-4 w-4 text-muted-foreground group-data-[checked]:text-foreground" />
                <span className="flex-1">Light</span>
                <Menu.RadioItemIndicator>
                  <Check className="h-3.5 w-3.5" />
                </Menu.RadioItemIndicator>
              </Menu.RadioItem>

              <Menu.RadioItem
                value="dark"
                closeOnClick={false}
                className={cn(
                  "group flex w-full cursor-default select-none items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm",
                  "outline-none hover:bg-accent hover:text-accent-foreground",
                  "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
                  "data-[checked]:text-foreground"
                )}
              >
                <Moon className="h-4 w-4 text-muted-foreground group-data-[checked]:text-foreground" />
                <span className="flex-1">Dark</span>
                <Menu.RadioItemIndicator>
                  <Check className="h-3.5 w-3.5" />
                </Menu.RadioItemIndicator>
              </Menu.RadioItem>

              <Menu.RadioItem
                value="system"
                closeOnClick={false}
                className={cn(
                  "group flex w-full cursor-default select-none items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm",
                  "outline-none hover:bg-accent hover:text-accent-foreground",
                  "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground",
                  "data-[checked]:text-foreground"
                )}
              >
                <Monitor className="h-4 w-4 text-muted-foreground group-data-[checked]:text-foreground" />
                <span className="flex-1">System</span>
                <Menu.RadioItemIndicator>
                  <Check className="h-3.5 w-3.5" />
                </Menu.RadioItemIndicator>
              </Menu.RadioItem>
            </Menu.RadioGroup>

            <Menu.Separator className="mx-1 my-1 h-px bg-border" />

            {/* Effects section */}
            <div className="px-2 pb-1 pt-1.5">
              <div className="text-[10px] font-medium uppercase tracking-[0.5px] text-muted-foreground">
                Effects
              </div>
            </div>

            <Menu.CheckboxItem
              checked={baseballMode}
              onCheckedChange={setBaseballMode}
              closeOnClick={false}
              className={cn(
                "group flex w-full cursor-default select-none items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm",
                "outline-none hover:bg-accent hover:text-accent-foreground",
                "data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground"
              )}
            >
              <span className="flex-1">Baseball mode</span>
              <Menu.CheckboxItemIndicator>
                <Check className="h-3.5 w-3.5" />
              </Menu.CheckboxItemIndicator>
            </Menu.CheckboxItem>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}
