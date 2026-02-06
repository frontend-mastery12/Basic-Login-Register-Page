export const inputWrapper = (hasError = false) =>
  `
  group flex items-center h-11 rounded-md overflow-hidden
  bg-[rgba(48,55,62,0.87)]
  border border-gray-700
  transition-all duration-200
  focus-within:border-amber-400
  focus-within:ring-2
  focus-within:ring-amber-400/30
  ${hasError ? "border-red-500 ring-2 ring-red-500/30" : ""}
`;

export const inputBase = `
  w-full h-full bg-transparent
  pl-3 pr-2
  text-gray-200 tracking-wide
  placeholder-gray-500
  focus:outline-none
`;

export const iconBase = `
  ml-3 text-gray-400 text-[18px]
  transition-colors
  group-focus-within:text-amber-400
`;

export const submitBtn = `
  w-full h-11 mt-5
  rounded-md
  bg-amber-600 hover:bg-amber-500
  text-gray-100 font-bold tracking-wide
  transition-all duration-200
  focus:ring-2 focus:ring-amber-400/40
  active:scale-[0.98]
`;