interface ModuleHeaderProps {
  module: string;
}

export function ModuleHeader({ module }: ModuleHeaderProps) {
  return (
    <div className="mb-lg">
      <h2 className="text-[36px] font-bold leading-[1.1] text-text">
        {module}
      </h2>
      <div className="border-b border-muted/30 mt-sm" />
    </div>
  );
}
