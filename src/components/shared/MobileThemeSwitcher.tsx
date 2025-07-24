
'use client';

import ThemeSwitcher from '@/components/shared/ThemeSwitcher';
import { cn } from '@/lib/utils';

const MobileThemeSwitcher = () => {
  return (
    <div className={cn(
      "fixed bottom-4 right-4 z-50 md:hidden",
      "rounded-2xl border border-border/40 bg-background/5 p-0 backdrop-blur-xl shadow-lg"
    )}>
      <ThemeSwitcher />
    </div>
  );
};

export default MobileThemeSwitcher;
