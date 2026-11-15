import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '../../lib/utils';
const buttonVariants = cva('ui-button', { variants: { variant: { default: 'ui-button-default', ghost: 'ui-button-ghost' } }, defaultVariants: { variant: 'default' } });
function Button({ className, variant, asChild = false, ...props }) { const Comp = asChild ? Slot : 'button'; return <Comp data-slot="button" className={cn(buttonVariants({ variant }), className)} {...props} />; }
export { Button, buttonVariants };
