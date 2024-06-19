import { FC, useEffect, useRef } from "react";

import * as BABYLON from '@babylonjs/core';

interface IFabricProps {}

const FabricPage: FC<IFabricProps> = () => {
  const canvasRef = useRef<WebGL2RenderingContext | null | undefined>()

  const initBabylon = () => {
    // 创建场景
    const engine = new BABYLON.Engine(canvasRef.current! ,true)
    const sence = new BABYLON.Scene(engine);
    // 创建相机
    const camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, 5, -10), sence);
    // 相机定位到场景原点
    camera.setTarget(BABYLON.Vector3.Zero());
    // 相机连接到画布
    camera.attachControl(canvasRef.current, true);
    // 创建光源，瞄准0，1，0
    const light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0,1,0), sence);
    // 调暗灯光
    light.intensity = 0.7;
    // 放置球形
    const sphere = BABYLON.MeshBuilder.CreateSphere('sphere1', {diameter: 2, segments: 32}, sence);
    // 向上移动二分之一
    sphere.position.y = 1;
    // 放置地面
    BABYLON.MeshBuilder.CreateGround('ground1', {width: 6, height: 6}, sence);
    // 渲染
    engine.runRenderLoop(() => sence.render());
  };

  useEffect(() => {
    initBabylon();
  }, [])

  return (
    <div  className="flex-col flex gap-6 items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <canvas
        id="canvas"
        width={500}
        height={400}
        ref={e => canvasRef.current = e?.getContext('webgl2')}
      />
    </div>
  );
};

export default FabricPage;
