"use client";

import Lottie, { type LottieComponentProps } from "lottie-react";

type LottieAnimationProps = Pick<
  LottieComponentProps,
  "animationData" | "loop" | "autoplay" | "className" | "aria-label"
>;

export function LottieAnimation({
  loop = true,
  autoplay = true,
  ...props
}: LottieAnimationProps) {
  return <Lottie loop={loop} autoplay={autoplay} {...props} />;
}
