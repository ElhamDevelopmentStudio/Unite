import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  icon: string;
  bgColor: string;
  onClick: () => void;
}

const Card = ({ title, description, icon, bgColor, onClick }: CardProps) => {
  return (
    <div
      className={`px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer ${bgColor}`}
      onClick={onClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={icon} width={27} height={27} alt={title} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default Card;
