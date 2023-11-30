import { useMemo } from "react";

const PROJECTS = [
  {
    name: "Trackero",
    description:
      "A project management tool designed for internal use within a organization, enabling users to efficiently track, prioritize, and address issues, bugs, and tasks from a centralized platform.",
    image:
      "https://res.cloudinary.com/de9dxfdav/image/upload/c_fill,w_414,h_197,g_auto,q_100/v1677069643/Project%20Promotion/Screenshot_2023-02-22_203738_eyqjyh.jpg",
    link: "https://trackero-client.vercel.app/",
  },
  {
    name: "Unexplained",
    description:
      "A online forum web application that facilitates user communication through the posting and participation in discussions pertaining to a wide range of topics, such as sightings of paranormal entities, UFOs, the potential existence of extraterrestrial life, and other inexplicable phenomena.",
    image:
      "https://res.cloudinary.com/de9dxfdav/image/upload/c_fill,w_414,h_197,g_auto,q_100/v1666364496/Project%20Promotion/Screenshot_2022-10-21_224728_jwqjik.jpg",
    link: "https://unexplained.vercel.app/",
  },
  {
    name: "Kemuel Germones",
    description:
      "A personal website that serves as a platform to showcase my individual work samples and provide detailed information about myself.",
    image:
      "https://res.cloudinary.com/de9dxfdav/image/upload/v1701330032/Project%20Promotion/Screenshot_from_2023-11-30_15-32-11_wjveol.png",
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