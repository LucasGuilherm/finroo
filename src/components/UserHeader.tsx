import Image from "next/image";

const UserHeader = () => {
  const userName = "Lucas";

  return (
    <div className="flex flex-row items-center gap-4">
      <div className="relative w-9 h-9 rounded-full overflow-hidden">
        <Image
          layout="fill"
          objectFit="cover"
          alt="profile"
          src="/profile.jpg"
        />
      </div>
      <h1 className="font-medium text-base">Olá, {userName}</h1>
    </div>
  );
};

export default UserHeader;
