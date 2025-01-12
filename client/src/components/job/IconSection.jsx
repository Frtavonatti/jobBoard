import { Banknote, Calendar, GraduationCap } from "lucide-react";

const IconSection = ({ job }) => {
  return (
    <div className="m-2 flex flex-wrap gap-1">
      <div className="flex items-center gap-1 whitespace-nowrap rounded-full border border-transparent bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-900 transition-colors dark:border-slate-800 dark:bg-slate-800 dark:text-slate-50">
        <Banknote size={20} />${job.salary}
      </div>

      <div className="flex items-center gap-1 whitespace-nowrap rounded-full border border-transparent bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-900 transition-colors dark:border-slate-800 dark:bg-slate-800 dark:text-slate-50">
        <Calendar size={18} />
        {job.employmentType}
      </div>

      <div className="flex items-center gap-1 whitespace-nowrap rounded-full border border-transparent bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-900 transition-colors dark:border-slate-800 dark:bg-slate-800 dark:text-slate-50">
        <GraduationCap size={20} />
        {job.seniority}
      </div>
    </div>
  );
};

export default IconSection;
