import { ReportData } from '@/common/type/report/type';

import { TabsDemo } from './content';

export default function Report({
  data,
}: {
  data: ReportData | null;
  isFetching: boolean;
}) {
  return (
    <section>
      <div className='container rounded-md px-6 py-10'>
        <div className='mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-6'>
          <h2 className='font-heading text-3xl md:text-4xl'>Reports</h2>
        </div>
        <div className='flex mx-auto justify-center gap-4 text-center md:max-w-[64rem]'>
          <TabsDemo data={data} />
        </div>
      </div>
    </section>
  );
}
