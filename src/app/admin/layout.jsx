import Auth from "./auth";

const AdminLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="bodyAdmin">
        <Auth>{children}</Auth>
      </body>
    </html>
  );
};

export default AdminLayout;
