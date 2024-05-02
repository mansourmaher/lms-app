import AdminNavbar from "../../_components/adminnavbar";

const LayoutPage = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <AdminNavbar />
      <div className="h-full ">{children}</div>
    </div>
  );
};
export default LayoutPage;
