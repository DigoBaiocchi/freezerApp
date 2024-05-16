import { createFormFactory } from "@tanstack/react-form";

type Name = {
  name: string;
}

function Form({ name }: { name: string }) {
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
              children={(field) => (
                <input 
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
        
      </>
    )
  }

export default Form;