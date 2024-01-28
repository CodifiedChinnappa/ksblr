import Auth from "./auth";

const AdminLayout = ({ children }) => {
  return (
    <html lang="en">
      <body style={{background:"#000"}}>
        <Auth>{children}</Auth>
      </body>
    </html>
  );
};

export default AdminLayout;
