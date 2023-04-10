export const navigation = [
  {
    name: "Home",
    href: "/",
    current: true,
  },
  {
    name: "Eventos",
    href: "/events/1",
    current: false,
  },
  {
    name: "Speakers",
    href: "/speakers",
    current: false,
  },
  {
    name: "Código de conducta",
    href: "/code-of-conduct",
    current: false,
  },
  {
    name: "Sponsors",
    href: "/#sponsors",
    current: false,
  },
  {
    name: "Mis Tickets",
    href: "/tickets",
    current: false,
  },
];

export function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}
