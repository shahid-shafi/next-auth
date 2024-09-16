import { Account, Profile, User } from "next-auth"
import { AUTH_FACEBOOK_ID, AUTH_FACEBOOK_SECRET, AUTH_GOOGLE_ID, AUTH_GOOGLE_SECRET, AUTH_LINKEDIN_ID, AUTH_LINKEDIN_SECRET } from "./env.config"
import prisma from "./prisma"

export const FacebookProviderOption = {
  clientId: AUTH_FACEBOOK_ID,
  clientSecret: AUTH_FACEBOOK_SECRET,
}

export const GoogleProviderOption = {
  clientId: AUTH_GOOGLE_ID,
  clientSecret: AUTH_GOOGLE_SECRET,
}

export const LinkedInProviderOption = {
  clientId: AUTH_LINKEDIN_ID,
  clientSecret: AUTH_LINKEDIN_SECRET,
}
type SocialUser = { name: string; email: string; id: string; image: string }
export async function NextAuthCallback(account: Account | null, user: User | SocialUser, profile: Profile) {
  prisma.user.upsert({
    where: {
      email: profile.email
    },
    create: {
      email: (user as SocialUser)?.email,
      name: (user as SocialUser)?.name,
      avatar: user?.image,
      provider: account?.provider,
    },
    update: {
      name: (user as SocialUser)?.name,
      avatar: user.image,
    }
  })
}