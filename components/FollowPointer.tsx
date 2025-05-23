import stringToColor from "@/lib/stringToColor";
import { motion } from "framer-motion";

const FollowPointer = ({
  x,
  y,
  info,
}: {
  x: number;
  y: number;
  info: {
    name: string;
    email: string;
    avatar: string;
  };
}) => {
  const color = stringToColor(info.email || "1");
  return (
    <motion.div
      className="h-4 w-4 rounded-full absolute z-50"
      style={{
        top: y,
        left: x,
        pointerEvents: "none",
      }}
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
    >
      <svg
        stroke={color}
        fill={color}
        strokeWidth="1"
        viewBox="0 0 16 16"
        className={`h-6 w-6 text-[${color}] transform -rotate-[70deg] -translate-x-[12px] -translate-y-[10px] stroke-[${color}]`}
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M14.082 2.182a.5.5 0 0 1-.103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </svg>

      <motion.div
        style={{
          backgroundColor: color,
        }}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
        className="bg-neutral-200 text-black font-bold whitespace-nowrap min-w-max text-xs rounded-full px-3 py-1 shadow-md mt-2 ml-2"
      >
        {info.name || info.email}
      </motion.div>
    </motion.div>
  );
};

export default FollowPointer;
