import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
// import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const Root = () => {
    return (
        <>
            <div className="flex w-full justify-center bg-white fixed">
                <NavigationMenu className="list-none">
                    <NavigationMenuItem>
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
                    </NavigationMenuItem>
                </NavigationMenu>
            </div>
            <hr />
            <Outlet />
            {/* <TanStackRouterDevtools /> */}
        </>
    )
}

export const Route = createRootRoute({
    component: Root,
});