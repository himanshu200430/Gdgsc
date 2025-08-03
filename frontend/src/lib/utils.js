import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { getParticlesOptions } from "../utils/particles"; 

// Utility function to merge Tailwind classes conditionally
export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
