import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from '@tanstack/router-devtools'

const Root = () => {
    return (
        <>
            <div>
                <Link to="/home">
                    Home
                </Link>
                <Link to="/freezer">
                    Freezers
                </Link>
                <Link to="/category">
                    Categories
                </Link>
                <Link to="/item">
                    Items
                </Link>
                <Link to="/unit">
                    Units
                </Link>
                <Link to="/inventory">
                    Inventory
                </Link>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    )
}

export const Route = createRootRoute({
    component: Root,
});