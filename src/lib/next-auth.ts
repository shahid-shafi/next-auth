import NextAuth, { AuthOptions } from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import GoogleProvider from "next-auth/providers/google"
import LinkedInProvider from "next-auth/providers/linkedin"
import { FacebookProviderOption, GoogleProviderOption, LinkedInProviderOption } from "./social-login-providers"

const authOption: AuthOptions = {
  providers: [
    GoogleProvider(GoogleProviderOption),
    FacebookProvider(FacebookProviderOption),
    LinkedInProvider(LinkedInProviderOption),
  ]
}

export default NextAuth(authOption)