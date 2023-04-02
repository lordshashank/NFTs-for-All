import { usePageLoading } from "../hooks/usePageLoading";
const PageLoader = () => {
  const { loading } = usePageLoading();
  const loader = (
    <div className="spinner-wrapper">
      <div className="boxes">
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className="box">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );

  return loading && loader;
};
export default PageLoader;
