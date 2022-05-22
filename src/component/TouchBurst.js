import mojs from "@mojs/core";

const burstObj = {
  className: "BurstExample",
  radius: { 70: 170 },
  count: 5,
  top: 0,
  left: 0,

  children: {
    easing: "ease.in",
    shape: "circle",
    radius: 40,
    fill: ["deeppink", "cyan", "yellow"],
    strokeWidth: 5,
    duration: 800,
  },
};

const buttonBurstsPool = [
  new mojs.Burst(burstObj),
  new mojs.Burst(burstObj),
  new mojs.Burst(burstObj),
  new mojs.Burst(burstObj),
  new mojs.Burst(burstObj),
  new mojs.Burst(burstObj),
];

let burstIndex = 0;

const TouchBurst = () => {
  return (
    <div
      className="content"
      style={{ height: "100vh", width: "100vw" }}
      onClick={(event) => {
        buttonBurstsPool[burstIndex]
          .tune({ x: event.pageX, y: event.pageY })
          .generate()
          .replay();
        burstIndex =
          burstIndex >= buttonBurstsPool.length - 1 ? 0 : burstIndex + 1;
      }}
    ></div>
  );
};

export default TouchBurst;
