// import { validateRequest } from '~/server/auth';
import Navbar from './navbar';

export default async function Header() {
  // const { session } = await validateRequest();
  const headerText = {
    forecast: 'Weather Forecast',
    report: 'Report',
  };
  return (
    <header className='h-20 w-full shadow-md border-b'>
      <div className='container h-full'>
        <Navbar headerText={headerText} />
      </div>
    </header>
  );
}
