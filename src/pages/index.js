import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// import { TrackballControls } from 'three/examples/js/controls/TrackballControls.js';
// オブジェクトを格納する配列
var objects = [];

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.clearColor();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(new THREE.Color('white'));
document.body.appendChild(renderer.domElement);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};
animate();

const controls = new OrbitControls(camera, renderer.domElement);

const light = new THREE.DirectionalLight(0xffffff, 1);
const lightHelper = new THREE.DirectionalLightHelper(light, 15);
light.position.set(0.7, 0.7, 1);
scene.add(light);
scene.add(lightHelper);

const axexHelper = new THREE.AxesHelper(1000);
scene.add(axexHelper);

const gridHelper = new THREE.GridHelper(1000, 100);
scene.add(gridHelper);

camera.position.set(100, 100, 100);
controls.update();

// spriteを作成し、sceneに追加
const createSprite = (texture, scale, position) => {
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(scale.x, scale.y, scale.z);
  sprite.position.set(position.x, position.y, position.z);

  scene.add(sprite);
};

const createCanvasForCompany = (canvasWidth, canvasHeight, text, fontSize) => {
  // 貼り付けるcanvasを作成。
  const canvasForText = document.createElement('canvas');
  const ctx = canvasForText.getContext('2d');
  ctx.canvas.width = canvasWidth;
  ctx.canvas.height = canvasHeight;
  // 透過率50%の青背景を描く
  ctx.fillStyle = 'rgba(0, 0, 255, 0.5)';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //
  ctx.fillStyle = 'black';
  ctx.font = `${fontSize}px serif`;
  ctx.fillText(
    text,
    // x方向の余白/2をx方向開始時の始点とすることで、横方向の中央揃えをしている。
    (canvasWidth - ctx.measureText(text).width) / 2,
    // y方向のcanvasの中央に文字の高さの半分を加えることで、縦方向の中央揃えをしている。
    canvasHeight / 2 + ctx.measureText(text).actualBoundingBoxAscent / 2
  );
  return canvasForText;
};

const createCanvasForTerm = (canvasWidth, canvasHeight, text, fontSize) => {
  // 貼り付けるcanvasを作成。
  const canvasForText = document.createElement('canvas');
  const ctx = canvasForText.getContext('2d');
  ctx.canvas.width = canvasWidth;
  ctx.canvas.height = canvasHeight;
  // 透過率50%の青背景を描く
  ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //
  ctx.fillStyle = 'black';
  ctx.font = `${fontSize}px serif`;
  ctx.fillText(
    text,
    // x方向の余白/2をx方向開始時の始点とすることで、横方向の中央揃えをしている。
    (canvasWidth - ctx.measureText(text).width) / 2,
    // y方向のcanvasの中央に文字の高さの半分を加えることで、縦方向の中央揃えをしている。
    canvasHeight / 2 + ctx.measureText(text).actualBoundingBoxAscent / 2
  );
  return canvasForText;
};

// canvasをtextureに載せ、さらにmaterialに載せる。
const canvasTexture = new THREE.CanvasTexture();
// createCanvasForTexture(500, 500, 'Hello World!', 40)
const scaleMaster = 70;

createSprite(
  canvasTexture,
  {
    x: scaleMaster,
    y: scaleMaster,
    z: scaleMaster,
  },
  { x: -70, y: 70, z: -70 }
);

const canvasWidth = 500;
const canvasHeight = 140;

const companyObjList = [
  {
    company: '株式会社熊谷組',
    coordinate: { x: 100, y: 50, z: 0 },
  },
  {
    company: '鹿島建設',
    coordinate: { x: -10, y: 30, z: 0 },
  },
  {
    company: '大林組',
    coordinate: { x: 40, y: -20, z: 0 },
  },
];

const termObjList = [
  {
    term: 'トンネル',
    coordinate: { x: 5, y: 10, z: 0 },
  },
  {
    term: 'コンクリート',
    coordinate: { x: -20, y: 50, z: 0 },
  },
  {
    term: 'シールド掘削',
    coordinate: { x: 0, y: -20, z: 0 },
  },
];

companyObjList.forEach((element) => {
  const texture = new THREE.CanvasTexture(
    createCanvasForCompany(canvasWidth, canvasHeight, element.company, 50)
  );
  createSprite(
    texture,
    {
      x: scaleMaster,
      // 縦方向の縮尺を調整
      y: scaleMaster * (canvasHeight / canvasWidth),
      z: scaleMaster,
    },
    element.coordinate
  );
  objects.push(texture);
});

termObjList.forEach((element) => {
  const texture = new THREE.CanvasTexture(
    createCanvasForTerm(canvasWidth, canvasHeight, element.term, 50)
  );
  createSprite(
    texture,
    {
      x: scaleMaster,
      // 縦方向の縮尺を調整
      y: scaleMaster * (canvasHeight / canvasWidth),
      z: scaleMaster,
    },
    element.coordinate
  );
  objects.push(texture);
});

// console.log(objects);
// // この平面に対してオブジェクトを平行に動かす
// var plane = new THREE.Plane();

// var raycaster = new THREE.Raycaster();
// var mouse = new THREE.Vector2();
// var offset = new THREE.Vector3();
// var intersection = new THREE.Vector3();
// // マウスオーバーしているオブジェクト
// var mouseoveredObj;
// // ドラッグしているオブジェクト
// var draggedObj;
// renderer.domElement.addEventListener('mousedown', onDocumentMouseDown, false);
// renderer.domElement.addEventListener('mousemove', onDocumentMouseMove, false);
// renderer.domElement.addEventListener('mouseup', onDocumentMouseUp, false);
// function onDocumentMouseDown(event) {
//   event.preventDefault();
//   raycaster.setFromCamera(mouse, camera);
//   var intersects = raycaster.intersectObjects(objects);
//   if (intersects.length > 0) {
//     // マウスドラッグしている間はTrackballControlsを無効にする
//     controls.enabled = false;
//     draggedObj = intersects[0].object;
//     // rayとplaneの交点を求めてintersectionに設定
//     if (raycaster.ray.intersectPlane(plane, intersection)) {
//       // ドラッグ中のオブジェクトとplaneの距離
//       offset.copy(intersection).sub(draggedObj.position);
//     }
//   }
// }

// function onDocumentMouseMove(event) {
//   event.preventDefault();

//   mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//   mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//   raycaster.setFromCamera(mouse, camera);

//   if (draggedObj) {
//     // オブジェクトをドラッグして移動させているとき

//     // rayとplaneの交点をintersectionに設定
//     if (raycaster.ray.intersectPlane(plane, intersection)) {
//       // オブジェクトをplaneに対して平行に移動させる
//       draggedObj.position.copy(intersection.sub(offset));
//     }
//   } else {
//     // オブジェクトをドラッグしないでマウスを動かしている場合
//     var intersects = raycaster.intersectObjects(objects);

//     if (intersects.length > 0) {
//       if (mouseoveredObj != intersects[0].object) {
//         // マウスオーバー中のオブジェクトを入れ替え
//         mouseoveredObj = intersects[0].object;

//         // plane.normalにカメラの方向ベクトルを設定
//         // 平面の角度をカメラの向きに対して垂直に維持する
//         camera.getWorldDirection(plane.normal);
//       }
//     } else {
//       mouseoveredObj = null;
//     }
//   }
// }

// function onDocumentMouseUp(event) {
//   event.preventDefault();

//   controls.enabled = true;

//   if (mouseoveredObj) {
//     draggedObj = null;
//   }
// }
