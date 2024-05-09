import Image from "next/image";

export const Logo = () => {
  return (
    <Image
      src="/logo.svg"
      alt="logo"
      width={200}
      height={200}
      layout="responsive"
      loading="lazy"
    />
  );
};
