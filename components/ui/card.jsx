import * as React from 'react';
import { cn } from '../../lib/utils';
function Card({ className, ...props }) { return <div data-slot="card" className={cn('ui-card', className)} {...props} />; }
export { Card };
