import { NavBar } from "../components";

export default function Home() {
  
  
  return (
    <div className="bg-gradient-to-tr from-cyan-900 via-green-700 to-slate-900 h-screen flex justify-center items-center flex-col">
      <NavBar />
      <div className="max-w-3xl flex justify-center items-center flex-col text-white">
        <div className="font-mono mb-5 text-5xl">Welcome</div>
        <div className="text-center">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
        </div>
        <div className="mt-10 mb-7 text-3xl">Interested?</div>
        <div className="flex flex-row">
          <button className="bg-white hover:bg-green-900 text-black font-bold py-2 px-4 rounded hover:text-white">Sign In</button>
          <button className="bg-transparent hover:bg-green-900 text-white-700 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded ml-1.5">Log in</button>
        </div>
      </div>
    </div>
  );
}
