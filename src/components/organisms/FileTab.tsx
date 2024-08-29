export function FileTab() {
  const files = new Array(10).fill(0).map((_, i) => ({
    name: `file-${i}.txt`,
  }));
  return (
    <div className="w-full max-w-fit inline-flex items-center overflow-x-auto h-10 bg-gray-100">
      {files.map((file, index) => (
        <div key={index} className="min-w-44">
          {file.name}
        </div>
      ))}
    </div>
  );
}
