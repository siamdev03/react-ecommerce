import newYearImg from "../assets/happy-new-year.jpg";

const NewYearBanner = () => {
  return (
    <div className="w-full mb-8">
      <div
        className="h-48 md:h-64 lg:h-72 bg-cover bg-center rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${newYearImg})` }}
      >
        <div className="h-full w-full bg-black/50 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-white text-2xl md:text-4xl font-bold">
            🎉 Happy New Year 2026 🎉
          </h1>
          <p className="text-gray-200 mt-2 text-sm md:text-lg">
            Start the year with amazing deals & offers!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewYearBanner;
