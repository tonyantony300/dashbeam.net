import HomePage from "./HomePage";
import { HomeFaqStructuredData } from "./StructuredData";

export default async function Page({ params }) {
  const { locale } = await params;

  return (
    <>
      <HomeFaqStructuredData locale={locale} />
      <HomePage />
      <script
        data-name="BMC-Widget"
        data-cfasync="false"
        src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js"
        data-id="tny_antny"
        data-description="Support me on Buy me a coffee!"
        data-message=""
        data-color="#fff"
        data-position="left"
        data-x_margin="18"
        data-y_margin="18"
      />
    </>
  );
}
