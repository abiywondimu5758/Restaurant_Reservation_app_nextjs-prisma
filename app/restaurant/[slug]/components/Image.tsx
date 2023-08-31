export default function Image({ image }: { image: string }) {
  return (
    <>
      <img className="w-56 h-44 mr-1 mb-1" src={image} alt="" />
    </>
  );
}
