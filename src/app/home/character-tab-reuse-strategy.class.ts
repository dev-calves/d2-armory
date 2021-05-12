import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

/**
 * This reuse strategy is not currently being used. 
 * If the character component implementation changes back to being placed on a route, then
 * this reuse strategy would be used again.
 * 
 * This reuse strategy was written to place character components inside the home component on the route 'home/character/xx'.
 * It also caches child routes to avoid re-initialization of the character component.
 * Child routes for the home component would require numbers be associated with each character route ex. 'home/character1/xx', 'home/character2/xx'
 */
export class CharacterTabReuseStrategy implements RouteReuseStrategy {
    private storedRoutes = new Map<string, DetachedRouteHandle>();
    private shouldAttachFlag = false;

    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (route?.routeConfig?.path === 'character') {
            return true;
        } else {
            return false;
        }
    }
    store(route: ActivatedRouteSnapshot, detachedTree: DetachedRouteHandle): void {
        // After shouldAttach and retrieve are called to load a route, this store function is called
        // with a detachedTree == null. This nullifies the storedRoutes value for the route that is loading.
        // the route will recapture data after leaving the tab. The null value does not break implementation
        // so it will be left alone.
        if (route?.routeConfig?.path === 'character') {
            this.storedRoutes?.set(route?.routeConfig?.path + '/' + route?.queryParams?.id, detachedTree);
        }
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        // occasionally the retrieve function is being entered before shouldAttach is entered.
        // creating a flag to have retrieve return cached routes only after shouldAttach is entered.
        if (route?.routeConfig && route?.routeConfig?.path !== 'home') {
            const condition = !!route?.routeConfig && !!this.storedRoutes?.get(route?.routeConfig?.path + '/' + route?.queryParams?.id);

            if (condition) {
                this.shouldAttachFlag = true;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        if (this.shouldAttachFlag) {
            this.shouldAttachFlag = false;
            if (route?.routeConfig?.path === null) {
                return null;
            } else if (route?.routeConfig?.path === 'home') {
                return null;
            } else {
                return this.storedRoutes?.get(route?.routeConfig?.path + '/' + route?.queryParams?.id);
            }
        } else {
            return null;
        }
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        // returning true prevents refreshing content for the next route.
        if (future?.routeConfig === null) {
            return true;
        } else if (future?.routeConfig?.path === 'home' && future?.queryParams?.id) {
            return true;
        } else if (future?.routeConfig?.path === 'home' && future?.routeConfig === curr?.routeConfig) {
            return true;
        } else {
            return false;
        }
    }
}
