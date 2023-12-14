import thumb1 from "../assets/images/thumbs/thumb-01.jpg";
import thumb2 from "../assets/images/thumbs/thumb-02.jpg";
import thumb3 from "../assets/images/thumbs/thumb-03.jpg";
import thumb4 from "../assets/images/thumbs/thumb-04.jpg";
import thumb5 from "../assets/images/thumbs/thumb-05.jpg";
import thumb6 from "../assets/images/thumbs/thumb-06.jpg";
import thumb7 from "../assets/images/thumbs/thumb-07.jpg";
import thumb8 from "../assets/images/thumbs/thumb-08.jpg";
import thumb9 from "../assets/images/thumbs/thumb-09.jpg";
import thumb10 from "../assets/images/thumbs/thumb-10.jpg";
import thumb11 from "../assets/images/thumbs/thumb-11.jpg";
import thumb12 from "../assets/images/thumbs/thumb-12.jpg";
import thumb13 from "../assets/images/thumbs/thumb-13.jpg";
import thumb14 from "../assets/images/thumbs/thumb-14.jpg";
import thumb15 from "../assets/images/thumbs/thumb-15.jpg";
import thumb16 from "../assets/images/thumbs/thumb-16.jpg";
import thumb17 from "../assets/images/thumbs/thumb-17.jpg";

export const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

export const randomThumb = () => {
  const thumbs = [
    thumb1,
    thumb2,
    thumb3,
    thumb4,
    thumb5,
    thumb6,
    thumb7,
    thumb8,
    thumb9,
    thumb10,
    thumb11,
    thumb12,
    thumb13,
    thumb14,
    thumb15,
    thumb16,
    thumb17,
  ];
  return thumbs[Math.floor(Math.random() * thumbs.length)];
};

export const SPOTS = [
  "Goalkeeper",
  "Defender",
  "Defender",
  "Defender",
  "Defender",
  "Midfielder",
  "Midfielder",
  "Midfielder",
  "Attacker",
  "Attacker",
  "Attacker",
];
