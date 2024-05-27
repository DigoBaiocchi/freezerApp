import { createFormFactory } from "@tanstack/react-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ApiCalls, InventoryTable } from "../api/api";
import type { FieldApi } from '@tanstack/react-form';
import { IndiviualTable } from "./Table";

type InventoryFields = {
  freezer: string;
  category: string;
  item: string;
  unit: string;
  entryDate: Date;
  expDate: Date;
  quantity: number;
  description: string;
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
        queryKey: ['freezerData'],
        queryFn: () => {
            const freezerApi = new ApiCalls('freezer');

            return  freezerApi.getCall().then(res => res.data);
        }
    });

    const categoryData = useQuery({
        queryKey: ['categoryData'],
        queryFn: () => {
            const categoryApi = new ApiCalls('category');

            return  categoryApi.getCall().then(res => res.data);
        }
    });

    const itemData = useQuery({
        queryKey: ['itemData'],
        queryFn: () => {
            const itemApi = new ApiCalls('item');

            return  itemApi.getCall().then(res => res.data);
        }
    });

    const unitData = useQuery({
        queryKey: ['unitData'],
        queryFn: () => {
            const unitApi = new ApiCalls('unit');

            return  unitApi.getCall().then(res => res.data);
        }
    });

    console.log('FreezerData: ', freezerData.data);
    console.log('categoryData: ', categoryData.data);
    console.log('itemData: ', itemData.data);
    console.log('unitData: ', unitData.data);

    const addDataMutation = useMutation({
        mutationFn: (name: string) => apiCalls.postCall(name),
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
            entryDate: date,
            expDate: date,
            quantity: 0,
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
            quantity: 0,
            description: '',
        },
        onSubmit: ({ value }) => {
        console.log(`${tableName}: ${value.freezer}`);
        console.log(`${tableName}: ${value.category}`);
        // addDataMutation.mutate(value.name);
        value.freezer = '';
        value.category = '';
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
                    name="freezer"
                    validators={{
                        onChange: ({ value }) => {
                            console.log(value);
                            return ''
                        }
                    }}
                    children={(field) => (
                    <>
                        <select name="freezer" id="freezer" onChange={(e) => field.handleChange(e.target.value)}>
                            <option value="" disabled selected>Choose a freezer</option>
                            {freezerData.data.map((data: IndiviualTable) => (
                                <option value={data.id}>{data.name}</option>
                            ))}
                        </select>
                        <FieldInfo field={field} />
                    </>
                    )}
                />
            </div>
            <div>
                <form.Field 
                    name="category"
                    children={(field) => (
                    <>
                        <label htmlFor={field.name}>Category:</label>
                        <input 
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
            {/* <div>
                <form.Field 
                    name="entryDate"
                    children={(field) => (
                    <>
                        <label htmlFor={field.name}>Category:</label>
                        <input 
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        />
                        <FieldInfo field={field} />
                    </>
                    )}
                />
            </div> */}
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