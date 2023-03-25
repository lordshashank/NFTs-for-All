import NavBar from "./navigation/navBar";
const Page = ({ children }) => {
  return (
    <div className="page">
      <NavBar />
      <div className="page-content">{children}</div>
    </div>
  );
};

export default Page;
