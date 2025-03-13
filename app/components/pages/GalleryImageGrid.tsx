// import { GalleryItem } from "./GalleryItem";

export function GalleryImageGrid() {
  return (
    <section className="grid grid-cols-3 gap-1 min-h-screen">
      {/* {TestData(40).map((data, index) => (
        <GalleryItem index={index} col={0} key={index} data={data} />
      ))} */}
      Gallery WIP 🏗️🚧
    </section>
  );
}

// function TestData(
//   amount: number,
// ): Array<{ url: string; width: number; height: number }> {
//   const dimentions = [250, 300, 350, 400, 450];

//   return new Array(amount).fill(0).map(() => {
//     const width = dimentions[Math.floor(Math.random() * dimentions.length)];
//     const height = dimentions[Math.floor(Math.random() * dimentions.length)];
//     return {
//       url: `https://placehold.co/${width}x${height}.png`,
//       width,
//       height,
//     };
//   });
// }
