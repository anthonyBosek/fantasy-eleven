import bg from "../assets/images/rainbow.webp";

const ErrorPage = () => {
  return (
    <div>
      <h1>404</h1>
      <h2>Page not found</h2>
      <img src={bg} alt="404" />
    </div>
  );
};

export default ErrorPage;
