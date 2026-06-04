/** @type {import('next').NextConfig} */
const nextConfig = {
  typedRoutes: true,
  serverExternalPackages: ["exceljs"],
  devIndicators: {
    appIsrStatus: false,
  },
}

export default nextConfig
