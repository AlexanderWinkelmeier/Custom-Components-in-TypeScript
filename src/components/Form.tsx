import {
  type FormEvent,
  type ComponentPropsWithoutRef,
  useImperativeHandle,
  forwardRef,
  useRef,
} from 'react';

export type FormHandle = {
  clear: () => void;
};

type FormProps = ComponentPropsWithoutRef<'form'> & {
  onSave: (value: unknown) => void;
};

const Form = forwardRef<FormHandle, FormProps>((props, ref) => {
  const { onSave, children, ...otherProps } = props;
  const form = useRef<HTMLFormElement>(null);

  useImperativeHandle(ref, () => ({
    clear() {
      console.log('Clearing form');
      form.current?.reset();
    },
  }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    onSave(data);
  }

  return (
    <form onSubmit={handleSubmit} {...otherProps} ref={form}>
      {children}
    </form>
  );
});

export default Form;
