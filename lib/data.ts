export type MediaType = "image" | "video";

export interface MediaItem {
  id: string;
  type: MediaType;
  src: string;
  alt: string;
}

export interface Profile {
  name: string;
  avatar: string;
  caption: string;
  status: string;
  following: string;
  seeMore: string;
}

export const profile: Profile = {
  name: "Gamuan Aroundtech",
  avatar: "/placeholders/avatar.svg",
  caption: "XML UPDATE Price 259 .- ...",
  status: "เพิ่มรายการสินค้าแล้ว",
  following: "Following",
  seeMore: "ดูเพิ่มเติม",
};

export const mediaItems: MediaItem[] = [
  { id: "1", type: "video", src: "/placeholders/item-1.svg", alt: "XML Update showcase 1" },
  { id: "2", type: "image", src: "/placeholders/item-2.svg", alt: "XML Update showcase 2" },
  { id: "3", type: "image", src: "/placeholders/item-3.svg", alt: "XML Update showcase 3" },
  { id: "4", type: "image", src: "/placeholders/item-4.svg", alt: "XML Update showcase 4" },
  { id: "5", type: "video", src: "/placeholders/item-5.svg", alt: "XML Update showcase 5" },
  { id: "6", type: "image", src: "/placeholders/item-6.svg", alt: "XML Update showcase 6" },
  { id: "7", type: "image", src: "/placeholders/item-7.svg", alt: "XML Update showcase 7" },
  { id: "8", type: "image", src: "/placeholders/item-8.svg", alt: "XML Update showcase 8" },
  { id: "9", type: "video", src: "/placeholders/item-9.svg", alt: "XML Update showcase 9" },
  { id: "10", type: "image", src: "/placeholders/item-10.svg", alt: "XML Update showcase 10" },
  { id: "11", type: "image", src: "/placeholders/item-11.svg", alt: "XML Update showcase 11" },
  { id: "12", type: "image", src: "/placeholders/item-12.svg", alt: "XML Update showcase 12" },
];
