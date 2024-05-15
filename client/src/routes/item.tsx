import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";

const Item = () => {
    return (
        <div>
            <h3>Welcome to Item!</h3>
        </div>
    );
}


export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/item',
  component: Item,
});