import { Banner } from '@/components/Banner';
import UserAuthForm from '@/components/UserAuth';

export default function Home(): JSX.Element {
  return (
    <section>
      <Banner heading="Login to enjoy the full experience" />
      <UserAuthForm className="max-w-[440px] mx-auto mt-8" />
    </section>
  );
}
