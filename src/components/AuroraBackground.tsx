export default function AuroraBackground() {
  return (
    // Blobs translúcidos animados
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden">
      {/* Blob 1 */}
      <div
        className="absolute -top-40 -left-40 w-[70rem] h-[70rem] rounded-full
                   bg-gradient-to-br from-indigo-700/35 via-blue-600/35 to-cyan-500/35
                   blur-3xl mix-blend-screen animate-blob"
      />

      {/* Blob 2 (delay) */}
      <div
        className="absolute top-1/4 -right-56 w-[60rem] h-[60rem] rounded-full
                   bg-gradient-to-tr from-blue-800/30 via-sky-600/30 to-teal-500/30
                   blur-3xl mix-blend-screen animate-blob animation-delay-4000"
      />

      {/* Blob 3 (delay) */}
      <div
        className="absolute bottom-0 left-1/4 w-[50rem] h-[50rem] rounded-full
                   bg-gradient-to-tl from-cyan-700/25 via-teal-500/25 to-blue-400/25
                   blur-3xl mix-blend-screen animate-blob animation-delay-8000"
      />
    </div>
  );
}
