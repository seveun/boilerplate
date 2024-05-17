import { useUser } from "@/context/UserContext";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { FcGoogle } from "react-icons/fc";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { withTranslations } from "@/hoc/translation";

export const getStaticProps = withTranslations(["common"]);

const IndexPage = () => {
  const { t } = useTranslation("common");
  const { user } = useUser();
  const { handleGoogleLogin, handleLogout } = useAuth();
  const router = useRouter();

  const changeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const locale: string = e.target.value;
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-800 text-gray-100">
      <h1 className="text-4xl font-bold mb-4 tracking-wider">{t("title")}</h1>
      <p
        className={twMerge(
          clsx(
            "text-xl mb-8 px-10 text-center",
            user ? "text-green-500" : "text-red-500",
          ),
        )}
      >
        {t("description")}
      </p>
      <div className="pb-5">
        {user ? (
          <div className="flex flex-col items-center">
            <div className={"font-bold"}>
              {t("connected", { email: user.email })}
            </div>
            <Button
              className="mt-4"
              variant="destructive"
              onClick={handleLogout}
            >
              {t("disconnect")}
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
              {t("connectGoogle")}
            </Button>
          </div>
        )}
      </div>
      <div className="absolute top-4 right-4">
        <select
          className="bg-gray-800 text-gray-100 p-2 rounded"
          onChange={changeLanguage}
          value={router.locale}
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>
    </div>
  );
};

export default IndexPage;
