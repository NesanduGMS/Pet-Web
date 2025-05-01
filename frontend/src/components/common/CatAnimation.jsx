import dogAnimation from "../../assets/animations/cat.json";
import Lottie from "react-lottie";
const CatAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: dogAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
};

export default CatAnimation;
