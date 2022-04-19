import React, { useState } from "react";
import { RiVolumeMuteFill, RiVolumeUpFill } from "react-icons/ri";

export default function RadioPlayerSwitch() {
  const [mute, setMute] = useState(false);

  return (
    <button
      onClick={() => setMute((p) => !p)}
      title="Toggle Audio Sound"
      className="inline-block cursor-pointer rounded-full p-2 text-gray-600  dark:text-yellow-400"
    >
      {mute === true ? (
        <RiVolumeUpFill className="h-7 w-7" />
      ) : (
        <RiVolumeMuteFill className="h-7 w-7" />
      )}
    </button>
  );
}
