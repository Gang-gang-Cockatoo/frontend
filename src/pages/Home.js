import { Link, Navigate } from 'react-router-dom';

export default function Home() {
  const type = JSON.parse(localStorage.getItem('user'))?.type;

  if (type === 'recruiter') return <Navigate to="/quizzes" />;
  if (type === 'candidate') return <Navigate to="/rooms" />;

  return (
    <div className=" h-screen flex justify-center items-center flex-col">
      <div className="max-w-3xl flex justify-center items-center flex-col text-white">
        <div className="font-mono mb-5 text-5xl">Welcome</div>
        <div className="text-center">
          Gang-Gang Cockatoo provides a great app that tests the quick thinking
          and ability to react to the environment efficiently. We want the
          companies to thrive in the aspect of being able to redress in case of
          an urgency and have capable people that would help them meet their
          targets.
        </div>
        <div className="mt-10 mb-7 text-3xl">Who are you?</div>
        <div className="flex flex-row">
          <Link
            to="/register/candidate"
            className="bg-white hover:bg-violet-800 text-black font-bold py-2 px-4 rounded hover:text-white"
          >
            Candidate
          </Link>
          <Link
            to="/register/recruiter"
            className="bg-transparent hover:bg-violet-800 text-white-700 font-semibold hover:text-white py-2 px-4 border border-white-500 hover:border-transparent rounded ml-1.5"
          >
            Recruiter
          </Link>
        </div>
      </div>
    </div>
  );
}
