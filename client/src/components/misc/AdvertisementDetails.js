import { useMemo } from "react";

const PROJECTS = [
  {
    name: "Trackero",
    description:
      "Is a project management tool that is intended to use as an internal tool within an organization that allows users to easily track, prioritize and resolve issues, bugs and tasks in a one central location.",
    image:
      "https://res.cloudinary.com/de9dxfdav/image/upload/c_fill,w_414,h_197,g_auto,q_100/v1677069643/Project%20Promotion/Screenshot_2023-02-22_203738_eyqjyh.jpg",
    link: "https://trackero-client.vercel.app/",
  },
  {
    name: "PlayMath",
    description:
      "Is a web-based math game that allows users to tests their mathematical skills in addition, subtraction, multiplication and division.",
    image:
      "https://res.cloudinary.com/de9dxfdav/image/upload/c_fill,w_414,h_197,g_auto,q_100/v1667231699/Project%20Promotion/Screenshot_2022-10-31_235131_cy0nhw.jpg",
    link: "https://play-math.vercel.app/",
  },
  {
    name: "Unexplained",
    description:
      "Is an online forum web application that enables users to communicate with each other by posting messages and engaging in discussions on various topics like sightings of paranormal entities, UFOs, the possibility of extraterrestrial life and other strange events that cannot be explain.",
    image:
      "https://res.cloudinary.com/de9dxfdav/image/upload/c_fill,w_414,h_197,g_auto,q_100/v1666364496/Project%20Promotion/Screenshot_2022-10-21_224728_jwqjik.jpg",
    link: "https://unexplained.vercel.app/",
  },
  {
    name: "Kemuel Germones",
    description:
      "Is a personal website that provides information about myself and my individual work samples ",
    image:
      "https://res.cloudinary.com/de9dxfdav/image/upload/c_fill,w_414,h_197,g_auto,q_100/v1684574957/Project%20Promotion/Screenshot_from_2023-05-20_17-23-49_w8wrmg.png",
    link: "https://kemuel-germones.vercel.app/",
  },
];

function AdvertisementDetails() {
  const project = useMemo(() => {
    const randomIndex = Math.floor(Math.random() * PROJECTS.length);
    return PROJECTS[randomIndex];
  }, []);

  return (
    <div className="card flex flex-col gap-3">
      <div className="text-sm text-gray-500">Sponsored</div>
      <a className="flex flex-col gap-3" href={project.link} target="_blank">
        <img className="rounded-lg" src={project.image} alt={project.name} />
        <div className="text-sm">{project.name}</div>
        <div className="text-sm text-gray-500">{project.description}</div>
      </a>
    </div>
  );
}

export default AdvertisementDetails;
