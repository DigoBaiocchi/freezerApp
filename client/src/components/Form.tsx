import { FieldApi, createFormFactory } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiCalls, IndividualTables } from "../api/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

type TableName = {
  tableName: IndividualTables;
};

type Name = {
  name: string;
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

function Form({ tableName }: TableName) {
  const apiCalls = new ApiCalls(tableName);
  const queryClient = useQueryClient();

  const addDataMutation = useMutation({
    mutationFn: (name: string) => apiCalls.postCall(name),
    onSuccess: () => {
      console.log('Invalidating queries for:', [tableName]);
      queryClient.invalidateQueries({ queryKey: [tableName], exact: true });
    }
  });

  const formFactory = createFormFactory<Name>({
    defaultValues: {
      name: '',
    }
  });

  const form = formFactory.useForm({
    defaultValues: {
      name: '',
    },
    onSubmit: ({ value }) => {
      console.log(`${tableName}: ${value.name}`);
      addDataMutation.mutate(value.name);
      value.name = '';
    }
  });

  return (
    <>
      <div className="flex flex-col items-center justify-center m-2">
        <p className="p-1"><b>Add new {tableName}</b></p>
        <form 
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
            }}
            className="flex flex-col justify-center"
        >
            <div className="p-1 flex flex-col">
                <form.Field 
                    name="name"
                    validators={{
                      onChange: ({ value }) => 
                        !value
                          ? 'A name is required'
                          : value.length > 30
                            ? 'Name must be max of 30 characters'
                            : undefined,
                    }}
                    children={(field) => (
                    <>
                        <Label className="pb-1" htmlFor={field.name}>Name:</Label>
                        <Input 
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            className="w-full"
                        />
                        <span className="italic">Name must be max of 30 characters</span>
                        <FieldInfo field={field} />
                    </>
                    )}
                />
            </div>
            <div className="p-1 pb-2 flex flex-col">
                <form.Subscribe 
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([_canSubmit, isSubmitting]) => (
                        <Button className="" type="submit" disabled={addDataMutation.isPending} >
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

export default Form;