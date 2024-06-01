import { createFormFactory } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiCalls, InventoryPostParams, InventoryTable } from "../api/api";
import type { FieldApi } from '@tanstack/react-form';
import Select from "./Select";

export type InventoryFields = {
  freezer: string;
  category: string;
  item: string;
  unit: string;
  entryDate: string;
  expDate: string;
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
        console.log('Invalidating queries for:', ['data', tableName]);
        queryClient.invalidateQueries({ queryKey: ['data', tableName], exact: true });
        }
    });

    const formFactory = createFormFactory<InventoryFields>({
        defaultValues: {
            freezer: '',
            category: '',
            item: '',
            unit: '',
            entryDate: date.toISOString().split('T')[0],
            expDate: date.toISOString().split('T')[0],
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
            entryDate: date.toISOString().split('T')[0],
            expDate: date.toISOString().split('T')[0],
            quantity: '0',
            description: '',
        },
        onSubmit: ({ value }) => {
            console.log(`Freezer: ${value.freezer}`);
            console.log(`Category: ${value.category}`);
            console.log(`description: ${value.description}`);
            console.log('Submitting form.')
            addDataMutation.mutate({
                freezerId: value.freezer,
                categoryId: value.category,
                itemId: value.item,
                unitId: value.unit,
                entryDate: new Date(value.entryDate),
                expDate: new Date(value.expDate),
                quantity: +value.quantity,
                description: value.description
            });

            value.freezer = '';
            value.category = '';
            value.item = '';
            value.unit = '';
            value.entryDate = date.toISOString().split('T')[0];
            value.expDate = date.toISOString().split('T')[0];
            value.quantity = '0';
            value.description = '';
        }
    });

    return (
        <>
        <form 
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
        >
            <div>
                <form.Field 
                    name={individualTableNames.freezer}
                    children={(field)  => (
                    <>
                        <Select tableName={individualTableNames.freezer} field={field} data={freezerData.data} />
                        <FieldInfo field={field} />
                    </>
                    )}
                />
            </div>
            <div>
                <form.Field 
                    name={individualTableNames.category}
                    children={(field) => (
                    <>
                        <Select tableName={individualTableNames.category} field={field} data={categoryData.data} />
                        <FieldInfo field={field} />
                    </>
                    )}
                />
            </div>
            <div>
                <form.Field 
                    name={individualTableNames.item}
                    children={(field) => (
                    <>
                        <Select tableName={individualTableNames.item} field={field} data={itemData.data} />
                        <FieldInfo field={field} />
                    </>
                    )}
                />
            </div>
            <div>
                <form.Field 
                    name={individualTableNames.unit}
                    children={(field) => (
                    <>
                        <Select tableName={individualTableNames.unit} field={field} data={unitData.data} />
                        <FieldInfo field={field} />
                    </>
                    )}
                />
            </div>
            <div>
                <form.Field 
                    name="entryDate"
                    children={(field) => (
                    <>
                        <label htmlFor={field.name}>Entry Date:</label>
                        <input 
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="date"
                        />
                        <FieldInfo field={field} />
                    </>
                    )}
                />
            </div>
            <div>
                <form.Field 
                    name="expDate"
                    children={(field) => (
                    <>
                        <label htmlFor={field.name}>Exp Date:</label>
                        <input 
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="date"
                        />
                        <FieldInfo field={field} />
                    </>
                    )}
                />
            </div>
            <div>
                <form.Field 
                    name="quantity"
                    children={(field) => (
                    <>
                        <label htmlFor={field.name}>Quantity:</label>
                        <input 
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
            <div>
                <form.Field 
                    name="description"
                    children={(field) => (
                    <>
                        <label htmlFor={field.name}>Description:</label>
                        <input 
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            type="text"
                        />
                        <FieldInfo field={field} />
                    </>
                    )}
                />
            </div>
            <form.Subscribe 
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([_canSubmit, isSubmitting]) => (
                <button type='submit' disabled={addDataMutation.isPending}>
                {isSubmitting ? '...' : 'Submit'}
                </button>
            )}
            />
        </form>
        <hr />
        </>
    )
}