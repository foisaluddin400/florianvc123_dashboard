import { motion } from 'framer-motion'
import { memo, Suspense } from 'react'
import { cn } from '../../../lib/utils'
import { Loader } from 'lucide-react'
function StatusCard({ title, value, icon }: { title: string, value: number, icon: React.ReactNode }) {
  return (
    <Suspense fallback={<Loader className='animate-spin' />}>
      <div className={cn('border-[.5px] bg-brand/20 border-card-border/40 p-4 rounded-lg')}>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }} className='text-[24px] font-nunito-semibold-italic'>
              {title}
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }} className='text-[24px] font-nunito-semibold-italic text-brand'>
              {value}
            </motion.h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }} className='flex items-center bg-brand/20 w-fit float-end p-2 rounded  justify-end text-brand'>
            {icon}
          </motion.div>
        </motion.div>
      </div>
    </Suspense>
  )
}

export default memo(StatusCard)
