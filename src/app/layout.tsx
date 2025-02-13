import RootLayout from "@/layouts/Root.layout";

const HospitalRootLayout = async (props: React.PropsWithChildren) => {
  const { children } = props;

  return <RootLayout>{children}</RootLayout>;
};

export default HospitalRootLayout;
