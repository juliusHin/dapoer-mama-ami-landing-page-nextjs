export type Testimonial = {
  id: string;
  name: string;
  event: string;
  quote: string;
  rating: 4 | 5;
};

export const testimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Rina H.",
    event: "Sembahyang Imlek",
    quote:
      "Rasanya gak kalah sama yang hewani, serius! Keluarga saya sampai gak sadar bacangnya vegetarian.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Budi W.",
    event: "PO Duan Wu Jie",
    quote:
      "Bacang daun pandannya wangi banget, nasinya pulen. Jadi langganan tiap festival.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Ibu Theresia",
    event: "Acara Keluarga",
    quote:
      "Rendang vegetariannya enak, rempahnya bener-bener meresap. Anak saya yang susah makan sayur suka.",
    rating: 5,
  },
  {
    id: "t4",
    name: "Mei L.",
    event: "Mooncake Festival",
    quote:
      "Mooncake-nya tidak manis berlebihan, isinya lembut. Kemasan rapi, cocok untuk hadiah.",
    rating: 4,
  },
];
