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
import { ColDef, themeBalham, RowSelectionOptions, CellSelectionOptions, CellValueChangedEvent } from 'ag-grid-community';
import { useEffect, useMemo, useRef, useState } from "react";

import "ag-grid-community/styles/ag-theme-quartz.css";

import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';
import { individualTableNames } from "./InventoryTable/InventoryForm";
import { IndiviualTable } from "./IndividualTables/Table";
import { getDatabaseData } from "@/lib/utils";
import { AgGridInventoryData, AgGridLabelData, DatabaseTypes } from "./InputFile";
    
ModuleRegistry.registerModules([ AllCommunityModule ]);

type FileDataDialogProps = {
  data: AgGridInventoryData[] | AgGridLabelData[];
  databaseType: DatabaseTypes | null;
  onClose: () => void;
};

export function FileDataDialog({ data, databaseType, onClose }: FileDataDialogProps) {
  const [rowData, setRowData] = useState<AgGridInventoryData[] | AgGridLabelData[]>(data);

  const freezerData = getDatabaseData(individualTableNames.freezer);
  const categoryData = getDatabaseData(individualTableNames.category);
  const itemData = getDatabaseData(individualTableNames.item);
  const unitData = getDatabaseData(individualTableNames.unit);
  const locationData = getDatabaseData(individualTableNames.location);

  const gridRef = useRef<AgGridReact>(null);


  // const gridApi: GridApi = 

  const onCellValueChanged = (event: CellValueChangedEvent) => {
    console.log("Row changed: ", event.data);
    console.log("Event: ", event);

    setRowData(prevData => {
      const newData = [...prevData];
      const rowIndex = event.rowIndex;
      if (rowIndex !== null && rowIndex !== undefined) {
        newData[rowIndex] = event.data;
      }
      return newData as AgGridInventoryData[] | AgGridLabelData[];
    });
  }

  const deleteSelectedRows = () => {
    const selectedNodes = gridRef.current?.api.getSelectedNodes();
    const rowIds = selectedNodes?.map(node => +node.id!).sort((a, b) => b - a);
    console.log("selectedNodes", selectedNodes);
    console.log("rowIds", rowIds);
    let updatedData = [...rowData];
    rowIds?.forEach((element) => {
      console.log(element);
      updatedData?.splice(+element!, 1);
      
    });
    console.log("updatedData", updatedData);
    setRowData(updatedData as AgGridInventoryData[] | AgGridLabelData[]);
  }

  useEffect(() => {
    console.log("FileDataDialog received data:", data);
    console.log("Data length:", data.length);
    setRowData(data);
  }, [data]);

  // useEffect(() => {
  //   console.log("rowData:", rowData);
  // }, [rowData]);

  // Column Definitions: Defines the columns to be displayed.
  const colLabelsDefs = useMemo<ColDef[]>(() => [
    {field: "table"},
    {field: "labelName"},
    {field: "status", editable: false},
  ], []);

  const colInventoryDefs = useMemo<ColDef[]>(() => [
      { 
        field: "freezer",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ['', ...(freezerData?.data?.map((data: IndiviualTable) => data.name).sort() ?? [])]
        },
      },
      { 
        field: "category",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ['', ...(categoryData?.data?.map((data: IndiviualTable) => data.name).sort() ?? [])]
        },
      },
      { 
        field: "item",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ['', ...(itemData?.data?.map((data: IndiviualTable) => data.name).sort() ?? [])]
        }, 
      },
      { 
        field: "unit",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ['', ...(unitData?.data?.map((data: IndiviualTable) => data.name).sort() ?? [])]
        }, 
      },
      { 
        field: "location",
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ['', ...(locationData?.data?.map((data: IndiviualTable) => data.name).sort() ?? [])]
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
      cellStyle: (params) => {
        if (!params.value && params.colDef.field !== "description") {
          return { backgroundColor: "#fca5a5" };
        }
        if (params.value === "Already exists" && params.colDef.field === "status") {
          return { backgroundColor: "#fca5a5" };
        }
        return null;
      },
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
    <Dialog defaultOpen onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="max-w-none w-screen h-screen m-0 p-6 flex flex-col">
        <DialogHeader>
          <DialogTitle>CSV Data</DialogTitle>
          <DialogDescription>
            Double check the data below before uploading
          </DialogDescription>
        </DialogHeader>
        <div className="ag-theme-quartz h-screen w-100%">
          <AgGridReact 
          ref={gridRef}
            rowData={rowData} 
            columnDefs={databaseType == "Inventory" ? colInventoryDefs : colLabelsDefs} 
            theme={themeBalham} 
            rowSelection={rowSelection}
            cellSelection={cellSelection}
            defaultColDef={defaultColDef}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
        <DialogFooter>
          <Button variant="default">Upload Data</Button>
          <Button variant="destructive" onClick={deleteSelectedRows}>Delete Selected Row(s)</Button>
          <DialogClose asChild onClick={onClose}>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
