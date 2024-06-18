import { FC, useRef } from "react";
import {MP4Clip} from '@webav/av-cliper';

import {Space, Radio, Button, message} from 'antd';

interface IVideoPage {};

interface IVideoConfig {
    speed: number;
    isPlay: boolean;
}

const videos = {
  'test1.mp4': '/video/demo/bunny_0.mp4',
  'bear.mp4': 'video/bear-vp9.mp4',
};

const VideoPage: FC<IVideoPage> = () => {
  const videoConfigRef = useRef<IVideoConfig>({speed: 1, isPlay: false});
  const canvasRef = useRef<CanvasRenderingContext2D | null | undefined>()

  const start = async (speed:number, videoType: keyof typeof videos, ctx: CanvasRenderingContext2D) => {   
    if(videoConfigRef.current.isPlay) {
        message.warning('视频正在播放中...');
        return;
    }
    const resp1 = await fetch(videos[videoType]);
    const clip = new MP4Clip(resp1.body!);
    await clip.ready;

    timesSpeedDecode(speed, clip, ctx);
  }
  
  const timesSpeedDecode = async (times: number, clip: MP4Clip, ctx: CanvasRenderingContext2D) => {
    videoConfigRef.current.isPlay = true;
    if(times === Infinity) {
        let time = 0;
        while(true) {
            const {state, video} = await clip.tick(time);
            if(state === 'done') {
                videoConfigRef.current.isPlay = false;
                clip.destroy();
                break;
            };
            if(state === 'success' && video) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.drawImage(
                    video, 
                    0,
                    0,
                    video.codedWidth,
                    video.codedHeight, 
                    0,
                    0,
                    ctx.canvas.width,
                    ctx.canvas.height
                );
                video.close();
            };
            time += 33000;
        }
        clip.destroy();
    } else {
        let startTime = performance.now();
        const timer = setInterval(async () => {
            const {state, video} = await clip.tick(
                Math.round((performance.now() - startTime) * 1000) * times
            );
            if(state === 'done') {
                clearInterval(timer);
                videoConfigRef.current.isPlay = false;
                clip.destroy();
                return;
            }
            if(state === 'success' && video) {
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                ctx.drawImage(
                    video, 
                    0,
                    0,
                    video.codedWidth,
                    video.codedHeight, 
                    0,
                    0,
                    ctx.canvas.width,
                    ctx.canvas.height
                );
                video.close();
            }
        }, 1000 / 30)
    }
  }

  return (
    <div className=" w-[500px] h-[600px] flex-col flex gap-6 items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <canvas
        width={520}
        height={350}
        ref={e => canvasRef.current = e?.getContext('2d')}
        className=" w-[520px] h-[350px]"
      />
      <Space>
        <Radio.Group defaultValue={videoConfigRef.current.speed} onChange={e => videoConfigRef.current.speed = e.target.value}>
          <Radio value={1}>1倍速</Radio>
          <Radio value={3}>3倍速</Radio>
          <Radio value={Infinity}>最快</Radio>
          <Button onClick={() => start(videoConfigRef.current.speed, 'test1.mp4', canvasRef.current!)}>启动</Button>
        </Radio.Group>
      </Space>
    </div>
  )
}

export default VideoPage;
