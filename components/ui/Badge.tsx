import React from 'react';
import { cn, getStatusColor } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
    'inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-smooth',
    {
        variants: {
            variant: {
                default: 'bg-primary-500/20 text-primary-300 border border-primary-500/30',
                success: 'bg-green-500/20 text-green-300 border border-green-500/30',
                warning: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30',
                danger: 'bg-red-500/20 text-red-300 border border-red-500/30',
                info: 'bg-blue-500/20 text-blue-300 border border-blue-500/30',
                purple: 'bg-purple-500/20 text-purple-300 border border-purple-500/30',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    }
);

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
    children: React.ReactNode;
    dot?: boolean;
}

const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
    ({ className, variant, children, dot, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(badgeVariants({ variant }), className)}
                {...props}
            >
                {dot && (
                    <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current animate-pulse" />
                )}
                {children}
            </div>
        );
    }
);

Badge.displayName = 'Badge';

export { Badge, badgeVariants };
