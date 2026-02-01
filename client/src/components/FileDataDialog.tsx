import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AgGridReact } from 'ag-grid-react';
import { ColDef, themeBalham, RowSelectionOptions, CellSelectionOptions } from 'ag-grid-community';
import { useEffect, useMemo, useState } from "react";

// import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { individualTableNames } from "./InventoryTable/InventoryForm";
import { IndiviualTable } from "./IndividualTables/Table";
import { getDatabaseData } from "@/lib/utils";
import { AgGridInventoryData, AgGridLabelData, DatabaseTypes } from "./InputFile";
    
ModuleRegistry.registerModules([ AllCommunityModule ]);

type FileDataDialogProps = {
  data: AgGridInventoryData[] | AgGridLabelData[];
  databaseType: DatabaseTypes;
};

export function FileDataDialog({ data, databaseType }: FileDataDialogProps) {
  const freezerData = getDatabaseData(individualTableNames.freezer);
  const categoryData = getDatabaseData(individualTableNames.category);
  const itemData = getDatabaseData(individualTableNames.item);
  const unitData = getDatabaseData(individualTableNames.unit);
  const locationData = getDatabaseData(individualTableNames.location);

  const [rowData, setRowData] = useState<AgGridInventoryData[] | AgGridLabelData[]>(data);

  useEffect(() => {
    setRowData(data);
    console.log("data", data);
  }, [data]);

  // Column Definitions: Defines the columns to be displayed.
  const colLabelsDefs = useMemo<ColDef[]>(() => [
    {field: "table"},
    {field: "labelName"},
    {field: "status"},
  ], []);

  const colInventoryDefs = useMemo<ColDef[]>(() => [
      { 
        field: "freezer",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: freezerData?.data?.map((data: IndiviualTable) => data.name).sort() ?? []
        },
      },
      { 
        field: "category",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: categoryData?.data?.map((data: IndiviualTable) => data.name).sort() ?? []
        }, 
      },
      { 
        field: "item",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: itemData?.data?.map((data: IndiviualTable) => data.name).sort() ?? []
        }, 
      },
      { 
        field: "unit",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: unitData?.data?.map((data: IndiviualTable) => data.name).sort() ?? []
        }, 
      },
      { 
        field: "location",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: locationData?.data?.map((data: IndiviualTable) => data.name).sort() ?? []
        }, 
      },
      { 
        field: "expDate",
        cellEditorParams: {
          min: new Date(),
        },
      },
      { field: "quantity" },
      { field: "description" },
      
  ], [freezerData, categoryData, itemData, unitData, locationData]);

  const defaultColDef = useMemo<ColDef>(() => {
    return {
      flex: 1,
      editable: true,

    };
  }, []);

  const rowSelection = useMemo<RowSelectionOptions>(() => {
    return { mode: "multiRow" };
  }, []);

  const cellSelection = useMemo<CellSelectionOptions>(() => {
    return {
      handle: {
        mode: 'fill'
,      }
    };
  }, []);

  return (
    <Dialog defaultOpen>
      <DialogContent className="max-w-none w-screen h-screen m-0 p-6 flex flex-col">
        <DialogHeader>
          <DialogTitle>CSV Data</DialogTitle>
          <DialogDescription>
            Double check the data below before uploading
          </DialogDescription>
        </DialogHeader>
        <div className="ag-theme-quartz h-screen w-100%">
          <AgGridReact 
            rowData={rowData} 
            columnDefs={databaseType == "Inventory" ? colInventoryDefs : colLabelsDefs} 
            theme={themeBalham} 
            rowSelection={rowSelection}
            cellSelection={cellSelection}
            defaultColDef={defaultColDef}
          />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
