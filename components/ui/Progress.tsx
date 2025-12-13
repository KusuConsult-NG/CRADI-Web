import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressProps {
    value: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
    className?: string;
    variant?: 'default' | 'gradient' | 'success' | 'warning';
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
    ({ value, max = 100, size = 'md', showLabel = true, className, variant = 'gradient' }, ref) => {
        const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

        const sizeClasses = {
            sm: 'h-2',
            md: 'h-3',
            lg: 'h-4',
        };

        const variantClasses = {
            default: 'bg-primary-500',
            gradient: 'bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-pink',
            success: 'bg-gradient-to-r from-green-500 to-emerald-400',
            warning: 'bg-gradient-to-r from-yellow-500 to-orange-400',
        };

        return (
            <div ref={ref} className={cn('w-full', className)}>
                {showLabel && (
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-300">Progress</span>
                        <span className="text-sm font-semibold text-white">{Math.round(percentage)}%</span>
                    </div>
                )}
                <div className="w-full bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                    <div
                        className={cn(
                            'transition-all duration-500 ease-out rounded-full',
                            sizeClasses[size],
                            variantClasses[variant]
                        )}
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        );
    }
);

Progress.displayName = 'Progress';

export { Progress };
