import { LucideIcon } from "lucide-react";

import * as Icons from 'lucide-react';

export const getIconComponent = (iconName: string) : LucideIcon => {
    const iconComponet = Icons[iconName as keyof typeof Icons];

    return iconComponet as LucideIcon || Icons.HelpCircle 
}