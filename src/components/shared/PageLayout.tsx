import { LinkBackwardIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../lib/utils';
export const PageLayout = ({ title, icon, children, className, action }: { title: string, icon?: React.ReactNode, children: React.ReactNode, className?: string, action?: React.ReactNode }) => {
  const navigation = useNavigate()
  const canGoBack = window.history.state.idx !== 0

  return (
    <div className={cn("w-full", className)}>

      <div className="flex items-center justify-between mb-4 text-muted-foreground">
        <div className="flex items-center gap-2">
          <div
            onClick={() => {
              if (canGoBack) {
                navigation(-1);
              }
            }}
            className="w-fit cursor-pointer">
            {icon ? icon : <HugeiconsIcon icon={LinkBackwardIcon} />}
          </div>

          {title && (<h1 className="text-md font-normal text-muted-foreground">{title}</h1>)}

        </div>
        {action && <div className="flex items-center gap-2">
          {action}
        </div>}
      </div>
      <div>{children}</div>
    </div>
  );
};

export const PageContent = ({ children }: { children: React.ReactNode }) => {
  return <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>{children}</motion.div>;
};