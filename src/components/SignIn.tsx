// components/SignIn.tsx
'use client';
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import signInImage from "../../public/signInImage.png";

export default function Page() {
  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Left side with background image */}
      <div className="flex-1 relative">
        <Image
          src={signInImage}
          alt="Catering Food"
          layout="fill"
          objectFit="cover"
          className="rounded-l-lg"
        />
      </div>
      {/* Right side with login form */}
      <div className="w-full max-w-md py-10 flex flex-col justify-center items-center bg-blue-900">
        <h1 className="cursor-pointer text-3xl px-6 font-bold text-white mb-8 self-start">
          CATER<span className="text-button-yellow">ANY</span><span className="text-button-green">FOOD</span>
        </h1>
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          afterSignInUrl="/dashboard"
          appearance={{
            elements: {
              card: "bg-transparent w-full flex flex-col self-center space-y-4 p-12",
              formButtonPrimary:
                "bg-button-green text-white w-full py-3 border-none rounded mt-4 hover:bg-button-yellow hover:text-white transition duration-300 ",
              formFieldInput:
                "bg-white text-black rounded-md py-2 px-3 mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ",
              formFieldLabel: "text-white font-semibold",
            },
            variables: {
              colorPrimary: "#000000",
              colorText: "#ffffff",
            },
          }}
        />
      </div>
    </div>
  );
}