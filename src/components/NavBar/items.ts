export const navigation = [
  {
    name: "Home",
    href: "/",
    current: true,
  },
  {
    name: "Eventos",
    href: "/events",
    current: false,
  },
  {
    name: "Speakers",
    href: "/speakers",
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
