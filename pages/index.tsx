import { useUser } from "@/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button"; // Assure-toi que l'importation correspond à l'endroit où le composant Button est installé
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { FcGoogle } from "react-icons/fc";

const IndexPage = () => {
  const { user } = useUser();
  const { handleGoogleLogin, handleLogout } = useAuth();

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-800 text-gray-100">
      <h1 className="text-4xl font-bold mb-4 tracking-wider">
        Boilerplate Deployed
      </h1>
      <p
        className={twMerge(
          clsx(
            "text-xl mb-8 px-10 text-center",
            user ? "text-green-500" : "text-red-500",
          ),
        )}
      >
        Fastify + Serverless + Sequelize + Next.js + Shadcn + Firebase.
      </p>
      <div className="pb-5">
        {user ? (
          <div className="flex flex-col items-center">
            <div className={"font-bold"}>Connected with {user.email}</div>
            <Button
              className="mt-4"
              variant="destructive"
              onClick={handleLogout}
            >
              Se déconnecter
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Button
              className={twMerge(
                "flex items-center bg-white text-gray-800 font-semibold py-2 px-4 border border-gray-300 rounded shadow-sm hover:bg-gray-100",
              )}
              onClick={handleGoogleLogin}
            >
              <FcGoogle className="mr-2 scale-125" />
              Connect with Google
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndexPage;
