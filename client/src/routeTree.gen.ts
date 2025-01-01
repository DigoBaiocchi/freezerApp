/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UnitImport } from './routes/unit'
import { Route as HomeImport } from './routes/home'
import { Route as AddInventoryImport } from './routes/addInventory'
import { Route as SettingsUploadFileImport } from './routes/settings/uploadFile'
import { Route as ItemListImport } from './routes/item/list'
import { Route as ItemEditImport } from './routes/item/edit'
import { Route as InventorySearchImport } from './routes/inventory/search'
import { Route as InventoryListImport } from './routes/inventory/list'
import { Route as InventoryEditItemImport } from './routes/inventory/edit-item'
import { Route as InventoryEditImport } from './routes/inventory/edit'
import { Route as FreezerListImport } from './routes/freezer/list'
import { Route as FreezerEditImport } from './routes/freezer/edit'
import { Route as CategoryListImport } from './routes/category/list'
import { Route as CategoryEditImport } from './routes/category/edit'

// Create/Update Routes

const UnitRoute = UnitImport.update({
  path: '/unit',
  getParentRoute: () => rootRoute,
} as any)

const HomeRoute = HomeImport.update({
  path: '/home',
  getParentRoute: () => rootRoute,
} as any)

const AddInventoryRoute = AddInventoryImport.update({
  path: '/addInventory',
  getParentRoute: () => rootRoute,
} as any)

const SettingsUploadFileRoute = SettingsUploadFileImport.update({
  path: '/settings/uploadFile',
  getParentRoute: () => rootRoute,
} as any)

const ItemListRoute = ItemListImport.update({
  path: '/item/list',
  getParentRoute: () => rootRoute,
} as any)

const ItemEditRoute = ItemEditImport.update({
  path: '/item/edit',
  getParentRoute: () => rootRoute,
} as any)

const InventorySearchRoute = InventorySearchImport.update({
  path: '/inventory/search',
  getParentRoute: () => rootRoute,
} as any)

const InventoryListRoute = InventoryListImport.update({
  path: '/inventory/list',
  getParentRoute: () => rootRoute,
} as any)

const InventoryEditItemRoute = InventoryEditItemImport.update({
  path: '/inventory/edit-item',
  getParentRoute: () => rootRoute,
} as any)

const InventoryEditRoute = InventoryEditImport.update({
  path: '/inventory/edit',
  getParentRoute: () => rootRoute,
} as any)

const FreezerListRoute = FreezerListImport.update({
  path: '/freezer/list',
  getParentRoute: () => rootRoute,
} as any)

const FreezerEditRoute = FreezerEditImport.update({
  path: '/freezer/edit',
  getParentRoute: () => rootRoute,
} as any)

const CategoryListRoute = CategoryListImport.update({
  path: '/category/list',
  getParentRoute: () => rootRoute,
} as any)

const CategoryEditRoute = CategoryEditImport.update({
  path: '/category/edit',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/addInventory': {
      id: '/addInventory'
      path: '/addInventory'
      fullPath: '/addInventory'
      preLoaderRoute: typeof AddInventoryImport
      parentRoute: typeof rootRoute
    }
    '/home': {
      id: '/home'
      path: '/home'
      fullPath: '/home'
      preLoaderRoute: typeof HomeImport
      parentRoute: typeof rootRoute
    }
    '/unit': {
      id: '/unit'
      path: '/unit'
      fullPath: '/unit'
      preLoaderRoute: typeof UnitImport
      parentRoute: typeof rootRoute
    }
    '/category/edit': {
      id: '/category/edit'
      path: '/category/edit'
      fullPath: '/category/edit'
      preLoaderRoute: typeof CategoryEditImport
      parentRoute: typeof rootRoute
    }
    '/category/list': {
      id: '/category/list'
      path: '/category/list'
      fullPath: '/category/list'
      preLoaderRoute: typeof CategoryListImport
      parentRoute: typeof rootRoute
    }
    '/freezer/edit': {
      id: '/freezer/edit'
      path: '/freezer/edit'
      fullPath: '/freezer/edit'
      preLoaderRoute: typeof FreezerEditImport
      parentRoute: typeof rootRoute
    }
    '/freezer/list': {
      id: '/freezer/list'
      path: '/freezer/list'
      fullPath: '/freezer/list'
      preLoaderRoute: typeof FreezerListImport
      parentRoute: typeof rootRoute
    }
    '/inventory/edit': {
      id: '/inventory/edit'
      path: '/inventory/edit'
      fullPath: '/inventory/edit'
      preLoaderRoute: typeof InventoryEditImport
      parentRoute: typeof rootRoute
    }
    '/inventory/edit-item': {
      id: '/inventory/edit-item'
      path: '/inventory/edit-item'
      fullPath: '/inventory/edit-item'
      preLoaderRoute: typeof InventoryEditItemImport
      parentRoute: typeof rootRoute
    }
    '/inventory/list': {
      id: '/inventory/list'
      path: '/inventory/list'
      fullPath: '/inventory/list'
      preLoaderRoute: typeof InventoryListImport
      parentRoute: typeof rootRoute
    }
    '/inventory/search': {
      id: '/inventory/search'
      path: '/inventory/search'
      fullPath: '/inventory/search'
      preLoaderRoute: typeof InventorySearchImport
      parentRoute: typeof rootRoute
    }
    '/item/edit': {
      id: '/item/edit'
      path: '/item/edit'
      fullPath: '/item/edit'
      preLoaderRoute: typeof ItemEditImport
      parentRoute: typeof rootRoute
    }
    '/item/list': {
      id: '/item/list'
      path: '/item/list'
      fullPath: '/item/list'
      preLoaderRoute: typeof ItemListImport
      parentRoute: typeof rootRoute
    }
    '/settings/uploadFile': {
      id: '/settings/uploadFile'
      path: '/settings/uploadFile'
      fullPath: '/settings/uploadFile'
      preLoaderRoute: typeof SettingsUploadFileImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AddInventoryRoute,
  HomeRoute,
  UnitRoute,
  CategoryEditRoute,
  CategoryListRoute,
  FreezerEditRoute,
  FreezerListRoute,
  InventoryEditRoute,
  InventoryEditItemRoute,
  InventoryListRoute,
  InventorySearchRoute,
  ItemEditRoute,
  ItemListRoute,
  SettingsUploadFileRoute,
})

/* prettier-ignore-end */
