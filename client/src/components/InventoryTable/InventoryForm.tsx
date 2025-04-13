import { createFormFactory } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiCalls, InventoryPostParams, InventoryTable } from "../../api/api";
import type { FieldApi } from '@tanstack/react-form';
import { Button } from "../ui/button";
import { DatePicker } from "../ui/datePicker";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { ComboBoxResponsive } from "../Combobox";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";

export type InventoryFields = {
  freezer: string;
  category: string;
  item: string;
  unit: string;
  location: string;
  entryDate: Date;
  expDate: Date;
  quantity: string;
  description: string;
};

type IndividualTableNames = {
    freezer: 'freezer',
    category: 'category',
    location: 'location',
    item: 'item',
    unit: 'unit'
};

type InventoryFormProps = InventoryFields & { 
    action: "update" | "insert";
    inventoryId: number;
}

export const individualTableNames: IndividualTableNames = {
    freezer: 'freezer',
    category: 'category',
    location: 'location',
    item: 'item',
    unit: 'unit'
};

function FieldInfo({ field }: { field: FieldApi<any, any, any, any> }) {
    return (
        <>
            {field.state.meta.touchedErrors ? (
                <em>{field.state.meta.touchedErrors}</em>
            ) : null}
            {field.state.meta.isValidating ? 'Validating...' : null}
        </>
    )
}


export default function InventoryForm({ action, inventoryId, freezer, category, item, unit, location, entryDate, expDate, quantity, description}: InventoryFormProps) {
    const tableName: InventoryTable = 'inventory';
    const apiCalls = new ApiCalls(tableName);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [resetTrigger, setResetTrigger] = useState(0);

    const freezerData = useQuery({
        queryKey: [`${individualTableNames.freezer}Data`],
        queryFn: () => {
            const apiCall = new ApiCalls(individualTableNames.freezer);

            return  apiCall.getCall().then(res => {
                console.log(res.data)
                return res.data;
            });
        }
    });

    const categoryData = useQuery({
        queryKey: [`${individualTableNames.category}Data`],
        queryFn: () => {
            const apiCall = new ApiCalls(individualTableNames.category);

            return  apiCall.getCall().then(res => res.data);
        }
    });

    const itemData = useQuery({
        queryKey: [`${individualTableNames.item}Data`],
        queryFn: () => {
            const apiCall = new ApiCalls(individualTableNames.item);

            return  apiCall.getCall().then(res => res.data);
        }
    });

    const unitData = useQuery({
        queryKey: [`${individualTableNames.unit}Data`],
        queryFn: () => {
            const apiCall = new ApiCalls(individualTableNames.unit);

            return  apiCall.getCall().then(res => res.data);
        }
    });

    const locationData = useQuery({
        queryKey: [`${individualTableNames.location}Data`],
        queryFn: () => {
            const apiCall = new ApiCalls(individualTableNames.location);

            return  apiCall.getCall().then(res => res.data);
        }
    });

    const addDataMutation = useMutation({
        mutationFn: ({...params}: InventoryPostParams) => apiCalls.postInventoryCall({...params}),
        onSuccess: () => {
        console.log('Invalidating queries for:', [tableName]);
        queryClient.invalidateQueries({ queryKey: [tableName], exact: true });
        }
    });

    const updateDataMutation = useMutation({
        mutationFn: ({id, ...params}: InventoryPostParams & { id: number }) => apiCalls.updateInventoryCall({id, ...params}),
        onSuccess: () => {
            console.log('Invalidating queries for:', [tableName]);
            queryClient.invalidateQueries({ queryKey: [tableName], exact: true });
            queryClient.invalidateQueries({ queryKey: [`inventoryRawData`], exact: true });
            navigate({ to: "/inventory/edit" })
        }
    });

    const formFactory = createFormFactory<InventoryFields>({
        defaultValues: {
            freezer,
            category,
            item,
            unit,
            location,
            entryDate: entryDate,
            expDate: expDate,
            quantity: '0',
            description: '',
        }
    });

    const form = formFactory.useForm({
        defaultValues: {
            freezer: freezer,
            category: category,
            item: item,
            unit: unit,
            location: location,
            entryDate: entryDate,
            expDate: expDate,
            quantity: quantity,
            description: description,
        },
        onSubmit: ({ value }) => {
            console.log(`Freezer: ${value.freezer}`);
            console.log(`Category: ${value.category}`);
            console.log(`Item: ${value.item}`);
            console.log(`Unit: ${value.unit}`);
            console.log(`Location: ${value.location}`);
            console.log(`Quantity: ${value.quantity}`);
            console.log(`description: ${value.description}`);
            console.log(`entrydate: ${new Date(value.entryDate)}`);
            console.log(`expdate: ${new Date(value.expDate)}`);
            console.log('Submitting form.')
            if (action === "insert") {
                addDataMutation.mutate({
                    freezerId: +value.freezer,
                    categoryId: +value.category,
                    itemId: +value.item,
                    unitId: +value.unit,
                    locationId: +value.location,
                    entryDate: new Date(value.entryDate),
                    expDate: new Date(value.expDate),
                    quantity: +value.quantity,
                    description: value.description
                });
                
                form.reset()
                setResetTrigger(prev => prev + 1);
            } else {
                updateDataMutation.mutate({
                    id: inventoryId,
                    freezerId: +value.freezer,
                    categoryId: +value.category,
                    itemId: +value.item,
                    unitId: +value.unit,
                    locationId: +value.location,
                    entryDate: new Date(value.entryDate),
                    expDate: new Date(value.expDate),
                    quantity: +value.quantity,
                    description: value.description
                })
            }
            
        }
    });

    return (
        <>
            <div className="flex-1 overflow-auto">
                <div className="flex flex-col items-center justify-center m-2">
                    <p className="p-1"><b>{action === "insert" ? `Add item to ${tableName}` : `Edit inventory`}</b></p>
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            form.handleSubmit();
                        }}
                        className="flex flex-col justify-center"
                    >
                        <div className="p-1 flex flex-col justify-center">
                            <form.Field 
                                name={individualTableNames.freezer}
                                children={(field)  => (
                                    <>
                                        <Label className="pb-1" htmlFor={individualTableNames.freezer}>Freezer: {!freezerData.isPending && inventoryId ? freezerData.data[0].name : ''}</Label>
                                        {
                                            freezerData ?
                                            <>
                                                <ComboBoxResponsive 
                                                    data={freezerData.data} 
                                                    tableName={individualTableNames.freezer} 
                                                    field={field}
                                                    resetTrigger={resetTrigger}
                                                    action={action}
                                                />
                                                <FieldInfo field={field} />
                                            </> :
                                            <p>Loading...</p>

                                        }
                                    </>
                                )}
                            />
                        </div>
                        <div className="p-1 flex flex-col justify-center">
                            <form.Field 
                                name={individualTableNames.category}
                                children={(field) => (
                                    <>
                                        <Label className="pb-1" htmlFor={individualTableNames.category}>Category: {!categoryData.isPending && inventoryId ? categoryData.data[0].name : ''}</Label>
                                        <ComboBoxResponsive 
                                            data={categoryData.data} 
                                            tableName={individualTableNames.category} 
                                            field={field} 
                                            resetTrigger={resetTrigger}
                                            action={action}
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            />
                        </div>
                        <div className="p-1 flex flex-col justify-center">
                            <form.Field 
                                name={individualTableNames.item}
                                children={(field) => (
                                    <>
                                        <Label className="pb-1" htmlFor={individualTableNames.item}>Item:</Label>
                                        <ComboBoxResponsive 
                                            data={itemData.data} 
                                            tableName={individualTableNames.item} 
                                            field={field} 
                                            resetTrigger={resetTrigger}
                                            action={action}
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            />
                        </div>
                        <div className="p-1 flex flex-col justify-center">
                            <form.Field 
                                name={individualTableNames.unit}
                                children={(field) => (
                                    <>
                                        <Label className="pb-1" htmlFor={individualTableNames.unit}>Unit:</Label>
                                        <ComboBoxResponsive 
                                            data={unitData.data} 
                                            tableName={individualTableNames.unit} 
                                            field={field} 
                                            resetTrigger={resetTrigger}
                                            action={action}
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            />
                        </div>
                        <div className="p-1 flex flex-col justify-center">
                            <form.Field 
                                name={individualTableNames.location}
                                children={(field) => (
                                    <>
                                        <Label className="pb-1" htmlFor={individualTableNames.location}>Location:</Label>
                                        <ComboBoxResponsive 
                                            data={locationData.data} 
                                            tableName={individualTableNames.location} 
                                            field={field} 
                                            resetTrigger={resetTrigger}
                                            action={action}
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            />
                        </div>
                        <div className="p-1 flex flex-col justify-center content-center">
                            <form.Field 
                                name="entryDate"
                                children={(field) => (
                                    <>
                                        <Label className="pb-1" htmlFor={field.name}>Entry Date:</Label>
                                        <DatePicker resetTrigger={resetTrigger} defaultDate={field.state.value} handleChange={(date: Date) => field.handleChange(date)} />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            />
                        </div>
                        <div className="p-1 flex flex-col">
                            <form.Field 
                                name="expDate"
                                children={(field) => (
                                    <>
                                        <Label className="pb-1" htmlFor={field.name}>Exp Date:</Label>
                                        <DatePicker resetTrigger={resetTrigger} defaultDate={field.state.value} handleChange={(expDate: Date) => field.handleChange(expDate)} />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            />
                        </div>
                        <div className="p-1 flex flex-col">
                            <form.Field 
                                name="quantity"
                                children={(field) => (
                                    <>
                                        <Label className="pb-1" htmlFor={field.name}>Quantity:</Label>
                                        <Input 
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            disabled={action === "insert" ? false : true }
                                            type="number"
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            />
                        </div>
                        <div className="p-1 flex flex-col">
                            <form.Field 
                                name="description"
                                children={(field) => (
                                    <>
                                        <Label className="pb-1" htmlFor={field.name}>Description:</Label>
                                        <Textarea 
                                            name={field.name}
                                            value={field.state.value}
                                            onBlur={field.handleBlur}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        <FieldInfo field={field} />
                                    </>
                                )}
                            />
                        </div>
                        <div className="p-1 pb-2 flex flex-col">
                            <form.Subscribe 
                                selector={(state) => [state.canSubmit, state.isSubmitting]}
                                children={([_canSubmit, isSubmitting]) => (
                                    <Button className="w-[280px]" type="submit" disabled={action === "insert" ? addDataMutation.isPending : updateDataMutation.isPending} >
                                        {isSubmitting ? '...' : action === "insert" ? "Add" : "Update"}
                                    </Button>
                                )}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <hr />
        </>
    )
}