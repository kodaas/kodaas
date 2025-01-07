import { GalleryItem } from "./GallerItem";

export function GalleryImageGrid() {
  const images = TestData(40);

  const third = Math.ceil(images.length / 3);

  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  return (
    <section className="grid grid-cols-3 gap-1 min-h-screen">
      <div className="grid auto-rows-[10px]">
        {firstPart.map((data, index) => (
          <GalleryItem index={index} col={0} key={index} data={data} />
        ))}
      </div>

      <div className="grid auto-rows-[10px]">
        {secondPart.map((data, index) => (
          <GalleryItem index={index} col={1} key={index} data={data} />
        ))}
      </div>

      <div className="grid auto-rows-[10px]">
        {thirdPart.map((data, index) => (
          <GalleryItem index={index} col={2} key={index} data={data} />
        ))}
      </div>
    </section>
  );
}

function TestData(
  amount: number,
): Array<{ url: string; width: number; height: number }> {
  const dimentions = [250, 300, 350, 400, 450];

  return new Array(amount).fill(0).map(() => {
    const width = dimentions[Math.floor(Math.random() * dimentions.length)];
    const height = dimentions[Math.floor(Math.random() * dimentions.length)];
    return {
      url: `https://placehold.co/${width}x${height}.png`,
      width,
      height,
    };
  });
}
