/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import Image from 'next/image';
import React from 'react'
import GoogleLogo from '../../assets/logos/google.svg';
import FacebookLogo from '../../assets/logos/facebook.svg';
import LinkedInLogo from '../../assets/logos/linkedin.svg';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const SignInForm = () => {
  const router = useRouter();
  const handleSocialSignIn = async (social: string) => {
    try {
      const response = await signIn(social, {
        callbackUrl: `${window?.location?.origin}`
      })
      console.log({ response })
    } catch (error) {
      console.log(error)
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      e.preventDefault();
      const email = (e.target as HTMLFormElement).email.value;
      const password = (e.target as HTMLFormElement).password.value;
      console.log(email, password)
      const response = await signIn("credentials", {
        redirect: false,
        email,
        password
      })
      console.log({ response })
      router.replace("/")
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <section className="bg-gray-50 dark:bg-gray-900 w-full">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                <input autoComplete="email" type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input autoComplete="current-password" type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800" required />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                  </div>
                </div>
                <a href="#" className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</a>
              </div>
              <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Sign in</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                <span>Don’t have an account yet?</span>
                <Link href="/auth/signup" className='font-semibold ml-2 text-blue-500'>Sign Up</Link>
              </p>
            </form>
            <div className="w-full flex flex-col gap-4">
              <SocialSignInButton
                socialHandle="google"
                icon={GoogleLogo}
                handleSocialLogin={handleSocialSignIn}
              />
              <SocialSignInButton
                socialHandle="facebook"
                icon={FacebookLogo}
                handleSocialLogin={handleSocialSignIn}
              />
              <SocialSignInButton
                socialHandle="linkedin"
                icon={LinkedInLogo}
                handleSocialLogin={handleSocialSignIn}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignInForm

const SocialSignInButton = ({
  icon,
  socialHandle = '',
  handleSocialLogin,
}: {
  icon: string;
  socialHandle: string;
  handleSocialLogin: any;
}) => {
  return (
    <button
      onClick={() => handleSocialLogin(socialHandle)}
      className="flex justify-center gap-2 bg-slate-200 shadow-lg rounded-md px-6 py-2 w-full border border-black/30"
    >
      <Image src={icon} alt={`${socialHandle}-logo`} width={24} height={24} />
      <span>Sign in with {socialHandle}</span>
    </button>
  );
};
