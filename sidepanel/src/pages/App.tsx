function App() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950">
      <h1 className="text-2xl font-extrabold text-white">Hello World !!</h1>
      <button
        className="btn btn-md btn-primary"
        onClick={() => alert("Hello World !!")}
      >
        Alert!!
      </button>
    </main>
  );
}

export default App;
