import { createFormFactory } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ApiCalls, IndividualTables } from "../api/api";

type TableName = {
  tableName: IndividualTables;
};

type Name = {
  name: string;
};

function Form({ tableName }: TableName) {
  const apiCalls = new ApiCalls(tableName);
  const queryClient = useQueryClient();

  const addDataMutation = useMutation({
    mutationFn: (name: string) => apiCalls.postCall(name),
    onSuccess: () => {
      console.log('Invalidating queries for:', ['data']);
      queryClient.invalidateQueries({ queryKey: ['data' ]});
      queryClient.refetchQueries({ queryKey: ['data'] });
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
    onSubmit: async ({ value }) => {
      console.log(`${name}: ${value.name}`);
      // postFunction(value.name);
      addDataMutation.mutate(value.name);
      value.name = '';
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
            name="name"
            validators={{
              onChange: ({ value }) => 
                !value
                  ? 'A name is required'
                  : value.length < 3
                    ? 'First name must be at least 3 characters'
                    : undefined,
            }}
            children={(field) => (
              <>
                <label htmlFor={field.name}>Name:</label>
                <input 
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </>
            )}
          />
        </div>
        <form.Subscribe 
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
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

export default Form;