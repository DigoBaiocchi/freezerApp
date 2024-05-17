import { createFormFactory } from "@tanstack/react-form";

type Name = {
  name: string;
}

function Form({ name }: Name) {
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
              <button type='submit' disabled={!canSubmit}>
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