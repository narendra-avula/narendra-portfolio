export type EducationItem = {
  kind: "Postgraduate" | "Certification" | "Undergraduate";
  title: string;
  institution: string;
  detail?: string;
  status?: "Pursuing" | "Completed";
  description: string;
  verifyUrl?: string;
};

export const education: EducationItem[] = [
  {
    kind: "Postgraduate",
    title: "M.Tech — Artificial Intelligence & Machine Learning",
    institution: "BITS Pilani",
    detail: "Work Integrated Learning Programme",
    status: "Pursuing",
    description:
      "Advanced studies in mathematical foundations for machine learning, statistical methods, machine learning, deep neural networks, and artificial intelligence.",
  },
  {
    kind: "Certification",
    title: "AWS Certified Developer — Associate",
    institution: "Amazon Web Services",
    description:
      "Certification focused on developing, deploying, and maintaining applications on AWS.",
    verifyUrl: "https://www.credly.com/badges/1117c758-67d8-48be-9a01-b47730ab40cd",
  },
  {
    kind: "Undergraduate",
    title: "B.Tech — Computer Science & Engineering",
    institution: "Anil Neerukonda Institute of Technology & Sciences",
    detail: "Affiliated to Andhra University",
    status: "Completed",
    description:
      "Graduated with a CGPA of 7.5, building a foundation in computer science, programming, software development, databases, and engineering fundamentals.",
  },
];

export const certification = education.find((e) => e.kind === "Certification")!;
export const mtech = education.find((e) => e.kind === "Postgraduate")!;
export const btech = education.find((e) => e.kind === "Undergraduate")!;
