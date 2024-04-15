const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <div className="md:pl-80 h-full  ">{children}</div>
    </div>
  );
};
export default LayoutPage;
