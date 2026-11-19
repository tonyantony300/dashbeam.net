import HomePage from "./HomePage";
import { HomeFaqStructuredData } from "./StructuredData";

export default async function Page({ params }) {
  const { locale } = await params;

  return (
    <>
      <HomeFaqStructuredData locale={locale} />
      <HomePage />
    </>
  );
}
