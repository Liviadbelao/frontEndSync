import "ldrs/ring";
import { hourglass } from "ldrs";

const TelaCarregar = () => {
  hourglass.register();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 overflow-hidden">
      {/* Loader */}
      <l-hourglass
        size="40"
        bg-opacity="0.3"
        speed="1.75"
        color="#9A1915"
      ></l-hourglass>
    </div>
  );
};

export default TelaCarregar;
