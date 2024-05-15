import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "./__root";

const Unit = () => {
    return (
        <div>
            <h3>Welcome to Units!</h3>
        </div>
    );
}


export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/unit',
  component: Unit,
});