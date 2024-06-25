import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
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
import { CirclePlus, Menu } from "lucide-react";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const Root = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <>
                <div className="flex-column w-full bg-white fixed">
                    <div className="flex w-full justify-center bg-white">
                        <NavigationMenu className="list-none">
                            <NavigationMenuItem className="flex">
                                <div>

                                    <Link to="/home">
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Home
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link to="/freezer">
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Freezers
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link to="/category">
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Categories
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link to="/item">
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Items
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link to="/unit">
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Units
                                        </NavigationMenuLink>
                                    </Link>
                                    <Link to="/inventory">
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            Inventory
                                        </NavigationMenuLink>
                                    </Link>
                                </div>
                                <div>
                                    <Link to="/addInventory">
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            <Button className="h-8 w-45" type="submit"><CirclePlus className="m-1" />Add to inventory</Button>
                                        </NavigationMenuLink>
                                    </Link>
                                </div>
                            </NavigationMenuItem>
                        </NavigationMenu>
                    </div>
                    <div>
                        <hr />
                    </div>
                </div>
                <Outlet />
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
                                    <SheetClose asChild>
                                        <Link to="/freezer">
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Freezers
                                            </NavigationMenuLink>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to="/category">
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Categories
                                            </NavigationMenuLink>
                                        </Link>    
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to="/item">
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Items
                                            </NavigationMenuLink>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to="/unit">
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Units
                                            </NavigationMenuLink>
                                        </Link>
                                    </SheetClose>
                                    <SheetClose asChild>
                                        <Link to="/inventory">
                                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                                Inventory
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
        </>
    );
}

export const Route = createRootRoute({
    component: Root,
});