import AtomicSpinner from "atomic-spinner";

export default function Loading() {
  return (
    <div className="flex flex-col h-screen w-screen justify-center items-center">
      <AtomicSpinner
        atomSize={300}
        electronColorPalette={["#C90000", "#F75C5C", "#FF8787"]}
      />
      <h1>Loading... please wait</h1>
    </div>
  );
}
