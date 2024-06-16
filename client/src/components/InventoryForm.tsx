import { createFormFactory } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiCalls, InventoryPostParams, InventoryTable } from "../api/api";
import type { FieldApi } from '@tanstack/react-form';
import { SelectDemo } from "./Select";
import { Button } from "./ui/button";
import { DatePicker } from "./ui/datePicker";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export type InventoryFields = {
  freezer: string;
  category: string;
  item: string;
  unit: string;
  entryDate: Date;
  expDate: Date;
  quantity: string;
  description: string;
};

type IndividualTableNames = {
    freezer: 'freezer',
    category: 'category',
    item: 'item',
    unit: 'unit'
};

const individualTableNames: IndividualTableNames = {
    freezer: 'freezer',
    category: 'category',
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


export default function InventoryForm() {
    const tableName: InventoryTable = 'inventory';
    const apiCalls = new ApiCalls(tableName);
    const queryClient = useQueryClient();
    const date = new Date();

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

    const addDataMutation = useMutation({
        mutationFn: ({...params}: InventoryPostParams) => apiCalls.postInventoryCall({...params}),
        onSuccess: () => {
        console.log('Invalidating queries for:', [tableName]);
        queryClient.invalidateQueries({ queryKey: [tableName], exact: true });
        }
    });

    const formFactory = createFormFactory<InventoryFields>({
        defaultValues: {
            freezer: '',
            category: '',
            item: '',
            unit: '',
            entryDate: date,
            expDate: date,
            quantity: '0',
            description: '',
        }
    });

    const form = formFactory.useForm({
        defaultValues: {
            freezer: '',
            category: '',
            item: '',
            unit: '',
            entryDate: date,
            expDate: date,
            quantity: '0',
            description: '',
        },
        onSubmit: ({ value }) => {
            console.log(`Freezer: ${value.freezer}`);
            console.log(`Category: ${value.category}`);
            console.log(`description: ${value.description}`);
            console.log(`entrydate: ${new Date(value.entryDate)}`);
            console.log('Submitting form.')
            addDataMutation.mutate({
                freezerId: +value.freezer,
                categoryId: +value.category,
                itemId: +value.item,
                unitId: +value.unit,
                entryDate: new Date(value.entryDate),
                expDate: new Date(value.expDate),
                quantity: +value.quantity,
                description: value.description
            });

            value.freezer = '';
            value.category = '';
            value.item = '';
            value.unit = '';
            value.entryDate = date;
            value.expDate = date;
            value.quantity = '0';
            value.description = '';
        }
    });

    return (
        <>
            <div className="flex flex-col items-center justify-center pt-11">
                <p className="p-1"><b>Add new item to inventory</b></p>
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
                                <Label className="pb-1" htmlFor={individualTableNames.freezer}>Freezer:</Label>
                                <SelectDemo tableName={individualTableNames.freezer} field={field} data={freezerData.data} />
                                <FieldInfo field={field} />
                            </>
                            )}
                        />
                    </div>
                    <div className="p-1 flex flex-col justify-center">
                        <form.Field 
                            name={individualTableNames.category}
                            children={(field) => (
                            <>
                                <Label className="pb-1" htmlFor={individualTableNames.category}>Category:</Label>
                                <SelectDemo tableName={individualTableNames.category} field={field} data={categoryData.data} />
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
                                <SelectDemo tableName={individualTableNames.item} field={field} data={itemData.data} />
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
                                <SelectDemo tableName={individualTableNames.unit} field={field} data={unitData.data} />
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
                                <DatePicker defaultDate={field.state.value} handleChange={(date: Date) => field.handleChange(date)} />
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
                                <DatePicker defaultDate={field.state.value} handleChange={(date: Date) => field.handleChange(date)} />
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
                                <Button className="w-[280px]" type="submit" disabled={addDataMutation.isPending} >
                                    {isSubmitting ? '...' : 'Add'}
                                </Button>
                            )}
                        />
                    </div>
                </form>
            </div>
        <hr />
        </>
    )
}