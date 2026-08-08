import { BIG_THREE } from "@/content/big-three";
import type { BigThreeEntry } from "@/content/big-three-types";

export type BigThreeRole = "sun" | "moon" | "rising";

export function bigThree(role: BigThreeRole, signName: string): BigThreeEntry | undefined {
  return BIG_THREE.find((e) => e.role === role && e.sign === signName);
}

export { BIG_THREE };
export type { BigThreeEntry };
