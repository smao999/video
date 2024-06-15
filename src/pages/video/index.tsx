import { FC } from "react";

interface IVideoPage {};

const VideoPage: FC<IVideoPage> = () => {
  return (
    <>
      {import.meta.env.BASE_URL}
    </>
  )
}

export default VideoPage;
