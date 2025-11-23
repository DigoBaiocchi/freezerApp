import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { CirclePlus, Menu, Settings } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import { Toaster } from "@/components/ui/sonner";

const Root = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <>
                <div className="flex-column w-full bg-white fixed">
                    <div className="flex w-full justify-center bg-white">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link to="/home">
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Home
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>Labels</NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <div className="w-[800px]">
                                            <Link to="/freezer/list">
                                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                    Freezer
                                                </NavigationMenuLink>
                                            </Link>
                                            <Link to="/category/edit">
                                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                    Category
                                                </NavigationMenuLink>
                                            </Link>
                                            <Link to="/location/edit">
                                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                    Location
                                                </NavigationMenuLink>
                                            </Link>
                                            <Link to="/item/edit">
                                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                    Item
                                                </NavigationMenuLink>
                                            </Link>
                                            <Link to="/unit">
                                                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                    Unit
                                                </NavigationMenuLink>
                                            </Link>
                                        </div>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="/inventory/edit">
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Inventory
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="/inventory/search"  search={{freezerId: '', categoryId: '', itemName: ''}}>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Search
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="/settings/uploadFile">
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            <Settings />
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link to="/addInventory">
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            <Button className="h-8 w-45" type="submit"><CirclePlus className="m-1" />Add to inventory</Button>
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                    <div>
                        <hr />
                    </div>
                </div>
                <Outlet />
                <Toaster richColors position="bottom-center" />
                {/* <TanStackRouterDevtools /> */}
            </>
        )
    }

    return (
        <>
            <div className=" p-2 w-full bg-white fixed">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" className=""><Menu /></Button>
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle>Freezer App</SheetTitle>
                            <SheetDescription className="p-2">
                                Make changes to your freezer here.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="">
                            <NavigationMenu className="list-none">
                                <NavigationMenuItem className="w-24">
                                    <SheetClose asChild>
                                        <Link to="/addInventory">
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                <Button 
                                                    className="w-40 p-1" 
                                                    type="submit">
                                                        <CirclePlus className="m-1" />Add to inventory
                                                </Button>
                                            </NavigationMenuLink>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to="/home">
                                            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full`}>
                                                Home
                                            </NavigationMenuLink>
                                        </Link>
                                    </SheetClose>
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="pl-4 pt-2 pb-2 decoration-transparent">Labels</AccordionTrigger>
                                            <AccordionContent className="pl-2">
                                                <SheetClose asChild>
                                                    <Link to="/freezer/list">
                                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                            Freezer
                                                        </NavigationMenuLink>
                                                    </Link>
                                                </SheetClose>
                                                <SheetClose asChild>
                                                    <Link to="/category/edit">
                                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                            Category
                                                        </NavigationMenuLink>
                                                    </Link>    
                                                </SheetClose>
                                                <SheetClose asChild>
                                                    <Link to="/location/edit">
                                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                            Location
                                                        </NavigationMenuLink>
                                                    </Link>    
                                                </SheetClose>
                                                <SheetClose asChild>
                                                    <Link to="/item/edit">
                                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                            Item
                                                        </NavigationMenuLink>
                                                    </Link>
                                                </SheetClose>
                                                <SheetClose asChild>
                                                    <Link to="/unit">
                                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                            Unit
                                                        </NavigationMenuLink>
                                                    </Link>
                                                </SheetClose>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                    <SheetClose asChild>
                                        <Link to="/inventory/edit">
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Inventory
                                            </NavigationMenuLink>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to="/inventory/search"  search={{freezerId: '', categoryId: '', itemName: ''}}>
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Search
                                            </NavigationMenuLink>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to="/settings/uploadFile">
                                            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} w-full`}>
                                                <Settings />
                                            </NavigationMenuLink>
                                        </Link>
                                    </SheetClose>
                                </NavigationMenuItem>
                            </NavigationMenu>
                        </div>
                        <SheetFooter>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <hr className="mt-1.5" />
            </div>
            <Outlet />
            <Toaster position="bottom-center" />
        </>
    );
}

export const Route = createRootRoute({
    component: Root,
});