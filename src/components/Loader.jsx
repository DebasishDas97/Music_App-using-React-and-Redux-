import { loader } from "../assets"

const Loader = ({ title }) => (
  <div className="w-full min-h-full flex justify-center items-center flex-col">
    <img src={loader} alt="loader" className="w-32 h-32 object-contain" />
    <h1 className="text-2xl font-bold text-white">{title || "Loading..."}</h1>
  </div>
);

export default Loader;
