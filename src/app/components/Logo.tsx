import Link from "next/link";
import Image from "next/image";

export const Logo = ({
  href = "/",
  src = "",
  alt,
  width,
  height,
}: {
  href?: string;
  src?: string;
  alt?: string;
  width?: string;
  height?: string;
}) => {
  return (
    <Link className="z-50" href="/">
      {/* <Image src={'/img01.png'} alt={'logo'} width={180} height={80} /> */}
      <p className="text-xl font-bold">👼まことクラブ👿</p>
    </Link>
  );
};
