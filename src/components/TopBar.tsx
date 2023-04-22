export function TopBar() {
  return (
    <div className="flex justify-between items-center border-b border-grey-border mb-5 pb-4 dark:border-grey">
      <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-volt to-grey">
        Notable
      </h1>

      <div>Light mode</div>
    </div>
  );
}
