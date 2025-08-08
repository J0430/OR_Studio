import type { AnimatedLogoProps } from "client/components/common/AnimatedLogo/AnimatedLogo.types";

export interface LogoPreloaderProps {
  duration?: number;
  logoProps?: AnimatedLogoProps;
  onFinish?: () => void; // ✅ new optional callback
}
