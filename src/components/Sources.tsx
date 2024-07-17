import React from "react";
import { GitFork } from "lucide-react";

interface SourcesProps {
  content: { title: string; link: string }[];
}

const Sources: React.FC<SourcesProps> = ({ content }) => {
  const truncateText = (text: string, maxLength: number) =>
    text.length <= maxLength ? text : `${text.substring(0, maxLength)}...`;

  const extractSiteName = (url: string) => new URL(url).hostname.replace("www.", "");

  return (
    <>
      <div className="text-3xl items-center font-bold my-4 w-full flex">
        <GitFork className="w-7 h-7 md:w-8 md:h-8" />
        <span className="px-2 text-3xl md:text-4xl">Sources</span>
      </div>
      <div className="flex flex-col md:flex-row">
        {content?.map(({ title, link }, index) => (
          <a href={link} key={index} className="p-2">
            <span className="flex flex-col items-center py-2 px-6 border-4 bg-gray-800/10 rounded-md shadow hover:shadow-lg transition-shadow duration-300 tile-animation h-full">
              <span>{truncateText(title, 40)}</span>
              <span>{extractSiteName(link)}</span>
            </span>
          </a>
        ))}
      </div>
    </>
  );
};

export default Sources;
