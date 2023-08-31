import Image from "./Image";
export default function Images({ images }: { images: string[] }) {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        {images.length}
      </h1>
      <div className="flex flex-wrap">
        {images.map((image) => (
          <Image image={image} />
        ))}
      </div>
    </div>
  );
}
