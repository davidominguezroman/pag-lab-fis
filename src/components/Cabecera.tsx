"use client"
import "@/style.css";
import * as React from "react"
import { Link } from "react-router-dom"

import { ModeToggle } from "./mode-toggle"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export default function Cabecera() {
  return (
    <>
    <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
       }}>
    <NavigationMenu>
      <NavigationMenuList className="flex-wrap">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Movimientos Rectilíneos</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    to="/mr/Inves"
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      Investiga
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Accede a toda la información sobre los movimientos rectilíneos.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/mr/Mru" title="MRU">
                Movimiento Rectilíneo Uniforme.
              </ListItem>
              <ListItem href="/mr/Mrua" title="MRUA">
                Movimiento Rectilíneo Uniformemente Acelerado.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Movimientos Circulares</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <Link
                    to="/mr/Inves"
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden transition-all duration-200 select-none focus:shadow-md md:p-6"
                  >
                    <div className="mb-2 text-lg font-medium sm:mt-4">
                      Investiga
                    </div>
                    <p className="text-muted-foreground text-sm leading-tight">
                      Accede a toda la información sobre los movimientos circulares.
                    </p>
                  </Link>
                </NavigationMenuLink>
              </li>
              <ListItem href="/mc/Mcu" title="MCU">
                Movimiento Circular Uniforme.
              </ListItem>
              <ListItem href="/mc/Mcua" title="MCUA">
                Movimiento Circular Uniformemente Acelerado.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      <ModeToggle />
    </NavigationMenu>
    </div>
      </>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href} className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
