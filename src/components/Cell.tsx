type CellProps = {
  children: React.ReactNode;
  className?: string;
};

export const Cell: React.FC<CellProps> = ({ children, className = "" }) => {
  return (
    <div className={`w-[100%] h-9 text-center ${className}`}>{children}</div>
  );
};
