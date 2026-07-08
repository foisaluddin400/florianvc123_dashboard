


export function ProgressBar({ percent }: { percent: number }) {
  return (
    <div className="w-full flex items-center gap-2 mt-2 mb-2">
    
      <div className="flex-1 h-3 bg-[#D4B7851A] rounded-full overflow-hidden">
        
        <div
          className="h-3 bg-[#D4B785] rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

     
      <span className="text-[#B08D59] font-bold text-sm min-w-10 text-right">
        {percent}%
      </span>
    </div>
  );
}
