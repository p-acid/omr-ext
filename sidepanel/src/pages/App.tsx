function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
      <h1 className="text-2xl font-extrabold text-white">Hello World !!</h1>
      <button
        className="h-10 rounded-md bg-green-500 px-3 text-white"
        onClick={() => alert("Hello World !!")}
      >
        Alert!!
      </button>
    </main>
  );
}

export default App;
