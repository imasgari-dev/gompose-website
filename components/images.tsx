import Image from "next/image";
import Link from "next/link";

export function Banner() {
  return (
    <div className="relative w-full h-[400px]">
      <Image
        src="/banner.jpg"   // from /public
        alt="gompose logo wide"
        fill
        priority                 // load eagerly (important for LCP images)
        className="object-cover rounded-2xl"
      />
    </div>
  );
}

export function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image
        src="/headerlogo.jpg"   // put small logo in /public
        alt="Gompose logo"
        width={32}
        height={32}
        className="rounded-md"
        priority
      />
      <span className="text-xl font-semibold text-ink">Gompose</span>
    </Link>
  )
}