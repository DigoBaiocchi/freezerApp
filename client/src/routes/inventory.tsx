import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";

const Inventory = () => {
    return (
        <div>
            <h3>Welcome to Inventory!</h3>
        </div>
    );
}


export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/inventory',
  component: Inventory,
});