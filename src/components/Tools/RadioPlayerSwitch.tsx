import React, { useCallback, useEffect, useRef, useState } from "react";
import { RiVolumeMuteFill, RiVolumeUpFill } from "react-icons/ri";
import ReactPlayer from "react-player/vimeo";

type StatePlayerRef = React.MutableRefObject<ReactPlayer>["current"];

export default function RadioPlayerSwitch() {
  const [mute, setMute] = useState(true);
  const [player, setPlayer] = useState<StatePlayerRef | null>(null);

  const videoRef = useRef<ReactPlayer | null>(null);

  const startRadio = useCallback(async () => {
    if (player !== null) {
      getPlayer(player)?.play();
    }
  }, [player]);

  const stopRadio = useCallback(async () => {
    if (player === null) return;
    const p = getPlayer(player);
    p?.pause();
  }, [player]);

  // Pause or play with the mute button
  useEffect(() => {
    if (mute) {
      stopRadio();
    } else {
      startRadio();
    }
  }, [mute, startRadio, stopRadio]);

  // set the ref.current to state when they become available
  useEffect(() => {
    if (videoRef.current) {
      setPlayer(videoRef.current);
    }
  }, [videoRef]);

  const getPlayer = (refObject: StatePlayerRef) => {
    const { getInternalPlayer } = refObject;
    // Return HTMLAudio element
    const ele = getInternalPlayer();
    return ele as HTMLAudioElement;
  };

  return (
    <React.Fragment>
      <button
        onClick={() => setMute((p) => !p)}
        title="Toggle Audio Sound"
        className="inline-block cursor-pointer rounded-full p-2 text-gray-600  dark:text-yellow-400"
      >
        {mute === false ? (
          <RiVolumeUpFill className="h-7 w-7" />
        ) : (
          <RiVolumeMuteFill className="h-7 w-7" />
        )}
        <div className="w-0 h-0 invisible pointer-events-none opacity-0 relative">
          <ReactPlayer
            url="https://player.vimeo.com/video/701120969"
            className="pointer-event-none invisible"
            width={0}
            height={0}
            ref={(player) => (videoRef.current = player)}
            pip={false}
            muted={mute}
            volume={0.5}
            loop={true}
          />
        </div>
      </button>
    </React.Fragment>
  );
}
