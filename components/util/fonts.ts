import { Poppins, Josefin_Slab } from "next/font/google";

export const init_poppins = Poppins({ subsets: ["latin"], weight: ["100", "200", "300", "400", "500"], variable: '--font-poppins', display: 'swap' });
export const init_josefinSlab = Josefin_Slab({ subsets: ["latin"], weight: ["100", "400", "600", "700"], variable: '--font-josefin', display: 'swap'})

export const josefin = init_josefinSlab.variable
export const poppins = init_poppins.variable
