import InventoryForm from "../InventoryTable/InventoryForm";

export function EditInventory() {
    return (
        <InventoryForm 
            action='update' 
            inventoryId={0}
            freezer='42' 
            category='' 
            item='' 
            unit='' 
            entryDate={new Date()} 
            expDate={new Date()} 
            quantity='0' 
            description='' />
    )
}