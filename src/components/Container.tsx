import {
  type ReactNode,
  type ElementType,
  type ComponentPropsWithoutRef,
} from 'react';

type ContainerProps<T extends ElementType> = {
  as?: T; //html-Element: h1, button, a ... ist ein ElementType
  children: ReactNode; // jsx-Code oder einfacher Text
} & ComponentPropsWithoutRef<T>;

export default function Container<C extends ElementType>({
  as,
  children,
  ...props
}: ContainerProps<C>) {
  const Component = as || 'div';
  return (
    <Component className="container" {...props}>
      {children}
    </Component>
  );
}
