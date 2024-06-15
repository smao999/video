import { FC, useRef } from "react";
import {MP4Clip} from '@webav/av-cliper';

import {Space, Radio, Button} from 'antd';

interface IVideoPage {};

const assetsPrefix = <T extends string[] | Record<string, string>>(
  assetsURL: T
): T => {
  const prefix = process.env.NODE_ENV === 'development' ? '/' : '/WebAV/';
  if (Array.isArray(assetsURL)) {
      return assetsURL.map((url) => `${prefix}${url}`) as T;
  }

  return Object.fromEntries(
      Object.entries(assetsURL).map(([k, v]) => [k, `${prefix}${v}`])
  ) as T;
}

const videos = assetsPrefix({
'test1.mp4': 'demo/test1.mp4',
'bear.mp4': 'video/bear-vp9.mp4',
});

const VideoPage: FC<IVideoPage> = () => {
  const videoConfigRef = useRef<number>(1);
  const canvasRef = useRef<CanvasRenderingContext2D | null | undefined>()

  const start = async (speed:number, videoType: keyof typeof videos, ctx: CanvasRenderingContext2D) => {    
    const resp1 = await fetch(videos[videoType]);
    const clip = new MP4Clip(resp1.body!);
    await clip.ready;

    timesSpeedDecode(speed, clip, ctx);
  }
  
  const timesSpeedDecode = async (times: number, clip: MP4Clip, ctx: CanvasRenderingContext2D) => {
    if(times === Infinity) {
        let time = 0;
        while(true) {
            const {state, video} = await clip.tick(time);
            if(state === 'done') break;
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
            console.log(video);
            
            if(state === 'done') {
                clearInterval(timer);
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
        ref={e => canvasRef.current = e?.getContext('2d')}
        className=" w-[300px] h-[430px]"
      />
      <Space>
        <Radio.Group defaultValue={videoConfigRef.current} onChange={e => videoConfigRef.current = e.target.value}>
          <Radio value={1}>1倍速</Radio>
          <Radio value={3}>3倍速</Radio>
          <Radio value={Infinity}>最快</Radio>
          <Button onClick={() => start(videoConfigRef.current, 'test1.mp4', canvasRef.current!)}>启动</Button>
        </Radio.Group>
      </Space>
    </div>
  )
}

export default VideoPage;
